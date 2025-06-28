import { BarChart3, TrendingUp, TrendingDown, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

export default function StatisticsTab() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white mb-6">Statistics</h1>
      <div className="grid lg:grid-cols-2 gap-6">
        {/* API Usage */}
        <Card className="bg-slate-900/60 backdrop-blur-sm border-purple-400/40">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <BarChart3 className="h-5 w-5 text-purple-400 mr-2" />
              API Usage
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-purple-200 text-sm mb-2">Monthly API Calls</p>
              <Progress value={75} className="bg-purple-400/20" />
              <p className="text-purple-300 text-xs mt-1">75% of monthly quota used</p>
            </div>
            <div>
              <p className="text-purple-200 text-sm mb-2">Daily API Calls</p>
              <Progress value={40} className="bg-purple-400/20" />
              <p className="text-purple-300 text-xs mt-1">40% of daily quota used</p>
            </div>
          </CardContent>
        </Card>

        {/* System Performance */}
        <Card className="bg-slate-900/60 backdrop-blur-sm border-purple-400/40">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Zap className="h-5 w-5 text-purple-400 mr-2" />
              System Performance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-purple-200 text-sm">CPU Usage</p>
              <p className="text-purple-300 text-sm">65%</p>
            </div>
            <Progress value={65} className="bg-purple-400/20" />
            <div className="flex items-center justify-between">
              <p className="text-purple-200 text-sm">Memory Usage</p>
              <p className="text-purple-300 text-sm">50%</p>
            </div>
            <Progress value={50} className="bg-purple-400/20" />
          </CardContent>
        </Card>
      </div>

      {/* Trends */}
      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="bg-slate-900/60 backdrop-blur-sm border-purple-400/40">
          <CardContent className="text-center">
            <TrendingUp className="h-8 w-8 text-green-400 mx-auto mb-4" />
            <h4 className="text-white font-bold text-lg">+15%</h4>
            <p className="text-purple-300 text-sm">API Usage Growth</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-900/60 backdrop-blur-sm border-purple-400/40">
          <CardContent className="text-center">
            <TrendingDown className="h-8 w-8 text-red-400 mx-auto mb-4" />
            <h4 className="text-white font-bold text-lg">-5%</h4>
            <p className="text-purple-300 text-sm">Error Rate</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-900/60 backdrop-blur-sm border-purple-400/40">
          <CardContent className="text-center">
            <Zap className="h-8 w-8 text-blue-400 mx-auto mb-4" />
            <h4 className="text-white font-bold text-lg">98%</h4>
            <p className="text-purple-300 text-sm">System Uptime</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}