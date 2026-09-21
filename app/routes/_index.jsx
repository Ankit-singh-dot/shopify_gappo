import { Link } from 'react-router';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

/**
 * @type {Route.MetaFunction}
 */
export const meta = () => {
  return [
    { title: 'Gapoo | The Honey Revolution' },
    {
      name: 'description',
      content: 'From small apiaries straight to your stick. Pure, natural honey reimagined for modern life.',
    },
  ];
};

export default function LandingPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Parallax effects
  // 1. Hero Mascot Parallax
  const bearY = useTransform(scrollYProgress, [0, 0.45], ["0%", "36%"]);
  const bearScale = useTransform(scrollYProgress, [0, 0.45], [1, 1.15]);
  const heroContentY = useTransform(scrollYProgress, [0, 0.35], ["0%", "20%"]);

  // 2. Story Section Parallax
  const bearStoryY = useTransform(scrollYProgress, [0.1, 0.6], ["-10%", "25%"]);
  const imageY1 = useTransform(scrollYProgress, [0.1, 0.7], ["0%", "-25%"]);
  const imageY2 = useTransform(scrollYProgress, [0.1, 0.7], ["0%", "-45%"]);

  // 3. CTA Section Parallax
  const ctaBearY = useTransform(scrollYProgress, [0.6, 1], ["-15%", "15%"]);

  // Ribbon Parallax
  const ribbonOffset = useTransform(scrollYProgress, [0, 1], ["-5%", "-35%"]);
  const ribbonText = "• 100% PURE HONEY • ZERO MESS • SNAP & SQUEEZE • NATURAL MINT INFUSION • 100% PURE HONEY • ZERO MESS • SNAP & SQUEEZE • NATURAL MINT INFUSION • 100% PURE HONEY • ZERO MESS • SNAP & SQUEEZE • NATURAL MINT INFUSION • ";

  return (
    <div ref={containerRef} className="bg-[#fdfaf1] text-[#1a110a] font-montserrat min-h-[200vh] relative overflow-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden">
        {/* Soft Ambient Honey Radial Glow */}
        <div className="absolute w-[500px] sm:w-[750px] lg:w-[900px] h-[500px] sm:h-[750px] lg:h-[900px] rounded-full bg-gradient-to-tr from-[#f5a623]/20 via-[#e8cd8c]/15 to-transparent blur-[120px] pointer-events-none" />

        {/* Parallax Gapoo Bear Mascot in the Background */}
        <motion.div 
          style={{ y: bearY, scale: bearScale }}
          className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <img 
            src="/images/gapoo_bear_mascot_hd.png" 
            alt="Gapoo Bear Mascot" 
            className="w-[320px] sm:w-[500px] md:w-[620px] lg:w-[750px] max-w-[88vw] h-auto object-contain opacity-[0.15] mix-blend-multiply drop-shadow-sm select-none"
          />
        </motion.div>

        {/* Foreground Content */}
        <motion.div 
          style={{ y: heroContentY }}
          className="relative z-10 text-center px-4 flex flex-col items-center max-w-4xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          >
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#faecc9]/90 border border-[#e8cd8c] mb-6 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#d97706] animate-pulse" />
              <span className="text-[11px] sm:text-xs font-bold tracking-[0.25em] uppercase text-[#8b5311]">
                Redefining Sweetness
              </span>
            </div>
          </motion.div>

          <motion.h1 
            className="font-apricot text-7xl sm:text-9xl lg:text-[180px] font-bold leading-[0.8] tracking-tighter text-[#1a110a] select-none"
            initial={{ opacity: 0, scale: 0.95, y: 35 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            Gapoo.
          </motion.h1>

          <motion.p
            className="mt-6 text-sm sm:text-base md:text-lg text-[#5c5247] max-w-lg font-medium leading-relaxed tracking-wide"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.5 }}
          >
            100% pure single-serve honey sticks. No sticky spoons, no messy jars. Just nature in your pocket.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.8 }}
            className="mt-10 flex justify-center"
          >
            <Link 
              to="/shop" 
              className="group relative inline-flex items-center gap-3 px-10 py-5 rounded-full bg-[#1a110a] text-white shadow-2xl hover:shadow-[#f5a623]/25 transition-all duration-300 overflow-hidden border border-[#d4af37]/40 hover:border-[#f5a623]"
              style={{ color: '#ffffff', textDecoration: 'none' }}
            >
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#d97706] via-[#f5a623] to-[#fbbf24] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
              <span 
                className="relative z-10 font-bold tracking-[0.22em] uppercase text-xs sm:text-sm text-white group-hover:text-[#1a110a] transition-colors duration-300 flex items-center gap-3"
                style={{ color: 'inherit' }}
              >
                <span>Enter the Shop</span>
                <svg className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
            </Link>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <span className="text-[10px] uppercase tracking-widest font-bold text-[#8b5311]">Scroll to Explore</span>
          <div className="w-[1.5px] h-12 bg-[#1a110a]/15 overflow-hidden rounded-full">
            <motion.div 
              className="w-full h-full bg-[#d97706]"
              animate={{ y: ["-100%", "100%"] }}
              transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </section>

      {/* 2. THE STORY / MANIFESTO */}
      <section className="py-24 sm:py-36 px-6 sm:px-12 lg:px-24 max-w-[1400px] mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 space-y-10"
          >
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#faecc9] border border-[#e8cd8c] text-[11px] font-bold uppercase tracking-wider text-[#8b5311]">
                A network of independent keepers.
              </div>
              <h2 className="font-apricot text-5xl sm:text-7xl font-bold leading-[0.9] tracking-tighter text-[#1a110a]">
                Real honey doesn't come from factories.
              </h2>
              <div className="w-16 h-[2px] bg-[#c87a1e]"></div>
            </div>

            <div className="space-y-6 text-lg sm:text-xl text-[#5c5247] leading-relaxed font-medium">
              <p>
                It comes from vast fields, patient beekeepers, and healthy hives. 
                That's why we've partnered with a curated network of independent apiaries who prioritize the well-being of their bees over mass production.
              </p>
              <p>
                We maintain a strict Fair Trade Commitment, ensuring that our beekeepers receive a premium for their hard work. This empowers them to sustain traditional, ethical practices that protect local ecosystems.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-8 pt-4">
              <div className="flex flex-col gap-2">
                <span className="text-[#c87a1e] font-apricot text-4xl">Select</span>
                <span className="text-xs uppercase tracking-widest font-bold text-[#1a110a]">Partner Apiaries</span>
              </div>
              <div className="hidden sm:block w-[1px] h-12 bg-[#c87a1e]/20"></div>
              <div className="flex flex-col gap-2">
                <span className="text-[#c87a1e] font-apricot text-4xl">100%</span>
                <span className="text-xs uppercase tracking-widest font-bold text-[#1a110a]">Traceable Origin</span>
              </div>
            </div>
          </motion.div>

          {/* Parallax Image Gallery */}
          <div className="lg:col-span-7 relative h-[600px] sm:h-[800px] w-full flex items-center justify-center mt-12 lg:mt-0">
            {/* Faint Bear Mascot Watermark in story background */}
            <motion.div 
              style={{ y: bearStoryY }}
              className="absolute -right-8 -bottom-10 w-[320px] h-auto opacity-[0.08] pointer-events-none mix-blend-multiply z-0 select-none"
            >
              <img src="/images/gapoo_bear_mascot_hd.png" alt="" className="w-full h-auto" />
            </motion.div>

            <motion.div 
              style={{ y: imageY1 }}
              className="absolute right-0 top-0 w-[65%] h-[55%] rounded-3xl overflow-hidden shadow-2xl z-20 border border-white/60"
            >
              <img src="/images/farming2.jpeg" alt="Bees" className="w-full h-full object-cover scale-110" />
            </motion.div>
            
            <motion.div 
              style={{ y: imageY2 }}
              className="absolute left-0 bottom-4 w-[60%] h-[65%] rounded-3xl overflow-hidden shadow-xl z-10 border border-white/60"
            >
              <img src="/images/farmin2.jpeg" alt="Beekeeper" className="w-full h-full object-cover scale-110" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. THE RIBBON & PRODUCT SECTION */}
      <section className="relative overflow-hidden bg-[#faecc9] pt-8 text-center border-y border-[#e8cd8c]">
        {/* 3D Arched Curvy SVG Ribbon */}
        <div className="relative w-full overflow-hidden flex justify-center items-center py-4">
          <svg
            viewBox="0 0 1440 260"
            className="w-[125%] -ml-[12.5%] sm:w-[110%] sm:-ml-[5%] max-w-none h-auto overflow-visible drop-shadow-xl"
          >
            <defs>
              <path
                id="ribbonArchPath"
                d="M -300 240 Q 720 15 1740 240"
                fill="none"
              />
            </defs>

            {/* Honey Amber Ribbon Background Stroke */}
            <path
              d="M -300 240 Q 720 15 1740 240"
              fill="none"
              stroke="#c87a1e"
              strokeWidth="86"
              strokeLinecap="round"
            />

            {/* Subtle Top & Bottom Highlight Borders */}
            <path
              d="M -300 197 Q 720 -28 1740 197"
              fill="none"
              stroke="rgba(255,255,255,0.35)"
              strokeWidth="2"
            />
            <path
              d="M -300 283 Q 720 58 1740 283"
              fill="none"
              stroke="rgba(255,255,255,0.15)"
              strokeWidth="2"
            />

            {/* Scroll-Reactive Text Path */}
            <text
              dy="8"
              className="fill-[#fdfaf1] font-black text-[22px] sm:text-[24px] uppercase tracking-wider font-sans select-none"
            >
              <motion.textPath
                href="#ribbonArchPath"
                startOffset={ribbonOffset}
              >
                {ribbonText}
              </motion.textPath>
            </text>
          </svg>
        </div>

        {/* Editorial Headline */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 mt-16 sm:mt-24 pb-24 sm:pb-40 flex flex-col items-center text-center space-y-8 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="w-full flex justify-center"
          >
            <h2 className="font-apricot text-6xl sm:text-8xl font-bold tracking-tighter text-[#1a110a] leading-[0.9] flex flex-col items-center justify-center text-center w-full" style={{ textAlign: 'center' }}>
              <span>Pure nature.</span>
              <span className="text-[#c87a1e] mt-2">Modern convenience.</span>
            </h2>
          </motion.div>

          <motion.p 
            className="text-lg sm:text-xl text-[#5c5247] mt-8 max-w-2xl font-medium leading-relaxed w-full"
            style={{ textAlign: 'center' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            By the time a single drop of Gapoo honey reaches your stick, it has been carefully harvested, naturally filtered, and perfectly infused with natural mint extract. We never add artificial syrups or refined sugars. What you taste is pure, unrefined natural sweetness.
          </motion.p>
          
          <motion.p 
            className="text-lg sm:text-xl text-[#5c5247] mt-6 max-w-2xl font-medium leading-relaxed w-full"
            style={{ textAlign: 'center' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            And because we care about the land that gives us so much, our single-serve sticks are <strong className="text-[#1a110a] font-bold">Earth Conscious</strong>—designed for recycling so you can enjoy guilt-free sweetness on the go.
          </motion.p>
        </div>
      </section>

      {/* 4. FINAL CTA */}
      <section className="pt-32 pb-40 sm:pt-48 sm:pb-48 px-6 text-center bg-[#fdfaf1] relative overflow-hidden" style={{ paddingTop: '10rem', paddingBottom: '12rem' }}>
        {/* Parallax Mascot in CTA Background */}
        <motion.div 
          style={{ y: ctaBearY }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0"
        >
          <img 
            src="/images/gapoo_bear_mascot_hd.png" 
            className="w-[380px] sm:w-[580px] lg:w-[720px] h-auto object-contain opacity-[0.08] mix-blend-multiply select-none" 
            alt="Gapoo Bear" 
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 space-y-10 flex flex-col items-center max-w-3xl mx-auto"
        >
          <span className="text-xs font-bold tracking-[0.3em] uppercase text-[#c87a1e]">
            Join the Movement
          </span>
          <h2 className="font-apricot text-6xl sm:text-8xl font-bold text-[#1a110a] leading-[0.9] tracking-tighter">
            Ready to taste <br/> the difference?
          </h2>
          <p className="text-base sm:text-lg text-[#5c5247] max-w-md font-medium leading-relaxed">
            Experience the new standard of honey. Delivered straight to your doorstep in individual tear-and-pour sticks.
          </p>
          
          <Link 
            to="/shop" 
            className="group relative inline-flex items-center gap-3 px-12 py-6 rounded-full bg-[#1a110a] text-white shadow-2xl hover:shadow-[#f5a623]/30 transition-all duration-300 overflow-hidden border border-[#d4af37]/40 hover:border-[#f5a623]"
            style={{ color: '#ffffff', textDecoration: 'none' }}
          >
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#d97706] via-[#f5a623] to-[#fbbf24] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
            <span 
              className="relative z-10 font-bold tracking-[0.22em] uppercase text-xs sm:text-sm text-white group-hover:text-[#1a110a] transition-colors duration-300 flex items-center gap-3"
              style={{ color: 'inherit' }}
            >
              <span>Shop the Collection</span>
              <svg 
                className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform duration-300" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
          </Link>
        </motion.div>
      </section>

    </div>
  );
}
