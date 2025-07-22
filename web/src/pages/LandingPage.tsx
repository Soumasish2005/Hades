import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Features from '../components/Features'
import Reviews from '../components/Reviews'
import Download from '../components/Download'
import Footer from '../components/Footer'

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <Reviews />
      <Download />
      <Footer />
    </div>
  )
}

export default LandingPage