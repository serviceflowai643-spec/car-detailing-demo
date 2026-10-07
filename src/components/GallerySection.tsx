import React, { useState } from 'react';
import { GALLERY_ITEMS, GalleryItem } from '../data/businessData';
import { Eye, X, ChevronLeft, ChevronRight, Sparkles, ArrowRight } from 'lucide-react';

export const GallerySection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

  const filteredItems = selectedCategory === 'all'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(item => item.category === selectedCategory);

  const openLightbox = (id: string) => {
    const idx = GALLERY_ITEMS.findIndex(item => item.id === id);
    if (idx !== -1) setActiveImageIndex(idx);
  };

  const closeLightbox = () => setActiveImageIndex(null);

  const prevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (activeImageIndex === null) return;
    setActiveImageIndex((activeImageIndex - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length);
  };

  const nextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (activeImageIndex === null) return;
    setActiveImageIndex((activeImageIndex + 1) % GALLERY_ITEMS.length);
  };

  const activeItem: GalleryItem | null = activeImageIndex !== null ? GALLERY_ITEMS[activeImageIndex] : null;

  return (
    <section id="gallery" className="py-24 bg-[#080a0d] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-[#d4a359] text-xs font-medium uppercase tracking-widest mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Studio Portfolio</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
              Craftsmanship in focus.
            </h2>
            <p className="text-slate-400 mt-2 max-w-xl text-base">
              A visual showcase of exterior reflections, interior transformations, wheels, and bespoke paintwork finishes.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', label: 'All Finishes' },
              { id: 'paint', label: 'Paint & Gloss' },
              { id: 'exterior', label: 'Exterior Details' },
              { id: 'interior', label: 'Interior Detailing' },
              { id: 'wheels', label: 'Wheels & Finishing' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
                  selectedCategory === tab.id
                    ? 'bg-[#d4a359] text-black shadow-md shadow-[#d4a359]/20'
                    : 'bg-white/[0.03] text-slate-400 hover:text-white hover:bg-white/[0.08] border border-white/5'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredItems.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => openLightbox(item.id)}
              className={`group relative rounded-2xl overflow-hidden cursor-pointer border border-white/5 bg-[#10141d] hover:border-[#d4a359]/40 transition-all duration-500 hover:shadow-2xl hover:shadow-black/80 hover:-translate-y-1 ${
                idx % 5 === 0 ? 'sm:col-span-2 aspect-[16/10]' : 'aspect-square'
              }`}
            >
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />

              {/* Hover Icon */}
              <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                <Eye className="w-4 h-4 text-[#d4a359]" />
              </div>

              {/* Bottom Content */}
              <div className="absolute bottom-0 inset-x-0 p-5 transform translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                <span className="text-[11px] font-mono tracking-wider text-[#d4a359] uppercase block mb-1">
                  {item.category.toUpperCase()}
                </span>
                <h3 className="text-white font-medium text-base sm:text-lg group-hover:text-[#f3cf8c] transition-colors leading-snug">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Booking Link */}
        <div className="mt-12 text-center">
          <p className="text-slate-400 text-sm mb-3">
            Every vehicle receives our full attention, customized to its specific condition and owner expectations.
          </p>
          <a
            href="#quote"
            className="inline-flex items-center gap-2 text-[#d4a359] hover:text-[#f3cf8c] text-sm font-semibold transition-colors group"
          >
            <span>Enquire about bespoke detailing for your vehicle</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeItem && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8 animate-fadeIn"
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            aria-label="Close image modal"
            className="absolute top-5 right-5 sm:top-8 sm:right-8 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center text-white z-50 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Previous button */}
          <button
            onClick={prevImage}
            aria-label="Previous image"
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center text-white z-50 transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next button */}
          <button
            onClick={nextImage}
            aria-label="Next image"
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center text-white z-50 transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Lightbox Content Container */}
          <div
            className="relative max-w-5xl w-full max-h-[85vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black flex items-center justify-center max-h-[70vh]">
              <img
                src={activeItem.image}
                alt={activeItem.title}
                referrerPolicy="no-referrer"
                className="max-h-[70vh] w-auto max-w-full object-contain"
              />
            </div>

            {/* Caption bar */}
            <div className="w-full mt-4 p-4 rounded-xl bg-white/[0.04] border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-left">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#d4a359] font-mono block">
                  {activeItem.category} detail
                </span>
                <h4 className="text-white text-lg font-semibold">{activeItem.title}</h4>
                <p className="text-slate-300 text-sm mt-0.5">{activeItem.description}</p>
              </div>
              <a
                href="#quote"
                onClick={closeLightbox}
                className="px-5 py-2 rounded-xl bg-[#d4a359] text-black font-semibold text-xs uppercase tracking-wider hover:bg-[#e2a856] transition-colors shrink-0 whitespace-nowrap"
              >
                Enquire for this finish
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
