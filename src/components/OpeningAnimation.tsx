import React, { useEffect, useState } from 'react';
import { Sparkles, ChevronRight } from 'lucide-react';

interface OpeningAnimationProps {
  onComplete: () => void;
}

export const OpeningAnimation: React.FC<OpeningAnimationProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<'ignite' | 'reveal' | 'exit'>('ignite');

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      onComplete();
      return;
    }

    // Step progress smoothly up to 100%
    const duration = 1600; // 1.6s total intro
    const startTime = performance.now();

    const updateProgress = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const rawProgress = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(rawProgress);

      if (rawProgress < 100) {
        requestAnimationFrame(updateProgress);
      } else {
        setPhase('reveal');
        setTimeout(() => {
          setPhase('exit');
          setTimeout(() => {
            onComplete();
          }, 650);
        }, 300);
      }
    };

    const animFrame = requestAnimationFrame(updateProgress);
    return () => cancelAnimationFrame(animFrame);
  }, [onComplete]);

  const handleSkip = () => {
    setPhase('exit');
    setTimeout(() => {
      onComplete();
    }, 250);
  };

  return (
    <div
      onClick={handleSkip}
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#07090c] cursor-pointer select-none overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.77,0,0.175,1)] ${
        phase === 'exit'
          ? '-translate-y-full opacity-0 pointer-events-none'
          : 'translate-y-0 opacity-100'
      }`}
    >
      {/* Background Ambient Automotive Studio Lighting */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top & Bottom Cinematic Curtain Bars */}
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#d4a359]/40 to-transparent" />
        <div className="absolute bottom-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#d4a359]/40 to-transparent" />

        {/* Central Radial Studio Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#d4a359]/10 rounded-full blur-[140px] pointer-events-none animate-pulse" />

        {/* Studio Grid Lines */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      {/* Horizontal LED Lightbar Sweep (Mimics vehicle startup sequence) */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[1px] bg-gradient-to-r from-transparent via-[#d4a359]/80 to-transparent w-full overflow-hidden pointer-events-none">
        <div className="w-1/3 h-full bg-gradient-to-r from-transparent via-white to-transparent animate-[shimmer_1.8s_infinite]" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-lg">
        
        {/* Emblem Crest */}
        <div className="relative mb-6">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-[#1a202c] via-[#0d1017] to-[#07090c] border border-[#d4a359]/40 flex items-center justify-center shadow-[0_0_40px_rgba(212,163,89,0.25)] relative group">
            <span className="font-heading font-black text-2xl sm:text-3xl tracking-widest text-[#d4a359]">
              PD
            </span>
            <div className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-[#d4a359] text-black flex items-center justify-center shadow-md">
              <Sparkles className="w-2.5 h-2.5" />
            </div>
          </div>
          {/* Subtle spinning ring */}
          <div className="absolute -inset-2 rounded-3xl border border-[#d4a359]/20 animate-[spin_10s_linear_infinite]" />
        </div>

        {/* Brand Headline */}
        <div className="overflow-hidden mb-2">
          <h1 className="font-heading font-black text-2xl sm:text-4xl tracking-[0.25em] text-white uppercase transform transition-transform duration-700 translate-y-0">
            PURE DETAILING <span className="text-[#d4a359]">UK</span>
          </h1>
        </div>

        {/* Tagline */}
        <p className="text-xs sm:text-sm font-mono tracking-[0.3em] uppercase text-slate-400 mb-8">
          Precision Detailing · Pristine Finish
        </p>

        {/* Progress Bar & Studio Calibration Indicator */}
        <div className="w-56 sm:w-64 flex flex-col items-center gap-2">
          <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden relative border border-white/5">
            <div
              className="h-full bg-gradient-to-r from-[#a9772d] via-[#d4a359] to-[#f3cf8c] rounded-full transition-all duration-100 ease-out shadow-[0_0_12px_#d4a359]"
              style={{ width: `${progress}%` }}
            />
          </div>
          
          <div className="w-full flex items-center justify-between text-[10px] font-mono tracking-wider text-slate-500">
            <span>CHELMSFORD STUDIO</span>
            <span className="text-[#d4a359] font-bold">{progress}%</span>
          </div>
        </div>

        {/* Skip hint */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleSkip();
          }}
          className="mt-8 text-[11px] font-mono tracking-widest uppercase text-slate-500 hover:text-white transition-colors flex items-center gap-1 opacity-70 hover:opacity-100"
        >
          <span>Tap to Enter</span>
          <ChevronRight className="w-3 h-3" />
        </button>

      </div>
    </div>
  );
};
