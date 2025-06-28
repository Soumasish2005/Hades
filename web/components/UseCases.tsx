'use client';

import { Target, Bug, Shield, CheckCircle, Users, Award, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useState } from 'react';

const useCases = [
  {
    icon: Target,
    title: 'Red Team Operations',
    description: 'Advanced persistent threat simulation and adversarial network infiltration for enterprise security testing',
    color: 'text-red-300',
    bgColor: 'bg-red-900/30',
    borderColor: 'border-red-400/40',
    gradient: 'from-red-500/20 to-orange-500/20',
    features: [
      'Automated network reconnaissance and mapping',
      'AI-powered social engineering campaigns',
      'Stealth persistence and lateral movement',
      'Custom malware and payload generation',
      'Advanced post-exploitation frameworks',
      'Real-time command and control systems'
    ],
    example: 'Compromised 23 enterprise networks during authorized red team exercises with 100% stealth success rate',
    stats: { teams: '500+', success: '99.2%', stealth: '100%' }
  },
  {
    icon: Bug,
    title: 'Elite Bug Hunting',
    description: 'Accelerated zero-day discovery and high-value vulnerability exploitation for bug bounty professionals',
    color: 'text-blue-300',
    bgColor: 'bg-blue-900/30',
    borderColor: 'border-blue-400/40',
    gradient: 'from-blue-500/20 to-cyan-500/20',
    features: [
      'Multi-target parallel vulnerability scanning',
      'Zero-day pattern recognition algorithms',
      'Automated proof-of-concept generation',
      'Bug bounty platform integrations',
      'Advanced fuzzing and code analysis',
      'AI-driven exploit development'
    ],
    example: 'Elite bug hunters increased critical findings by 450% using Hades AI-driven discovery methods',
    stats: { hunters: '2,500+', bounties: '$5.7M', zerodays: '15,000+' }
  },
  {
    icon: Shield,
    title: 'Security Engineering',
    description: 'Comprehensive security assessments and infrastructure penetration testing for enterprise environments',
    color: 'text-purple-300',
    bgColor: 'bg-purple-900/30',
    borderColor: 'border-purple-400/40',
    gradient: 'from-purple-500/20 to-pink-500/20',
    features: [
      'Infrastructure penetration testing',
      'Compliance validation and reporting',
      'Continuous security monitoring',
      'Risk assessment automation',
      'Security posture optimization',
      'Threat intelligence integration'
    ],
    example: 'Fortune 500 companies eliminated 92% of critical vulnerabilities using Hades automated assessments',
    stats: { companies: '150+', vulns: '92%', compliance: '100%' }
  }
];

const testimonials = [
  {
    name: 'Alex Chen',
    role: 'Senior Red Team Lead',
    company: 'CyberSec Corp',
    quote: 'Hades transformed our red team operations. The AI-driven approach cut our reconnaissance time by 80%.',
    avatar: 'AC'
  },
  {
    name: 'Sarah Rodriguez',
    role: 'Bug Bounty Hunter',
    company: 'Independent',
    quote: 'Found 3 zero-days in my first week with Hades. The ROI is incredible.',
    avatar: 'SR'
  },
  {
    name: 'Marcus Thompson',
    role: 'CISO',
    company: 'TechGiant Inc',
    quote: 'Our security posture improved dramatically. Hades identified vulnerabilities we never knew existed.',
    avatar: 'MT'
  }
];

