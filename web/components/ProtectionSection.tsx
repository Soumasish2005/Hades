'use client';

import { Shield, Zap, Eye, Lock } from 'lucide-react';

export default function ProtectionSection() {
  const protections = [
    {
      icon: Shield,
      title: 'Real-time Monitoring',
      description: 'Continuous surveillance of your digital infrastructure with instant threat detection and automated response capabilities that never sleep.'
    },
    {
      icon: Zap,
      title: 'Instant Threat Detection',
      description: 'Advanced AI algorithms that identify and neutralize threats in milliseconds, before they can impact your business operations.'
    },
    {
      icon: Eye,
      title: 'Advanced Response',
      description: 'Intelligent incident response that adapts to emerging threats and provides comprehensive protection strategies automatically.'
    },
    {
      icon: Lock,
      title: 'Continuous Learning',
      description: 'Machine learning systems that evolve with the threat landscape to provide increasingly effective protection over time.'
    }
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Protecting with zero complexity
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {protections.map((protection, index) => (
            <div key={index} className="bg-gray-800/30 rounded-xl p-6 border border-gray-700/50 text-center hover:bg-gray-800/50 transition-all duration-300 hover:border-purple-500/50">
              <div className="w-16 h-16 bg-purple-600/20 rounded-xl flex items-center justify-center mx-auto mb-6 border border-purple-500/30">
                <protection.icon className="h-8 w-8 text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-4">
                {protection.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {protection.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}