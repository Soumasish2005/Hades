'use client';

import { Terminal, Server, Brain, Code2, Zap, Shield } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const features = [
  {
    icon: Terminal,
    title: 'Elite Terminal Interface',
    description: 'Advanced command-line interface with AI-powered auto-completion and intelligent exploit suggestions for rapid penetration testing.',
    code: '$ hades exploit --target 192.168.1.0/24 --stealth\n> Scanning for vulnerabilities...\n> Found 15 potential entry points',
    color: 'text-blue-300',
    bgColor: 'bg-blue-900/30',
    borderColor: 'border-blue-400/40'
  },
  {
    icon: Server,
    title: 'High-Performance Backend',
    description: 'Lightning-fast API backend engineered for massive parallel operations and real-time vulnerability assessment.',
    code: 'POST /api/v1/exploit HTTP/1.1\nAuthorization: Bearer <token>\nContent-Type: application/json',
    color: 'text-blue-400',
    bgColor: 'bg-blue-800/30',
    borderColor: 'border-blue-300/40'
  },
  {
    icon: Brain,
    title: 'AI Exploitation Engine',
    description: 'Revolutionary AI system that generates custom exploits, analyzes attack vectors, and automates complex penetration workflows.',
    code: '# AI-generated zero-day exploit\npayload = ai.craft_exploit(target_service)\nshell = deploy_payload(payload, target)',
    color: 'text-purple-300',
    bgColor: 'bg-purple-900/30',
    borderColor: 'border-purple-400/40'
  }
];

export default function Features() {
  return (
    <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 section-bg-alt">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span className="cyber-text">Advanced</span>{' '}
            <span className="bg-gradient-to-r from-blue-300 to-purple-400 bg-clip-text text-transparent">
              Hacking Arsenal
            </span>
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Military-grade cybersecurity tools combining cutting-edge AI with proven penetration testing methodologies
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className={`bg-slate-900/60 backdrop-blur-sm ${feature.borderColor} hover:bg-slate-800/60 transition-all duration-300 group hover:scale-105 glow-electric`}
            >
              <CardHeader>
                <div className={`w-12 h-12 rounded-lg ${feature.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform border border-blue-400/30`}>
                  <feature.icon className={`h-6 w-6 ${feature.color}`} />
                </div>
                <CardTitle className="text-xl text-white">{feature.title}</CardTitle>
                <CardDescription className="text-blue-100 text-base">
                  {feature.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-slate-950/80 rounded-lg p-4 border border-blue-400/30">
                  <code className="text-sm code-font text-blue-300 whitespace-pre-line">
                    {feature.code}
                  </code>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Features Row */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="text-center p-6 rounded-lg bg-slate-900/50 border border-blue-400/30 hover:border-blue-300/50 transition-colors">
            <Code2 className="h-12 w-12 text-blue-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Modular Framework</h3>
            <p className="text-blue-100">Plugin-based architecture for custom exploits and attack modules</p>
          </div>
          <div className="text-center p-6 rounded-lg bg-slate-900/50 border border-blue-400/30 hover:border-blue-300/50 transition-colors">
            <Zap className="h-12 w-12 text-purple-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Real-time Exploitation</h3>
            <p className="text-blue-100">Live vulnerability scanning with instant exploit deployment</p>
          </div>
          <div className="text-center p-6 rounded-lg bg-slate-900/50 border border-blue-400/30 hover:border-blue-300/50 transition-colors">
            <Shield className="h-12 w-12 text-blue-200 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Stealth Operations</h3>
            <p className="text-blue-100">Advanced evasion techniques and anti-detection mechanisms</p>
          </div>
        </div>
      </div>
    </section>
  );
}