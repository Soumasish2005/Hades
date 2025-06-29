'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { 
  Activity,
  BarChart3,
  Globe,
  Terminal,
  Zap,
  Settings,
  Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import Image from 'next/image';

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [apiKeyName, setApiKeyName] = useState('');
  const [apiKeys, setApiKeys] = useState<string[]>([]);

  useEffect(() => {
    if (status === 'loading') return;

    if (!session) {
      router.push('/signin');
      return;
    }

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [session, status, router]);

  const handleAddApiKey = () => {
    if (apiKeyName.trim()) {
      setApiKeys([...apiKeys, apiKeyName]);
      setApiKeyName('');
    }
  };

  const redirectToAIStudio = () => {
    window.open('https://aistudio.google.com/app/apikey', '_blank');
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
            {/* Left Section: Logo */}
            <div className="flex items-center space-x-4">
              <Image
                src="/logo-h.png"
                alt="Hades Logo"
                width={140}
                height={48}
              />
            </div>

            {/* Right Section: User Details, Settings, Logout */}
            <div className="flex items-center space-x-6">
              {/* User Details */}
              <div className="flex items-center space-x-4">
                {session?.user?.image && (
                  <Image
                    src={session.user.image}
                    alt={`${session.user.name}'s Avatar`}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                )}
                <div className="text-right">
                  <p className="text-white font-medium">{session?.user?.name}</p>
                  <p className="text-purple-400 text-sm">{session?.user?.email}</p>
                </div>
              </div>

              {/* Settings Icon */}
              <button
                className="p-2 rounded-full bg-slate-800 hover:bg-purple-700 transition-colors duration-200"
                onClick={() => router.push('/settings')}
                title="Settings"
                aria-label="Settings"
              >
                <Settings className="h-6 w-6 text-purple-400 hover:text-white transition-colors duration-200" />
              </button>

              {/* Logout Button */}
              <button
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md"
                onClick={() => {
                  // Add logout functionality here
                  router.push('/signin');
                }}
              >
                Logout
              </button>
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

        {/* Dashboard Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-slate-900/60 border border-purple-400/30">
            <TabsTrigger value="overview" className="data-[state=active]:bg-purple-600">Overview</TabsTrigger>
            <TabsTrigger value="statistics" className="data-[state=active]:bg-purple-600">Statistics</TabsTrigger>
            <TabsTrigger value="cli-tool" className="data-[state=active]:bg-purple-600">Download CLI Tool</TabsTrigger>
            <TabsTrigger value="api-generation" className="data-[state=active]:bg-purple-600">API Generation</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
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
                      <Terminal className="h-6 w-6" />
                      <span>Generate API Key</span>
                    </Button>
                    <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white h-20 flex-col space-y-2">
                      <Zap className="h-6 w-6" />
                      <span>Manage Keys</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Statistics Tab */}
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
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* CLI Tool Tab */}
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
                        src="/icons/mac.png"
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

          {/* API Generation Tab */}
          <TabsContent value="api-generation" className="space-y-6">
            <Card className="bg-slate-900/60 backdrop-blur-sm border-purple-400/40">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Zap className="h-5 w-5 text-purple-400 mr-2" />
                  API Generation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  placeholder="Enter API Key Name"
                  value={apiKeyName}
                  onChange={(e) => setApiKeyName(e.target.value)}
                  className="bg-slate-900/50 border-purple-400/40 text-white placeholder-purple-300/50"
                />
                <div className="flex space-x-4">
                  <Button
                    onClick={handleAddApiKey}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    Add to List
                  </Button>
                  <Button
                    onClick={redirectToAIStudio}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                  >
                    Open AI Studio
                  </Button>
                </div>
                <div className="mt-4">
                  <h4 className="text-white font-medium mb-2">API Keys List:</h4>
                  <ul className="space-y-2">
                    {apiKeys.map((key, index) => (
                      <li
                        key={index}
                        className="flex items-center justify-between bg-slate-950/50 p-4 rounded-lg border border-purple-400/20"
                      >
                        <span className="text-purple-300 font-mono">**** **** **** {key.slice(-4)}</span>
                        <button
                          className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded-md text-sm"
                          onClick={() => navigator.clipboard.writeText(key)}
                        >
                          Copy
                        </button>
                      </li>
                  <ul className="list-disc list-inside text-purple-200">
                    {apiKeys.map((key, index) => (
                      <li key={index}>{key}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}