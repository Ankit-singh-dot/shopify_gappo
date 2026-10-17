import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQ_ITEMS = [
  {
    q: 'What makes Gapoo raw honey different from commercial store honey?',
    a: 'Over 70% of commercial jar honey is ultra-pasteurized at high temperatures (destroying delicate enzymes and floral pollens) or blended with industrial invert syrups. Gapoo is 100% unpasteurized raw multifloral nectar, cold-filtered and verified for absolute purity, preserving natural live enzymes, pollen, and raw bio-actives.',
  },
  {
    q: 'How does the Gapoo single-serve stick work?',
    a: 'Each stick holds precisely 6.0g of raw multifloral honey cold-infused with wild garden mint (21 clean calories). Simply tear along the precision notch and squeeze directly into green tea, morning lemon water, artisan toast, or straight into your mouth. Zero spoons, zero sticky jar lids, and zero countertop drips.',
  },
  {
    q: 'Is Gapoo honey independently lab tested?',
    a: 'Yes. Every single batch is tested by accredited independent laboratories. Heavy metals (Lead, Arsenic, Cadmium, and Mercury) are certified Below Limit of Quantification (BLQ) with zero synthetic additives. You can inspect the verified Certificate of Analysis (COA) directly on our website or download the PDF.',
  },
  {
    q: 'Why does genuine raw honey crystallize, and what should I do?',
    a: 'Natural crystallization is the hallmark of real, unpasteurized honey rich in natural glucose and pollen. Commercial brands prevent this by boiling honey into lifeless syrup. If your Gapoo stick becomes firm in cooler weather, gently roll it between your palms or dip the sealed stick in warm water for 30 seconds to restore its liquid flow.',
  },
  {
    q: 'Where do you harvest your honey?',
    a: 'Gapoo nectar is sourced ethically in partnership with generational apiarists across pristine mountain floral meadows (born from Garden+Pool). Our beekeepers use ethical, chemical-free stewardship, harvesting only surplus honey so the colonies thrive year-round.',
  },
  {
    q: 'What is your return & replacement policy for consumable honey sticks?',
    a: 'Because Gapoo Honey Sticks are consumable, edible food items (pure unpasteurized raw honey), we cannot accept physical returns once an order is delivered for food hygiene and health safety reasons. However, your peace of mind is fully guaranteed: if your parcel arrives damaged, leaking, or crushed in courier transit, email support@gapoo.in within 48 hours with photos and we will immediately dispatch a free replacement box or issue a full refund.',
  },
  {
    q: 'How does Subscribe & Save work, and can I cancel anytime?',
    a: 'Subscribe & Save delivers fresh boxes of Gapoo sticks directly to your door on a recurring monthly schedule so your daily ritual never runs dry. You have complete flexibility: you can pause, skip a cycle, or cancel anytime before your next renewal date with zero cancellation fees directly via support@gapoo.in.',
  },
];

