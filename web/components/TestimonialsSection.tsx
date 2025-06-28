'use client';

import { Star } from 'lucide-react';

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'CTO',
      company: 'TechCorp',
      content: 'Hades has completely transformed our security posture. The AI-driven insights have helped us prevent multiple potential breaches and saved us millions in potential damages.',
      rating: 5,
      avatar: 'SC'
    },
    {
      name: 'Michael Rodriguez',
      role: 'Security Director',
      company: 'GlobalBank',
      content: 'The real-time monitoring capabilities are exceptional. We now have complete visibility into our security landscape with automated responses that work 24/7.',
      rating: 5,
      avatar: 'MR'
    },
    {
      name: 'Emily Johnson',
      role: 'IT Manager',
      company: 'HealthSystem',
      content: 'Implementation was seamless and the support team is outstanding. The HIPAA compliance features are exactly what we needed for our healthcare environment.',
      rating: 5,
      avatar: 'EJ'
    }
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            What others said
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-800/30 rounded-xl p-6 border border-gray-700/50 backdrop-blur-sm hover:bg-gray-800/50 transition-all duration-300">
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              
              <p className="text-gray-300 mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>
              
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm mr-4">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="text-white font-medium">{testimonial.name}</div>
                  <div className="text-gray-400 text-sm">{testimonial.role}, {testimonial.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}