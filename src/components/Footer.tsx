import React from 'react';
import { BUSINESS_INFO } from '../data/businessData';
import { Phone, MapPin, MessageCircle, Star, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#05070a] text-slate-400 border-t border-white/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/5">
          
          {/* Brand Col (5 cols) */}
          <div className="lg:col-span-5">
            <a href="#" className="inline-block mb-4">
              <span className="font-heading text-2xl font-black tracking-wider text-white">
                PURE DETAILING <span className="text-[#d4a359]">UK</span>
              </span>
            </a>
            <p className="text-[#f3cf8c] font-medium text-sm mb-4">
              Premium Car Detailing in Chelmsford
            </p>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm mb-6">
              Precision detailing, paint enhancement, and pristine finishes. Meticulous care for high-end and everyday vehicles in Chelmsford, Essex.
            </p>

            {/* Google Rating Badge */}
            <div className="inline-flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/10">
              <div className="flex items-center text-[#d4a359]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-[#d4a359]" />
                ))}
              </div>
              <span className="text-xs text-white font-medium">5.0 Star Rating on Google</span>
              <span className="text-slate-500 text-xs">({BUSINESS_INFO.googleReviewCount} Reviews)</span>
            </div>
          </div>

          {/* Quick Links (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-4">
              Quick Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#services" className="hover:text-[#d4a359] transition-colors">Services</a>
              </li>
              <li>
                <a href="#results" className="hover:text-[#d4a359] transition-colors">Before & After</a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-[#d4a359] transition-colors">Portfolio Gallery</a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-[#d4a359] transition-colors">Google Reviews</a>
              </li>
              <li>
                <a href="#about" className="hover:text-[#d4a359] transition-colors">About Us</a>
              </li>
              <li>
                <a href="#faq" className="hover:text-[#d4a359] transition-colors">FAQ</a>
              </li>
              <li>
                <a href="#quote" className="hover:text-[#d4a359] transition-colors">Request a Quote</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#d4a359] transition-colors">Studio Location</a>
              </li>
            </ul>
          </div>

          {/* Studio Contact (4 cols) */}
          <div className="lg:col-span-4">
            <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-4">
              Chelmsford Studio
            </h4>
            <div className="space-y-3.5 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#d4a359] shrink-0 mt-0.5" />
                <span>
                  {BUSINESS_INFO.address}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#d4a359] shrink-0" />
                <a href={`tel:${BUSINESS_INFO.phoneRaw}`} className="text-white hover:text-[#d4a359] font-medium transition-colors">
                  {BUSINESS_INFO.phone}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <MessageCircle className="w-4 h-4 text-[#25D366] shrink-0" />
                <a
                  href={BUSINESS_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  WhatsApp Studio Chat
                </a>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/5">
              <span className="text-xs text-slate-400 block mb-1">Opening Hours:</span>
              <p className="text-white text-xs font-semibold">{BUSINESS_INFO.openingHours}</p>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} {BUSINESS_INFO.name}. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Chelmsford, United Kingdom</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.1] text-white transition-colors flex items-center gap-1.5"
              aria-label="Scroll back to top"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