export default function UseCases() {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  return (
    <section id="use-cases" className="py-24 px-4 sm:px-6 lg:px-8 section-bg relative overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-red-500/5 rounded-full blur-3xl" />
        <div className="absolute top-3/4 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Enhanced Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-red-900/50 to-purple-900/50 border border-red-500/30 mb-6 backdrop-blur-md">
            <Target className="h-4 w-4 text-red-400 mr-2" />
            <span className="text-sm text-red-200 font-medium">Elite Operations</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            <span className="cyber-text">Built for</span>{' '}
            <span className="bg-gradient-to-r from-red-300 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Elite Hackers
            </span>
          </h2>
          <p className="text-xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
            Specialized tools for red teamers, bug bounty hunters, and security engineers 
            <br className="hidden sm:block" />
            operating in high-stakes environments where failure is not an option
          </p>
        </div>

        {/* Enhanced Use Cases Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-20">
          {useCases.map((useCase, index) => (
            <Card 
              key={index}
              className={`bg-slate-900/60 backdrop-blur-sm ${useCase.borderColor} hover:bg-slate-800/60 transition-all duration-500 group hover:scale-105 hover:shadow-2xl cursor-pointer relative overflow-hidden`}
              onMouseEnter={() => setActiveCard(index)}
              onMouseLeave={() => setActiveCard(null)}
            >
              {/* Gradient Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${useCase.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <CardHeader className="relative z-10 pb-4">
                <div className={`w-14 h-14 rounded-xl ${useCase.bgColor} flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-300 border border-blue-400/30 shadow-lg`}>
                  <useCase.icon className={`h-7 w-7 ${useCase.color}`} />
                </div>
                <CardTitle className="text-xl text-white mb-3 group-hover:text-blue-200 transition-colors">
                  {useCase.title}
                </CardTitle>
                <CardDescription className="text-blue-100 text-base leading-relaxed">
                  {useCase.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="relative z-10 space-y-6">
                {/* Stats */}
                <div className="grid grid-cols-3 gap-2">
                  {Object.entries(useCase.stats).map(([key, value], statIndex) => (
                    <div key={statIndex} className="text-center p-2 rounded-lg bg-slate-950/60 border border-blue-400/20">
                      <div className={`text-lg font-bold ${useCase.color}`}>{value}</div>
                      <div className="text-xs text-blue-300 capitalize">{key}</div>
                    </div>
                  ))}
                </div>

                {/* Features List */}
                <div className="space-y-3">
                  {useCase.features.slice(0, activeCard === index ? 6 : 4).map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start space-x-3">
                      <CheckCircle className={`h-4 w-4 ${useCase.color} mt-0.5 flex-shrink-0`} />
                      <span className="text-blue-100 text-sm leading-relaxed">{feature}</span>
                    </div>
                  ))}
                  {!activeCard && useCase.features.length > 4 && (
                    <div className="text-blue-300 text-sm italic">+{useCase.features.length - 4} more features...</div>
                  )}
                </div>

                {/* Example */}
                <div className="bg-slate-950/80 rounded-lg p-4 border border-blue-400/30">
                  <h4 className="text-sm font-semibold text-blue-300 mb-2 flex items-center">
                    <Award className="h-4 w-4 mr-2" />
                    Mission Results
                  </h4>
                  <p className="text-sm text-blue-200 italic leading-relaxed">{useCase.example}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Enhanced Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {[
            { value: '99.2%', label: 'Exploit Success Rate', icon: Target, color: 'text-red-400' },
            { value: '15,000+', label: 'Zero-Days Discovered', icon: Bug, color: 'text-blue-400' },
            { value: '95%', label: 'Stealth Success', icon: Shield, color: 'text-purple-400' },
            { value: '$5.7M', label: 'Bounties Earned', icon: TrendingUp, color: 'text-green-400' }
          ].map((stat, index) => (
            <div key={index} className="text-center p-6 rounded-xl bg-slate-900/60 border border-blue-400/30 hover:border-blue-300/50 hover:bg-slate-800/60 transition-all duration-300 hover:scale-105 group">
              <div className="w-12 h-12 rounded-full bg-slate-900/60 flex items-center justify-center mx-auto mb-4 border border-blue-400/30 group-hover:scale-110 transition-transform">
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <div className={`text-3xl font-bold ${stat.color} mb-2`}>{stat.value}</div>
              <div className="text-blue-100 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Testimonials Section */}
        <div className="bg-gradient-to-r from-slate-900/80 to-slate-800/80 rounded-2xl p-8 border border-blue-400/30 backdrop-blur-md">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-2 flex items-center justify-center">
              <Users className="h-6 w-6 text-blue-400 mr-2" />
              Elite Operators Speak
            </h3>
            <p className="text-blue-200">Testimonials from cybersecurity professionals</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-slate-950/60 rounded-lg p-6 border border-blue-400/20 hover:border-blue-300/40 transition-colors">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm mr-4">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="text-white font-semibold">{testimonial.name}</div>
                    <div className="text-blue-300 text-sm">{testimonial.role}</div>
                    <div className="text-blue-400 text-xs">{testimonial.company}</div>
                  </div>
                </div>
                <p className="text-blue-100 text-sm italic leading-relaxed">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}