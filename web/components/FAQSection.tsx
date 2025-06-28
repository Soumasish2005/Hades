'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function FAQSection() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const faqs = [
    {
      question: 'How does Hades protect my business?',
      answer: 'Hades uses advanced AI and machine learning to provide real-time threat detection, automated response, and continuous monitoring of your digital infrastructure with zero-day protection capabilities.'
    },
    {
      question: 'How much does Hades cost?',
      answer: 'We offer flexible pricing plans starting from our free Basic plan for individuals, with Professional plans at $199/month for advanced features and enterprise solutions for larger organizations.'
    },
    {
      question: 'Is my data safe with Hades?',
      answer: 'Yes, we use enterprise-grade encryption, follow strict security protocols, and maintain SOC 2 compliance to ensure your data remains secure and private at all times with zero-trust architecture.'
    },
    {
      question: 'What platforms does Hades support?',
      answer: 'Hades supports all major platforms including Windows, macOS, Linux, and provides comprehensive cloud security for AWS, Azure, Google Cloud, and hybrid environments.'
    }
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8">
              Frequently asked
            </h2>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-gray-700/50 rounded-xl bg-gray-800/20 backdrop-blur-sm">
                <button
                  className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-800/30 transition-colors rounded-xl"
                  onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                >
                  <span className="text-white font-medium pr-4">{faq.question}</span>
                  {openFAQ === index ? (
                    <ChevronUp className="h-5 w-5 text-gray-400 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-400 flex-shrink-0" />
                  )}
                </button>
                {openFAQ === index && (
                  <div className="px-6 pb-5">
                    <p className="text-gray-400 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}