import React from 'react';
import { SERVICES, DetailingService } from '../data/businessData';
import { ArrowRight, Check, Sparkles } from 'lucide-react';

interface ServicesSectionProps {
  onSelectService: (serviceName: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  return (
    <section id="services" className="py-24 bg-[#090c10] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-[#d4a359] text-xs font-medium uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Studio Services</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
            Tailored automotive detailing.
          </h2>
          <p className="text-lg text-slate-400">
            Dedicated processes to clean, enhance, and protect your vehicle with precision craftsmanship in Chelmsford.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {SERVICES.map((service: DetailingService, index) => {
            const isFeatured = service.id === 'full-detail';

            return (
              <div
                key={service.id}
                className={`group relative rounded-2xl overflow-hidden flex flex-col bg-[#0e121a] border transition-all duration-300 hover:-translate-y-1.5 ${
                  isFeatured
                    ? 'border-[#d4a359]/50 shadow-2xl shadow-[#d4a359]/10 lg:-translate-y-2'
                    : 'border-white/10 hover:border-[#d4a359]/30 hover:shadow-xl hover:shadow-black/60'
                }`}
              >
                {/* Featured Badge */}
                {isFeatured && (
                  <div className="absolute top-3 right-3 z-20 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#d4a359] text-black shadow-lg">
                    Comprehensive Package
                  </div>
                )}

                {/* Service Card Image */}
                <div className="relative h-56 sm:h-64 overflow-hidden bg-black/60">
                  <img
                    src={service.image}
                    alt={service.name}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0e121a] via-[#0e121a]/30 to-transparent" />
                  
                  <div className="absolute bottom-3 left-4 right-4">
                    <span className="text-xs font-mono tracking-wider text-[#d4a359] uppercase block mb-1">
                      Option {String(index + 1).padStart(2, '0')}
                    </span>
                    <h3 className="text-2xl font-bold text-white group-hover:text-[#f3cf8c] transition-colors">
                      {service.name}
                    </h3>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-slate-300 text-sm leading-relaxed mb-6 font-normal">
                      {service.description}
                    </p>

                    {/* Features list */}
                    <div className="space-y-2.5 mb-8">
                      {service.features.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-2.5 text-xs text-slate-300">
                          <div className="w-4 h-4 rounded-full bg-[#d4a359]/10 border border-[#d4a359]/30 flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="w-2.5 h-2.5 text-[#d4a359]" />
                          </div>
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Enquire Now Button */}
                  <button
                    onClick={() => onSelectService(service.name)}
                    className={`w-full py-3 px-4 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer ${
                      isFeatured
                        ? 'bg-[#d4a359] text-black hover:bg-[#e2a856] shadow-lg shadow-[#d4a359]/20'
                        : 'bg-white/[0.04] text-white hover:bg-[#d4a359] hover:text-black border border-white/10 hover:border-[#d4a359]'
                    }`}
                  >
                    <span>Enquire Now</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Disclaimer / Transparency Note */}
        <div className="mt-12 text-center max-w-2xl mx-auto p-4 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-slate-400">
          <p>
            Every vehicle is personally assessed upon arrival at our Chelmsford studio to recommend the most suitable treatment for your paint condition and personal goals.
          </p>
        </div>
      </div>
    </section>
  );
};
