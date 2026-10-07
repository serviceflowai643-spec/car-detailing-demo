import React from 'react';
import { BUSINESS_INFO } from '../data/businessData';
import { Sparkles, MapPin, Check, ArrowRight } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-[#080b0f] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Image Collage */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-[#0f131a]">
              <img
                src="/src/assets/images/service_full_detail_1791338129922.jpg"
                alt="Pure Detailing UK Studio Craftsmanship in Chelmsford"
                referrerPolicy="no-referrer"
                className="w-full h-[420px] sm:h-[480px] object-cover filter contrast-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080b0f] via-transparent to-transparent opacity-80" />

              {/* Floating Badge */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-black/80 backdrop-blur-md border border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#d4a359]/20 border border-[#d4a359]/30 flex items-center justify-center text-[#d4a359]">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">Chelmsford Studio</p>
                    <p className="text-slate-400 text-xs">Unit 16, Yard, 1 Pool's Ln, CM1 3QL</p>
                  </div>
                </div>
                <span className="text-xs font-mono text-[#d4a359] bg-[#d4a359]/10 px-2.5 py-1 rounded-md border border-[#d4a359]/20">
                  Opens 9 AM
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative */}
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-[#d4a359] text-xs font-medium uppercase tracking-widest mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              <span>About Pure Detailing UK</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">
              Detailing done properly.
            </h2>

            <p className="text-lg text-slate-300 leading-relaxed mb-6 font-normal">
              Pure Detailing UK is a car detailing service based in Chelmsford, dedicated to giving vehicles a cleaner, sharper and more refined finish. From the exterior paintwork to the interior cabin, every detail matters.
            </p>

            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3.5 mb-8">
              <div className="flex items-start gap-3 text-sm text-slate-300">
                <div className="w-5 h-5 rounded-full bg-[#d4a359]/20 border border-[#d4a359]/40 flex items-center justify-center text-[#d4a359] shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-[#d4a359]" />
                </div>
                <span>Hands-on work led by Alex and Nathan with genuine passion for pristine finishes.</span>
              </div>
              <div className="flex items-start gap-3 text-sm text-slate-300">
                <div className="w-5 h-5 rounded-full bg-[#d4a359]/20 border border-[#d4a359]/40 flex items-center justify-center text-[#d4a359] shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-[#d4a359]" />
                </div>
                <span>Thorough processes tailored to vehicle paint, upholstery, wheels and condition.</span>
              </div>
              <div className="flex items-start gap-3 text-sm text-slate-300">
                <div className="w-5 h-5 rounded-full bg-[#d4a359]/20 border border-[#d4a359]/40 flex items-center justify-center text-[#d4a359] shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-[#d4a359]" />
                </div>
                <span>Convenient drop-off studio location in Chelmsford with dedicated detailing bay.</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <a
                href="#quote"
                className="px-6 py-3.5 rounded-xl bg-[#d4a359] text-black font-semibold text-sm hover:bg-[#e2a856] transition-colors text-center shadow-lg shadow-[#d4a359]/20 flex items-center justify-center gap-2"
              >
                <span>Book Your Detail</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href={`tel:${BUSINESS_INFO.phoneRaw}`}
                className="px-6 py-3.5 rounded-xl bg-white/[0.04] text-white hover:bg-white/[0.08] border border-white/10 text-sm font-semibold transition-colors text-center"
              >
                Call: {BUSINESS_INFO.phoneDisplay}
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
