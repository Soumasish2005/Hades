import React from 'react'
import { Download as DownloadIcon, Terminal, Globe, Apple, Monitor, Smartphone } from 'lucide-react'

const Download: React.FC = () => {
  const downloadOptions = [
    {
      title: 'CLI Tool',
      description: 'Command-line interface for advanced users and automation',
      icon: Terminal,
      platforms: [
        { name: 'macOS', icon: Apple, size: '15.2 MB' },
        { name: 'Windows', icon: Monitor, size: '18.4 MB' },
        { name: 'Linux', icon: Terminal, size: '12.8 MB' }
      ],
      features: [
        'Automated security scanning',
        'Vulnerability assessment',
        'Custom script integration',
        'Batch processing capabilities'
      ]
    },
    {
      title: 'Agent SDK',
      description: 'Software development kit for custom integrations',
      icon: Globe,
      platforms: [
        { name: 'JavaScript', icon: Globe, size: '2.4 MB' },
        { name: 'Python', icon: Terminal, size: '3.1 MB' },
        { name: 'Go', icon: Monitor, size: '5.2 MB' }
      ],
      features: [
        'RESTful API access',
        'Real-time monitoring hooks',
        'Custom threat detection',
        'Enterprise integrations'
      ]
    }
  ]

  const requirements = {
    minimum: {
      os: 'Windows 10, macOS 10.15, Ubuntu 18.04',
      ram: '4 GB RAM',
      storage: '500 MB available space',
      network: 'Internet connection required'
    },
    recommended: {
      os: 'Windows 11, macOS 12.0, Ubuntu 20.04',
      ram: '8 GB RAM',
      storage: '2 GB available space',
      network: 'Broadband internet connection'
    }
  }

  return (
    <section id="download" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-purple rounded-full text-sm text-white mb-6">
            <DownloadIcon size={16} />
            Download Hades
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Get Started with{' '}
            <span className="bg-gradient-to-r from-cyber-blue to-cyber-purple bg-clip-text text-transparent">
              Hades Today
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Choose the right version of Hades for your security needs. 
            From command-line tools to SDK integrations, we have you covered.
          </p>
        </div>

        {/* Download Options */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {downloadOptions.map((option, index) => (
            <div
              key={option.title}
              className="glass p-8 rounded-2xl hover:bg-white hover:bg-opacity-10 transition-all duration-300 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-purple rounded-2xl flex items-center justify-center">
                  <option.icon size={28} className="text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">{option.title}</h3>
                  <p className="text-gray-400">{option.description}</p>
                </div>
              </div>

              {/* Platform Downloads */}
              <div className="space-y-3 mb-6">
                {option.platforms.map((platform) => (
                  <div
                    key={platform.name}
                    className="flex items-center justify-between p-4 bg-cyber-gray rounded-lg hover:bg-opacity-80 transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <platform.icon size={20} className="text-gray-400" />
                      <span className="text-white font-medium">{platform.name}</span>
                      <span className="text-gray-400 text-sm">({platform.size})</span>
                    </div>
                    <DownloadIcon size={20} className="text-cyber-blue group-hover:scale-110 transition-transform" />
                  </div>
                ))}
              </div>

              {/* Features */}
              <div>
                <h4 className="text-white font-semibold mb-3">Key Features:</h4>
                <div className="space-y-2">
                  {option.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* System Requirements */}
        <div className="glass p-8 rounded-2xl">
          <h3 className="text-2xl font-bold text-white mb-8 text-center">System Requirements</h3>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Smartphone size={20} />
                Minimum Requirements
              </h4>
              <div className="space-y-3">
                <div>
                  <span className="text-gray-400 text-sm">Operating System:</span>
                  <div className="text-white">{requirements.minimum.os}</div>
                </div>
                <div>
                  <span className="text-gray-400 text-sm">Memory:</span>
                  <div className="text-white">{requirements.minimum.ram}</div>
                </div>
                <div>
                  <span className="text-gray-400 text-sm">Storage:</span>
                  <div className="text-white">{requirements.minimum.storage}</div>
                </div>
                <div>
                  <span className="text-gray-400 text-sm">Network:</span>
                  <div className="text-white">{requirements.minimum.network}</div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Monitor size={20} />
                Recommended Requirements
              </h4>
              <div className="space-y-3">
                <div>
                  <span className="text-gray-400 text-sm">Operating System:</span>
                  <div className="text-white">{requirements.recommended.os}</div>
                </div>
                <div>
                  <span className="text-gray-400 text-sm">Memory:</span>
                  <div className="text-white">{requirements.recommended.ram}</div>
                </div>
                <div>
                  <span className="text-gray-400 text-sm">Storage:</span>
                  <div className="text-white">{requirements.recommended.storage}</div>
                </div>
                <div>
                  <span className="text-gray-400 text-sm">Network:</span>
                  <div className="text-white">{requirements.recommended.network}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Installation Help */}
        <div className="mt-8 text-center glass p-6 rounded-xl">
          <p className="text-gray-300 mb-4">
            Need help with installation? Check our documentation or contact support.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="glass text-white px-6 py-2 rounded-full font-medium hover:bg-white hover:bg-opacity-20 transition-all">
              Installation Guide
            </button>
            <button className="glass text-white px-6 py-2 rounded-full font-medium hover:bg-white hover:bg-opacity-20 transition-all">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Download