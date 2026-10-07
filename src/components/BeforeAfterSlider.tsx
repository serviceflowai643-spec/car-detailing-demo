import React, { useState, useRef, useCallback, useEffect } from 'react';
import { BEFORE_AFTER_CASES, BeforeAfterItem } from '../data/businessData';
import { Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';

export const BeforeAfterSection: React.FC = () => {
  const [activeCaseIndex, setActiveCaseIndex] = useState(0);
  const [dividerPos, setDividerPos] = useState(50); // percentage 0 - 100
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentCase: BeforeAfterItem = BEFORE_AFTER_CASES[activeCaseIndex];

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const clampedX = Math.max(5, Math.min(x, rect.width - 5));
    const percentage = (clampedX / rect.width) * 100;
    setDividerPos(percentage);
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  }, [isDragging, handleMove]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  }, [isDragging, handleMove]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleTouchMove, handleMouseUp]);

  return (
    <section id="results" className="py-24 bg-[#0a0d12] relative overflow-hidden border-t border-b border-white/5">
      {/* Background subtle radial ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#d4a359]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-[#d4a359] text-xs font-medium uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>50/50 Detailing Comparison</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
            See the difference.
          </h2>
          <p className="text-lg text-slate-400 font-normal">
            From tired and dull to clean, glossy and refined.
          </p>
        </div>

        {/* Case Selector Tabs */}
        <div className="flex flex-wrap justify-center gap-2.5 mb-8">
          {BEFORE_AFTER_CASES.map((item, idx) => {
            const isActive = idx === activeCaseIndex;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveCaseIndex(idx);
                  setDividerPos(50);
                }}
                className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                  isActive
                    ? 'bg-[#d4a359] text-black shadow-lg shadow-[#d4a359]/20 font-semibold'
                    : 'bg-white/[0.04] text-slate-300 hover:text-white hover:bg-white/[0.08] border border-white/5'
                }`}
              >
                <span>{item.title}</span>
                <span className={`text-[11px] uppercase tracking-wider px-1.5 py-0.5 rounded ${
                  isActive ? 'bg-black/20 text-black' : 'text-slate-400'
                }`}>
                  {item.category}
                </span>
              </button>
            );
          })}
        </div>

        {/* Wide Comparison Container */}
        <div className="max-w-5xl mx-auto">
          <div
            ref={containerRef}
            onMouseDown={(e) => {
              setIsDragging(true);
              handleMove(e.clientX);
            }}
            onTouchStart={(e) => {
              setIsDragging(true);
              handleMove(e.touches[0].clientX);
            }}
            className="relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-2xl overflow-hidden cursor-ew-resize select-none border border-white/10 shadow-2xl bg-black"
          >
            {/* Base Combined 50/50 Split Image */}
            <img
              src={currentCase.splitImage}
              alt={currentCase.title}
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
            />

            {/* Subtle contrast mask indicating current inspection position */}
            <div
              className="absolute inset-y-0 left-0 bg-black/10 pointer-events-none transition-opacity"
              style={{ width: `${dividerPos}%` }}
            />

            {/* Left Label: BEFORE */}
            <div className="absolute top-5 left-5 z-20 pointer-events-none">
              <span className="px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest bg-black/80 backdrop-blur-md border border-white/20 text-slate-200 shadow-xl flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-red-400" />
                BEFORE
              </span>
            </div>

            {/* Right Label: AFTER */}
            <div className="absolute top-5 right-5 z-20 pointer-events-none">
              <span className="px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest bg-black/80 backdrop-blur-md border border-[#d4a359]/40 text-[#f3cf8c] shadow-xl flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#d4a359]" />
                AFTER
              </span>
            </div>

            {/* Draggable Divider Line & Knob */}
            <div
              className="absolute top-0 bottom-0 z-30 pointer-events-none"
              style={{ left: `${dividerPos}%` }}
            >
              <div className="h-full w-0.5 bg-[#d4a359] shadow-[0_0_15px_#d4a359]" />
              
              {/* Center Handle */}
              <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-[#0a0d12] border-2 border-[#d4a359] shadow-2xl flex items-center justify-center text-white pointer-events-auto cursor-ew-resize hover:scale-105 active:scale-95 transition-transform">
                <div className="flex items-center gap-0.5 text-[#d4a359]">
                  <ChevronLeft className="w-4 h-4" />
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Bottom info banner inside image */}
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent p-5 z-20 pointer-events-none">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="text-white font-semibold text-lg">{currentCase.title}</h3>
                  <p className="text-slate-300 text-sm max-w-2xl">{currentCase.description}</p>
                </div>
                <span className="text-xs text-[#d4a359] font-mono tracking-widest shrink-0 uppercase">
                  Drag Handle Left / Right
                </span>
              </div>
            </div>
          </div>

          {/* Quick CTA banner below */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-white/[0.03] border border-white/5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#d4a359]/10 border border-[#d4a359]/20 flex items-center justify-center text-[#d4a359]">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <p className="text-white text-sm font-semibold">Want this level of clarity for your car?</p>
                <p className="text-slate-400 text-xs">Drop off at our Chelmsford studio or request a tailored quote.</p>
              </div>
            </div>
            <a
              href="#quote"
              className="px-6 py-2.5 rounded-xl bg-[#d4a359] text-black font-semibold text-sm hover:bg-[#e2a856] transition-colors whitespace-nowrap shadow-md shadow-[#d4a359]/20"
            >
              Request Quote For Your Car
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
