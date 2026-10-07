import React from 'react';
import { BUSINESS_INFO } from '../data/businessData';
import { Star, ExternalLink, CheckCircle2, Quote } from 'lucide-react';

export const ReviewsSection: React.FC = () => {
  return (
    <section id="reviews" className="py-24 bg-[#0a0d13] relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-[#d4a359] text-xs font-medium uppercase tracking-widest mb-4">
            <Star className="w-3.5 h-3.5 fill-[#d4a359]" />
            <span>Customer Feedback</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
            Proven client satisfaction.
          </h2>
          <p className="text-lg text-slate-400">
            Real feedback from vehicle owners who trusted Pure Detailing UK with their cars.
          </p>
        </div>

        {/* Overall Rating Hero Card */}
        <div className="max-w-4xl mx-auto mb-12 p-8 rounded-3xl bg-gradient-to-b from-[#111622] to-[#0d1017] border border-white/10 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
            <div className="w-20 h-20 rounded-2xl bg-[#d4a359]/10 border border-[#d4a359]/30 flex flex-col items-center justify-center shrink-0">
              <span className="text-3xl font-extrabold text-[#d4a359]">5.0</span>
              <span className="text-[10px] text-slate-400 font-mono">OUT OF 5</span>
            </div>

            <div>
              <div className="flex items-center justify-center sm:justify-start gap-1 text-[#d4a359] mb-1.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[#d4a359]" />
                ))}
              </div>
              <h3 className="text-xl font-bold text-white">5.0 Star Rated on Google</h3>
              <p className="text-sm text-slate-400">
                {BUSINESS_INFO.googleReviewCount} Genuine Google Reviews in Chelmsford
              </p>
            </div>
          </div>

          {/* View on Google CTA */}
          <a
            href={BUSINESS_INFO.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-white border border-white/15 hover:border-white/30 text-sm font-semibold transition-all duration-200 group shrink-0"
          >
            {/* Google Logo SVG */}
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.14z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
              />
            </svg>
            <span>View on Google</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-white group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>

        {/* Real Review Card */}
        <div className="max-w-2xl mx-auto">
          {BUSINESS_INFO.reviews.map((rev, idx) => (
            <div
              key={idx}
              className="relative p-8 rounded-2xl bg-[#0f131c] border border-[#d4a359]/30 shadow-xl shadow-black/40 group hover:border-[#d4a359]/60 transition-colors"
            >
              <div className="absolute top-6 right-6 text-white/5 group-hover:text-[#d4a359]/10 transition-colors pointer-events-none">
                <Quote className="w-16 h-16" />
              </div>

              {/* Stars */}
              <div className="flex items-center gap-1 text-[#d4a359] mb-4">
                {[...Array(rev.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#d4a359]" />
                ))}
              </div>

              {/* Review Text */}
              <blockquote className="text-xl sm:text-2xl text-white font-medium italic mb-6 leading-relaxed">
                "{rev.reviewBody}"
              </blockquote>

              {/* Author & Google Verified Badge */}
              <div className="flex items-center justify-between border-t border-white/5 pt-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#a9772d] to-[#d4a359] text-black font-bold flex items-center justify-center text-sm shadow-md">
                    {rev.author.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-sm flex items-center gap-1.5">
                      {rev.author}
                      <span title="Verified Review"><CheckCircle2 className="w-3.5 h-3.5 text-[#34A853]" /></span>
                    </h4>
                    <span className="text-xs text-slate-400">Google Reviewer · Chelmsford</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <span>5.0 Star Detail</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
