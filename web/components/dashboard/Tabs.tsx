import { Activity, BarChart3, Key, Terminal } from 'lucide-react';
import { TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Tabs({ activeTab, setActiveTab }: { activeTab: string; setActiveTab: (tab: string) => void }) {
  return (
    <TabsList className="bg-slate-900/60 border border-purple-400/30">
      <TabsTrigger
        value="overview"
        className={`data-[state=active]:bg-purple-600 ${activeTab === 'overview' ? 'bg-purple-600' : ''}`}
        onClick={() => setActiveTab('overview')}
      >
        <Activity className="h-5 w-5 mr-2" />
        Overview
      </TabsTrigger>
      <TabsTrigger
        value="statistics"
        className={`data-[state=active]:bg-purple-600 ${activeTab === 'statistics' ? 'bg-purple-600' : ''}`}
        onClick={() => setActiveTab('statistics')}
      >
        <BarChart3 className="h-5 w-5 mr-2" />
        Statistics
      </TabsTrigger>
      <TabsTrigger
        value="api-keys"
        className={`data-[state=active]:bg-purple-600 ${activeTab === 'api-keys' ? 'bg-purple-600' : ''}`}
        onClick={() => setActiveTab('api-keys')}
      >
        <Key className="h-5 w-5 mr-2" />
        API Keys
      </TabsTrigger>
      <TabsTrigger
        value="cli-tool"
        className={`data-[state=active]:bg-purple-600 ${activeTab === 'cli-tool' ? 'bg-purple-600' : ''}`}
        onClick={() => setActiveTab('cli-tool')}
      >
        <Terminal className="h-5 w-5 mr-2" />
        Download CLI Tool
      </TabsTrigger>
    </TabsList>
  );
}