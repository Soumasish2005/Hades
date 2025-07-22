import React from 'react'
import { Star, Quote } from 'lucide-react'

const Reviews: React.FC = () => {
  const reviews = [
    {
      id: 1,
      name: 'Sarah Chen',
      role: 'Senior Security Engineer',
      company: 'TechCorp',
      rating: 5,
      content: 'Hades has revolutionized our security workflow. The CLI tool is incredibly powerful and the AI assistant helps us identify threats we might have missed. Our incident response time has improved by 60%.',
      avatar: 'SC'
    },
    {
      id: 2,
      name: 'Marcus Rodriguez',
      role: 'CISO',
      company: 'Financial Services Inc.',
      rating: 5,
      content: 'The automated threat detection capabilities are outstanding. Hades caught several sophisticated attacks that our previous tools missed. The ROI has been incredible.',
      avatar: 'MR'
    },
    {
      id: 3,
      name: 'Emily Watson',
      role: 'DevSecOps Lead',
      company: 'CloudNative Solutions',
      rating: 5,
      content: 'Integration was seamless and the learning curve was minimal. The web interface is intuitive and the CLI tool fits perfectly into our existing DevOps pipeline.',
      avatar: 'EW'
    },
    {
      id: 4,
      name: 'David Kim',
      role: 'Security Architect',
      company: 'Enterprise Systems',
      rating: 5,
      content: 'Hades AI assistant is like having a security expert available 24/7. It provides intelligent insights and actionable recommendations that have significantly improved our security posture.',
      avatar: 'DK'
    }
  ]

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        size={16}
        className={index < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}
      />
    ))
  }

  return (
    <section id="reviews" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-purple rounded-full text-sm text-white mb-6">
            <Quote size={16} />
            User Reviews
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Trusted by{' '}
            <span className="bg-gradient-to-r from-cyber-blue to-cyber-purple bg-clip-text text-transparent">
              Security Professionals
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            See how cybersecurity teams around the world are using Hades to 
            automate their security workflows and improve their threat detection capabilities.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-white mb-2">4.9/5</div>
            <div className="text-gray-400">Average Rating</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-white mb-2">2,500+</div>
            <div className="text-gray-400">Active Users</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-white mb-2">99.8%</div>
            <div className="text-gray-400">Uptime</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-white mb-2">24/7</div>
            <div className="text-gray-400">Support</div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {reviews.map((review, index) => (
            <div
              key={review.id}
              className="glass p-8 rounded-2xl hover:bg-white hover:bg-opacity-10 transition-all duration-300 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-purple rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0">
                  {review.avatar}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {renderStars(review.rating)}
                  </div>
                  
                  <p className="text-gray-300 mb-4 leading-relaxed">
                    "{review.content}"
                  </p>
                  
                  <div>
                    <div className="text-white font-semibold">{review.name}</div>
                    <div className="text-gray-400 text-sm">{review.role}</div>
                    <div className="text-gray-500 text-sm">{review.company}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center glass p-8 md:p-12 rounded-3xl">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Join Thousands of Security Professionals
          </h3>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Experience the power of automated cybersecurity. Start your free trial today 
            and see why security teams choose Hades for their critical infrastructure protection.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-purple text-white px-8 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity glow">
              Start Free Trial
            </button>
            <button className="glass text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:bg-opacity-20 transition-all">
              Request Demo
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Reviews