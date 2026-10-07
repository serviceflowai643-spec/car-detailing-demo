import React from 'react';
import { BUSINESS_INFO } from '../data/businessData';
import { MapPin, Phone, Clock, Navigation, ExternalLink, ShieldCheck } from 'lucide-react';

export const LocationSection: React.FC = () => {
  return (
    <section id="contact" className="py-24 bg-[#080a0e] relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-[#d4a359] text-xs font-medium uppercase tracking-widest mb-4">
            <MapPin className="w-3.5 h-3.5" />
            <span>Studio Location</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
            Visit our Chelmsford studio.
          </h2>
          <p className="text-lg text-slate-400">
            Conveniently located with dedicated private workshop bays, ready for drop-off and collection.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Information Card (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between p-8 sm:p-10 rounded-3xl bg-[#0e121a] border border-white/10 shadow-2xl">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs uppercase tracking-widest text-[#d4a359] font-mono">
                  {BUSINESS_INFO.category}
                </span>
                <span className="text-slate-600">·</span>
                <span className="text-xs text-slate-400">Chelmsford, UK</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6">
                {BUSINESS_INFO.name}
              </h3>

              {/* Detail Items */}
              <div className="space-y-6 mb-8">
                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#d4a359]/10 border border-[#d4a359]/30 flex items-center justify-center text-[#d4a359] shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-sm">Studio Address</h4>
                    <p className="text-slate-300 text-sm mt-0.5 leading-relaxed">
                      Unit 16, Yard, 1 Pool's Ln<br />
                      Chelmsford CM1 3QL<br />
                      United Kingdom
                    </p>
                  </div>
                </div>

                {/* Telephone */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#d4a359]/10 border border-[#d4a359]/30 flex items-center justify-center text-[#d4a359] shrink-0 mt-0.5">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-sm">Direct Telephone</h4>
                    <a
                      href={`tel:${BUSINESS_INFO.phoneRaw}`}
                      className="text-[#d4a359] hover:underline text-base font-bold mt-0.5 block"
                    >
                      {BUSINESS_INFO.phone}
                    </a>
                    <span className="text-xs text-slate-400">Direct studio line & WhatsApp</span>
                  </div>
                </div>

                {/* Opening Status */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#d4a359]/10 border border-[#d4a359]/30 flex items-center justify-center text-[#d4a359] shrink-0 mt-0.5">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-sm">Opening Status</h4>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <p className="text-slate-200 text-sm font-medium">Opens 9 AM</p>
                    </div>
                    <span className="text-xs text-slate-400">Monday to Saturday · By appointment & drop-in</span>
                  </div>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-white/5">
              <a
                href={BUSINESS_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3.5 px-4 rounded-xl bg-[#d4a359] hover:bg-[#e2a856] text-black font-semibold text-sm flex items-center justify-center gap-2 transition-colors shadow-lg shadow-[#d4a359]/20"
              >
                <Navigation className="w-4 h-4" />
                <span>Get Directions</span>
              </a>
              <a
                href={`tel:${BUSINESS_INFO.phoneRaw}`}
                className="flex-1 py-3.5 px-4 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-white border border-white/10 text-sm font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <Phone className="w-4 h-4 text-[#d4a359]" />
                <span>Call Now</span>
              </a>
            </div>
          </div>

          {/* Interactive Map Preview Card (7 cols) */}
          <div className="lg:col-span-7 rounded-3xl overflow-hidden border border-white/10 relative shadow-2xl bg-[#0f131a] flex flex-col min-h-[400px]">
            {/* Embedded Google Map Iframe for Chelmsford CM1 3QL */}
            <div className="relative w-full flex-1 min-h-[360px]">
              <iframe
                title="Pure Detailing UK Location Map"
                src="https://maps.google.com/maps?q=Unit%2016,%20Yard,%201%20Pool's%20Ln,%20Chelmsford%20CM1%203QL&t=&z=14&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full min-h-[360px] border-0 filter invert-[90%] hue-rotate-180 contrast-95 brightness-90"
                loading="lazy"
                allowFullScreen
              />

              {/* Floating studio badge on map */}
              <div className="absolute top-4 left-4 p-4 rounded-2xl bg-black/85 backdrop-blur-md border border-white/15 shadow-2xl max-w-xs">
                <div className="flex items-center gap-2 text-[#d4a359] text-xs font-semibold mb-1">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Pure Detailing Studio</span>
                </div>
                <p className="text-white text-xs font-medium">Unit 16, Yard, 1 Pool's Ln</p>
                <p className="text-slate-400 text-[11px]">Chelmsford CM1 3QL</p>
                <a
                  href={BUSINESS_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 text-[11px] text-[#d4a359] hover:underline flex items-center gap-1 font-semibold"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Bottom info strip */}
            <div className="p-4 bg-[#0a0d14] border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
              <span>Secure parking & gated yard access available upon arrival.</span>
              <span className="font-mono text-slate-300">CM1 3QL · Chelmsford</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
