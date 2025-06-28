export interface GeminiSetupStep {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'loading' | 'completed' | 'error';
  error?: string;
}

export interface GoogleCloudProject {
  projectId: string;
  projectNumber: string;
  displayName: string;
  state: string;
}

export class GeminiSetupService {
  private static instance: GeminiSetupService;
  private accessToken: string | null = null;

  static getInstance(): GeminiSetupService {
    if (!GeminiSetupService.instance) {
      GeminiSetupService.instance = new GeminiSetupService();
    }
    return GeminiSetupService.instance;
  }

  async authenticateWithGoogle(): Promise<string> {
    return new Promise((resolve, reject) => {
      // Use Google OAuth2 for authentication
      const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || process.env.GOOGLE_CLIENT_ID;
      
      if (!clientId) {
        reject(new Error('Google OAuth client ID not configured. Please set NEXT_PUBLIC_GOOGLE_CLIENT_ID in your environment variables.'));
        return;
      }
      
      const redirectUri = `${window.location.origin}/auth/google/callback`;
      // Simplified scopes - start with basic cloud platform access
      const scope = 'https://www.googleapis.com/auth/cloud-platform';
      
      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
        `client_id=${encodeURIComponent(clientId)}&` +
        `redirect_uri=${encodeURIComponent(redirectUri)}&` +
        `scope=${encodeURIComponent(scope)}&` +
        `response_type=code&` +
        `access_type=offline&` +
        `prompt=consent`;

      console.log('Starting OAuth flow:', {
        clientId: clientId.substring(0, 10) + '...',
        redirectUri,
        scope
      });

      // Open popup for authentication
      const popup = window.open(authUrl, 'google-auth', 'width=500,height=600');
      
      if (!popup) {
        reject(new Error('Popup blocked. Please allow popups for this site.'));
        return;
      }
      
      const checkClosed = setInterval(() => {
        if (popup?.closed) {
          clearInterval(checkClosed);
          reject(new Error('Authentication cancelled'));
        }
      }, 1000);

      // Listen for auth completion
      const messageHandler = (event: MessageEvent) => {
        if (event.origin !== window.location.origin) return;
        
        if (event.data.type === 'GOOGLE_AUTH_SUCCESS') {
          clearInterval(checkClosed);
          window.removeEventListener('message', messageHandler);
          popup?.close();
          this.accessToken = event.data.accessToken;
          resolve(event.data.accessToken);
        } else if (event.data.type === 'GOOGLE_AUTH_ERROR') {
          clearInterval(checkClosed);
          window.removeEventListener('message', messageHandler);
          popup?.close();
          reject(new Error(event.data.error));
        }
      };

      window.addEventListener('message', messageHandler);
    });
  }

  async createGoogleCloudProject(projectName: string): Promise<GoogleCloudProject> {
    if (!this.accessToken) {
      throw new Error('Not authenticated with Google');
    }

    const projectId = `hades-ai-${Date.now()}`;
    
    // Ensure project name is at least 4 characters
    const displayName = projectName.length >= 4 ? projectName : `Hades AI Project - ${projectName}`;
    
    const response = await fetch('https://cloudresourcemanager.googleapis.com/v1/projects', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        projectId: projectId,
        name: displayName,
        labels: {
          'created-by': 'hades-terminal',
          'purpose': 'ai-api-access'
        }
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Failed to create project: ${error.error?.message || 'Unknown error'}`);
    }

    const project = await response.json();
    
    // Wait for project to be ready
    await this.waitForProjectReady(projectId);
    
    return {
      projectId: project.projectId,
      projectNumber: project.projectNumber,
      displayName: project.name,
      state: project.lifecycleState
    };
  }

  async waitForProjectReady(projectId: string, maxAttempts: number = 30): Promise<void> {
    for (let i = 0; i < maxAttempts; i++) {
      try {
        const response = await fetch(`https://cloudresourcemanager.googleapis.com/v1/projects/${projectId}`, {
          headers: {
            'Authorization': `Bearer ${this.accessToken}`,
          }
        });

