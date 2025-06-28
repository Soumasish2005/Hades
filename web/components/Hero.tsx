'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Play } from 'lucide-react';
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
    <section className="relative pt-40 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Purple glow effect */}
      <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-purple-500/20 rounded-full blur-3xl" />
      
      <div className="relative max-w-4xl mx-auto text-center mt-8">
        {/* Main Heading */}
        <h1 className={`text-5xl sm:text-6xl lg:text-7xl font-bold mb-8 leading-tight transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <span className="text-white">Your Hacking tasks,</span>
          <br />
          <span className="text-white">on </span>
          <span className="bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
            Autopilot.
          </span>
        </h1>

        {/* CTAs */}
        <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 mb-20 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <Link href="/signup">
            <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold px-8 py-4 text-lg border-0 rounded-lg">
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Button 
            size="lg" 
            variant="outline" 
            className="border-gray-600 text-gray-300 hover:bg-gray-800/50 hover:text-white px-8 py-4 text-lg rounded-lg bg-transparent backdrop-blur-sm"
          >
            <Play className="mr-2 h-5 w-5" />
            Watch Demo
          </Button>
        </div>

        {/* Terminal Demo - Keep the Hades typewriter effect */}
        <div className={`bg-gray-900/80 backdrop-blur-md border border-gray-700 rounded-xl p-6 max-w-2xl mx-auto transition-all duration-1000 delay-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="flex items-center mb-4">
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <span className="text-gray-400 text-sm ml-4 code-font">hades-terminal</span>
          </div>
          <div className="text-left">
            <span className="text-green-400 code-font">{terminalText}</span>
            <span className="animate-terminal-blink text-green-400">|</span>
          </div>
        </div>
      </div>
    </section>
  );
}