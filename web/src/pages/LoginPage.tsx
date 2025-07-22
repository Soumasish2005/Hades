import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Shield, Lock, Zap } from 'lucide-react'
import AuthButton from '../components/AuthButton'

const LoginPage: React.FC = () => {
  return (
    <div className="min-h-screen flex">
      {/* Background particles */}
      <div className="bg-particles opacity-30 pointer-events-none"></div>
      
      {/* Floating geometric shapes */}
      <div className="fixed top-20 left-10 w-32 h-32 bg-gradient-to-r from-cyber-purple/10 to-transparent rounded-full blur-xl animate-float pointer-events-none"></div>
      <div className="fixed bottom-20 right-10 w-48 h-48 bg-gradient-to-r from-cyber-blue/10 to-transparent rounded-full blur-xl animate-float pointer-events-none" style={{ animationDelay: '3s' }}></div>

      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-center p-12 relative">
        <div className="max-w-md">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-gradient-purple rounded-full flex items-center justify-center">
              <Shield size={24} className="text-white" />
            </div>
            <span className="text-2xl font-bold text-white">Hades</span>
          </div>
          
          <h1 className="text-4xl font-bold text-white mb-6 leading-tight">
            Secure Your Digital World with{' '}
            <span className="bg-gradient-to-r from-cyber-blue to-cyber-purple bg-clip-text text-transparent">
              AI-Powered Security
            </span>
          </h1>
          
          <p className="text-gray-300 text-lg mb-8 leading-relaxed">
            Join thousands of security professionals who trust Hades for automated 
            threat detection, vulnerability assessment, and intelligent incident response.
          </p>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                <Shield size={16} className="text-green-400" />
              </div>
              <span className="text-gray-300">Enterprise-grade security</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                <Zap size={16} className="text-blue-400" />
              </div>
              <span className="text-gray-300">Real-time threat detection</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center">
                <Lock size={16} className="text-purple-400" />
              </div>
              <span className="text-gray-300">Automated incident response</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center p-8 lg:p-12 relative z-10">
        <div className="max-w-md mx-auto w-full">
          {/* Mobile Header */}
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-gradient-purple rounded-full flex items-center justify-center">
              <Shield size={20} className="text-white" />
            </div>
            <span className="text-xl font-bold text-white">Hades</span>
          </div>

          {/* Back Button */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>

          {/* Login Card */}
          <div className="glass p-8 rounded-2xl glow">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
              <p className="text-gray-400">
                Sign in to access your Hades security dashboard
              </p>
            </div>

            {/* Auth Buttons */}
            <AuthButton variant="page" />

            {/* Divider */}
            <div className="my-8 flex items-center">
              <div className="flex-1 border-t border-gray-600"></div>
              <span className="px-4 text-gray-400 text-sm">Secure Authentication</span>
              <div className="flex-1 border-t border-gray-600"></div>
            </div>

            {/* Security Notice */}
            <div className="bg-cyber-dark/50 p-4 rounded-lg border border-gray-700">
              <div className="flex items-start gap-3">
                <Lock size={16} className="text-cyber-blue mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-white font-medium text-sm mb-1">Secure Login</h4>
                  <p className="text-gray-400 text-xs leading-relaxed">
                    Your authentication is secured with industry-standard OAuth 2.0 protocols. 
                    We never store your passwords and your data is encrypted end-to-end.
                  </p>
                </div>
              </div>
            </div>

            {/* Terms */}
            <p className="text-center text-gray-500 text-xs mt-6">
              By signing in, you agree to our{' '}
              <a href="#" className="text-cyber-blue hover:underline">Terms of Service</a>
              {' '}and{' '}
              <a href="#" className="text-cyber-blue hover:underline">Privacy Policy</a>
            </p>
          </div>

          {/* Additional Info */}
          <div className="mt-8 text-center">
            <p className="text-gray-400 text-sm mb-4">
              New to Hades?{' '}
              <Link to="/" className="text-cyber-blue hover:underline">
                Learn more about our platform
              </Link>
            </p>
            
            <div className="flex items-center justify-center gap-6 text-xs text-gray-500">
              <span>🔒 SOC 2 Compliant</span>
              <span>🛡️ GDPR Ready</span>
              <span>⚡ 99.9% Uptime</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage