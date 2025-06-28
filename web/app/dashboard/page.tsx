// 'use client';

// import { useSession } from 'next-auth/react';
// import { useRouter } from 'next/navigation';
// import { useEffect, useState } from 'react';
// import { 
//   Shield, 
//   Terminal, 
//   Activity, 
//   AlertTriangle, 
//   CheckCircle, 
//   Clock, 
//   Target,
//   Zap,
//   Brain,
//   Server,
//   Eye,
//   Settings,
//   LogOut,
//   Bell,
//   Search,
//   Filter,
//   Download,
//   Play,
//   Pause,
//   MoreVertical
// } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Input } from '@/components/ui/input';
// import { Badge } from '@/components/ui/badge';
// import { Progress } from '@/components/ui/progress';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
// import { logout } from '@/lib/actions/auth';

// interface SecurityMetric {
//   label: string;
//   value: string;
//   change: string;
//   trend: 'up' | 'down' | 'stable';
//   icon: any;
//   color: string;
// }

// interface ActiveScan {
//   id: string;
//   target: string;
//   type: string;
//   status: 'running' | 'completed' | 'failed';
//   progress: number;
//   startTime: string;
//   vulnerabilities: number;
// }

// interface Vulnerability {
//   id: string;
//   title: string;
//   severity: 'critical' | 'high' | 'medium' | 'low';
//   target: string;
//   discovered: string;
//   status: 'new' | 'investigating' | 'resolved';
// }

// export default function Dashboard() {
//   const { data: session, status } = useSession();
//   const router = useRouter();
//   const [activeScans, setActiveScans] = useState<ActiveScan[]>([]);
//   const [vulnerabilities, setVulnerabilities] = useState<Vulnerability[]>([]);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     if (status === 'loading') return;
    
//     if (!session) {
//       router.push('/signin');
//       return;
//     }

//     // Simulate loading data
//     setTimeout(() => {
//       setActiveScans([
//         {
//           id: '1',
//           target: '192.168.1.0/24',
//           type: 'Network Scan',
//           status: 'running',
//           progress: 67,
//           startTime: '2024-01-15 14:30:00',
//           vulnerabilities: 12
//         },
//         {
//           id: '2',
//           target: 'api.example.com',
//           type: 'Web Application',
//           status: 'completed',
//           progress: 100,
//           startTime: '2024-01-15 13:15:00',
//           vulnerabilities: 8
//         },
//         {
//           id: '3',
//           target: 'mail.company.com',
//           type: 'Service Enumeration',
//           status: 'running',
//           progress: 23,
//           startTime: '2024-01-15 15:00:00',
//           vulnerabilities: 3
//         }
//       ]);

//       setVulnerabilities([
//         {
//           id: '1',
//           title: 'SQL Injection in login form',
//           severity: 'critical',
//           target: 'api.example.com',
//           discovered: '2024-01-15 13:45:00',
//           status: 'new'
//         },
//         {
//           id: '2',
//           title: 'Unencrypted admin panel',
//           severity: 'high',
//           target: '192.168.1.100',
//           discovered: '2024-01-15 14:20:00',
//           status: 'investigating'
//         },
//         {
//           id: '3',
//           title: 'Outdated SSL certificate',
//           severity: 'medium',
//           target: 'mail.company.com',
//           discovered: '2024-01-15 12:30:00',
//           status: 'resolved'
//         }
//       ]);

//       setIsLoading(false);
//     }, 1000);
//   }, [session, status, router]);

