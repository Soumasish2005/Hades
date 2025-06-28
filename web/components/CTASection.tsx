'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function CTASection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
          Don't wait for a breach to take action.
        </h2>
        <p className="text-xl text-gray-300 mb-10 leading-relaxed">
          Start protecting your digital environment today with Hades.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/signup">
            <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold px-8 py-4 text-lg border-0 rounded-xl">
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Button 
            size="lg" 
            variant="outline" 
            className="border-2 border-gray-600 text-gray-300 hover:bg-gray-800/50 hover:border-gray-500 hover:text-white px-8 py-4 text-lg bg-transparent rounded-xl"
          >
            Contact Sales
          </Button>
        </div>
      </div>
    </section>
  );
}