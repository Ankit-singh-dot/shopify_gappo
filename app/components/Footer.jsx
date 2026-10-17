import { Link } from 'react-router';

/**
 * @param {FooterProps}
 */
export function Footer() {
  return (
    <footer className="bg-[#1a110a] text-white pt-24 pb-12 relative overflow-hidden border-t border-[#c87a1e]">
      
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-24 relative z-10">
         {/* Footer Grid */}
         <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 mb-24">
            
            {/* Brand Column */}
            <div className="lg:col-span-5 space-y-8">
               <img src="/images/gapoo_bear_mascot_hd.png" alt="Gapoo Bear" className="w-20 h-20 sm:w-24 sm:h-24 object-contain filter invert brightness-200 opacity-90" />
               <h3 className="font-montserrat font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tighter leading-[1.1] max-w-sm uppercase">
                 The hive awakening.
               </h3>
               <p className="text-[#a39585] max-w-sm text-lg leading-relaxed font-medium">
                 100% traceable, hive-to-bottle raw botanical honey and the untapped natural pharmacy of the hive. Born from Garden+Pool.
               </p>
            </div>

            {/* Links Columns */}
            <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-10 sm:gap-8 pt-4">
               <div className="space-y-8">
                 <h4 className="font-montserrat font-bold tracking-[0.25em] uppercase text-[#c87a1e] text-xs">Shop</h4>
                 <ul className="space-y-5 text-[#d4c9bc] font-medium text-sm sm:text-base">
                   <li><Link to="/shop" className="hover:text-white transition-colors relative inline-block group"><span>All Products</span><span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#c87a1e] group-hover:w-full transition-all duration-300"></span></Link></li>
                   <li><Link to="/shop?mode=subscribe#purchase-dock" className="hover:text-white transition-colors relative inline-block group"><span>Subscribe &amp; Save</span><span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#c87a1e] group-hover:w-full transition-all duration-300"></span></Link></li>
                 </ul>
               </div>

               <div className="space-y-8">
                 <h4 className="font-montserrat font-bold tracking-[0.25em] uppercase text-[#c87a1e] text-xs">Learn &amp; Trust</h4>
                 <ul className="space-y-5 text-[#d4c9bc] font-medium text-sm sm:text-base">
                   <li><Link to="/story" className="hover:text-white transition-colors relative inline-block group"><span>Our Story (4 Chapters)</span><span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#c87a1e] group-hover:w-full transition-all duration-300"></span></Link></li>
                   <li><Link to="/shop#lab-verified" className="hover:text-white transition-colors relative inline-block group text-amber-300"><span>🔬 Lab Certified (COA)</span><span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#c87a1e] group-hover:w-full transition-all duration-300"></span></Link></li>
                   <li><a href="/gapoo-coa-certificate.pdf" target="_blank" rel="noopener noreferrer" download="Gapoo_Certificate_of_Analysis.pdf" className="hover:text-white transition-colors relative inline-block group text-xs text-white/70"><span>Download COA (PDF)</span><span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#c87a1e] group-hover:w-full transition-all duration-300"></span></a></li>
                   <li><Link to="/shop#why-honey" className="hover:text-white transition-colors relative inline-block group"><span>Why Honey</span><span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#c87a1e] group-hover:w-full transition-all duration-300"></span></Link></li>
                 </ul>
               </div>

               <div className="space-y-8 col-span-2 sm:col-span-1">
                 <h4 className="font-montserrat font-bold tracking-[0.25em] uppercase text-[#c87a1e] text-xs">Help</h4>
                 <ul className="space-y-5 text-[#d4c9bc] font-medium text-sm sm:text-base">
                   <li><Link to="/story#faq" className="hover:text-white transition-colors relative inline-block group"><span>FAQ</span><span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#c87a1e] group-hover:w-full transition-all duration-300"></span></Link></li>
                   <li><Link to="/policies/shipping-policy" className="hover:text-white transition-colors relative inline-block group"><span>Shipping & Returns</span><span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#c87a1e] group-hover:w-full transition-all duration-300"></span></Link></li>
                   <li><Link to="/story#contact" className="hover:text-white transition-colors relative inline-block group"><span>Contact Us</span><span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#c87a1e] group-hover:w-full transition-all duration-300"></span></Link></li>
                   <li><Link to="/story#wholesale" className="hover:text-white transition-colors relative inline-block group"><span>Wholesale</span><span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#c87a1e] group-hover:w-full transition-all duration-300"></span></Link></li>
                 </ul>
               </div>
            </div>

         </div>

         {/* Bottom Bar */}
         <div className="border-t border-white/10 pt-8 pb-4 flex flex-col md:flex-row items-center justify-between gap-6 text-[#8a7d70] text-xs font-medium uppercase tracking-wider">
            <div className="flex items-center gap-2">
              <span>© {new Date().getFullYear()} Gapoo Honey Sticks.</span>
              <span className="hidden sm:inline">All rights reserved.</span>
            </div>
            
            <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-10">
               <Link to="/policies/refund-policy" className="hover:text-white transition-colors">Return Policy</Link>
               <Link to="/policies/shipping-policy" className="hover:text-white transition-colors">Shipping Policy</Link>
               <Link to="/policies/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
               <Link to="/policies/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link>
               
               {/* Social Icons */}
               <div className="flex items-center gap-5 sm:ml-4">
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-[#8a7d70] hover:text-[#c87a1e] transition-colors">
                     <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                  </a>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-[#8a7d70] hover:text-[#c87a1e] transition-colors">
                     <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                  </a>
               </div>
            </div>
         </div>
      </div>
      
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[100vw] max-w-[1200px] h-[600px] bg-[#c87a1e] opacity-[0.04] blur-[150px] rounded-full pointer-events-none z-0" />
    </footer>
  );
}

/**
 * @typedef {Object} FooterProps
 * @property {Promise<FooterQuery|null>} footer
 * @property {HeaderQuery} header
 * @property {string} publicStoreDomain
 */

/** @typedef {import('storefrontapi.generated').FooterQuery} FooterQuery */
/** @typedef {import('storefrontapi.generated').HeaderQuery} HeaderQuery */