//   const securityMetrics: SecurityMetric[] = [
//     {
//       label: 'Active Threats',
//       value: '23',
//       change: '+12%',
//       trend: 'up',
//       icon: AlertTriangle,
//       color: 'text-red-400'
//     },
//     {
//       label: 'Vulnerabilities Found',
//       value: '156',
//       change: '+8%',
//       trend: 'up',
//       icon: Target,
//       color: 'text-orange-400'
//     },
//     {
//       label: 'Systems Secured',
//       value: '1,247',
//       change: '+15%',
//       trend: 'up',
//       icon: Shield,
//       color: 'text-green-400'
//     },
//     {
//       label: 'Scan Success Rate',
//       value: '98.7%',
//       change: '+2.1%',
//       trend: 'up',
//       icon: CheckCircle,
//       color: 'text-blue-400'
//     }
//   ];

//   const getSeverityColor = (severity: string) => {
//     switch (severity) {
//       case 'critical': return 'bg-red-500';
//       case 'high': return 'bg-orange-500';
//       case 'medium': return 'bg-yellow-500';
//       case 'low': return 'bg-blue-500';
//       default: return 'bg-gray-500';
//     }
//   };

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case 'running': return 'bg-blue-500';
//       case 'completed': return 'bg-green-500';
//       case 'failed': return 'bg-red-500';
//       default: return 'bg-gray-500';
//     }
//   };

//   if (status === 'loading' || isLoading) {
//     return (
//       <div className="min-h-screen section-bg flex items-center justify-center">
//         <div className="text-center">
//           <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
//           <p className="text-blue-200">Initializing Hades Terminal...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen section-bg">
//       {/* Header */}
//       <header className="bg-slate-900/90 backdrop-blur-md border-b border-blue-500/30 sticky top-0 z-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-16">
//             {/* Logo */}
//             <div className="flex items-center space-x-4">
//               <Shield className="h-8 w-8 text-blue-400 glow-blue" />
//               <span className="text-xl font-bold cyber-text">Hades Terminal</span>
//             </div>

//             {/* Search */}
//             <div className="flex-1 max-w-lg mx-8">
//               <div className="relative">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 h-4 w-4" />
//                 <Input
//                   placeholder="Search targets, vulnerabilities..."
//                   className="pl-10 bg-slate-900/50 border-blue-400/40 text-white placeholder-blue-300/50 focus:border-blue-300"
//                 />
//               </div>
//             </div>

//             {/* User Menu */}
//             <div className="flex items-center space-x-4">
//               <Button variant="ghost" size="sm" className="text-blue-300 hover:text-blue-200">
//                 <Bell className="h-5 w-5" />
//               </Button>
//               <Button variant="ghost" size="sm" className="text-blue-300 hover:text-blue-200">
//                 <Settings className="h-5 w-5" />
//               </Button>
//               <div className="flex items-center space-x-3">
//                 <Avatar className="h-8 w-8">
//                   <AvatarImage src={session?.user?.image || ''} />
//                   <AvatarFallback className="bg-blue-900 text-blue-200">
//                     {session?.user?.name?.charAt(0) || 'U'}
//                   </AvatarFallback>
//                 </Avatar>
//                 <span className="text-blue-200 text-sm">{session?.user?.name}</span>
//               </div>
//               <Button 
//                 variant="ghost" 
//                 size="sm" 
//                 onClick={() => logout()}
//                 className="text-blue-300 hover:text-blue-200"
//               >
//                 <LogOut className="h-5 w-5" />
//               </Button>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Welcome Section */}
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-white mb-2">
//             Welcome back, <span className="cyber-text">{session?.user?.name?.split(' ')[0]}</span>
//           </h1>
//           <p className="text-blue-200">Your cybersecurity command center is ready for operation.</p>
//         </div>

//         {/* Metrics Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//           {securityMetrics.map((metric, index) => (
//             <Card key={index} className="bg-slate-900/60 backdrop-blur-sm border-blue-400/40 hover:border-blue-300/50 transition-colors">
//               <CardContent className="p-6">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-blue-200 text-sm font-medium">{metric.label}</p>
//                     <p className="text-2xl font-bold text-white">{metric.value}</p>
//                     <p className={`text-sm ${metric.color}`}>{metric.change} from last week</p>
//                   </div>
//                   <div className={`w-12 h-12 rounded-lg bg-slate-900/60 flex items-center justify-center border border-blue-400/30`}>
//                     <metric.icon className={`h-6 w-6 ${metric.color}`} />
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           ))}
//         </div>

//         {/* Main Dashboard Tabs */}
//         <Tabs defaultValue="overview" className="space-y-6">
//           <TabsList className="bg-slate-900/60 border border-blue-400/30">
//             <TabsTrigger value="overview" className="data-[state=active]:bg-blue-600">Overview</TabsTrigger>
//             <TabsTrigger value="scans" className="data-[state=active]:bg-blue-600">Active Scans</TabsTrigger>
//             <TabsTrigger value="vulnerabilities" className="data-[state=active]:bg-blue-600">Vulnerabilities</TabsTrigger>
//             <TabsTrigger value="reports" className="data-[state=active]:bg-blue-600">Reports</TabsTrigger>
//           </TabsList>

//           <TabsContent value="overview" className="space-y-6">
//             <div className="grid lg:grid-cols-2 gap-6">
//               {/* Active Scans Summary */}
//               <Card className="bg-slate-900/60 backdrop-blur-sm border-blue-400/40">
//                 <CardHeader>
//                   <CardTitle className="text-white flex items-center">
//                     <Activity className="h-5 w-5 text-blue-400 mr-2" />
//                     Active Scans
//                   </CardTitle>
//                   <CardDescription className="text-blue-200">
//                     Currently running security assessments
//                   </CardDescription>
//                 </CardHeader>
//                 <CardContent className="space-y-4">
//                   {activeScans.slice(0, 3).map((scan) => (
//                     <div key={scan.id} className="flex items-center justify-between p-3 bg-slate-950/50 rounded-lg border border-blue-400/20">
//                       <div className="flex-1">
//                         <div className="flex items-center space-x-2 mb-1">
//                           <span className="text-white font-medium">{scan.target}</span>
//                           <Badge className={`${getStatusColor(scan.status)} text-white text-xs`}>
//                             {scan.status}
//                           </Badge>
//                         </div>
//                         <p className="text-blue-200 text-sm">{scan.type}</p>
//                         <Progress value={scan.progress} className="mt-2 h-2" />
//                       </div>
//                       <div className="text-right ml-4">
//                         <p className="text-blue-300 text-sm">{scan.progress}%</p>
//                         <p className="text-blue-400 text-xs">{scan.vulnerabilities} found</p>
//                       </div>
//                     </div>
//                   ))}
//                 </CardContent>
//               </Card>

//               {/* Recent Vulnerabilities */}
//               <Card className="bg-slate-900/60 backdrop-blur-sm border-blue-400/40">
//                 <CardHeader>
//                   <CardTitle className="text-white flex items-center">
//                     <AlertTriangle className="h-5 w-5 text-orange-400 mr-2" />
//                     Recent Vulnerabilities
//                   </CardTitle>
//                   <CardDescription className="text-blue-200">
//                     Latest security findings requiring attention
//                   </CardDescription>
//                 </CardHeader>
//                 <CardContent className="space-y-4">
//                   {vulnerabilities.slice(0, 3).map((vuln) => (
//                     <div key={vuln.id} className="flex items-center justify-between p-3 bg-slate-950/50 rounded-lg border border-blue-400/20">
//                       <div className="flex-1">
//                         <div className="flex items-center space-x-2 mb-1">
//                           <span className="text-white font-medium text-sm">{vuln.title}</span>
//                           <Badge className={`${getSeverityColor(vuln.severity)} text-white text-xs`}>
//                             {vuln.severity}
//                           </Badge>
//                         </div>
//                         <p className="text-blue-200 text-xs">{vuln.target}</p>
//                         <p className="text-blue-400 text-xs">{vuln.discovered}</p>
//                       </div>
//                       <Button variant="ghost" size="sm" className="text-blue-300 hover:text-blue-200">
//                         <Eye className="h-4 w-4" />
//                       </Button>
//                     </div>
//                   ))}
//                 </CardContent>
//               </Card>
//             </div>

