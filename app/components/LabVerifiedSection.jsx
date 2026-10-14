import { useState } from 'react';
import { motion } from 'framer-motion';
import { CertificateOfAnalysisModal } from '~/components/CertificateOfAnalysisModal';

export function LabVerifiedSection({ className = '', id = 'lab-verified' }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section id={id} className={`py-20 sm:py-28 lg:py-32 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto scroll-mt-24 relative font-montserrat ${className}`}>
      {/* Background Ambient Glow */}
      <div
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 65% 55% at 50% 45%, #faecc9 0%, #fcf6eb 50%, #fdfaf1 100%)',
        }}
      />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18 space-y-3">
        <div className="inline-flex items-center gap-2 bg-[#faecc9] border border-[#e5cf9d] px-4 py-1.5 rounded-full text-xs font-bold text-[#8b5311] shadow-2xs">
          <span>🔬</span>
          <span className="uppercase tracking-widest text-[11px]">The Clean Hive Standard · Batch Tested</span>
        </div>

        <h2 className="font-apricot text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1a110a] leading-[1.08] tracking-tight">
          Tested for Purity.<br />Zero Adulteration. Zero Guesswork.
        </h2>

        <p className="text-sm sm:text-base text-[#615447] leading-relaxed max-w-2xl mx-auto">
          Over 70% of store-bought honey is cut with invert sugar syrups or tainted with industrial heavy metals. Every single batch of Gapoo is independently analyzed by certified laboratories before it ever reaches your cup.
        </p>
      </div>

      {/* Main Content Grid: Interactive Stats + Document Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left: 3 Scientific Proof Cards (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Card 1: Heavy Metals */}
          <div className="p-5 sm:p-6 rounded-3xl bg-white/90 backdrop-blur-sm border border-[#ede0cf] shadow-xs hover:border-[#c87a1e] hover:shadow-md transition-all group">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-2xl bg-[#fdf3db] border border-[#ecd29b] flex items-center justify-center text-xl shrink-0 group-hover:scale-105 transition-transform">
                  🛡️
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-base text-[#1a110a]">
                      Zero Heavy Metals (BLQ)
                    </h3>
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-[#15803d]/10 text-[#15803d] border border-[#15803d]/20">
                      Passed
                    </span>
                  </div>
                  <p className="text-xs text-[#736555] mt-0.5">
                    Lead, Arsenic, Cadmium &amp; Mercury are all Below Limit of Quantification.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4 pt-4 border-t border-[#f5ece0] text-center">
              <div className="p-2 rounded-xl bg-[#faf6ee]">
                <span className="text-[10px] text-[#8c7e6e] block uppercase font-bold">Lead (Pb)</span>
                <strong className="text-xs text-[#15803d]">&lt; 0.01 mg/kg</strong>
                <span className="text-[9px] text-[#9c8e80] block">Max 2.5</span>
              </div>
              <div className="p-2 rounded-xl bg-[#faf6ee]">
                <span className="text-[10px] text-[#8c7e6e] block uppercase font-bold">Arsenic (As)</span>
                <strong className="text-xs text-[#15803d]">&lt; 0.05 mg/kg</strong>
                <span className="text-[9px] text-[#9c8e80] block">Max 1.1</span>
              </div>
              <div className="p-2 rounded-xl bg-[#faf6ee]">
                <span className="text-[10px] text-[#8c7e6e] block uppercase font-bold">Cadmium (Cd)</span>
                <strong className="text-xs text-[#15803d]">&lt; 0.10 mg/kg</strong>
                <span className="text-[9px] text-[#9c8e80] block">Max 1.5</span>
              </div>
              <div className="p-2 rounded-xl bg-[#faf6ee]">
                <span className="text-[10px] text-[#8c7e6e] block uppercase font-bold">Mercury (Hg)</span>
                <strong className="text-xs text-[#15803d]">&lt; 0.10 mg/kg</strong>
                <span className="text-[9px] text-[#9c8e80] block">Max 1.0</span>
              </div>
            </div>
          </div>

          {/* Card 2: Microbiological Safety */}
          <div className="p-5 sm:p-6 rounded-3xl bg-white/90 backdrop-blur-sm border border-[#ede0cf] shadow-xs hover:border-[#c87a1e] hover:shadow-md transition-all group">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-2xl bg-[#eef8f1] border border-[#b2e5c1] flex items-center justify-center text-xl shrink-0 group-hover:scale-105 transition-transform">
                  🌿
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-base text-[#1a110a]">
                      100% Pathogen Free &amp; Pure
                    </h3>
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-[#15803d]/10 text-[#15803d] border border-[#15803d]/20">
                      71x Cleaner
                    </span>
                  </div>
                  <p className="text-xs text-[#736555] mt-0.5">
                    Total bacterial count is only 1,400 cfu/g (statutory threshold permits up to 100,000 cfu/g).
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4 pt-4 border-t border-[#f5ece0] text-center">
              <div className="p-2 rounded-xl bg-[#faf6ee]">
                <span className="text-[10px] text-[#8c7e6e] block uppercase font-bold">E. Coli</span>
                <strong className="text-xs text-[#15803d]">Absent / g</strong>
                <span className="text-[9px] text-[#9c8e80] block">IS 5887</span>
              </div>
              <div className="p-2 rounded-xl bg-[#faf6ee]">
                <span className="text-[10px] text-[#8c7e6e] block uppercase font-bold">Salmonella</span>
                <strong className="text-xs text-[#15803d]">Absent / 25g</strong>
                <span className="text-[9px] text-[#9c8e80] block">IS 5887</span>
              </div>
              <div className="p-2 rounded-xl bg-[#faf6ee]">
                <span className="text-[10px] text-[#8c7e6e] block uppercase font-bold">Staphylococcus</span>
                <strong className="text-xs text-[#15803d]">Absent / g</strong>
                <span className="text-[9px] text-[#9c8e80] block">Standard</span>
              </div>
              <div className="p-2 rounded-xl bg-[#faf6ee]">
                <span className="text-[10px] text-[#8c7e6e] block uppercase font-bold">Pseudomonas</span>
                <strong className="text-xs text-[#15803d]">Absent / g</strong>
                <span className="text-[9px] text-[#9c8e80] block">IS 13428</span>
              </div>
            </div>
          </div>

          {/* Card 3: Standard Quality & Authenticity */}
          <div className="p-5 sm:p-6 rounded-3xl bg-white/90 backdrop-blur-sm border border-[#ede0cf] shadow-xs hover:border-[#c87a1e] hover:shadow-md transition-all group">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-2xl bg-[#faecc9] border border-[#ecd29b] flex items-center justify-center text-xl shrink-0 group-hover:scale-105 transition-transform">
                  🍯
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-base text-[#1a110a]">
                      64.44% Unadulterated Natural Honey
                    </h3>
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-[#15803d]/10 text-[#15803d] border border-[#15803d]/20">
                      Standard Quality
                    </span>
                  </div>
                  <p className="text-xs text-[#736555] mt-0.5">
                    Infused with natural refreshing mint extract. Zero corn syrup, zero preservatives.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Authentic Certificate Card & CTAs (5 Cols) */}
        <div className="lg:col-span-5">
          <div className="relative rounded-3xl p-6 sm:p-7 bg-[#fffdfa] border-2 border-[#e6d5bd] shadow-[0_15px_35px_rgba(200,122,30,0.08)] space-y-5">
            {/* Stamp Badge */}
            <div className="flex items-center justify-between pb-4 border-b border-[#f0e4d2]">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#a85a00] block">
                  Official Document
                </span>
                <h4 className="font-bold text-base text-[#1a110a]">
                  Herbal Farm Life Care Pvt Ltd
                </h4>
                <span className="text-[11px] text-[#786a5a]">
                  Okhla Industrial Area, New Delhi · Batch #HFL-GMG-08/26-01
                </span>
              </div>
              <div className="w-12 h-12 rounded-full border-2 border-dashed border-[#15803d] flex items-center justify-center text-[10px] font-extrabold text-[#15803d] text-center leading-none p-1 shrink-0 rotate-12">
                VERIFIED SEAL
              </div>
            </div>

            {/* Document Thumbnail Preview */}
            <div
              onClick={() => setIsModalOpen(true)}
              className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-[#e0cfb8] bg-[#fdfbf7] shadow-inner group cursor-pointer"
            >
              <img
                src="/images/coa_page_1.png"
                alt="Gapoo Official Certificate of Analysis Preview"
                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10 group-hover:from-black/70 transition-all flex flex-col justify-end p-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-xs font-bold text-[#1a110a] shadow-md w-max group-hover:bg-[#f5a623] transition-colors">
                  <span>🔍</span>
                  <span>Click to Inspect Full Certificate</span>
                </span>
              </div>
            </div>

            {/* Provenance Metadata */}
            <div className="grid grid-cols-2 gap-3 text-xs bg-[#faf5eb] p-3.5 rounded-xl border border-[#ede1ce]">
              <div>
                <span className="text-[#8c7e6e] block text-[10px] uppercase font-bold">Analysis Date</span>
                <strong className="text-[#1a110a]">21/09/2026</strong>
              </div>
              <div>
                <span className="text-[#8c7e6e] block text-[10px] uppercase font-bold">Expiry Date</span>
                <strong className="text-[#1a110a]">01/2028</strong>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch gap-2.5 pt-1">
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="flex-1 py-3 px-4 rounded-full bg-[#1a110a] hover:bg-[#332214] text-white font-bold text-xs sm:text-sm tracking-wide text-center transition-all cursor-pointer shadow-md flex items-center justify-center gap-2"
              >
                <span>Inspect Full COA</span>
                <span>↗</span>
              </button>

              <a
                href="/gapoo-coa-certificate.pdf"
                target="_blank"
                rel="noopener noreferrer"
                download="Gapoo_Certificate_of_Analysis.pdf"
                className="py-3 px-4 rounded-full bg-white hover:bg-[#faecc9] border border-[#d6c5af] text-[#1a110a] font-bold text-xs sm:text-sm tracking-wide text-center transition-all cursor-pointer shadow-xs flex items-center justify-center gap-1.5"
              >
                <svg className="w-4 h-4 text-[#c87a1e]" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M7.5 12L12 16.5m0 0L16.5 12M12 16.5V3" />
                </svg>
                <span>Download PDF</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Modal */}
      <CertificateOfAnalysisModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
}
