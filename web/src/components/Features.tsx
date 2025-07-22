import React from 'react'
import { Terminal, MessageSquare, Shield, Zap, Eye, Bot } from 'lucide-react'

const Features: React.FC = () => {
  const features = [
    {
      icon: Terminal,
      title: 'CLI Tool',
      description: 'Powerful command-line interface for automated security scanning, vulnerability assessment, and rapid deployment across your infrastructure.',
      color: 'from-cyber-blue to-blue-600'
    },
    {
      icon: MessageSquare,
      title: 'Web Agent Interface',
      description: 'Intelligent chat-based interface that understands natural language queries and provides instant cybersecurity insights and recommendations.',
      color: 'from-cyber-purple to-purple-600'
    },
    {
      icon: Shield,
      title: 'Threat Detection',
      description: 'Advanced AI-powered threat detection that identifies and neutralizes security risks in real-time across your digital infrastructure.',
      color: 'from-green-500 to-emerald-600'
    },
    {
      icon: Zap,
      title: 'Automated Response',
      description: 'Instant automated incident response system that takes immediate action to contain and resolve security threats without human intervention.',
      color: 'from-yellow-500 to-orange-600'
    },
    {
      icon: Eye,
      title: 'Real-time Monitoring',
      description: '24/7 continuous monitoring of your systems with intelligent alerting and comprehensive security metrics and reporting.',
      color: 'from-pink-500 to-rose-600'
    },
    {
      icon: Bot,
      title: 'AI-Powered Analysis',
      description: 'Machine learning algorithms that continuously learn from your environment to provide increasingly accurate threat predictions.',
      color: 'from-indigo-500 to-blue-600'
    }
  ]

  return (
    <section id="features" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-purple rounded-full text-sm text-white mb-6">
            <Shield size={16} />
            Core Features
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Automate Your{' '}
            <span className="bg-gradient-to-r from-cyber-blue to-cyber-purple bg-clip-text text-transparent">
              Security Workflow
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Hades eliminates repetitive cybersecurity tasks with intelligent automation, 
            giving you more time to focus on strategic security initiatives.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group glass p-8 rounded-2xl hover:bg-white hover:bg-opacity-10 transition-all duration-300 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon size={28} className="text-white" />
              </div>
              
              <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-cyber-blue transition-colors">
                {feature.title}
              </h3>
              
              <p className="text-gray-300 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Feature Highlight */}
        <div className="mt-20 glass p-8 md:p-12 rounded-3xl relative overflow-hidden">
          <div className="relative z-10">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-3xl font-bold text-white mb-4">
                  Why Choose Hades?
                </h3>
                <p className="text-gray-300 text-lg mb-6">
                  Built by cybersecurity experts for cybersecurity professionals. 
                  Hades understands the unique challenges you face and provides 
                  intelligent solutions that adapt to your environment.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <span className="text-gray-300">Enterprise-grade security</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <span className="text-gray-300">Easy integration with existing tools</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <span className="text-gray-300">Continuous learning and improvement</span>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className="glass p-6 rounded-xl">
                  <div className="text-sm text-gray-400 mb-2">$ hades scan --target network</div>
                  <div className="text-green-400 text-sm mb-2">✓ Port scan completed</div>
                  <div className="text-green-400 text-sm mb-2">✓ Vulnerability assessment done</div>
                  <div className="text-yellow-400 text-sm mb-2">⚠ 3 medium-risk vulnerabilities found</div>
                  <div className="text-blue-400 text-sm">→ Generating remediation report...</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="absolute inset-0 bg-gradient-to-r from-cyber-purple/10 to-cyber-blue/10 -z-10"></div>
        </div>
      </div>
    </section>
  )
}

export default Features