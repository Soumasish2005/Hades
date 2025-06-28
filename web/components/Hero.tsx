'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Play, Shield, Zap, Terminal } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);
  const [terminalText, setTerminalText] = useState('');
  const fullText = '$ hades';

  useEffect(() => {
    setIsVisible(true);
    
    // Terminal typing effect
    let i = 0;
    const typeWriter = () => {
      if (i < fullText.length) {
        setTerminalText(fullText.slice(0, i + 1));
        i++;
        setTimeout(typeWriter, 100);
      }
    };
    
    setTimeout(typeWriter, 1500);
  }, []);

  return (
    <section className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden min-h-screen flex items-center section-bg">
      {/* Grid Pattern */}
      <div className="absolute inset-0 grid-pattern opacity-20" />
      
      {/* Hero Glow Effect */}
      <div className="absolute inset-0 hero-glow" />
      
      {/* Floating Orb */}
      <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 orb-glow opacity-60" />
      
      <div className="relative max-w-7xl mx-auto w-full">
        <div className="text-center">
          {/* Badge */}
          <div className={`inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-900/50 to-purple-900/50 border border-blue-500/30 mb-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="w-2 h-2 bg-blue-400 rounded-full mr-2 animate-pulse" />
            <span className="text-sm text-blue-200 font-medium">New Update</span>
            <span className="text-sm text-blue-100 ml-2 font-medium">Dashboard Live v.3</span>
          </div>

          {/* Main Heading */}
          <h1 className={`text-4xl sm:text-6xl lg:text-7xl font-bold mb-6 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <span className="text-white">Your Digital Safety Net,</span>
            <br />
            <span className="text-white">on </span>
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 bg-clip-text text-transparent">
              Autopilot.
            </span>
          </h1>

          {/* Subtitle */}
          <p className={`text-xl sm:text-2xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            Intelligence-driven cybersecurity, without the noise.
          </p>

          {/* CTAs */}
          <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <Link href="/signup">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-6 text-lg glow-blue group border-0">
                Try Hades Now
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-blue-400/50 text-blue-100 hover:bg-blue-900/50 hover:text-white px-8 py-6 text-lg group bg-white/10 backdrop-blur-sm"
            >
              Learn More
            </Button>
          </div>

          {/* Terminal Demo */}
          <div className={`bg-slate-900/60 backdrop-blur-md border border-blue-400/30 rounded-lg p-6 mb-8 max-w-2xl mx-auto transition-all duration-1000 delay-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="flex items-center mb-4">
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <span className="text-blue-300 text-sm ml-4 code-font">hades-terminal</span>
            </div>
            <div className="text-left">
              <span className="text-blue-300 code-font">{terminalText}</span>
              <span className="animate-terminal-blink text-blue-300">|</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}