//             {/* Quick Actions */}
//             <Card className="bg-slate-900/60 backdrop-blur-sm border-blue-400/40">
//               <CardHeader>
//                 <CardTitle className="text-white flex items-center">
//                   <Zap className="h-5 w-5 text-purple-400 mr-2" />
//                   Quick Actions
//                 </CardTitle>
//                 <CardDescription className="text-blue-200">
//                   Launch common security operations
//                 </CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                   <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white h-20 flex-col space-y-2">
//                     <Terminal className="h-6 w-6" />
//                     <span>Network Scan</span>
//                   </Button>
//                   <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white h-20 flex-col space-y-2">
//                     <Brain className="h-6 w-6" />
//                     <span>AI Analysis</span>
//                   </Button>
//                   <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white h-20 flex-col space-y-2">
//                     <Server className="h-6 w-6" />
//                     <span>Web App Test</span>
//                   </Button>
//                   <Button className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white h-20 flex-col space-y-2">
//                     <Shield className="h-6 w-6" />
//                     <span>Generate Report</span>
//                   </Button>
//                 </div>
//               </CardContent>
//             </Card>
//           </TabsContent>

//           <TabsContent value="scans" className="space-y-6">
//             <Card className="bg-slate-900/60 backdrop-blur-sm border-blue-400/40">
//               <CardHeader>
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <CardTitle className="text-white">Active Security Scans</CardTitle>
//                     <CardDescription className="text-blue-200">
//                       Monitor and manage ongoing security assessments
//                     </CardDescription>
//                   </div>
//                   <div className="flex space-x-2">
//                     <Button variant="outline" size="sm" className="border-blue-400/50 text-blue-200">
//                       <Filter className="h-4 w-4 mr-2" />
//                       Filter
//                     </Button>
//                     <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
//                       <Play className="h-4 w-4 mr-2" />
//                       New Scan
//                     </Button>
//                   </div>
//                 </div>
//               </CardHeader>
//               <CardContent>
//                 <div className="space-y-4">
//                   {activeScans.map((scan) => (
//                     <div key={scan.id} className="p-4 bg-slate-950/50 rounded-lg border border-blue-400/20">
//                       <div className="flex items-center justify-between mb-3">
//                         <div className="flex items-center space-x-3">
//                           <div className={`w-3 h-3 rounded-full ${getStatusColor(scan.status)}`}></div>
//                           <span className="text-white font-medium">{scan.target}</span>
//                           <Badge variant="outline" className="border-blue-400/50 text-blue-200">
//                             {scan.type}
//                           </Badge>
//                         </div>
//                         <div className="flex items-center space-x-2">
//                           <Button variant="ghost" size="sm" className="text-blue-300 hover:text-blue-200">
//                             {scan.status === 'running' ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
//                           </Button>
//                           <Button variant="ghost" size="sm" className="text-blue-300 hover:text-blue-200">
//                             <MoreVertical className="h-4 w-4" />
//                           </Button>
//                         </div>
//                       </div>
//                       <div className="grid grid-cols-4 gap-4 text-sm">
//                         <div>
//                           <p className="text-blue-400">Progress</p>
//                           <div className="flex items-center space-x-2">
//                             <Progress value={scan.progress} className="flex-1 h-2" />
//                             <span className="text-blue-200">{scan.progress}%</span>
//                           </div>
//                         </div>
//                         <div>
//                           <p className="text-blue-400">Started</p>
//                           <p className="text-blue-200">{scan.startTime}</p>
//                         </div>
//                         <div>
//                           <p className="text-blue-400">Vulnerabilities</p>
//                           <p className="text-blue-200">{scan.vulnerabilities} found</p>
//                         </div>
//                         <div>
//                           <p className="text-blue-400">Status</p>
//                           <p className="text-blue-200 capitalize">{scan.status}</p>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </CardContent>
//             </Card>
//           </TabsContent>

//           <TabsContent value="vulnerabilities" className="space-y-6">
//             <Card className="bg-slate-900/60 backdrop-blur-sm border-blue-400/40">
//               <CardHeader>
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <CardTitle className="text-white">Vulnerability Management</CardTitle>
//                     <CardDescription className="text-blue-200">
//                       Track and remediate security vulnerabilities
//                     </CardDescription>
//                   </div>
//                   <div className="flex space-x-2">
//                     <Button variant="outline" size="sm" className="border-blue-400/50 text-blue-200">
//                       <Download className="h-4 w-4 mr-2" />
//                       Export
//                     </Button>
//                     <Button variant="outline" size="sm" className="border-blue-400/50 text-blue-200">
//                       <Filter className="h-4 w-4 mr-2" />
//                       Filter
//                     </Button>
//                   </div>
//                 </div>
//               </CardHeader>
//               <CardContent>
//                 <div className="space-y-4">
//                   {vulnerabilities.map((vuln) => (
//                     <div key={vuln.id} className="p-4 bg-slate-950/50 rounded-lg border border-blue-400/20">
//                       <div className="flex items-center justify-between mb-3">
//                         <div className="flex items-center space-x-3">
//                           <Badge className={`${getSeverityColor(vuln.severity)} text-white`}>
//                             {vuln.severity}
//                           </Badge>
//                           <span className="text-white font-medium">{vuln.title}</span>
//                         </div>
//                         <div className="flex items-center space-x-2">
//                           <Badge variant="outline" className="border-blue-400/50 text-blue-200">
//                             {vuln.status}
//                           </Badge>
//                           <Button variant="ghost" size="sm" className="text-blue-300 hover:text-blue-200">
//                             <Eye className="h-4 w-4" />
//                           </Button>
//                         </div>
//                       </div>
//                       <div className="grid grid-cols-3 gap-4 text-sm">
//                         <div>
//                           <p className="text-blue-400">Target</p>
//                           <p className="text-blue-200">{vuln.target}</p>
//                         </div>
//                         <div>
//                           <p className="text-blue-400">Discovered</p>
//                           <p className="text-blue-200">{vuln.discovered}</p>
//                         </div>
//                         <div>
//                           <p className="text-blue-400">Status</p>
//                           <p className="text-blue-200 capitalize">{vuln.status}</p>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </CardContent>
//             </Card>
//           </TabsContent>

//           <TabsContent value="reports" className="space-y-6">
//             <Card className="bg-slate-900/60 backdrop-blur-sm border-blue-400/40">
//               <CardHeader>
//                 <CardTitle className="text-white">Security Reports</CardTitle>
//                 <CardDescription className="text-blue-200">
//                   Generate and download comprehensive security reports
//                 </CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <div className="text-center py-12">
//                   <Shield className="h-16 w-16 text-blue-400 mx-auto mb-4" />
//                   <h3 className="text-xl font-semibold text-white mb-2">Reports Coming Soon</h3>
//                   <p className="text-blue-200 mb-6">Advanced reporting features are currently in development.</p>
//                   <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
//                     Request Early Access
//                   </Button>
//                 </div>
//               </CardContent>
//             </Card>
//           </TabsContent>
//         </Tabs>
//       </main>
//     </div>
//   );
// }

'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { 
  Shield, 
  Terminal, 
  Activity, 
  AlertTriangle, 
  CheckCircle, 
  Target,
  Zap,
  Brain,
  Server,
  Eye,
  Settings,
  LogOut,
  Bell,
  Search,
  Key,
  Copy,
  Lock,
  TrendingUp,
  TrendingDown,
  BarChart3,
  Globe
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { logout } from '@/lib/actions/auth';

