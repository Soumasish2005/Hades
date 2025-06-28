'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-blue-500/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <Shield className="h-8 w-8 text-blue-400 group-hover:text-blue-300 transition-colors glow-blue" />
            <span className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors">
              Hades
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="#features" className="text-blue-300 hover:text-blue-400 transition-colors">
              Features
            </Link>
            <Link href="#how-it-works" className="text-blue-300 hover:text-blue-400 transition-colors">
              How It Works
            </Link>
            <Link href="#pricing" className="text-blue-300 hover:text-blue-400 transition-colors">
              Pricing
            </Link>
            <Link href="#faq" className="text-blue-300 hover:text-blue-400 transition-colors">
              FAQ
            </Link>
          </div>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/signin">
              <Button variant="ghost" className="text-blue-300 hover:text-blue-400 hover:bg-blue-950/50">
                Sign In
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold glow-blue border-0">
                Get Started
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-blue-300 hover:text-blue-400 transition-colors"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-slate-900/95 backdrop-blur-md border-b border-blue-500/30">
            <div className="px-4 py-6 space-y-4">
              <Link 
                href="#features" 
                className="block text-blue-300 hover:text-blue-400 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Features
              </Link>
              <Link 
                href="#how-it-works" 
                className="block text-blue-300 hover:text-blue-400 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                How It Works
              </Link>
              <Link 
                href="#pricing" 
                className="block text-blue-300 hover:text-blue-400 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Pricing
              </Link>
              <Link 
                href="#faq" 
                className="block text-blue-300 hover:text-blue-400 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                FAQ
              </Link>
              <div className="pt-4 space-y-2">
                <Link href="/signin" onClick={() => setIsOpen(false)}>
                  <Button variant="ghost" className="w-full text-blue-300 hover:text-blue-400 hover:bg-blue-950/50">
                    Sign In
                  </Button>
                </Link>
                <Link href="/signup" onClick={() => setIsOpen(false)}>
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold border-0">
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}