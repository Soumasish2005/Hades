'use client';

import { Cpu, Zap, Brain, BarChart3, GitBranch, Lock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const benefits = [
  {
    icon: GitBranch,
    title: 'Modular Attack Framework',
    description: 'Plugin-based exploitation system with hot-swappable attack modules for maximum operational flexibility.',
    metrics: ['100+ Attack Modules', '99.9% Uptime', 'Zero-Detection Updates'],
    color: 'text-blue-300',
    bgColor: 'bg-blue-900/30'
  },
  {
    icon: Brain,
    title: 'AI-Driven Exploitation',
    description: 'Machine learning models trained on millions of attack scenarios for intelligent vulnerability exploitation.',
    metrics: ['98% Success Rate', '20x Faster Analysis', 'Adaptive Learning'],
    color: 'text-purple-300',
    bgColor: 'bg-purple-900/30'
  },
  {
    icon: Zap,
    title: 'Stealth-First Architecture',
    description: 'Advanced evasion techniques that adapt to target defenses and maintain persistence undetected.',
    metrics: ['<1% Detection Rate', 'Smart Evasion', 'Adaptive Payloads'],
    color: 'text-blue-200',
    bgColor: 'bg-blue-800/30'
  }
];

const performanceMetrics = [
  {
    label: 'Exploit Speed',
    value: '50,000',
    unit: 'targets/min',
    icon: Zap,
    color: 'text-blue-300'
  },
  {
    label: 'Parallel Attacks',
    value: '10,000',
    unit: 'concurrent',
    icon: Cpu,
    color: 'text-purple-300'
  },
  {
    label: 'Memory Footprint',
    value: '<50',
    unit: 'MB stealth',
    icon: BarChart3,
    color: 'text-blue-200'
  },
  {
    label: 'Response Time',
    value: '<10',
    unit: 'ms avg',
    icon: Lock,
    color: 'text-purple-400'
  }
];

export default function TechnicalBenefits() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 section-bg-alt">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span className="cyber-text">Technical</span>{' '}
            <span className="bg-gradient-to-r from-blue-300 to-purple-400 bg-clip-text text-transparent">
              Superiority
            </span>
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Built on military-grade technology stack with enterprise-level performance and undetectable operation
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <Card 
              key={index}
              className="bg-slate-900/60 backdrop-blur-sm border-blue-400/40 hover:bg-slate-800/60 transition-all duration-300 group hover:scale-105"
            >
              <CardHeader>
                <div className={`w-12 h-12 rounded-lg ${benefit.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform border border-blue-400/30`}>
                  <benefit.icon className={`h-6 w-6 ${benefit.color}`} />
                </div>
                <CardTitle className="text-xl text-white">{benefit.title}</CardTitle>
                <CardDescription className="text-blue-100 text-base">
                  {benefit.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {benefit.metrics.map((metric, metricIndex) => (
                    <div key={metricIndex} className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${benefit.color.replace('text-', 'bg-')}`} />
                      <span className="text-blue-100 text-sm">{metric}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Performance Metrics */}
        <div className="bg-slate-900/50 rounded-2xl p-8 border border-blue-400/30">
          <h3 className="text-2xl font-bold text-white mb-8 text-center">Performance Metrics</h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {performanceMetrics.map((metric, index) => (
              <div key={index} className="text-center">
                <div className={`w-12 h-12 rounded-full bg-slate-900/60 flex items-center justify-center mx-auto mb-4 border border-blue-400/40`}>
                  <metric.icon className={`h-6 w-6 ${metric.color}`} />
                </div>
                <div className={`text-3xl font-bold ${metric.color} mb-1`}>
                  {metric.value}
                </div>
                <div className="text-blue-100 text-sm">{metric.unit}</div>
                <div className="text-blue-200 text-xs mt-1">{metric.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Technology Stack */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-white mb-8">Technology Stack</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {['Python', 'FastAPI', 'React', 'TypeScript', 'PostgreSQL', 'Redis'].map((tech, index) => (
              <div key={index} className="bg-slate-900/60 rounded-lg p-4 border border-blue-400/30 hover:border-blue-300/50 transition-colors">
                <span className="text-blue-100 font-medium">{tech}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}