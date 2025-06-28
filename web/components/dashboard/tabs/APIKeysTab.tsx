'use client';

import { useState } from 'react';
import { Key, Copy, Lock, Terminal, ExternalLink, Globe, User, Settings, Cloud } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

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

export default function APIKeysTab() {
  const [apiKeys, setApiKeys] = useState<APIKey[]>([]);
  const [showNewKeyForm, setShowNewKeyForm] = useState(false);
  const [showGeminiSetup, setShowGeminiSetup] = useState(false);
  const [newKeyName, setNewKeyName] = useState('');
  const [newKeyType, setNewKeyType] = useState<'hades' | 'gemini'>('hades');
  const [generatedKey, setGeneratedKey] = useState<string | null>(null);
  const [manualApiKey, setManualApiKey] = useState<string>('');

  const generateAPIKey = () => {
    if (!newKeyName.trim()) return;

    if (newKeyType === 'gemini') {
      setShowGeminiSetup(true);
      setShowNewKeyForm(false);
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
      status: 'active',
    };

    setApiKeys([...apiKeys, newApiKey]);
    setGeneratedKey(newKey);
    setNewKeyName('');
    setShowNewKeyForm(false);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('API Key copied to clipboard!');
  };

  const revokeAPIKey = (id: string) => {
    setApiKeys(apiKeys.map((key) => (key.id === id ? { ...key, status: 'inactive' } : key)));
  };

  const getKeyTypeColor = (type: string) => {
    switch (type) {
      case 'gemini':
        return 'bg-blue-500';
      case 'hades':
        return 'bg-purple-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white mb-6">API Keys</h1>
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
                  <label htmlFor="apiKeyType" className="sr-only">
                    API Key Type
                  </label>
                  <select
                    id="apiKeyType"
                    value={newKeyType}
                    onChange={(e) => setNewKeyType(e.target.value as 'hades' | 'gemini')}
                    className="bg-slate-900/50 border border-purple-400/40 text-white rounded-md px-3 py-2"
                  >
                    <option value="hades">Hades API</option>
                    <option value="gemini">Gemini AI</option>
                  </select>
                </div>
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

          {/* Generated Key Display */}
          {generatedKey && (
            <div className="p-4 bg-green-900/20 border border-green-500/30 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-green-400 font-medium mb-2">New API Key Generated</h4>
                  <p className="text-green-200 text-sm mb-2">
                    Save this key securely - you won&apos;t be able to see it again!
                  </p>
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
                      <Badge className={`${getKeyTypeColor(apiKey.type)} text-white text-xs`}>{apiKey.type}</Badge>
                      <Badge
                        className={`${
                          apiKey.status === 'active' ? 'bg-green-500' : 'bg-gray-500'
                        } text-white text-xs`}
                      >
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
        </CardContent>
      </Card>
    </div>
  );
}