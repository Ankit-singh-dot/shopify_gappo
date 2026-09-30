import { Link } from 'react-router';
import { motion } from 'framer-motion';

/**
 * @param {FooterProps}
 */
export function Footer({footer, header, publicStoreDomain}) {
  return (
    <footer className="bg-[#1a110a] text-white pt-24 pb-12 relative overflow-hidden border-t border-[#c87a1e]">
      
      {/* Massive Drop-in Logo */}
      <div className="w-full flex justify-center items-center overflow-hidden mb-24 px-4 h-[30vw] min-h-[150px] relative">
         <motion.h1 
           className="font-apricot text-[#c87a1e] tracking-tighter leading-none text-center absolute drop-shadow-2xl"
           style={{ fontSize: 'clamp(5rem, 28vw, 500px)' }}
           initial={{ y: "-100%", opacity: 0, scale: 0.9, rotateX: 45 }}
           whileInView={{ y: "0%", opacity: 1, scale: 1, rotateX: 0 }}
           viewport={{ once: false, margin: "0px" }}
           transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], type: "spring", bounce: 0.4 }}
         >
           Gapoo
         </motion.h1>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-24 relative z-10">
         {/* Footer Grid */}
         <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 mb-24">
            
            {/* Brand Column */}
            <div className="lg:col-span-5 space-y-8">
               <img src="/images/gapoo_bear_mascot_hd.png" alt="Gapoo Bear" className="w-20 h-20 sm:w-24 sm:h-24 object-contain filter invert brightness-200 opacity-90" />
               <h3 className="font-montserrat font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tighter leading-[1.1] max-w-sm uppercase">
                 The new standard.
               </h3>
               <p className="text-[#a39585] max-w-sm text-lg leading-relaxed font-medium">
                 Pure, unadulterated goodness in a revolutionary single-serve stick. Designed for the modern ritual.
               </p>
               
               {/* Newsletter Input */}
               <div className="relative mt-12 max-w-md group">
                 <input 
                   type="email" 
                   placeholder="Join the hive (Email Address)" 
                   className="w-full bg-transparent border-b border-white/20 py-4 pl-2 pr-12 text-white placeholder-white/40 focus:outline-none focus:border-[#c87a1e] transition-colors font-medium"
                 />
                 <button className="absolute right-0 top-1/2 -translate-y-1/2 text-white/50 group-hover:text-[#c87a1e] transition-colors p-2">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                 </button>
               </div>
            </div>

            {/* Links Columns */}
            <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-10 sm:gap-8 pt-4">
               <div className="space-y-8">
                 <h4 className="font-montserrat font-bold tracking-[0.25em] uppercase text-[#c87a1e] text-xs">Shop</h4>
                 <ul className="space-y-5 text-[#d4c9bc] font-medium text-sm sm:text-base">
                   <li><Link to="/shop" className="hover:text-white transition-colors relative inline-block group"><span>All Products</span><span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#c87a1e] group-hover:w-full transition-all duration-300"></span></Link></li>
                   <li><Link to="/shop" className="hover:text-white transition-colors relative inline-block group"><span>Minted Goodness</span><span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#c87a1e] group-hover:w-full transition-all duration-300"></span></Link></li>
                   <li><Link to="/shop" className="hover:text-white transition-colors relative inline-block group"><span>Subscribe & Save</span><span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#c87a1e] group-hover:w-full transition-all duration-300"></span></Link></li>
                   <li><Link to="/shop" className="hover:text-white transition-colors relative inline-block group"><span>Gift Cards</span><span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#c87a1e] group-hover:w-full transition-all duration-300"></span></Link></li>
                 </ul>
               </div>

               <div className="space-y-8">
                 <h4 className="font-montserrat font-bold tracking-[0.25em] uppercase text-[#c87a1e] text-xs">Learn</h4>
                 <ul className="space-y-5 text-[#d4c9bc] font-medium text-sm sm:text-base">
                   <li><a href="#" className="hover:text-white transition-colors relative inline-block group"><span>Our Story</span><span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#c87a1e] group-hover:w-full transition-all duration-300"></span></a></li>
                   <li><a href="#" className="hover:text-white transition-colors relative inline-block group"><span>Sourcing</span><span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#c87a1e] group-hover:w-full transition-all duration-300"></span></a></li>
                   <li><a href="#" className="hover:text-white transition-colors relative inline-block group"><span>Recipes</span><span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#c87a1e] group-hover:w-full transition-all duration-300"></span></a></li>
                   <li><a href="#" className="hover:text-white transition-colors relative inline-block group"><span>Sustainability</span><span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#c87a1e] group-hover:w-full transition-all duration-300"></span></a></li>
                 </ul>
               </div>

               <div className="space-y-8 col-span-2 sm:col-span-1">
                 <h4 className="font-montserrat font-bold tracking-[0.25em] uppercase text-[#c87a1e] text-xs">Help</h4>
                 <ul className="space-y-5 text-[#d4c9bc] font-medium text-sm sm:text-base">
                   <li><a href="#" className="hover:text-white transition-colors relative inline-block group"><span>FAQ</span><span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#c87a1e] group-hover:w-full transition-all duration-300"></span></a></li>
                   <li><Link to="/policies/shipping-policy" className="hover:text-white transition-colors relative inline-block group"><span>Shipping & Returns</span><span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#c87a1e] group-hover:w-full transition-all duration-300"></span></Link></li>
                   <li><a href="#" className="hover:text-white transition-colors relative inline-block group"><span>Contact Us</span><span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#c87a1e] group-hover:w-full transition-all duration-300"></span></a></li>
                   <li><a href="#" className="hover:text-white transition-colors relative inline-block group"><span>Wholesale</span><span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#c87a1e] group-hover:w-full transition-all duration-300"></span></a></li>
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
               <Link to="/policies/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
               <Link to="/policies/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link>
               
               {/* Social Icons */}
               <div className="flex items-center gap-5 sm:ml-4">
                  <a href="#" className="text-[#8a7d70] hover:text-[#c87a1e] transition-colors">
                     <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                  </a>
                  <a href="#" className="text-[#8a7d70] hover:text-[#c87a1e] transition-colors">
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
