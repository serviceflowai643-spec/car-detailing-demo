import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ServicesSection } from './components/ServicesSection';
import { BeforeAfterSection } from './components/BeforeAfterSlider';
import { GallerySection } from './components/GallerySection';
import { WhyChooseUs } from './components/WhyChooseUs';
import { ReviewsSection } from './components/ReviewsSection';
import { AboutSection } from './components/AboutSection';
import { FAQSection } from './components/FAQSection';
import { BookingQuoteSection } from './components/BookingQuoteSection';
import { LocationSection } from './components/LocationSection';
import { Footer } from './components/Footer';
import { AskPureAI } from './components/AskPureAI';
import { OpeningAnimation } from './components/OpeningAnimation';

export default function App() {
  const [selectedService, setSelectedService] = useState<string>('Full Detail');
  const [showOpeningAnimation, setShowOpeningAnimation] = useState(true);

  const scrollToQuote = (serviceName?: string) => {
    if (serviceName) {
      setSelectedService(serviceName);
    }
    const quoteElement = document.getElementById('quote');
    if (quoteElement) {
      quoteElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#080a0d] text-[#e8ebf0] selection:bg-[#d4a359]/30 selection:text-white flex flex-col font-sans">
      {/* Luxury Automotive Opening Animation */}
      {showOpeningAnimation && (
        <OpeningAnimation onComplete={() => setShowOpeningAnimation(false)} />
      )}

      {/* Sticky Navigation */}
      <Navbar
        onBookClick={() => scrollToQuote()}
        onReplayIntro={() => setShowOpeningAnimation(true)}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection
          onBookClick={() => scrollToQuote()}
          onQuoteClick={() => scrollToQuote()}
        />

        {/* Brand Mission Statement Bar */}
        <section className="bg-gradient-to-r from-[#0d1017] via-[#141a26] to-[#0d1017] py-6 border-t border-b border-white/5">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="text-base sm:text-lg md:text-xl font-semibold tracking-wide text-white">
              <span className="text-[#d4a359]">Premium detailing.</span> Professional finish.{' '}
              <span className="text-slate-300">Your car deserves better.</span>
            </p>
          </div>
        </section>

        {/* Services Section */}
        <ServicesSection onSelectService={(service) => scrollToQuote(service)} />

        {/* Interactive Before / After Section */}
        <BeforeAfterSection />

        {/* Portfolio Gallery Section */}
        <GallerySection />

        {/* Why Choose Pure Detailing UK */}
        <WhyChooseUs />

        {/* Real Google Reviews Section */}
        <ReviewsSection />

        {/* About Section */}
        <AboutSection />

        {/* Frequently Asked Questions */}
        <FAQSection />

        {/* Booking / Quote Enquiry Section */}
        <BookingQuoteSection
          selectedService={selectedService}
          onServiceChange={(service) => setSelectedService(service)}
        />

        {/* Studio Location & Contact Section */}
        <LocationSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Receptionist AI Assistant Dock */}
      <AskPureAI onOpenBooking={(service) => scrollToQuote(service)} />
    </div>
  );
}
