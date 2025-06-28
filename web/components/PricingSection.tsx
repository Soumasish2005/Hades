'use client';

import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function PricingSection() {
  const plans = [
    {
      name: 'Basic Plan',
      price: 'Free',
      description: 'Perfect for individuals and small teams getting started with cybersecurity protection.',
      features: [
        'Basic threat monitoring',
        'Email support',
        'Standard reporting',
        'Up to 5 endpoints',
        'Community access'
      ],
      cta: 'Get Started',
      popular: false,
      href: '/signup'
    },
    {
      name: 'Professional',
      price: '$199',
      period: 'per month',
      description: 'Advanced protection for growing businesses and organizations requiring enterprise-grade security.',
      features: [
        'Advanced threat detection',
        'Real-time monitoring',
        'Priority support',
        'Custom integrations',
        'Advanced analytics',
        'Unlimited endpoints',
        'API access',
        'Custom reporting'
      ],
      cta: 'Start Free Trial',
      popular: true,
      href: '/signup'
    }
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Choose a plan
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <div key={index} className={`bg-gray-800/30 rounded-2xl p-8 border ${plan.popular ? 'border-purple-500 bg-gray-800/50' : 'border-gray-700/50'} relative backdrop-blur-sm`}>
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="text-center mb-8">
                <h3 className="text-xl font-semibold text-white mb-4">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-5xl font-bold text-white">{plan.price}</span>
                  {plan.period && <span className="text-gray-400 ml-2 text-lg">{plan.period}</span>}
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">{plan.description}</p>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <Check className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link href={plan.href}>
                <Button 
                  className={`w-full py-3 text-lg font-semibold ${plan.popular 
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0' 
                    : 'bg-transparent border-2 border-gray-600 text-gray-300 hover:bg-gray-800/50 hover:border-gray-500'
                  } rounded-xl`}
                >
                  {plan.cta}
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}