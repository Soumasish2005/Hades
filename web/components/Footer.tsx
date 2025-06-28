import Link from 'next/link';
import { Shield, Github, Twitter, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-950/80 border-t border-blue-400/30 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-blue-300 glow-blue" />
              <span className="text-xl font-bold cyber-text">Hades</span>
            </Link>
            <p className="text-blue-100 text-sm max-w-xs">
              Elite AI-powered cybersecurity agent for advanced penetration testing and ethical hacking operations.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-blue-300 hover:text-blue-200 transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-blue-300 hover:text-blue-200 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-blue-300 hover:text-blue-200 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-blue-300 hover:text-blue-200 transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-white font-semibold mb-4">Arsenal</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="#features" className="text-blue-100 hover:text-blue-200 transition-colors">Features</Link></li>
              <li><Link href="#pricing" className="text-blue-100 hover:text-blue-200 transition-colors">Pricing</Link></li>
              <li><Link href="#use-cases" className="text-blue-100 hover:text-blue-200 transition-colors">Use Cases</Link></li>
              <li><Link href="#" className="text-blue-100 hover:text-blue-200 transition-colors">Integrations</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="#documentation" className="text-blue-100 hover:text-blue-200 transition-colors">Documentation</Link></li>
              <li><Link href="#blog" className="text-blue-100 hover:text-blue-200 transition-colors">Blog</Link></li>
              <li><Link href="#" className="text-blue-100 hover:text-blue-200 transition-colors">API Reference</Link></li>
              <li><Link href="#" className="text-blue-100 hover:text-blue-200 transition-colors">Community</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold mb-4">Operations</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="text-blue-100 hover:text-blue-200 transition-colors">About</Link></li>
              <li><Link href="#" className="text-blue-100 hover:text-blue-200 transition-colors">Careers</Link></li>
              <li><Link href="#" className="text-blue-100 hover:text-blue-200 transition-colors">Contact</Link></li>
              <li><Link href="#" className="text-blue-100 hover:text-blue-200 transition-colors">Security</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-blue-400/30 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-blue-200 text-sm">
            © 2024 Hades Cybersecurity. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <Link href="#" className="text-blue-200 hover:text-blue-100 text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-blue-200 hover:text-blue-100 text-sm transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="text-blue-200 hover:text-blue-100 text-sm transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}