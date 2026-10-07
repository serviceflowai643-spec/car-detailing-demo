import React, { useState } from 'react';
import { BUSINESS_INFO } from '../data/businessData';
import { ChevronDown, HelpCircle, Sparkles, Clock, ShieldCheck, CalendarCheck, Phone } from 'lucide-react';

interface FAQItem {
  id: string;
  category: 'times' | 'safety' | 'booking';
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'times',
    question: 'How long does a detailing service typically take?',
    answer: 'Turnaround times depend on your chosen package and current vehicle condition. A focused interior or maintenance detail typically takes a few hours, whereas a comprehensive Full Detail or paint enhancement is performed meticulously over the course of a full working day. Alex and Nathan will discuss and confirm an accurate estimated completion time when reviewing your vehicle.'
  },
  {
    id: 'faq-2',
    category: 'times',
    question: 'Can I drop off my car in the morning at the studio?',
    answer: 'Yes. Our Chelmsford studio opens at 9:00 AM (Monday to Saturday), providing convenient morning drop-off options. We schedule each car individually into our private detailing bay so your vehicle receives our undivided attention.'
  },
  {
    id: 'faq-3',
    category: 'safety',
    question: 'Are your detailing processes and chemicals safe for delicate paints and trims?',
    answer: 'Yes, absolutely. We employ safe wash practices including multi-stage contactless pre-washes, snow foam baths, and two-bucket methods with plush wash mitts to minimize friction and prevent wash marring. All cleaning formulations are carefully selected to respect modern clearcoats, rubber seals, anodized trims, and alloy wheels.'
  },
  {
    id: 'faq-4',
    category: 'safety',
    question: 'How do you clean and treat automotive leather and sensitive cabin surfaces?',
    answer: 'We clean leather using gentle, dedicated cleaners and soft horsehair brushes to lift embedded body oils and grime from the pores without harsh scrubbing. Surfaces are then nourished with conditioners that restore an authentic, non-slippery OEM matte finish rather than a shiny or sticky coating.'
  },
  {
    id: 'faq-5',
    category: 'booking',
    question: 'What information should I provide when requesting a quote?',
    answer: 'To provide an accurate assessment, please provide your vehicle make, model, registration plate, chosen service (e.g. Full Detail or Paint Enhancement), and a brief note on its current condition or specific areas of concern. You can submit these details through our quick quote form or by calling 07875 500935.'
  },
  {
    id: 'faq-6',
    category: 'booking',
    question: 'Is any upfront payment required to submit a booking enquiry?',
    answer: 'No upfront payment is required to submit an enquiry. We review your vehicle details, confirm studio bay availability, and provide a clear, tailored quotation before booking your scheduled detailing date.'
  },
  {
    id: 'faq-7',
    category: 'booking',
    question: 'Where is the studio located, and can I visit or call beforehand?',
    answer: "We are located at Unit 16, Yard, 1 Pool's Ln, Chelmsford CM1 3QL, United Kingdom. We encourage customers to call Alex and Nathan on 07875 500935 or reach out on WhatsApp with any specific vehicle questions ahead of visiting."
  }
];

export const FAQSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>('faq-1');
  const [activeTab, setActiveTab] = useState<'all' | 'times' | 'safety' | 'booking'>('all');

  const toggleFAQ = (id: string) => {
    setOpenId(prev => (prev === id ? null : id));
  };

  const filteredFaqs = activeTab === 'all'
    ? FAQS
    : FAQS.filter(f => f.category === activeTab);

  return (
    <section id="faq" className="py-24 bg-[#080a0f] relative overflow-hidden border-t border-white/5">
      {/* Background subtle radial glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#d4a359]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-[#d4a359] text-xs font-medium uppercase tracking-widest mb-4">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Customer Questions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-slate-400">
            Clear answers regarding detailing duration, surface-safe techniques, and studio booking policies.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2.5 mb-10">
          {[
            { id: 'all', label: 'All Questions', icon: HelpCircle },
            { id: 'times', label: 'Process Times', icon: Clock },
            { id: 'safety', label: 'Product & Surface Safety', icon: ShieldCheck },
            { id: 'booking', label: 'Booking & Policies', icon: CalendarCheck },
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                  isActive
                    ? 'bg-[#d4a359] text-black shadow-lg shadow-[#d4a359]/20'
                    : 'bg-white/[0.03] text-slate-400 hover:text-white hover:bg-white/[0.07] border border-white/5'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {filteredFaqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={`rounded-2xl transition-all duration-200 border overflow-hidden ${
                  isOpen
                    ? 'bg-[#0f131c] border-[#d4a359]/40 shadow-xl shadow-black/50'
                    : 'bg-[#0c0f16] border-white/5 hover:border-white/15'
                }`}
              >
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  aria-expanded={isOpen}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="text-base sm:text-lg font-semibold text-white leading-snug">
                    {faq.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen
                        ? 'bg-[#d4a359] text-black rotate-180'
                        : 'bg-white/5 text-slate-400'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-slate-300 text-sm sm:text-base leading-relaxed border-t border-white/5 animate-fadeIn">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Contact Help Card */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#111520] via-[#0d1017] to-[#111520] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div>
            <h3 className="text-white text-lg font-bold mb-1">
              Have another question about your vehicle?
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm">
              Alex and Nathan are happy to advise on the right treatment for your car.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <a
              href={`tel:${BUSINESS_INFO.phoneRaw}`}
              className="px-5 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-white border border-white/15 text-xs font-semibold flex items-center gap-2 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#d4a359]" />
              <span>Call: {BUSINESS_INFO.phoneDisplay}</span>
            </a>
            <a
              href="#quote"
              className="px-5 py-2.5 rounded-xl bg-[#d4a359] hover:bg-[#e2a856] text-black text-xs font-bold transition-colors shadow-md shadow-[#d4a359]/20"
            >
              Get a Quote
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
