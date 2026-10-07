import React from 'react';
import { WHY_CHOOSE_US } from '../data/businessData';
import { Sparkles, ShieldCheck, Award, MapPin, Wrench, ThumbsUp } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  Sparkles: <Sparkles className="w-6 h-6 text-[#d4a359]" />,
  ShieldCheck: <ShieldCheck className="w-6 h-6 text-[#d4a359]" />,
  Award: <Award className="w-6 h-6 text-[#d4a359]" />,
  MapPin: <MapPin className="w-6 h-6 text-[#d4a359]" />,
  Wrench: <Wrench className="w-6 h-6 text-[#d4a359]" />,
  ThumbsUp: <ThumbsUp className="w-6 h-6 text-[#d4a359]" />,
};

export const WhyChooseUs: React.FC = () => {
  return (
    <section className="py-24 bg-[#080b0f] relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-[#d4a359] text-xs font-medium uppercase tracking-widest mb-4">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>The Pure Standard</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
            Why Pure Detailing UK?
          </h2>
          <p className="text-lg text-slate-400">
            Dedicated to automotive excellence with transparent service, thorough techniques, and uncompromising quality finishes.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {WHY_CHOOSE_US.map((item, index) => (
            <div
              key={index}
              className="p-8 rounded-2xl bg-[#0d1017] border border-white/5 hover:border-[#d4a359]/30 transition-all duration-300 hover:-translate-y-1 group"
            >
              <div className="w-12 h-12 rounded-xl bg-[#d4a359]/10 border border-[#d4a359]/20 flex items-center justify-center mb-6 group-hover:bg-[#d4a359]/20 group-hover:scale-110 transition-all">
                {iconMap[item.icon]}
              </div>
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#f3cf8c] transition-colors">
                {item.title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
