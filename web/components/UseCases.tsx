'use client';

import { Target, Bug, Shield, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const useCases = [
  {
    icon: Target,
    title: 'Red Team Operations',
    description: 'Advanced persistent threat simulation and adversarial network infiltration',
    color: 'text-red-300',
    bgColor: 'bg-red-900/30',
    borderColor: 'border-red-400/40',
    features: [
      'Automated network reconnaissance and mapping',
      'AI-powered social engineering campaigns',
      'Stealth persistence and lateral movement',
      'Custom malware and payload generation',
      'Advanced post-exploitation frameworks'
    ],
    example: 'Compromised 23 enterprise networks during authorized red team exercises with 100% stealth success rate'
  },
  {
    icon: Bug,
    title: 'Elite Bug Hunting',
    description: 'Accelerated zero-day discovery and high-value vulnerability exploitation',
    color: 'text-blue-300',
    bgColor: 'bg-blue-900/30',
    borderColor: 'border-blue-400/40',
    features: [
      'Multi-target parallel vulnerability scanning',
      'Zero-day pattern recognition algorithms',
      'Automated proof-of-concept generation',
      'Bug bounty platform integrations',
      'Advanced fuzzing and code analysis'
    ],
    example: 'Elite bug hunters increased critical findings by 450% using Hades AI-driven discovery methods'
  },
  {
    icon: Shield,
    title: 'Security Engineering',
    description: 'Comprehensive security assessments and infrastructure penetration testing',
    color: 'text-purple-300',
    bgColor: 'bg-purple-900/30',
    borderColor: 'border-purple-400/40',
    features: [
      'Infrastructure penetration testing',
      'Compliance validation and reporting',
      'Continuous security monitoring',
      'Risk assessment automation',
      'Security posture optimization'
    ],
    example: 'Fortune 500 companies eliminated 92% of critical vulnerabilities using Hades automated assessments'
  }
];

export default function UseCases() {
  return (
    <section id="use-cases" className="py-24 px-4 sm:px-6 lg:px-8 section-bg">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span className="cyber-text">Built for</span>{' '}
            <span className="bg-gradient-to-r from-blue-300 to-purple-400 bg-clip-text text-transparent">
              Elite Hackers
            </span>
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Specialized tools for red teamers, bug bounty hunters, and security engineers operating in high-stakes environments
          </p>
        </div>

        {/* Use Cases Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {useCases.map((useCase, index) => (
            <Card 
              key={index}
              className={`bg-slate-900/60 backdrop-blur-sm ${useCase.borderColor} hover:bg-slate-800/60 transition-all duration-300 group hover:scale-105`}
            >
              <CardHeader>
                <div className={`w-12 h-12 rounded-lg ${useCase.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform border border-blue-400/30`}>
                  <useCase.icon className={`h-6 w-6 ${useCase.color}`} />
                </div>
                <CardTitle className="text-xl text-white">{useCase.title}</CardTitle>
                <CardDescription className="text-blue-100 text-base">
                  {useCase.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Features List */}
                <div className="space-y-3">
                  {useCase.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start space-x-3">
                      <CheckCircle className={`h-5 w-5 ${useCase.color} mt-0.5 flex-shrink-0`} />
                      <span className="text-blue-100 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Example */}
                <div className="bg-slate-950/80 rounded-lg p-4 border border-blue-400/30">
                  <h4 className="text-sm font-semibold text-blue-300 mb-2">Mission Results</h4>
                  <p className="text-sm text-blue-200 italic">{useCase.example}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center p-6 rounded-lg bg-slate-900/60 border border-blue-400/30">
            <div className="text-3xl font-bold text-blue-300 mb-2">99.2%</div>
            <div className="text-blue-100 text-sm">Exploit Success Rate</div>
          </div>
          <div className="text-center p-6 rounded-lg bg-slate-900/60 border border-blue-400/30">
            <div className="text-3xl font-bold text-purple-300 mb-2">15,000+</div>
            <div className="text-blue-100 text-sm">Zero-Days Discovered</div>
          </div>
          <div className="text-center p-6 rounded-lg bg-slate-900/60 border border-blue-400/30">
            <div className="text-3xl font-bold text-blue-200 mb-2">95%</div>
            <div className="text-blue-100 text-sm">Stealth Success</div>
          </div>
          <div className="text-center p-6 rounded-lg bg-slate-900/60 border border-blue-400/30">
            <div className="text-3xl font-bold text-purple-400 mb-2">$5.7M</div>
            <div className="text-blue-100 text-sm">Bounties Earned</div>
          </div>
        </div>
      </div>
    </section>
  );
}