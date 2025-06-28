import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import UseCases from '@/components/UseCases';
import TechnicalBenefits from '@/components/TechnicalBenefits';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen section-bg">
      <Navbar />
      <Hero />
      <Features />
      <UseCases />
      <TechnicalBenefits />
      <Footer />
    </main>
  );
}