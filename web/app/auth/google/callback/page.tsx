'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function GoogleAuthCallback() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'error' | 'success'>('loading');
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    const code = searchParams.get('code');
    const error = searchParams.get('error');

    if (error) {
      console.error('OAuth error received:', error);
      setStatus('error');
      setErrorMessage(`OAuth error: ${error}`);
      
      // Send error to parent window
      window.opener?.postMessage({
        type: 'GOOGLE_AUTH_ERROR',
        error: error
      }, window.location.origin);
      
      // Close after a delay to show error
      setTimeout(() => window.close(), 3000);
      return;
    }

    if (code) {
      console.log('Authorization code received, exchanging for token...');
      // Exchange code for access token
      exchangeCodeForToken(code);
    } else {
      console.error('No authorization code received');
      setStatus('error');
      setErrorMessage('No authorization code received from Google');
      
      window.opener?.postMessage({
        type: 'GOOGLE_AUTH_ERROR',
        error: 'No authorization code received'
      }, window.location.origin);
      
      setTimeout(() => window.close(), 3000);
    }
  }, [searchParams]);

  const exchangeCodeForToken = async (code: string) => {
    try {
      console.log('Making token exchange request...');
      
      const response = await fetch('/api/auth/google/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code })
      });

      console.log('Token exchange response status:', response.status);

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Token exchange failed:', errorData);
        
        const errorMsg = errorData.error || 'Failed to exchange code for token';
        setStatus('error');
        setErrorMessage(errorMsg);
        
        throw new Error(errorMsg);
      }

      const data = await response.json();
      console.log('Token exchange successful, access token received');
      
      setStatus('success');
      
      // Send success to parent window
      window.opener?.postMessage({
        type: 'GOOGLE_AUTH_SUCCESS',
        accessToken: data.access_token
      }, window.location.origin);
      
      // Close after showing success
      setTimeout(() => window.close(), 1000);
    } catch (error) {
      console.error('Token exchange error:', error);
      
      const errorMsg = error instanceof Error ? error.message : 'Unknown error';
      setStatus('error');
      setErrorMessage(errorMsg);
      
      window.opener?.postMessage({
        type: 'GOOGLE_AUTH_ERROR',
        error: errorMsg
      }, window.location.origin);
      
      // Close after showing error
      setTimeout(() => window.close(), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
      <div className="text-center">
        {status === 'loading' && (
          <>
            <div className="w-16 h-16 border-4 border-purple-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-purple-200">Completing authentication...</p>
          </>
        )}
        
        {status === 'success' && (
          <>
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-green-200">Authentication successful!</p>
            <p className="text-purple-300 text-sm mt-2">Closing window...</p>
          </>
        )}
        
        {status === 'error' && (
          <>
            <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <p className="text-red-200">Authentication failed</p>
            <p className="text-red-300 text-sm mt-2 max-w-md">{errorMessage}</p>
            <p className="text-purple-300 text-xs mt-4">Check the console for more details</p>
          </>
        )}
      </div>
    </div>
  );
}