interface SecurityMetric {
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: any;
  color: string;
}

interface APIKey {
  id: string;
  name: string;
  key: string;
  created: string;
  lastUsed: string;
  status: 'active' | 'inactive';
}

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [apiKeys, setApiKeys] = useState<APIKey[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showNewKeyForm, setShowNewKeyForm] = useState(false);
  const [newKeyName, setNewKeyName] = useState('');
  const [generatedKey, setGeneratedKey] = useState<string | null>(null);

  useEffect(() => {
    if (status === 'loading') return;
    
    if (!session) {
      router.push('/signin');
      return;
    }

    // Simulate loading data
    setTimeout(() => {
      setApiKeys([
        {
          id: '1',
          name: 'Production API',
          key: 'hds_live_sk_1234567890abcdef',
          created: '2024-01-10 09:30:00',
          lastUsed: '2024-01-15 14:22:00',
          status: 'active'
        },
        {
          id: '2',
          name: 'Development API',
          key: 'hds_test_sk_abcdef1234567890',
          created: '2024-01-05 16:45:00',
          lastUsed: '2024-01-14 11:15:00',
          status: 'active'
        }
      ]);
      setIsLoading(false);
    }, 1000);
  }, [session, status, router]);

  const securityMetrics: SecurityMetric[] = [
    {
      label: 'Active Threats',
      value: '23',
      change: '+12%',
      trend: 'up',
      icon: AlertTriangle,
      color: 'text-red-400'
    },
    {
      label: 'Vulnerabilities Found',
      value: '156',
      change: '+8%',
      trend: 'up',
      icon: Target,
      color: 'text-orange-400'
    },
    {
      label: 'Systems Secured',
      value: '1,247',
      change: '+15%',
      trend: 'up',
      icon: Shield,
      color: 'text-green-400'
    },
    {
      label: 'Scan Success Rate',
      value: '98.7%',
      change: '+2.1%',
      trend: 'up',
      icon: CheckCircle,
      color: 'text-blue-400'
    }
  ];

  const generateAPIKey = () => {
    if (!newKeyName.trim()) return;
    
    const newKey = `hds_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
    const newApiKey: APIKey = {
      id: Date.now().toString(),
      name: newKeyName,
      key: newKey,
      created: new Date().toISOString().slice(0, 19).replace('T', ' '),
      lastUsed: 'Never',
      status: 'active'
    };
    
    setApiKeys([...apiKeys, newApiKey]);
    setGeneratedKey(newKey);
    setNewKeyName('');
    setShowNewKeyForm(false);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const revokeAPIKey = (id: string) => {
    setApiKeys(apiKeys.map(key => 
      key.id === id ? { ...key, status: 'inactive' as const } : key
    ));
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
              <Shield className="h-8 w-8 text-purple-400" />
              <span className="text-xl font-bold text-white">Hades Terminal</span>
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
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Welcome back, <span className="text-purple-400">{session?.user?.name?.split(' ')[0]}</span>
          </h1>
          <p className="text-purple-200">Your cybersecurity command center is ready for operation.</p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {securityMetrics.map((metric, index) => (
            <Card key={index} className="bg-slate-900/60 backdrop-blur-sm border-purple-400/40 hover:border-purple-300/50 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-200 text-sm font-medium">{metric.label}</p>
                    <p className="text-2xl font-bold text-white">{metric.value}</p>
                    <div className="flex items-center space-x-1">
                      {metric.trend === 'up' ? (
                        <TrendingUp className="h-4 w-4 text-green-400" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-400" />
                      )}
                      <p className={`text-sm ${metric.color}`}>{metric.change} from last week</p>
                    </div>
                  </div>
                  <div className={`w-12 h-12 rounded-lg bg-slate-900/60 flex items-center justify-center border border-purple-400/30`}>
                    <metric.icon className={`h-6 w-6 ${metric.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Dashboard Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-slate-900/60 border border-purple-400/30">
            <TabsTrigger value="overview" className="data-[state=active]:bg-purple-600">Overview</TabsTrigger>
            <TabsTrigger value="statistics" className="data-[state=active]:bg-purple-600">Statistics</TabsTrigger>
            <TabsTrigger value="api-keys" className="data-[state=active]:bg-purple-600">API Keys</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Quick Actions */}
            <Card className="bg-slate-900/60 backdrop-blur-sm border-purple-400/40">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Zap className="h-5 w-5 text-purple-400 mr-2" />
                  Quick Actions
                </CardTitle>
                <CardDescription className="text-purple-200">
                  Launch common security operations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white h-20 flex-col space-y-2">
                    <Terminal className="h-6 w-6" />
                    <span>Network Scan</span>
                  </Button>
                  <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white h-20 flex-col space-y-2">
                    <Brain className="h-6 w-6" />
                    <span>AI Analysis</span>
                  </Button>
                  <Button className="bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-700 hover:to-purple-700 text-white h-20 flex-col space-y-2">
                    <Server className="h-6 w-6" />
                    <span>Web App Test</span>
                  </Button>
                  <Button className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white h-20 flex-col space-y-2">
                    <Shield className="h-6 w-6" />
                    <span>Generate Report</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="statistics" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Usage Statistics */}
              <Card className="bg-slate-900/60 backdrop-blur-sm border-purple-400/40">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <BarChart3 className="h-5 w-5 text-purple-400 mr-2" />
                    Usage Statistics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-slate-950/50 rounded-lg border border-purple-400/20">
                      <div className="text-2xl font-bold text-purple-400">2,847</div>
                      <div className="text-sm text-purple-200">Total Scans</div>
                    </div>
                    <div className="text-center p-4 bg-slate-950/50 rounded-lg border border-purple-400/20">
                      <div className="text-2xl font-bold text-blue-400">156</div>
                      <div className="text-sm text-purple-200">Vulnerabilities</div>
                    </div>
                    <div className="text-center p-4 bg-slate-950/50 rounded-lg border border-purple-400/20">
                      <div className="text-2xl font-bold text-green-400">98.7%</div>
                      <div className="text-sm text-purple-200">Success Rate</div>
                    </div>
                    <div className="text-center p-4 bg-slate-950/50 rounded-lg border border-purple-400/20">
                      <div className="text-2xl font-bold text-orange-400">23</div>
                      <div className="text-sm text-purple-200">Active Threats</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* API Usage */}
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
                      <span className="text-purple-200">Requests this month</span>
                      <span className="text-white font-semibold">45,672</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-purple-200">Average response time</span>
                      <span className="text-white font-semibold">127ms</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-purple-200">Success rate</span>
                      <span className="text-green-400 font-semibold">99.94%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-purple-200">Rate limit remaining</span>
                      <span className="text-blue-400 font-semibold">8,328 / 10,000</span>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-purple-400/20">
                    <div className="text-sm text-purple-200 mb-2">Monthly usage</div>
                    <Progress value={83} className="h-2" />
                    <div className="text-xs text-purple-300 mt-1">83% of plan limit</div>
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
                      Manage your API keys for programmatic access
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
                    <div className="flex space-x-4">
                      <Input
                        placeholder="Enter key name (e.g., Production API)"
                        value={newKeyName}
                        onChange={(e) => setNewKeyName(e.target.value)}
                        className="bg-slate-900/50 border-purple-400/40 text-white placeholder-purple-300/50"
                      />
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
                    API Usage Example
                  </h4>
                  <div className="bg-slate-950/80 rounded p-4 border border-purple-400/30">
                    <code className="text-purple-300 text-sm whitespace-pre-line">
{`curl -X POST https://api.hades.security/v1/scan \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "target": "example.com",
    "scan_type": "web_application",
    "options": {
      "stealth": true,
      "deep_scan": true
    }
  }'`}
                    </code>
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