export function FAQSection({ id = 'faq' }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id={id} className="w-full max-w-5xl mx-auto scroll-mt-24 pt-16 sm:pt-24 font-montserrat">
      <div className="flex flex-col items-center text-center gap-4 mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 bg-[#faecc9] border border-[#e5cf9d] px-4 py-1.5 rounded-full text-xs font-bold text-[#8b5311] uppercase tracking-wider shadow-2xs">
          <span>✦</span>
          <span>Knowledge &amp; Purity</span>
        </div>
        <h2 className="font-apricot text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1a110a] tracking-tight">
          Frequently Asked Questions
        </h2>
        <p className="text-sm sm:text-base text-[#5c5043] max-w-xl leading-relaxed">
          Clear, honest facts on our unpasteurized harvest, single-serve stick ritual, and lab-certified purity standards.
        </p>
      </div>

      <div className="space-y-4">
        {FAQ_ITEMS.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={item.q}
              className={`rounded-2xl sm:rounded-3xl border transition-all duration-300 overflow-hidden ${
                isOpen
                  ? 'bg-white border-[#c87a1e] shadow-md'
                  : 'bg-white/80 border-[#ebdccb] hover:border-[#c87a1e]/50 hover:bg-white'
              }`}
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? -1 : index)}
                className="w-full flex items-center justify-between gap-4 p-5 sm:p-7 text-left font-montserrat focus:outline-none"
              >
                <span className="font-apricot text-xl sm:text-2xl font-bold text-[#1a110a] leading-snug">
                  {item.q}
                </span>
                <span
                  className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 transition-all duration-300 ${
                    isOpen
                      ? 'bg-[#c87a1e] text-white border-[#c87a1e] rotate-45'
                      : 'border-[#d6c4b2] text-[#8b5311] bg-[#faecc9]/60'
                  }`}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </span>
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-5 sm:px-7 pb-6 pt-1 text-sm sm:text-base text-[#5c5043] leading-relaxed border-t border-[#f4ebde]">
                      {item.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export function ContactAndWholesaleSection({ contactId = 'contact', wholesaleId = 'wholesale' }) {
  const [submitted, setSubmitted] = useState(false);
  const [formType, setFormType] = useState('general');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setSubmitted(true);
  };

  return (
    <div className="w-full max-w-5xl mx-auto pt-20 sm:pt-28 font-montserrat space-y-16">
      {/* ── Wholesale Section ── */}
      <section id={wholesaleId} className="scroll-mt-24">
        <div className="rounded-[28px] sm:rounded-[40px] border border-[#ebdccb] bg-[#1a110a] text-white p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-xl">
          <div className="relative z-10 max-w-2xl space-y-5">
            <div className="inline-flex items-center gap-2 bg-[#c87a1e]/20 border border-[#c87a1e]/40 px-3.5 py-1 rounded-full text-xs font-bold text-[#f5a623] uppercase tracking-wider">
              <span>✦</span>
              <span>Wholesale &amp; Hospitality Partnerships</span>
            </div>

            <h2 className="font-apricot text-4xl sm:text-5xl font-bold text-[#fdfaf1] tracking-tight leading-tight">
              Bring Gapoo Sticks to Your Cafe, Hotel, or Studio.
            </h2>

            <p className="text-[#c7baa8] text-sm sm:text-base leading-relaxed">
              Replace sticky honey dispensers with hygienic 6g single-serve raw honey sticks. Tailored for specialty coffee lounges, boutique hotel tea services, luxury airlines, and fitness clubs.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-3 pb-2 text-xs">
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                <span className="font-bold text-[#f5a623] block text-sm mb-1">Zero Mess</span>
                <span className="text-[#a89b8c]">Hygienic, tamper-evident sticks for beverage counters.</span>
              </div>
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                <span className="font-bold text-[#f5a623] block text-sm mb-1">Direct Apiary</span>
                <span className="text-[#a89b8c]">Single-origin raw multifloral honey without middlemen.</span>
              </div>
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                <span className="font-bold text-[#f5a623] block text-sm mb-1">Fast Supply</span>
                <span className="text-[#a89b8c]">Bulk carton dispatch with certified batch lab reports.</span>
              </div>
            </div>

            <div className="pt-3 flex flex-wrap items-center gap-4">
              <a
                href="mailto:wholesale@gapoo.in?subject=Wholesale%20Inquiry%20-%20Gapoo%20Honey%20Sticks"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#f5a623] hover:bg-[#d97706] text-[#1a110a] text-xs font-bold tracking-widest uppercase transition-all shadow-md no-underline"
              >
                <span>Email wholesale@gapoo.in</span>
                <span>↗</span>
              </a>
              <span className="text-xs text-[#a89b8c]">Direct response within 24 business hours.</span>
            </div>
          </div>

          {/* Decorative Honeycomb Watermark */}
          <div className="absolute right-0 bottom-0 top-0 w-80 opacity-10 pointer-events-none flex items-center justify-center">
            <img src="/images/gapoo_bear_mascot_hd.png" alt="" className="w-64 h-64 object-contain filter invert" />
          </div>
        </div>
      </section>

      {/* ── Contact Section ── */}
      <section id={contactId} className="scroll-mt-24">
        <div className="rounded-[28px] sm:rounded-[40px] border border-[#ebdccb] bg-white/90 backdrop-blur-sm p-8 sm:p-12 lg:p-16 shadow-[0_20px_50px_rgba(26,17,10,0.06)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
            {/* Left: Info */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 bg-[#faecc9] border border-[#e5cf9d] px-3.5 py-1 rounded-full text-xs font-bold text-[#8b5311] uppercase tracking-wider">
                <span>💬</span>
                <span>Support &amp; Inquiries</span>
              </div>

              <h2 className="font-apricot text-4xl sm:text-5xl font-bold text-[#1a110a] tracking-tight leading-tight">
                Get in touch with the hive.
              </h2>

              <p className="text-sm sm:text-base text-[#5c5043] leading-relaxed">
                Have questions about your order, our cold botanical infusion process, or Certificate of Analysis? We are here to help.
              </p>

              <div className="space-y-4 pt-2 border-t border-[#ebdccb] text-sm">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#8b5311] block mb-0.5">Customer Support</span>
                  <a href="mailto:support@gapoo.in" className="text-[#1a110a] font-semibold hover:text-[#c87a1e] transition-colors">
                    support@gapoo.in
                  </a>
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#8b5311] block mb-0.5">Wholesale &amp; Bulk</span>
                  <a href="mailto:wholesale@gapoo.in" className="text-[#1a110a] font-semibold hover:text-[#c87a1e] transition-colors">
                    wholesale@gapoo.in
                  </a>
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#8b5311] block mb-0.5">Support Hours</span>
                  <span className="text-[#5c5043]">Monday – Saturday · 9:00 AM – 6:00 PM IST</span>
                </div>
              </div>
            </div>

            {/* Right: Clean Inquiry Form */}
            <div className="lg:col-span-7">
              {submitted ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-8 rounded-3xl bg-[#fcf8f2] border border-[#ebdccb]">
                  <div className="w-14 h-14 rounded-full bg-[#15803d]/10 text-[#15803d] border border-[#15803d]/20 flex items-center justify-center text-2xl mb-4">
                    ✓
                  </div>
                  <h3 className="font-apricot text-2xl font-bold text-[#1a110a] mb-2">Message Received</h3>
                  <p className="text-sm text-[#5c5043] max-w-sm">
                    Thank you, {formData.name}. Our team will review your inquiry and respond to {formData.email} promptly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 bg-[#faf6ee] p-6 sm:p-8 rounded-3xl border border-[#ebdccb]">
                  <div>
                    <label htmlFor="contact-name" className="text-xs font-bold uppercase tracking-wider text-[#615447] block mb-1.5">
                      Your Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      placeholder="e.g. Ankit Singh"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-[#ebdccb] text-[#1a110a] placeholder-[#998b7c] focus:outline-none focus:border-[#c87a1e] text-sm"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="text-xs font-bold uppercase tracking-wider text-[#615447] block mb-1.5">
                      Email Address
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      placeholder="e.g. ankit@gapoo.in"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-[#ebdccb] text-[#1a110a] placeholder-[#998b7c] focus:outline-none focus:border-[#c87a1e] text-sm"
                    />
                  </div>

                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#615447] block mb-1.5">
                      Inquiry Type
                    </span>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <button
                        type="button"
                        onClick={() => setFormType('general')}
                        className={`py-2 px-3 rounded-lg border font-semibold transition-colors ${
                          formType === 'general'
                            ? 'bg-[#faecc9] border-[#c87a1e] text-[#8b5311]'
                            : 'bg-white border-[#ebdccb] text-[#736555]'
                        }`}
                      >
                        Order / General Help
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormType('wholesale')}
                        className={`py-2 px-3 rounded-lg border font-semibold transition-colors ${
                          formType === 'wholesale'
                            ? 'bg-[#faecc9] border-[#c87a1e] text-[#8b5311]'
                            : 'bg-white border-[#ebdccb] text-[#736555]'
                        }`}
                      >
                        Wholesale / B2B
                      </button>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="text-xs font-bold uppercase tracking-wider text-[#615447] block mb-1.5">
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      required
                      placeholder="How can we help your daily ritual or business?"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-[#ebdccb] text-[#1a110a] placeholder-[#998b7c] focus:outline-none focus:border-[#c87a1e] text-sm resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#f5a623] to-[#d97706] text-white text-xs font-bold tracking-[0.16em] uppercase shadow-md hover:shadow-lg transition-all"
                  >
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
