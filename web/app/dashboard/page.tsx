'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { 
  Shield, 
  Terminal, 
  Activity,
  CheckCircle, 
  Zap,
  Settings,
  LogOut,
  Bell,
  Search,
  Key,
  Copy,
  BarChart3,
  Globe,
  Lock,
  ExternalLink,
  Loader2,
  AlertCircle,
  Cloud,
  User
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { logout } from '@/lib/actions/auth';
import { GeminiSetupService, GeminiSetupStep } from '@/lib/services/gemini-setup';
import Link from 'next/link';
import Image from 'next/image';


interface APIKey {
  id: string;
  name: string;
  key: string;
  type: 'hades' | 'gemini';
  created: string;
  lastUsed: string;
  status: 'active' | 'inactive';
  projectId?: string;
}

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [apiKeys, setApiKeys] = useState<APIKey[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showNewKeyForm, setShowNewKeyForm] = useState(false);
  const [showGeminiSetup, setShowGeminiSetup] = useState(false);
  const [newKeyName, setNewKeyName] = useState('');
  const [newKeyType, setNewKeyType] = useState<'hades' | 'gemini'>('gemini');
  const [generatedKey, setGeneratedKey] = useState<string | null>(null);
  const [geminiSetupSteps, setGeminiSetupSteps] = useState<GeminiSetupStep[]>([]);
  const [isSettingUpGemini, setIsSettingUpGemini] = useState(false);
  const [pollingMessage, setPollingMessage] = useState<string>('');
  const [foundApiKey, setFoundApiKey] = useState<string | null>(null);
  const [manualApiKey, setManualApiKey] = useState<string>('');

  useEffect(() => {
    if (status === 'loading') return;
    
    if (!session) {
      router.push('/signin');
      return;
    }

    // Initialize Gemini setup steps
    setGeminiSetupSteps([
      {
        id: 'auth',
        title: 'Authenticate with Google',
        description: 'Connecting to your Google account for API access',
        status: 'pending'
      },
      {
        id: 'project',
        title: 'Create Google Cloud Project',
        description: 'Setting up a new Google Cloud project for API access',
        status: 'pending'
      },
      {
        id: 'billing',
        title: 'Enable Billing (Optional)',
        description: 'Billing account setup for higher API limits',
        status: 'pending'
      },
      {
        id: 'api',
        title: 'Redirect to Google AI Studio',
        description: 'Opening Google AI Studio to create your API key',
        status: 'pending'
      },
      {
        id: 'key',
        title: 'Create API Key Manually',
        description: 'Create your Gemini API key in Google AI Studio',
        status: 'pending'
      }
    ]);

    // Load existing API keys
    setTimeout(() => {
      setApiKeys([]); // Start with empty API keys list
      setIsLoading(false);
    }, 1000);
  }, [session, status, router]);

  const generateAPIKey = () => {
    if (!newKeyName.trim()) return;
    
    if (newKeyType === 'gemini') {
      setShowGeminiSetup(true);
      setShowNewKeyForm(false);
      startGeminiSetup();
      return;
    }
    
    const newKey = `hds_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
    const newApiKey: APIKey = {
      id: Date.now().toString(),
      name: newKeyName,
      key: newKey,
      type: 'hades',
      created: new Date().toISOString().slice(0, 19).replace('T', ' '),
      lastUsed: 'Never',
      status: 'active'
    };
    
    setApiKeys([...apiKeys, newApiKey]);
    setGeneratedKey(newKey);
    setNewKeyName('');
    setShowNewKeyForm(false);
  };

  const startGeminiSetup = async () => {
    setIsSettingUpGemini(true);
    setPollingMessage('');
    setFoundApiKey(null);
    
    try {
      const geminiService = GeminiSetupService.getInstance();
      
      // Ensure project name is at least 4 characters
      const projectName = newKeyName.trim().length >= 4 
        ? newKeyName.trim() 
        : `Hades AI Project - ${newKeyName.trim() || 'Default'}`;
      
      const result = await geminiService.setupGeminiAPI(
        projectName,
        updateStepStatus,
        (message: string) => {
          setPollingMessage(message);
          if (message.includes('✅ Found new API key!')) {
            setFoundApiKey(result.apiKey);
            setManualApiKey(result.apiKey);
          }
        }
      );
      
      // Setup completed successfully
      if (result.apiKey && result.apiKey !== 'MANUAL_SETUP_REQUIRED') {
        // API key was found automatically
        const newApiKey: APIKey = {
          id: Date.now().toString(),
          name: newKeyName,
          key: result.apiKey,
          type: 'gemini',
          created: new Date().toISOString().slice(0, 19).replace('T', ' '),
          lastUsed: 'Never',
          status: 'active',
          projectId: result.projectId
        };
        
        setApiKeys([...apiKeys, newApiKey]);
        setGeneratedKey(result.apiKey);
        
        // Keep dialog open for a moment to show success, then close
        setTimeout(() => {
          alert(`✅ Google Cloud project created and API key found automatically!\n\nProject ID: ${result.projectId}\n\nYour Gemini API key has been added to your dashboard.`);
          setShowGeminiSetup(false);
          setIsSettingUpGemini(false);
          setNewKeyName('');
          setPollingMessage('');
          setManualApiKey('');
        }, 2000);
      } else {
        // Manual setup required or timeout reached
        const message = result.apiKey === 'MANUAL_SETUP_REQUIRED' 
          ? `✅ Google Cloud project created successfully!\n\nProject ID: ${result.projectId}\n\nYou can now click the "Open Google AI Studio" button to create your API key.`
          : `⏰ 5-minute polling completed.\n\nProject ID: ${result.projectId}\n\nNo new API key was found. You can manually create one in Google AI Studio.`;
        
        alert(message);
        setIsSettingUpGemini(false);
        setNewKeyName('');
        setPollingMessage('');
      }
      
    } catch (error) {
      console.error('Gemini setup failed:', error);
      updateStepStatus('key', 'error', error instanceof Error ? error.message : 'Setup failed');
      setIsSettingUpGemini(false);
      setPollingMessage('');
    }
  };

  const updateStepStatus = (stepId: string, status: GeminiSetupStep['status'], error?: string) => {
    setGeminiSetupSteps(prev => prev.map(step => 
      step.id === stepId ? { ...step, status, error } : step
    ));
  };

  const openGoogleAIStudio = () => {
    window.open('https://aistudio.google.com/app/apikey', '_blank');
  };

  const openGoogleCloudConsole = () => {
    window.open('https://console.cloud.google.com/apis/library/generativelanguage.googleapis.com', '_blank');
  };

  const openGoogleCloudIAM = () => {
    window.open('https://console.cloud.google.com/iam-admin/iam', '_blank');
  };

  const testOAuthConfig = async () => {
    try {
      const response = await fetch('/api/auth/google/test');
      const data = await response.json();
      console.log('OAuth Configuration Test:', data);
      
      if (data.status === 'ok') {
        alert(`OAuth Configuration Check:\n\n` +
              `Client ID: ${data.config.hasClientId ? '✅ Set' : '❌ Missing'}\n` +
              `Client Secret: ${data.config.hasClientSecret ? '✅ Set' : '❌ Missing'}\n` +
              `NextAuth URL: ${data.config.hasNextAuthUrl ? '✅ Set' : '❌ Missing'}\n` +
              `Public Client ID: ${data.config.hasPublicClientId ? '✅ Set' : '❌ Missing'}\n\n` +
              `Check browser console for full details.`);
      } else {
        alert(`OAuth Configuration Error: ${data.error}`);
      }
    } catch (error) {
      console.error('OAuth test failed:', error);
      alert(`OAuth test failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const revokeAPIKey = (id: string) => {
    setApiKeys(apiKeys.map(key => 
      key.id === id ? { ...key, status: 'inactive' as const } : key
    ));
  };

  const getKeyTypeColor = (type: string) => {
    switch (type) {
      case 'gemini': return 'bg-blue-500';
      case 'hades': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  const getStepIcon = (status: GeminiSetupStep['status']) => {
    switch (status) {
      case 'loading': return <Loader2 className="h-4 w-4 animate-spin text-blue-400" />;
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-400" />;
      case 'error': return <AlertCircle className="h-4 w-4 text-red-400" />;
      default: return <div className="w-4 h-4 rounded-full border-2 border-purple-400/50" />;
    }
  };

  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-purple-200">Initializing Hades Terminal...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="bg-slate-900/90 backdrop-blur-md border-b border-purple-500/30 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2 group">
                <Image
                  src="/logo-h.png"
                  alt="Hades Logo"
                  width={140}
                  height={48}
                />
              </Link>
            </div>

            <div className="flex-1 max-w-lg mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 h-4 w-4" />
                <Input
                  placeholder="Search targets, vulnerabilities..."
                  className="pl-10 bg-slate-900/50 border-purple-400/40 text-white placeholder-purple-300/50 focus:border-purple-300"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="text-purple-300 hover:text-purple-200">
                <Bell className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-purple-300 hover:text-purple-200">
                <Settings className="h-5 w-5" />
              </Button>
              <div className="flex items-center space-x-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={session?.user?.image || ''} />
                  <AvatarFallback className="bg-purple-900 text-purple-200">
                    {session?.user?.name?.charAt(0) || 'U'}
                  </AvatarFallback>
                </Avatar>
                <span className="text-purple-200 text-sm">{session?.user?.name}</span>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => logout()}
                className="text-purple-300 hover:text-purple-200"
              >
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Welcome back, <span className="text-purple-400">{session?.user?.name?.split(' ')[0]}</span>
          </h1>
          <p className="text-purple-200">Your cybersecurity command center is ready for operation.</p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Security metrics will be populated here */}
        </div>

        {/* Dashboard Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-slate-900/60 border border-purple-400/30">
            <TabsTrigger value="overview" className="data-[state=active]:bg-purple-600">Overview</TabsTrigger>
            <TabsTrigger value="statistics" className="data-[state=active]:bg-purple-600">Statistics</TabsTrigger>
            <TabsTrigger value="api-keys" className="data-[state=active]:bg-purple-600">API Keys</TabsTrigger>
            <TabsTrigger value="cli-tool" className="data-[state=active]:bg-purple-600">Download CLI Tool</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="bg-slate-900/60 backdrop-blur-sm border-purple-400/40">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Activity className="h-5 w-5 text-purple-400 mr-2" />
                    System Overview
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-slate-950/50 rounded-lg border border-purple-400/20">
                      <div className="text-2xl font-bold text-purple-400">-</div>
                      <div className="text-sm text-purple-200">Total API Keys</div>
                    </div>
                    <div className="text-center p-4 bg-slate-950/50 rounded-lg border border-purple-400/20">
                      <div className="text-2xl font-bold text-blue-400">-</div>
                      <div className="text-sm text-purple-200">Active Keys</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-900/60 backdrop-blur-sm border-purple-400/40">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Zap className="h-5 w-5 text-purple-400 mr-2" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white h-20 flex-col space-y-2">
                      <Key className="h-6 w-6" />
                      <span>Generate API Key</span>
                    </Button>
                    <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white h-20 flex-col space-y-2">
                      <Settings className="h-6 w-6" />
                      <span>Manage Keys</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="statistics" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="bg-slate-900/60 backdrop-blur-sm border-purple-400/40">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <BarChart3 className="h-5 w-5 text-purple-400 mr-2" />
                    API Key Statistics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-slate-950/50 rounded-lg border border-purple-400/20">
                      <div className="text-2xl font-bold text-purple-400">-</div>
                      <div className="text-sm text-purple-200">Total Keys</div>
                    </div>
                    <div className="text-center p-4 bg-slate-950/50 rounded-lg border border-purple-400/20">
                      <div className="text-2xl font-bold text-blue-400">-</div>
                      <div className="text-sm text-purple-200">Active Keys</div>
                    </div>
                    <div className="text-center p-4 bg-slate-950/50 rounded-lg border border-purple-400/20">
                      <div className="text-2xl font-bold text-green-400">-</div>
                      <div className="text-sm text-purple-200">Hades Keys</div>
                    </div>
                    <div className="text-center p-4 bg-slate-950/50 rounded-lg border border-purple-400/20">
                      <div className="text-2xl font-bold text-orange-400">-</div>
                      <div className="text-sm text-purple-200">Gemini Keys</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-900/60 backdrop-blur-sm border-purple-400/40">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Globe className="h-5 w-5 text-purple-400 mr-2" />
                    API Usage
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-purple-200">API requests this month</span>
                      <span className="text-white font-semibold">-</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-purple-200">Success rate</span>
                      <span className="text-green-400 font-semibold">-</span>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-purple-400/20">
                    <div className="text-sm text-purple-200 mb-2">Monthly usage</div>
                    <Progress value={0} className="h-2" />
                    <div className="text-xs text-purple-300 mt-1">No usage data available</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="api-keys" className="space-y-6">
            <Card className="bg-slate-900/60 backdrop-blur-sm border-purple-400/40">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-white flex items-center">
                      <Key className="h-5 w-5 text-purple-400 mr-2" />
                      API Keys
                    </CardTitle>
                    <CardDescription className="text-purple-200">
                      Manage your API keys for Hades and AI services
                    </CardDescription>
                  </div>
                  <Button 
                    onClick={() => setShowNewKeyForm(true)}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                  >
                    <Key className="h-4 w-4 mr-2" />
                    Generate New Key
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* New Key Form */}
                {showNewKeyForm && (
                  <div className="p-4 bg-slate-950/50 rounded-lg border border-purple-400/20 space-y-4">
                    <h4 className="text-white font-medium">Generate New API Key</h4>
                    <div className="space-y-4">
                      <div className="flex space-x-4">
                        <Input
                          placeholder="Enter key name (e.g., Production API)"
                          value={newKeyName}
                          onChange={(e) => setNewKeyName(e.target.value)}
                          className="bg-slate-900/50 border-purple-400/40 text-white placeholder-purple-300/50"
                        />
                        <label htmlFor="api-key-type" className="sr-only">API Key Type</label>
                        <select
                          id="api-key-type"
                          value={newKeyType}
                          onChange={(e) => setNewKeyType(e.target.value as 'hades' | 'gemini')}
                          className="bg-slate-900/50 border border-purple-400/40 text-white rounded-md px-3 py-2"
                        >
                          <option value="gemini">Gemini API</option>
                          <option value="hades">Hades API</option>
                        </select>
                      </div>
                      
                      {newKeyType === 'gemini' && (
                        <div className="p-3 bg-blue-900/20 border border-blue-500/30 rounded-lg">
                          <div className="flex items-start space-x-2">
                            <Cloud className="h-5 w-5 text-blue-400 mt-0.5" />
                            <div>
                              <p className="text-blue-300 text-sm font-medium">Automated Google Cloud Setup</p>
                              <p className="text-blue-200 text-xs">We&apos;ll automatically create a Google Cloud project, enable billing (optional), then redirect you to Google AI Studio to create your API key.</p>
                              {newKeyName.trim().length > 0 && newKeyName.trim().length < 4 && (
                                <p className="text-yellow-300 text-xs mt-1">⚠️ Project name will be extended to meet Google Cloud requirements (minimum 4 characters)</p>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                      
                      <div className="flex space-x-4">
                        <Button onClick={generateAPIKey} className="bg-purple-600 hover:bg-purple-700">
                          Generate
                        </Button>
                        <Button 
                          variant="outline" 
                          onClick={() => setShowNewKeyForm(false)}
                          className="border-purple-400/50 text-purple-200"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Gemini Setup Progress */}
                {showGeminiSetup && (
                  <div className="p-4 bg-slate-950/50 rounded-lg border border-blue-500/30 space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-white font-medium">Setting up Gemini API</h4>
                      {!isSettingUpGemini && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setShowGeminiSetup(false)}
                          className="border-purple-400/50 text-purple-200"
                        >
                          Close
                        </Button>
                      )}
                    </div>
                    
                    <div className="space-y-3">
                      {geminiSetupSteps.map((step) => (
                        <div key={step.id} className="flex items-start space-x-3 p-3 bg-slate-900/50 rounded-lg">
                          <div className="mt-0.5">
                            {getStepIcon(step.status)}
                          </div>
                          <div className="flex-1">
                            <h5 className="text-white text-sm font-medium">{step.title}</h5>
                            <p className="text-purple-200 text-xs">{step.description}</p>
                            {step.error && (
                              <p className="text-red-300 text-xs mt-1">{step.error}</p>
                            )}
                            {step.id === 'key' && step.status === 'loading' && pollingMessage && (
                              <p className="text-blue-300 text-xs mt-1">{pollingMessage}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {/* Manual API Key Input */}
                    <div className="mt-4 p-4 bg-slate-950/50 rounded-lg border border-purple-400/20">
                      <h4 className="text-white font-medium mb-3 flex items-center">
                        <Key className="h-4 w-4 mr-2" />
                        Manual API Key Entry
                      </h4>
                      <p className="text-purple-200 text-xs mb-3">
                        If the automatic detection doesn&apos;t work, you can manually paste your API key here:
                      </p>
                      <div className="space-y-3">
                        <Input
                          placeholder="Paste your Gemini API key here..."
                          value={manualApiKey}
                          onChange={(e) => setManualApiKey(e.target.value)}
                          className="bg-slate-900/50 border-purple-400/40 text-white placeholder-purple-300/50"
                        />
                        <div className="flex space-x-2">
                          <Button 
                            onClick={() => {
                              if (manualApiKey.trim()) {
                                const newApiKey: APIKey = {
                                  id: Date.now().toString(),
                                  name: newKeyName || 'Manual Gemini API Key',
                                  key: manualApiKey.trim(),
                                  type: 'gemini',
                                  created: new Date().toISOString().slice(0, 19).replace('T', ' '),
                                  lastUsed: 'Never',
                                  status: 'active'
                                };
                                setApiKeys([...apiKeys, newApiKey]);
                                setGeneratedKey(manualApiKey.trim());
                                setShowGeminiSetup(false);
                                setIsSettingUpGemini(false);
                                setNewKeyName('');
                                setPollingMessage('');
                                setManualApiKey('');
                                alert('✅ API key added successfully!');
                              } else {
                                alert('Please enter a valid API key.');
                              }
                            }}
                            className="bg-purple-600 hover:bg-purple-700"
                            disabled={!manualApiKey.trim()}
                          >
                            Add API Key
                          </Button>
                          <Button 
                            variant="outline" 
                            onClick={() => setManualApiKey('')}
                            className="border-purple-400/50 text-purple-200"
                          >
                            Clear
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-purple-400/20">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={openGoogleAIStudio}
                        className="border-blue-400/50 text-blue-200"
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Open Google AI Studio
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={openGoogleCloudConsole}
                        className="border-purple-400/50 text-purple-200"
                      >
                        <Globe className="h-4 w-4 mr-2" />
                        Open Google Cloud Console
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={testOAuthConfig}
                        className="border-purple-400/50 text-purple-200"
                      >
                        <User className="h-4 w-4 mr-2" />
                        Test OAuth Config
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={openGoogleCloudIAM}
                        className="border-purple-400/50 text-purple-200"
                      >
                        <Settings className="h-4 w-4 mr-2" />
                        Open IAM Settings
                      </Button>
                    </div>
                  </div>
                )}

                {/* Generated Key Display */}
                {generatedKey && (
                  <div className="p-4 bg-green-900/20 border border-green-500/30 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-green-400 font-medium mb-2">New API Key Generated</h4>
                        <p className="text-green-200 text-sm mb-2">Save this key securely - you won&apos;t be able to see it again!</p>
                        <code className="text-green-300 bg-slate-950/50 px-3 py-1 rounded text-sm">{generatedKey}</code>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => copyToClipboard(generatedKey)}
                        className="border-green-500/50 text-green-300 hover:bg-green-900/30"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}

                {/* API Keys List */}
                <div className="space-y-3">
                  {apiKeys.map((apiKey) => (
                    <div key={apiKey.id} className="p-4 bg-slate-950/50 rounded-lg border border-purple-400/20">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h4 className="text-white font-medium">{apiKey.name}</h4>
                            <Badge className={`${getKeyTypeColor(apiKey.type)} text-white text-xs`}>
                              {apiKey.type}
                            </Badge>
                            <Badge className={`${apiKey.status === 'active' ? 'bg-green-500' : 'bg-gray-500'} text-white text-xs`}>
                              {apiKey.status}
                            </Badge>
                          </div>
                          <div className="grid grid-cols-3 gap-4 text-sm">
                            <div>
                              <p className="text-purple-400">Key</p>
                              <code className="text-purple-200 text-xs">{apiKey.key.substring(0, 20)}...</code>
                            </div>
                            <div>
                              <p className="text-purple-400">Created</p>
                              <p className="text-purple-200">{apiKey.created}</p>
                            </div>
                            <div>
                              <p className="text-purple-400">Last Used</p>
                              <p className="text-purple-200">{apiKey.lastUsed}</p>
                            </div>
                          </div>
                          {apiKey.projectId && (
                            <div className="mt-2">
                              <p className="text-purple-400 text-xs">Project ID: <span className="text-purple-200">{apiKey.projectId}</span></p>
                            </div>
                          )}
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => copyToClipboard(apiKey.key)}
                            className="text-purple-300 hover:text-purple-200"
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => revokeAPIKey(apiKey.id)}
                            className="text-red-300 hover:text-red-200"
                          >
                            <Lock className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* API Documentation */}
                <div className="mt-6 p-4 bg-slate-950/30 rounded-lg border border-purple-400/20">
                  <h4 className="text-white font-medium mb-3 flex items-center">
                    <Terminal className="h-4 w-4 mr-2" />
                    API Usage Examples
                  </h4>
                  <div className="space-y-4">
                    <div>
                      <p className="text-purple-300 text-sm mb-2">Hades API:</p>
                      <div className="bg-slate-950/80 rounded p-3 border border-purple-400/30">
                        <code className="text-purple-300 text-xs">
                          curl -H &quot;Authorization: Bearer YOUR_HADES_KEY&quot; https://api.hades.security/v1/scan
                        </code>
                      </div>
                    </div>
                    <div>
                      <p className="text-blue-300 text-sm mb-2">Gemini API:</p>
                      <div className="bg-slate-950/80 rounded p-3 border border-blue-400/30">
                        <code className="text-blue-300 text-xs">
                          curl -H &quot;Authorization: Bearer YOUR_GEMINI_KEY&quot; https://generativelanguage.googleapis.com/v1/models
                        </code>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="cli-tool" className="space-y-6">
            <Card className="bg-slate-900/60 backdrop-blur-sm border-purple-400/40">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Terminal className="h-5 w-5 text-purple-400 mr-2" />
                  Download CLI Tool
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-purple-200 text-sm">
                  Download the Hades CLI tool to manage your cybersecurity tasks directly from your terminal. Choose your operating system below:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Windows Download */}
                  <div className="p-6 bg-slate-950/50 rounded-lg border border-purple-400/20 text-center hover:shadow-lg hover:shadow-purple-500/20 transition-shadow">
                    <div className="flex justify-center mb-4">
                      <Image
                        src="/windows.png"
                        alt="Windows Logo"
                        width={48}
                        height={48}
                        className="h-12 w-12"
                      />
                    </div>
                    <h4 className="text-white font-semibold mb-2">Windows</h4>
                    <p className="text-purple-300 text-xs mb-4">Compatible with Windows 10 and above</p>
                    <Button
                      className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white w-full"
                      onClick={() => window.open('/downloads/hades-cli-windows.exe', '_blank')}
                    >
                      Download
                    </Button>
                  </div>

                  {/* macOS Download */}
                  <div className="p-6 bg-slate-950/50 rounded-lg border border-purple-400/20 text-center hover:shadow-lg hover:shadow-purple-500/20 transition-shadow">
                    <div className="flex justify-center mb-4">
                      <Image
                        src="/mac.png"
                        alt="macOS Logo"
                        width={48}
                        height={48}
                        className="h-12 w-12"
                      />
                    </div>
                    <h4 className="text-white font-semibold mb-2">macOS</h4>
                    <p className="text-purple-300 text-xs mb-4">Compatible with macOS 11.0 and above</p>
                    <Button
                      className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white w-full"
                      onClick={() => window.open('/downloads/hades-cli-macos.zip', '_blank')}
                    >
                      Download
                    </Button>
                  </div>

                  {/* Linux Download */}
                  <div className="p-6 bg-slate-950/50 rounded-lg border border-purple-400/20 text-center hover:shadow-lg hover:shadow-purple-500/20 transition-shadow">
                    <div className="flex justify-center mb-4">
                      <Image
                        src="/linux.png"
                        alt="Linux Logo"
                        width={48}
                        height={48}
                        className="h-12 w-12"
                      />
                    </div>
                    <h4 className="text-white font-semibold mb-2">Linux</h4>
                    <p className="text-purple-300 text-xs mb-4">Compatible with major Linux distributions</p>
                    <Button
                      className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white w-full"
                      onClick={() => window.open('/downloads/hades-cli-linux.tar.gz', '_blank')}
                    >
                      Download
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}