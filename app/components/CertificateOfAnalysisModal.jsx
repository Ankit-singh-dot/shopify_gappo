import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function CertificateOfAnalysisModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('summary'); // 'summary' | 'documents'
  const [activeDocPage, setActiveDocPage] = useState(1);

  // Lock scroll, halt Lenis & handle ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      document.documentElement.classList.add('lenis-stopped');
      if (typeof window !== 'undefined' && window.lenis) {
        window.lenis.stop();
      }
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      document.documentElement.classList.remove('lenis-stopped');
      if (typeof window !== 'undefined' && window.lenis) {
        window.lenis.start();
      }
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          data-lenis-prevent="true"
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto font-montserrat overscroll-contain"
        >
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-md cursor-pointer"
          />

          {/* Modal Card */}
          <motion.div
            data-lenis-prevent="true"
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-4xl bg-[#fdfaf1] rounded-3xl border border-[#e8d7be] shadow-[0_25px_60px_-15px_rgba(26,17,10,0.35)] overflow-hidden flex flex-col max-h-[92vh] z-10 overscroll-contain"
          >
            {/* Modal Header */}
            <div className="px-5 sm:px-8 py-5 border-b border-[#eee1ce] bg-[#faf3e3] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-extrabold tracking-widest uppercase px-2.5 py-0.5 rounded-full bg-[#15803d]/10 text-[#15803d] border border-[#15803d]/25">
                    ✓ Verified Authentic COA
                  </span>
                  <span className="text-xs text-[#8c7e6e] font-semibold">
                    Batch: <strong className="text-[#1a110a]">HFL-GMG-08/26-01</strong>
                  </span>
                </div>
                <h3 className="font-apricot text-2xl sm:text-3xl font-bold text-[#1a110a] leading-none pt-1">
                  Certificate of Analysis (COA)
                </h3>
                <p className="text-xs text-[#6e6152]">
                  Issued by <strong className="text-[#1a110a]">Herbal Farm Life Care Pvt Ltd</strong> · New Delhi 110020
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 self-end sm:self-auto">
                <a
                  href="/gapoo-coa-certificate.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  download="Gapoo_Minted_Goodness_COA.pdf"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold text-[#1a110a] bg-white border border-[#d8c5af] hover:bg-[#faecc9] hover:border-[#c87a1e] transition-all shadow-xs cursor-pointer"
                >
                  <svg className="w-3.5 h-3.5 text-[#c87a1e]" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M7.5 12L12 16.5m0 0L16.5 12M12 16.5V3" />
                  </svg>
                  <span>Download PDF</span>
                </a>

                <button
                  type="button"
                  onClick={onClose}
                  className="w-9 h-9 rounded-full bg-white/80 hover:bg-white text-[#5c5247] hover:text-[#1a110a] border border-[#d8c5af] flex items-center justify-center transition-all cursor-pointer"
                  aria-label="Close modal"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="px-5 sm:px-8 pt-3 border-b border-[#eee1ce] bg-[#fbf5e8] flex items-center gap-2">
              <button
                type="button"
                onClick={() => setActiveTab('summary')}
                className={`pb-3 px-3 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer ${
                  activeTab === 'summary'
                    ? 'border-[#c87a1e] text-[#1a110a]'
                    : 'border-transparent text-[#7a6d5f] hover:text-[#1a110a]'
                }`}
              >
                📊 Verified Test Summary
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('documents')}
                className={`pb-3 px-3 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer ${
                  activeTab === 'documents'
                    ? 'border-[#c87a1e] text-[#1a110a]'
                    : 'border-transparent text-[#7a6d5f] hover:text-[#1a110a]'
                }`}
              >
                📜 Official Lab Scan ({activeDocPage}/2)
              </button>
            </div>

            {/* Modal Body */}
            <div
              data-lenis-prevent="true"
              onWheel={(e) => e.stopPropagation()}
              onTouchMove={(e) => e.stopPropagation()}
              className="p-5 sm:p-8 overflow-y-auto space-y-6 overscroll-contain"
            >
              {activeTab === 'summary' ? (
                <>
                  {/* Hero Verdict Banner */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#eef9f0] via-[#f4fbf5] to-[#e8f5ec] border border-[#a8dfb5] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3.5">
                      <div className="w-11 h-11 rounded-2xl bg-[#15803d] text-white flex items-center justify-center text-xl font-bold shadow-md shrink-0">
                        ✓
                      </div>
                      <div>
                        <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#15803d] block">
                          Official Lab Verdict
                        </span>
                        <h4 className="font-bold text-base sm:text-lg text-[#134e26] leading-tight">
                          Certified &ldquo;STANDARD QUALITY&rdquo; Compliant
                        </h4>
                        <p className="text-xs text-[#285c37] mt-0.5">
                          Sample complies with all statutory quality, microbiological, and purity standards.
                        </p>
                      </div>
                    </div>
                    <div className="text-left sm:text-right text-xs text-[#355f41] shrink-0">
                      <span className="block font-semibold">Specification No: SAF-150926001</span>
                      <span className="block text-[11px] text-[#4d7859]">Analysis Completed: 21/09/2026</span>
                    </div>
                  </div>

                  {/* 3 Pillars Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Pillar 1: Heavy Metals */}
                    <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#ebdccb] shadow-xs hover:border-[#d9a04f] transition-all">
                      <div className="flex items-center justify-between mb-3">
                        <span className="w-8 h-8 rounded-lg bg-[#faecc9] text-base flex items-center justify-center">
                          🛡️
                        </span>
                        <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-[#15803d]/10 text-[#15803d]">
                          100% BLQ
                        </span>
                      </div>
                      <h5 className="font-bold text-sm text-[#1a110a]">Heavy Metals Test</h5>
                      <p className="text-[11px] text-[#736555] mt-1 mb-3">
                        All heavy metals are Below Limit of Quantification (BLQ).
                      </p>
                      <div className="space-y-1.5 text-xs">
                        <div className="flex justify-between py-1 border-b border-[#f3ebde]">
                          <span className="text-[#635749]">Lead (as Pb)</span>
                          <span className="font-bold text-[#15803d]">&lt; 0.01 mg/kg (Max 2.5)</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-[#f3ebde]">
                          <span className="text-[#635749]">Arsenic (as As)</span>
                          <span className="font-bold text-[#15803d]">&lt; 0.05 mg/kg (Max 1.1)</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-[#f3ebde]">
                          <span className="text-[#635749]">Cadmium (as Cd)</span>
                          <span className="font-bold text-[#15803d]">&lt; 0.1 mg/kg (Max 1.5)</span>
                        </div>
                        <div className="flex justify-between py-1">
                          <span className="text-[#635749]">Mercury (as Hg)</span>
                          <span className="font-bold text-[#15803d]">&lt; 0.1 mg/kg (Max 1.0)</span>
                        </div>
                      </div>
                    </div>

                    {/* Pillar 2: Microbiological Examination */}
                    <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#ebdccb] shadow-xs hover:border-[#d9a04f] transition-all">
                      <div className="flex items-center justify-between mb-3">
                        <span className="w-8 h-8 rounded-lg bg-[#faecc9] text-base flex items-center justify-center">
                          🔬
                        </span>
                        <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-[#15803d]/10 text-[#15803d]">
                          Pathogen-Free
                        </span>
                      </div>
                      <h5 className="font-bold text-sm text-[#1a110a]">Microbial Purity</h5>
                      <p className="text-[11px] text-[#736555] mt-1 mb-3">
                        Total bacterial count is 71x cleaner than permissible limits.
                      </p>
                      <div className="space-y-1.5 text-xs">
                        <div className="flex justify-between py-1 border-b border-[#f3ebde]">
                          <span className="text-[#635749]">Total Bacteria</span>
                          <span className="font-bold text-[#15803d]">1,400 cfu/g (Max 100k)</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-[#f3ebde]">
                          <span className="text-[#635749]">Yeast & Mould</span>
                          <span className="font-bold text-[#15803d]">&lt; 10 cfu/g (Max 1,000)</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-[#f3ebde]">
                          <span className="text-[#635749]">E. Coli</span>
                          <span className="font-bold text-[#15803d]">Absent / g</span>
                        </div>
                        <div className="flex justify-between py-1">
                          <span className="text-[#635749]">Salmonella</span>
                          <span className="font-bold text-[#15803d]">Absent / 25g</span>
                        </div>
                      </div>
                    </div>

                    {/* Pillar 3: Physical & Chemical Identity */}
                    <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#ebdccb] shadow-xs hover:border-[#d9a04f] transition-all">
                      <div className="flex items-center justify-between mb-3">
                        <span className="w-8 h-8 rounded-lg bg-[#faecc9] text-base flex items-center justify-center">
                          🍯
                        </span>
                        <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-[#15803d]/10 text-[#15803d]">
                          100% Pure Honey
                        </span>
                      </div>
                      <h5 className="font-bold text-sm text-[#1a110a]">Physical & Chemical</h5>
                      <p className="text-[11px] text-[#736555] mt-1 mb-3">
                        Authentic raw honey infused with natural mint extract.
                      </p>
                      <div className="space-y-1.5 text-xs">
                        <div className="flex justify-between py-1 border-b border-[#f3ebde]">
                          <span className="text-[#635749]">Natural Sugars</span>
                          <span className="font-bold text-[#1a110a]">64.44 g / 100g</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-[#f3ebde]">
                          <span className="text-[#635749]">Staphylococcus</span>
                          <span className="font-bold text-[#15803d]">Absent / g</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-[#f3ebde]">
                          <span className="text-[#635749]">Pseudomonas</span>
                          <span className="font-bold text-[#15803d]">Absent / g</span>
                        </div>
                        <div className="flex justify-between py-1">
                          <span className="text-[#635749]">Physical Flavor</span>
                          <span className="font-bold text-[#1a110a]">Complies (Sweet Mint)</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Batch Details Strip */}
                  <div className="p-4 rounded-2xl bg-[#faf3e5] border border-[#ebdccb] grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                    <div>
                      <span className="text-[#8c7e6e] block text-[10px] uppercase font-bold">Mfg Date</span>
                      <strong className="text-[#1a110a]">08/2026</strong>
                    </div>
                    <div>
                      <span className="text-[#8c7e6e] block text-[10px] uppercase font-bold">Expiry Date</span>
                      <strong className="text-[#1a110a]">01/2028</strong>
                    </div>
                    <div>
                      <span className="text-[#8c7e6e] block text-[10px] uppercase font-bold">Tested By</span>
                      <strong className="text-[#1a110a]">QC &amp; R&amp;D Executive</strong>
                    </div>
                    <div>
                      <span className="text-[#8c7e6e] block text-[10px] uppercase font-bold">Approved By</span>
                      <strong className="text-[#1a110a]">Head - Production &amp; R&amp;D</strong>
                    </div>
                  </div>
                </>
              ) : (
                /* Document Scan View */
                <div className="space-y-4">
                  {/* Page Switcher */}
                  <div className="flex items-center justify-between bg-white p-2.5 rounded-xl border border-[#ebdccb]">
                    <span className="text-xs font-bold text-[#736555]">
                      Viewing Official Stamped COA Document
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setActiveDocPage(1)}
                        className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          activeDocPage === 1
                            ? 'bg-[#1a110a] text-white shadow-xs'
                            : 'bg-[#faf5ec] text-[#6b5c4d] hover:bg-[#faecc9]'
                        }`}
                      >
                        Page 1 (Heavy Metals &amp; Microbial)
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveDocPage(2)}
                        className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          activeDocPage === 2
                            ? 'bg-[#1a110a] text-white shadow-xs'
                            : 'bg-[#faf5ec] text-[#6b5c4d] hover:bg-[#faecc9]'
                        }`}
                      >
                        Page 2 (Pathogens &amp; Stamp)
                      </button>
                    </div>
                  </div>

                  {/* Document Image Container */}
                  <div className="relative rounded-2xl overflow-hidden border border-[#d6c7b2] bg-white shadow-inner flex justify-center p-2 sm:p-4">
                    <img
                      src={activeDocPage === 1 ? '/images/coa_page_1.png' : '/images/coa_page_2.png'}
                      alt={`Gapoo Certificate of Analysis Page ${activeDocPage}`}
                      className="w-full max-w-2xl h-auto rounded-lg shadow-md border border-[#e5d9c8]"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="px-5 sm:px-8 py-3.5 border-t border-[#eee1ce] bg-[#faf3e3] flex flex-wrap items-center justify-between gap-3 text-xs text-[#736555]">
              <div className="flex items-center gap-2 font-medium">
                <span className="w-2 h-2 rounded-full bg-[#15803d]" />
                <span>100% Traceable Indian Botanical Honey</span>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2 rounded-full bg-[#1a110a] text-white font-bold hover:bg-[#332214] transition-all cursor-pointer shadow-xs ml-auto"
              >
                Close Certificate
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
