'use client';

import { Building, Briefcase, Heart, GraduationCap } from 'lucide-react';

export default function IndustriesSection() {
  const industries = [
    {
      icon: Building,
      title: 'For IT Operations',
      description: 'Streamline your security operations with automated threat detection, incident response, and comprehensive monitoring tools designed specifically for IT teams managing complex infrastructures.'
    },
    {
      icon: Briefcase,
      title: 'For Business Leaders',
      description: 'Executive-level security insights with comprehensive dashboards, risk assessments, and strategic reporting that enables informed decision-making for business continuity.'
    },
    {
      icon: Heart,
      title: 'For Healthcare',
      description: 'HIPAA-compliant security solutions that protect sensitive patient data while maintaining operational efficiency and ensuring regulatory compliance across all healthcare systems.'
    },
    {
      icon: GraduationCap,
      title: 'For MSSP Partners',
      description: 'White-label security platform that enables managed service providers to deliver enterprise-grade protection with scalable solutions and comprehensive client management tools.'
    }
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Smart security across industries
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {industries.map((industry, index) => (
            <div key={index} className="bg-gray-800/30 rounded-xl p-8 border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 hover:bg-gray-800/50">
              <div className="flex items-start space-x-6">
                <div className="w-16 h-16 bg-purple-600/20 rounded-xl flex items-center justify-center flex-shrink-0 border border-purple-500/30">
                  <industry.icon className="h-8 w-8 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">
                    {industry.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {industry.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}