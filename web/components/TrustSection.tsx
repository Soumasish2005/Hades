'use client';

import { Shield, Zap, Eye } from 'lucide-react';

export default function TrustSection() {
  const features = [
    {
      icon: Shield,
      title: 'Business Impact Protection',
      description: 'Comprehensive protection strategies that safeguard your critical business operations and maintain operational continuity during security incidents.',
      image: '/api/placeholder/300/200'
    },
    {
      icon: Zap,
      title: 'Zero-Day Protection',
      description: 'Advanced AI-powered threat detection that identifies and neutralizes unknown threats before they can impact your infrastructure.',
      image: '/api/placeholder/300/200'
    },
    {
      icon: Eye,
      title: 'Continuous with Live Alerts',
      description: 'Real-time monitoring with intelligent alerting that provides instant notifications and automated response capabilities.',
      image: '/api/placeholder/300/200'
    }
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Building trust in digital safety
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="group">
              {/* Feature Image Placeholder */}
              <div className="bg-gray-800/50 rounded-lg h-48 mb-6 border border-gray-700 flex items-center justify-center">
                <div className="w-16 h-16 bg-purple-600/20 rounded-lg flex items-center justify-center">
                  <feature.icon className="h-8 w-8 text-purple-400" />
                </div>
              </div>
              
              <h3 className="text-xl font-semibold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}