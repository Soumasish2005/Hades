import { Activity, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function OverviewTab() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white mb-6">Overview</h1>
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
      </div>
    </div>
  );
}