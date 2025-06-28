'use client';

import { Terminal, Server, Brain, Code2, Zap, Shield, Eye, Lock, Cpu } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useState } from 'react';

const features = [
  {
    icon: Terminal,
    title: 'Elite Command Center',
    description: 'Military-grade terminal interface with AI-powered auto-completion and intelligent exploit suggestions for rapid penetration testing.',
    code: '$ hades exploit --target 192.168.1.0/24 --stealth\n> Neural network activated...\n> Scanning 254 hosts... [████████████] 100%\n> Found 15 critical vulnerabilities\n> Generating custom payloads...\n> 12 shells acquired | 3 privilege escalations',
    color: 'text-blue-300',
    bgColor: 'bg-blue-900/30',
    borderColor: 'border-blue-400/40',
    stats: ['99.2% Success Rate', '< 10ms Response', '256-bit Encrypted']
  },
  {
    icon: Brain,
    title: 'Neural Exploitation Engine',
    description: 'Revolutionary AI system that generates custom exploits, analyzes attack vectors, and automates complex penetration workflows in real-time.',
    code: '# AI-generated zero-day exploit\npayload = ai.craft_exploit(target_service)\nshell = deploy_payload(payload, target)\n\n# Adaptive learning enabled\nai.learn_from_defense(target_response)\nenhanced_payload = ai.evolve_exploit()',
    color: 'text-purple-300',
    bgColor: 'bg-purple-900/30',
    borderColor: 'border-purple-400/40',
    stats: ['15,000+ Exploits', 'Self-Learning', 'Zero-Day Discovery']
  },
  {
    icon: Server,
    title: 'Quantum-Speed Backend',
    description: 'Lightning-fast distributed architecture engineered for massive parallel operations and real-time vulnerability assessment across global networks.',
    code: 'POST /api/v1/neural-exploit HTTP/2.0\nAuthorization: Bearer quantum_token\nContent-Type: application/json\n\n{\n  "targets": ["0.0.0.0/0"],\n  "mode": "stealth_advanced",\n  "ai_level": "maximum"\n}',
    color: 'text-cyan-300',
    bgColor: 'bg-cyan-900/30',
    borderColor: 'border-cyan-400/40',
    stats: ['50K+ Req/sec', '99.99% Uptime', 'Global CDN']
  }
];

const additionalFeatures = [
  {
    icon: Code2,
    title: 'Modular Framework',
    description: 'Plugin-based architecture for custom exploits and attack modules',
    color: 'text-blue-300',
    stats: '500+ Modules'
  },
  {
    icon: Zap,
    title: 'Real-time Exploitation',
    description: 'Live vulnerability scanning with instant exploit deployment',
    color: 'text-purple-300',
    stats: '< 100ms Deploy'
  },
  {
    icon: Shield,
    title: 'Stealth Operations',
    description: 'Advanced evasion techniques and anti-detection mechanisms',
    color: 'text-cyan-300',
    stats: '0.1% Detection'
  },
  {
    icon: Eye,
    title: 'Intelligence Gathering',
    description: 'Advanced reconnaissance and social engineering automation',
    color: 'text-blue-400',
    stats: '95% OSINT Success'
  },
  {
    icon: Lock,
    title: 'Cryptographic Warfare',
    description: 'Quantum-resistant encryption breaking and key recovery',
    color: 'text-purple-400',
    stats: 'RSA-4096 Capable'
  },
  {
    icon: Cpu,
    title: 'Distributed Computing',
    description: 'Harness global botnet power for computational tasks',
    color: 'text-cyan-400',
    stats: '1M+ Nodes'
  }
];

export default function Features() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 section-bg-alt relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Enhanced Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-900/50 to-purple-900/50 border border-blue-500/30 mb-6 backdrop-blur-md">
            <Shield className="h-4 w-4 text-blue-400 mr-2" />
            <span className="text-sm text-blue-200 font-medium">Advanced Arsenal</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            <span className="cyber-text">Military-Grade</span>{' '}
            <span className="bg-gradient-to-r from-blue-300 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Cyber Weapons
            </span>
          </h2>
          <p className="text-xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
            Cutting-edge AI technology combined with proven penetration testing methodologies, 
            <br className="hidden sm:block" />
            engineered for elite cybersecurity professionals
          </p>
        </div>

        {/* Enhanced Main Features Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className={`bg-slate-900/60 backdrop-blur-sm ${feature.borderColor} hover:bg-slate-800/60 transition-all duration-500 group hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20 cursor-pointer`}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <CardHeader className="pb-4">
                <div className={`w-14 h-14 rounded-xl ${feature.bgColor} flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-300 border border-blue-400/30 shadow-lg`}>
                  <feature.icon className={`h-7 w-7 ${feature.color}`} />
                </div>
                <CardTitle className="text-xl text-white mb-3 group-hover:text-blue-200 transition-colors">
                  {feature.title}
                </CardTitle>
                <CardDescription className="text-blue-100 text-base leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Stats */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {feature.stats.map((stat, statIndex) => (
                    <span key={statIndex} className={`px-3 py-1 rounded-full text-xs font-medium bg-slate-950/60 ${feature.color} border border-blue-400/30`}>
                      {stat}
                    </span>
                  ))}
                </div>
                
                {/* Code Block */}
                <div className={`bg-slate-950/80 rounded-lg p-4 border border-blue-400/30 transition-all duration-300 ${hoveredCard === index ? 'border-blue-300/50 shadow-lg' : ''}`}>
                  <code className="text-sm code-font text-blue-300 whitespace-pre-line leading-relaxed">
                    {feature.code}
                  </code>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Enhanced Additional Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {additionalFeatures.map((feature, index) => (
            <div 
              key={index} 
              className="group p-6 rounded-xl bg-slate-900/50 border border-blue-400/30 hover:border-blue-300/50 hover:bg-slate-800/60 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/10 cursor-pointer"
            >
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-lg bg-slate-900/60 flex items-center justify-center border border-blue-400/30 group-hover:scale-110 transition-transform">
                  <feature.icon className={`h-6 w-6 ${feature.color}`} />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-200 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-blue-100 text-sm mb-3 leading-relaxed">
                    {feature.description}
                  </p>
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-slate-950/60 ${feature.color} border border-blue-400/30`}>
                    {feature.stats}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Performance Showcase */}
        <div className="mt-20 bg-gradient-to-r from-slate-900/80 to-slate-800/80 rounded-2xl p-8 border border-blue-400/30 backdrop-blur-md">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-2">Performance Metrics</h3>
            <p className="text-blue-200">Real-world operational statistics</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: '99.7%', label: 'Mission Success', color: 'text-green-400' },
              { value: '< 0.1s', label: 'Response Time', color: 'text-blue-400' },
              { value: '50K+', label: 'Exploits/min', color: 'text-purple-400' },
              { value: '0.01%', label: 'Detection Rate', color: 'text-cyan-400' }
            ].map((metric, index) => (
              <div key={index} className="text-center">
                <div className={`text-3xl font-bold ${metric.color} mb-1`}>
                  {metric.value}
                </div>
                <div className="text-blue-200 text-sm">{metric.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}