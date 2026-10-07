import React, { useState, useEffect } from 'react';
import { BUSINESS_INFO } from '../data/businessData';
import { Menu, X, Phone, Sparkles } from 'lucide-react';

interface NavbarProps {
  onBookClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onBookClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#' },
    { label: 'Services', href: '#services' },
    { label: 'Before & After', href: '#results' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'About', href: '#about' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    if (href === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Top micro announcement bar */}
      <div className="bg-[#05070a] border-b border-white/5 text-[11px] py-1.5 px-4 text-center text-slate-400 hidden sm:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Opens 9 AM · Unit 16, Yard, 1 Pool's Ln, Chelmsford CM1 3QL</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[#f3cf8c]">★★★★★ 5.0 Google Rating (2 Reviews)</span>
            <a
              href={`tel:${BUSINESS_INFO.phoneRaw}`}
              className="text-slate-300 hover:text-white font-mono flex items-center gap-1 transition-colors"
            >
              <Phone className="w-3 h-3 text-[#d4a359]" />
              <span>{BUSINESS_INFO.phone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#080b0f]/90 backdrop-blur-md border-b border-white/10 shadow-xl py-3.5'
            : 'bg-[#080b0f]/60 backdrop-blur-sm border-b border-white/5 py-4 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Brand Logo */}
            <a href="#" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#d4a359] to-[#8d6220] flex items-center justify-center text-black font-black text-sm shadow-md shadow-[#d4a359]/20 group-hover:scale-105 transition-transform">
                PD
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-black text-lg sm:text-xl tracking-wider text-white leading-none">
                  PURE DETAILING <span className="text-[#d4a359]">UK</span>
                </span>
                <span className="text-[9px] uppercase tracking-widest text-slate-400 font-mono mt-0.5">
                  Chelmsford · Studio
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-7">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => handleLinkClick(link.href)}
                  className="text-xs uppercase tracking-wider font-semibold text-slate-300 hover:text-[#d4a359] transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Right Side Action */}
            <div className="hidden sm:flex items-center gap-3">
              <a
                href={`tel:${BUSINESS_INFO.phoneRaw}`}
                className="p-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white border border-white/5 transition-colors hidden xl:flex items-center gap-2 text-xs"
                title="Call Pure Detailing UK"
              >
                <Phone className="w-3.5 h-3.5 text-[#d4a359]" />
                <span className="font-mono">{BUSINESS_INFO.phoneDisplay}</span>
              </a>

              <button
                onClick={onBookClick}
                className="py-2.5 px-5 rounded-xl bg-[#d4a359] hover:bg-[#e2a856] text-black font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-md shadow-[#d4a359]/20 flex items-center gap-1.5 cursor-pointer hover:scale-[1.02]"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Book Now</span>
              </button>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex sm:hidden items-center gap-2">
              <button
                onClick={onBookClick}
                className="py-2 px-3 rounded-lg bg-[#d4a359] text-black font-bold text-[11px] uppercase tracking-wider"
              >
                Book
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle navigation menu"
                className="p-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-white hover:bg-white/[0.1] transition-colors"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#0a0d14] border-b border-white/10 px-4 pt-3 pb-6 animate-fadeIn">
            <nav className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => handleLinkClick(link.href)}
                  className="py-2 px-3 rounded-lg text-sm font-semibold text-slate-200 hover:text-[#d4a359] hover:bg-white/[0.04] transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="mt-4 pt-4 border-t border-white/10 flex flex-col gap-2.5">
              <a
                href={`tel:${BUSINESS_INFO.phoneRaw}`}
                className="w-full py-2.5 px-4 rounded-xl bg-white/[0.05] text-white text-xs font-semibold flex items-center justify-center gap-2 border border-white/10"
              >
                <Phone className="w-3.5 h-3.5 text-[#d4a359]" />
                <span>Call {BUSINESS_INFO.phone}</span>
              </a>
              <div className="text-center text-[11px] text-slate-500 pt-1">
                Opens 9 AM · Unit 16, Yard, 1 Pool's Ln, Chelmsford
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
