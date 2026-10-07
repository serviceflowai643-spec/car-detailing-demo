import React, { useState } from 'react';
import { BUSINESS_INFO, SERVICES } from '../data/businessData';
import { Phone, MessageCircle, Send, CheckCircle2, Calendar, Clock, Car, User, Mail, Sparkles } from 'lucide-react';

interface BookingQuoteSectionProps {
  selectedService: string;
  onServiceChange: (service: string) => void;
}

export const BookingQuoteSection: React.FC<BookingQuoteSectionProps> = ({
  selectedService,
  onServiceChange
}) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    makeModel: '',
    registration: '',
    service: selectedService || 'Full Detail',
    preferredDate: '',
    preferredTime: 'Morning (09:00 - 12:00)',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [referenceId, setReferenceId] = useState('');

  // Keep internal state synced if parent selected service changes
  React.useEffect(() => {
    if (selectedService) {
      setFormData(prev => ({ ...prev, service: selectedService }));
    }
  }, [selectedService]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate clean dispatch
    setTimeout(() => {
      const generatedRef = `PD-${Math.floor(100000 + Math.random() * 900000)}`;
      setReferenceId(generatedRef);
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 800);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFormData({
      name: '',
      phone: '',
      email: '',
      makeModel: '',
      registration: '',
      service: 'Full Detail',
      preferredDate: '',
      preferredTime: 'Morning (09:00 - 12:00)',
      message: ''
    });
  };

  return (
    <section id="quote" className="py-24 bg-[#0a0d14] relative overflow-hidden border-t border-white/5">
      {/* Background glow */}
      <div className="absolute top-1/2 right-10 w-[500px] h-[500px] bg-[#d4a359]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-[#d4a359] text-xs font-medium uppercase tracking-widest mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Studio Booking & Enquiries</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
              Ready to bring your car back to its best?
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Fill in your vehicle details below to receive a fast, tailored quote from Alex and Nathan at our Chelmsford studio.
            </p>
          </div>

          {/* Quick Contact Direct Bar */}
          <div className="mb-10 p-5 rounded-2xl bg-[#0f141f] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#d4a359]/10 border border-[#d4a359]/30 flex items-center justify-center text-[#d4a359] shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <p className="text-white text-sm font-semibold">
                  Prefer to speak to us? Call <a href={`tel:${BUSINESS_INFO.phoneRaw}`} className="text-[#d4a359] hover:underline font-bold">{BUSINESS_INFO.phone}</a>
                </p>
                <p className="text-slate-400 text-xs">Direct studio line · Opens 9 AM · Chelmsford</p>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <a
                href={`tel:${BUSINESS_INFO.phoneRaw}`}
                className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-white text-xs font-semibold flex items-center justify-center gap-2 border border-white/10 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#d4a359]" />
                <span>Call Now</span>
              </a>
              <a
                href={BUSINESS_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#25D366] text-xs font-semibold flex items-center justify-center gap-2 border border-[#25D366]/30 transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Form Card or Success Confirmation */}
          <div className="rounded-3xl bg-[#0d1119] border border-white/10 p-6 sm:p-10 shadow-2xl relative">
            {isSubmitted ? (
              <div className="text-center py-12 px-4 animate-fadeIn">
                <div className="w-16 h-16 rounded-2xl bg-[#d4a359]/20 border border-[#d4a359]/40 flex items-center justify-center text-[#d4a359] mx-auto mb-6">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">Quote Request Received!</h3>
                <p className="text-slate-300 text-base max-w-lg mx-auto mb-6">
                  Thank you, <span className="text-[#f3cf8c] font-semibold">{formData.name}</span>. Your enquiry for your{' '}
                  <span className="text-white font-medium">{formData.makeModel || 'vehicle'}</span> ({formData.service}) has been dispatched to Alex & Nathan at Pure Detailing UK.
                </p>

                <div className="inline-block bg-black/40 border border-white/10 rounded-xl px-5 py-3 mb-8 text-xs font-mono text-slate-300">
                  Reference: <span className="text-[#d4a359] font-bold">{referenceId}</span> · Chelmsford Studio
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <a
                    href={`tel:${BUSINESS_INFO.phoneRaw}`}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#d4a359] text-black font-semibold text-sm hover:bg-[#e2a856] transition-colors flex items-center justify-center gap-2"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Call Us: {BUSINESS_INFO.phoneDisplay}</span>
                  </a>
                  <button
                    onClick={handleReset}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white/[0.04] text-slate-300 hover:text-white hover:bg-white/[0.08] border border-white/10 text-sm font-medium transition-colors"
                  >
                    Submit Another Enquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Row 1: Name, Phone, Email */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                      Full Name *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                        <User className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Smith"
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#d4a359] focus:ring-1 focus:ring-[#d4a359] transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                        <Phone className="w-4 h-4" />
                      </div>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="07123 456789"
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#d4a359] focus:ring-1 focus:ring-[#d4a359] transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                      Email Address *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                        <Mail className="w-4 h-4" />
                      </div>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="name@domain.com"
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#d4a359] focus:ring-1 focus:ring-[#d4a359] transition-colors"
                      />
                    </div>
                  </div>
                </div>

                {/* Row 2: Vehicle Make/Model & UK Registration */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                      Vehicle Make & Model *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                        <Car className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        required
                        value={formData.makeModel}
                        onChange={(e) => setFormData({ ...formData, makeModel: e.target.value })}
                        placeholder="e.g. BMW M3 / Porsche 911 / Range Rover"
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#d4a359] focus:ring-1 focus:ring-[#d4a359] transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                      Vehicle Registration (UK Plate)
                    </label>
                    <div className="relative flex items-center">
                      <div className="h-[46px] px-2.5 bg-[#003399] rounded-l-xl flex items-center justify-center text-white font-bold text-[10px] tracking-widest border border-r-0 border-[#003399]">
                        GB
                      </div>
                      <input
                        type="text"
                        value={formData.registration}
                        onChange={(e) => setFormData({ ...formData, registration: e.target.value.toUpperCase() })}
                        placeholder="e.g. AB21 CDE"
                        className="w-full px-4 py-3 rounded-r-xl bg-black/50 border border-white/10 text-[#facc15] font-mono font-bold tracking-wider placeholder-slate-500 text-sm uppercase focus:outline-none focus:border-[#d4a359] focus:ring-1 focus:ring-[#d4a359] transition-colors"
                      />
                    </div>
                  </div>
                </div>

                {/* Row 3: Service Interested In & Preferred Time */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <div className="sm:col-span-1">
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                      Service Interested In *
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => {
                        setFormData({ ...formData, service: e.target.value });
                        onServiceChange(e.target.value);
                      }}
                      className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white text-sm focus:outline-none focus:border-[#d4a359] focus:ring-1 focus:ring-[#d4a359] transition-colors cursor-pointer"
                    >
                      {SERVICES.map(s => (
                        <option key={s.id} value={s.name} className="bg-[#0f131a] text-white">
                          {s.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                      Preferred Date
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                        <Calendar className="w-4 h-4" />
                      </div>
                      <input
                        type="date"
                        value={formData.preferredDate}
                        onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white text-sm focus:outline-none focus:border-[#d4a359] focus:ring-1 focus:ring-[#d4a359] transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                      Preferred Time
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                        <Clock className="w-4 h-4" />
                      </div>
                      <select
                        value={formData.preferredTime}
                        onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white text-sm focus:outline-none focus:border-[#d4a359] focus:ring-1 focus:ring-[#d4a359] transition-colors cursor-pointer"
                      >
                        <option value="Morning (09:00 - 12:00)" className="bg-[#0f131a]">Morning (09:00 - 12:00)</option>
                        <option value="Early Afternoon (12:00 - 15:00)" className="bg-[#0f131a]">Early Afternoon (12:00 - 15:00)</option>
                        <option value="Late Afternoon (15:00 - 18:00)" className="bg-[#0f131a]">Late Afternoon (15:00 - 18:00)</option>
                        <option value="Flexible" className="bg-[#0f131a]">Flexible / Any Time</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Row 4: Message / Specific Requirements */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Vehicle Details or Specific Requests (Optional)
                  </label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about the vehicle condition (e.g. swirls, pet hair, dull gloss, specific panels of concern)..."
                    className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#d4a359] focus:ring-1 focus:ring-[#d4a359] transition-colors resize-none"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 px-6 rounded-xl bg-[#d4a359] hover:bg-[#e2a856] text-black font-bold text-base shadow-xl shadow-[#d4a359]/20 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                        <span>Sending Enquiry to Alex & Nathan...</span>
                      </span>
                    ) : (
                      <>
                        <span>Request a Quote</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                  <p className="text-center text-xs text-slate-400 mt-3">
                    No payment required upfront. We will review your vehicle details and respond promptly with availability and quote.
                  </p>
                </div>

              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};