        if (response.ok) {
          const project = await response.json();
          if (project.lifecycleState === 'ACTIVE') {
            return;
          }
        }
      } catch (error) {
        // Continue waiting
      }

      await new Promise(resolve => setTimeout(resolve, 2000));
    }
    
    throw new Error('Project creation timeout');
  }

  async enableBilling(projectId: string, billingAccountId?: string): Promise<void> {
    if (!this.accessToken) {
      throw new Error('Not authenticated with Google');
    }

    // If no billing account provided, try to get the first available one
    if (!billingAccountId) {
      const billingAccounts = await this.getBillingAccounts();
      if (billingAccounts.length === 0) {
        // Skip billing setup if no accounts available
        console.warn('No billing accounts available, skipping billing setup');
        return;
      }
      billingAccountId = billingAccounts[0].name;
    }

    const response = await fetch(`https://cloudbilling.googleapis.com/v1/projects/${projectId}/billingInfo`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${this.accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        billingAccountName: billingAccountId
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Failed to enable billing: ${error.error?.message || 'Unknown error'}`);
    }
  }

  async getBillingAccounts(): Promise<any[]> {
    if (!this.accessToken) {
      throw new Error('Not authenticated with Google');
    }

    const response = await fetch('https://cloudbilling.googleapis.com/v1/billingAccounts', {
      headers: {
        'Authorization': `Bearer ${this.accessToken}`,
      }
    });

    if (!response.ok) {
      return [];
    }

    const data = await response.json();
    return data.billingAccounts || [];
  }

  async enableGeminiAPI(projectId: string): Promise<void> {
    if (!this.accessToken) {
      throw new Error('Not authenticated with Google');
    }

    const servicesToEnable = [
      'generativelanguage.googleapis.com',
      'aiplatform.googleapis.com'
    ];

    for (const service of servicesToEnable) {
      try {
        const response = await fetch(`https://serviceusage.googleapis.com/v1/projects/${projectId}/services/${service}:enable`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${this.accessToken}`,
            'Content-Type': 'application/json',
          }
        });

        if (!response.ok) {
          const error = await response.json();
          const errorMessage = error.error?.message || 'Unknown error';
          
          if (errorMessage.includes('Permission denied')) {
            throw new Error(`Permission denied to enable ${service}. Please ensure you have the 'Service Usage Admin' role or 'Editor' role on the project. You may need to enable the API manually in Google Cloud Console.`);
          } else if (errorMessage.includes('not found')) {
            throw new Error(`Service ${service} not found. This API may not be available in your region or account.`);
          } else {
            throw new Error(`Failed to enable ${service}: ${errorMessage}`);
          }
        }

        // Wait for service to be enabled
        await this.waitForServiceEnabled(projectId, service);
      } catch (error) {
        // If it's a permission error, provide helpful guidance
        if (error instanceof Error && error.message.includes('Permission denied')) {
          throw new Error(`${error.message}\n\nTo fix this:\n1. Go to Google Cloud Console\n2. Navigate to IAM & Admin > IAM\n3. Add the 'Service Usage Admin' role to your account\n4. Or enable the API manually in APIs & Services > Library`);
        }
        throw error;
      }
    }
  }

  async waitForServiceEnabled(projectId: string, serviceName: string, maxAttempts: number = 20): Promise<void> {
    for (let i = 0; i < maxAttempts; i++) {
      try {
        const response = await fetch(`https://serviceusage.googleapis.com/v1/projects/${projectId}/services/${serviceName}`, {
          headers: {
            'Authorization': `Bearer ${this.accessToken}`,
          }
        });

        if (response.ok) {
          const service = await response.json();
          if (service.state === 'ENABLED') {
            return;
          }
        }
      } catch (error) {
        // Continue waiting
      }

      await new Promise(resolve => setTimeout(resolve, 3000));
    }
    
    throw new Error(`Service ${serviceName} enablement timeout`);
  }

  async createAPIKey(projectId: string): Promise<string> {
    if (!this.accessToken) {
      throw new Error('Not authenticated with Google');
    }

    const response = await fetch(`https://apikeys.googleapis.com/v2/projects/${projectId}/locations/global/keys`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        displayName: `Hades Terminal API Key - ${new Date().toISOString()}`,
        restrictions: {
          apiTargets: [
            {
              service: 'generativelanguage.googleapis.com'
            },
            {
              service: 'aiplatform.googleapis.com'
            }
          ]
        }
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Failed to create API key: ${error.error?.message || 'Unknown error'}`);
    }

    const operation = await response.json();
    
    // Wait for operation to complete
    const apiKey = await this.waitForOperation(operation.name);
    
    return apiKey.keyString;
  }

  async waitForOperation(operationName: string, maxAttempts: number = 30): Promise<any> {
    for (let i = 0; i < maxAttempts; i++) {
      try {
        const response = await fetch(`https://apikeys.googleapis.com/v2/${operationName}`, {
          headers: {
            'Authorization': `Bearer ${this.accessToken}`,
          }
        });

        if (response.ok) {
          const operation = await response.json();
          if (operation.done) {
            if (operation.error) {
              throw new Error(`Operation failed: ${operation.error.message}`);
            }
            return operation.response;
          }
        }
      } catch (error) {
        if (i === maxAttempts - 1) throw error;
      }

      await new Promise(resolve => setTimeout(resolve, 2000));
    }
    
    throw new Error('Operation timeout');
  }

  async setupGeminiAPI(
    projectName: string,
    onStepUpdate: (stepId: string, status: GeminiSetupStep['status'], error?: string) => void,
    onPollUpdate?: (message: string) => void
  ): Promise<{ projectId: string; apiKey: string }> {
    try {
      // Step 1: Authenticate
      onStepUpdate('auth', 'loading');
      await this.authenticateWithGoogle();
      await new Promise(resolve => setTimeout(resolve, 1500)); // Add delay
      onStepUpdate('auth', 'completed');

      // Step 2: Create Google Cloud Project
      onStepUpdate('project', 'loading');
      const project = await this.createGoogleCloudProject(projectName);
      await new Promise(resolve => setTimeout(resolve, 2000)); // Add delay
      onStepUpdate('project', 'completed');

      // Step 3: Enable Billing (Optional)
      onStepUpdate('billing', 'loading');
      try {
        await this.enableBilling(project.projectId);
        await new Promise(resolve => setTimeout(resolve, 1500)); // Add delay
        onStepUpdate('billing', 'completed');
      } catch (error) {
        // Billing is optional, continue without it
        await new Promise(resolve => setTimeout(resolve, 1000)); // Add delay
        onStepUpdate('billing', 'completed');
      }

      // Step 4: Redirect to Google AI Studio
      onStepUpdate('api', 'loading');
      await new Promise(resolve => setTimeout(resolve, 1000)); // Add delay
      onStepUpdate('api', 'completed');
      
      // Step 5: Poll for API Key
      onStepUpdate('key', 'loading');
      
      let apiKey = 'MANUAL_SETUP_REQUIRED';
      
      if (onPollUpdate) {
        // Start polling for API key
        apiKey = await this.pollForAPIKey(project.projectId, onPollUpdate) || 'MANUAL_SETUP_REQUIRED';
      }
      
      await new Promise(resolve => setTimeout(resolve, 1000)); // Add delay
      onStepUpdate('key', 'completed');

      return {
        projectId: project.projectId,
        apiKey: apiKey
      };

    } catch (error) {
      throw error;
    }
  }

  async fetchGeminiAPIKeys(projectId: string): Promise<string[]> {
    if (!this.accessToken) {
      throw new Error('Not authenticated with Google');
    }

    try {
      const response = await fetch(`https://apikeys.googleapis.com/v2/projects/${projectId}/locations/global/keys`, {
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
        }
      });

      if (!response.ok) {
        console.warn('Failed to fetch API keys:', response.status);
        return [];
      }

      const data = await response.json();
      const keys = data.keys || [];
      
      // Return all active keys for the project (don't filter by name)
      const activeKeys = keys.filter((key: any) => key.state === 'ACTIVE');
      
      console.log(`Found ${activeKeys.length} active API keys for project ${projectId}`);
      
      return activeKeys.map((key: any) => key.keyString);
    } catch (error) {
      console.warn('Error fetching API keys:', error);
      return [];
    }
  }

  async pollForAPIKey(
    projectId: string, 
    onUpdate: (message: string) => void,
    maxAttempts: number = 100
  ): Promise<string | null> {
    let consecutiveNoKeys = 0;
    let lastKeyCount = 0;

    console.log(`Starting API key polling for project ${projectId} - will stop after 25 consecutive unsuccessful attempts`);

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      console.log(`Polling attempt ${attempt}/${maxAttempts}`);
      
      onUpdate(`Checking for API keys... (attempt ${attempt}/${maxAttempts})`);
      
      try {
        const keys = await this.fetchGeminiAPIKeys(projectId);
        
        if (keys.length > lastKeyCount) {
          // Found new keys
          const newKey = keys[keys.length - 1]; // Get the most recent key
          console.log(`✅ Found new API key on attempt ${attempt}!`);
          onUpdate(`✅ Found new API key!`);
          return newKey;
        } else if (keys.length === lastKeyCount && keys.length > 0) {
          // Same number of keys, no new ones
          consecutiveNoKeys++;
          onUpdate(`No new keys found (${consecutiveNoKeys}/25 consecutive checks)`);
          
          if (consecutiveNoKeys >= 25) {
            console.log(`Stopping search - no new keys found in 25 consecutive checks`);
            onUpdate(`Stopping search - no new keys found in 25 consecutive checks`);
            return keys[keys.length - 1]; // Return the existing key
          }
        } else {
          // No keys found yet
          consecutiveNoKeys = 0;
          onUpdate(`No API keys found yet...`);
        }
        
        lastKeyCount = keys.length;
        
        // Wait before next attempt
        await new Promise(resolve => setTimeout(resolve, 3000));
        
      } catch (error) {
        console.warn(`Error in attempt ${attempt}:`, error);
        onUpdate(`Error checking for keys, retrying...`);
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    }

    console.log(`❌ Timeout - no API key found after ${maxAttempts} attempts`);
    onUpdate(`❌ Timeout - no API key found after ${maxAttempts} attempts`);
    return null;
  }
}