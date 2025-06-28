'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Header from '@/components/dashboard/Header';
import Tabs from '@/components/dashboard/Tabs';
import OverviewTab from '@/components/dashboard/tabs/OverviewTab';
import StatisticsTab from '@/components/dashboard/tabs/StatisticsTab';
import APIKeysTab from '@/components/dashboard/tabs/APIKeysTab';
import CLIToolTab from '@/components/dashboard/tabs/CLIToolTab';

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (status === 'loading') return;

    if (!session) {
      router.push('/signin');
    }
  }, [session, status, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-purple-200">Initializing Hades Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Header session={session} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="mt-8">
          {activeTab === 'overview' && <OverviewTab />}
          {activeTab === 'statistics' && <StatisticsTab />}
          {activeTab === 'api-keys' && <APIKeysTab />}
          {activeTab === 'cli-tool' && <CLIToolTab />}
        </div>
      </main>
    </div>
  );
}