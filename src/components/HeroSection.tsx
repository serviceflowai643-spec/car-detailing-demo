import React from 'react';
import { BUSINESS_INFO } from '../data/businessData';
import { Star, MapPin, ArrowRight, Shield, Sparkles, ChevronDown } from 'lucide-react';

interface HeroSectionProps {
  onBookClick: () => void;
  onQuoteClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onBookClick, onQuoteClick }) => {
  return (
    <section className="relative min-h-[92vh] sm:min-h-[94vh] flex items-center justify-center overflow-hidden bg-[#07090c]">
      {/* Background Hero Image with Studio Automotive Lighting */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/hero_detailing_studio_1791338067380.jpg"
          alt="Professionally detailed luxury sports car inside high-end detailing studio"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center filter brightness-[0.52] contrast-[1.08] scale-[1.01] transition-transform duration-1000"
        />

        {/* Cinematic Vignette & Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080a0d] via-[#080a0d]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080a0d]/90 via-transparent to-[#080a0d]/90" />
        
        {/* Subtle Warm Metallic Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[750px] h-[350px] bg-[#d4a359]/12 rounded-full blur-[160px] pointer-events-none" />
      </div>

      {/* Grid texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px)`,
          backgroundSize: '32px 32px'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20 sm:py-28 text-center flex flex-col items-center">
        
        {/* Badge: Subheading brand badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-[#d4a359]/40 text-[#f3cf8c] text-xs font-semibold uppercase tracking-[0.2em] mb-6 shadow-xl animate-fadeIn">
          <Sparkles className="w-3.5 h-3.5 text-[#d4a359]" />
          <span>PURE DETAILING UK</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white max-w-5xl leading-[1.05] mb-6">
          Precision detailing.<br />
          <span className="gold-gradient-text">Pristine finish.</span>
        </h1>

        {/* Supporting text */}
        <p className="text-lg sm:text-xl md:text-2xl text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed mb-10 text-balance">
          Premium car detailing in Chelmsford, focused on bringing out the best in every vehicle.
        </p>

        {/* Call to Actions */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 w-full sm:w-auto mb-14">
          <button
            onClick={onBookClick}
            className="px-8 py-4 rounded-xl bg-[#d4a359] hover:bg-[#e2a856] text-black font-bold text-base transition-all duration-200 shadow-xl shadow-[#d4a359]/25 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Book Your Detail</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onQuoteClick}
            className="px-8 py-4 rounded-xl bg-white/[0.08] hover:bg-white/[0.14] text-white border border-white/20 font-semibold text-base transition-all duration-200 backdrop-blur-md flex items-center justify-center gap-2 cursor-pointer hover:border-[#d4a359]/60"
          >
            <span>Get a Quote</span>
          </button>
        </div>

        {/* Small Trust Indicators */}
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 pt-6 border-t border-white/10 text-xs sm:text-sm text-slate-300">
          
          {/* Trust 1: Google Rating */}
          <div className="flex items-center gap-2">
            <div className="flex items-center text-[#d4a359]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#d4a359]" />
              ))}
            </div>
            <span className="font-bold text-white">5.0 Google Rating</span>
            <span className="text-slate-400">({BUSINESS_INFO.googleReviewCount} Reviews)</span>
          </div>

          <span className="hidden sm:inline text-white/20">|</span>

          {/* Trust 2: Location */}
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#d4a359]" />
            <span className="font-semibold text-white">Based in Chelmsford, UK</span>
            <span className="text-slate-400">(Unit 16, Pool's Ln)</span>
          </div>

          <span className="hidden sm:inline text-white/20">|</span>

          {/* Trust 3: Status */}
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-slate-300">Opens 9 AM</span>
          </div>

        </div>

      </div>

      {/* Subtle Scroll Indicator */}
      <a
        href="#services"
        className="absolute bottom-4 left-1/2 -translate-x-1/2 text-slate-500 hover:text-white transition-colors flex flex-col items-center gap-1 z-10"
        aria-label="Scroll down to services"
      >
        <span className="text-[10px] tracking-widest uppercase font-mono">Explore</span>
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </a>
    </section>
  );
};
