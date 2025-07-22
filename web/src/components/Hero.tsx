import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Play, Shield, Lock, Zap } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'

const Hero: React.FC = () => {
  const { user } = useAuth()

  return (
    <section className="min-h-screen flex items-center justify-center px-4 pt-32">
      {/* Background particles */}
      <div className="bg-particles opacity-30 pointer-events-none"></div>
      
      {/* Floating geometric shapes */}
      <div className="fixed top-20 left-10 w-32 h-32 bg-gradient-to-r from-cyber-purple/10 to-transparent rounded-full blur-xl animate-float pointer-events-none"></div>
      <div className="fixed bottom-20 right-10 w-48 h-48 bg-gradient-to-r from-cyber-blue/10 to-transparent rounded-full blur-xl animate-float pointer-events-none" style={{ animationDelay: '3s' }}></div>
      <div className="fixed top-1/2 left-1/4 w-24 h-24 bg-gradient-to-r from-purple-500/5 to-transparent rounded-full blur-lg animate-float pointer-events-none" style={{ animationDelay: '6s' }}></div>
      
      <div className="max-w-7xl mx-auto hero-grid z-10">
        {/* Left Content */}
        <div className="space-y-8 animate-fade-in flex flex-col justify-center">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-purple rounded-full text-sm text-white w-fit mx-auto lg:mx-0">
              <Zap size={16} />
              Automate Your Cybersecurity Workflow
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight text-center lg:text-left">
              <span className="text-white">Secure Your</span>{' '}
              <span className="bg-gradient-to-r from-cyber-blue to-cyber-purple bg-clip-text text-transparent">
                Digital World
              </span>{' '}
              <span className="text-white">with Hades</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto lg:mx-0 text-center lg:text-left">
              Eliminate repetitive cybersecurity tasks with intelligent automation. 
              Hades empowers security professionals and developers with advanced AI-driven 
              tools for threat detection, vulnerability assessment, and incident response.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link
              to="/chat"
              className="group bg-gradient-purple text-white px-8 py-4 rounded-full text-lg font-semibold hover:opacity-90 transition-all duration-300 flex items-center justify-center gap-2 glow"
            >
              Start with Hades AI
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link
              to="/login"
              className="glass text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Play size={20} />
              Watch Demo
            </Link>
          </div>

          <div className="flex items-center justify-center lg:justify-start gap-8 pt-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">50K+</div>
              <div className="text-gray-400 text-sm">Security Scans</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">99.9%</div>
              <div className="text-gray-400 text-sm">Threat Detection</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">24/7</div>
              <div className="text-gray-400 text-sm">Monitoring</div>
            </div>
          </div>
        </div>

        {/* Right Content - Visual */}
        <div className="animate-slide-up flex justify-center lg:justify-end">
          <div className="relative">
            {/* Main Card */}
            <div className="glass p-6 md:p-8 rounded-2xl glow max-w-md w-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-purple rounded-full flex items-center justify-center">
                  <Shield size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Security Dashboard</h3>
                  <p className="text-gray-400 text-sm">Real-time monitoring</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-green-900/20 rounded-lg border border-green-500/20">
                  <span className="text-green-400 text-sm">System Status</span>
                  <span className="text-green-400 font-semibold">Secure</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-blue-900/20 rounded-lg border border-blue-500/20">
                  <span className="text-blue-400 text-sm">Active Scans</span>
                  <span className="text-blue-400 font-semibold">3 Running</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-purple-900/20 rounded-lg border border-purple-500/20">
                  <span className="text-purple-400 text-sm">Threats Blocked</span>
                  <span className="text-purple-400 font-semibold">247 Today</span>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-blue rounded-full flex items-center justify-center animate-float shadow-lg">
              <Lock size={24} className="text-white" />
            </div>
            
            <div className="absolute -bottom-4 -left-4 w-20 h-20 glass rounded-full flex items-center justify-center animate-float shadow-lg" style={{ animationDelay: '2s' }}>
              <Zap size={28} className="text-cyber-blue drop-shadow-lg" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero