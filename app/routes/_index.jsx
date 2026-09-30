import { Link } from 'react-router';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

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

/* ─── Reusable Fade-In wrapper ─── */
function FadeIn({ children, className = '', delay = 0, direction = 'up', distance = 40 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-12%' });
  const dirMap = {
    up: { y: distance, x: 0 },
    down: { y: -distance, x: 0 },
    left: { x: distance, y: 0 },
    right: { x: -distance, y: 0 },
  };
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...dirMap[direction] }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Horizontal Marquee ─── */
function Marquee({ children, speed = 30, className = '' }) {
  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <motion.div
        className="inline-flex"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: speed, repeat: Infinity, ease: 'linear' }}
      >
        {children}
        {children}
      </motion.div>
    </div>
  );
}

/* ─── Counter Animation ─── */
function AnimatedCounter({ target, suffix = '', prefix = '' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const end = parseInt(target);
    const duration = 2000;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return <span ref={ref}>{prefix}{count}{suffix}</span>;
}

/* ─── Scroll Reveal Text Component ─── */
function RevealWord({ word, progress, range }) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return <motion.span style={{ opacity }} className="mr-[0.25em] inline-block">{word}</motion.span>;
}

function ScrollRevealText({ text, className }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "end 45%"]
  });
  
  const words = text.split(" ");
  return (
    <div ref={ref} className={`flex flex-wrap ${className}`}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + (1 / words.length);
        return <RevealWord key={i} word={word} progress={scrollYProgress} range={[start, end]} />;
      })}
    </div>
  );
}

export default function LandingPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Parallax transforms
  const heroImageScale = useTransform(scrollYProgress, [0, 0.15], [1.08, 1.25]);
  const heroImageY = useTransform(scrollYProgress, [0, 0.2], ['0%', '18%']);
  const heroOverlayOpacity = useTransform(scrollYProgress, [0, 0.12], [0.35, 0.65]);
  const heroTextY = useTransform(scrollYProgress, [0, 0.15], ['0%', '30%']);
  const bearY = useTransform(scrollYProgress, [0.05, 0.35], ['0%', '25%']);
  const ribbonX = useTransform(scrollYProgress, [0, 1], ['0%', '-40%']);
  const ctaBearY = useTransform(scrollYProgress, [0.75, 1], ['-10%', '15%']);
  const storyImageY = useTransform(scrollYProgress, [0.2, 0.55], ['8%', '-12%']);
  const storyImageY2 = useTransform(scrollYProgress, [0.2, 0.55], ['16%', '-20%']);
  const productImageY = useTransform(scrollYProgress, [0.35, 0.65], ['10%', '-10%']);
  const productBearScale = useTransform(scrollYProgress, [0.4, 0.6], [0.95, 1.05]);

  // Manifesto Typography Parallax
  const manifestoRef = useRef(null);
  const { scrollYProgress: manifestoScroll } = useScroll({
    target: manifestoRef,
    offset: ['start end', 'end start'],
  });
  const manifestoX1 = useTransform(manifestoScroll, [0, 1], ['0%', '-40%']);
  const manifestoX2 = useTransform(manifestoScroll, [0, 1], ['-20%', '10%']);
  const manifestoX3 = useTransform(manifestoScroll, [0, 1], ['-10%', '-50%']);

  // Horizontal Scroll Parallax
  const horizontalRef = useRef(null);
  const { scrollYProgress: horizontalScroll } = useScroll({ target: horizontalRef });
  const horizontalX = useTransform(horizontalScroll, [0, 1], ["0%", "-75%"]);

  // Lifestyle moments data
  const moments = [
    { img: '/images/moment_tea_clean.jpg', label: 'Morning Tea', caption: 'Drop it in. Stir. Sip.' },
    { img: '/images/moment_breakfast_clean.jpg', label: 'Breakfast Bowl', caption: 'Drizzle over oats & berries.' },
    { img: '/images/moment_pocket_clean.jpg', label: 'On The Trail', caption: 'Nature in your pocket.' },
  ];

  const ribbonWords = 'PURE · ZERO MESS · SNAP & SQUEEZE · NATURAL MINT · TRACEABLE ORIGIN · EARTH CONSCIOUS · ';

  return (
    <div ref={containerRef} className="bg-[#fdfaf1] text-[#1a110a] font-montserrat relative w-full overflow-clip">

      {/* ════════════════════════════════════════════════════════════ */}
      {/* 1. CINEMATIC HERO — Full-bleed product image with parallax */}
      {/* ════════════════════════════════════════════════════════════ */}
      <section className="relative h-[100svh] w-full flex flex-col items-center justify-center overflow-hidden">
        {/* Parallax Background Image */}
        <motion.div
          style={{ scale: heroImageScale, y: heroImageY }}
          className="absolute inset-0 z-0"
        >
          <img
            src="/images/gapoo_hero_pour.jpg"
            alt="Gapoo honey stick pouring golden honey into a cup"
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Dark gradient overlay for text legibility */}
        <motion.div
          style={{ opacity: heroOverlayOpacity }}
          className="absolute inset-0 z-[1] bg-gradient-to-b from-black/50 via-black/30 to-black/60"
        />

        {/* Warm honey glow from bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-[40%] z-[2] bg-gradient-to-t from-[#1a110a]/40 via-transparent to-transparent pointer-events-none" />

        {/* Foreground Content */}
        <motion.div
          style={{ y: heroTextY }}
          className="relative z-10 text-center px-6 flex flex-col items-center max-w-5xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8 shadow-lg">
              <span className="w-2 h-2 rounded-full bg-[#f5a623] animate-pulse" />
              <span className="text-[11px] sm:text-xs font-bold tracking-[0.3em] uppercase text-white/90">
                Redefining Sweetness
              </span>
            </div>
          </motion.div>

          <motion.h1
            className="font-apricot text-7xl sm:text-9xl lg:text-[160px] xl:text-[200px] font-bold leading-[0.85] tracking-tighter text-white select-none drop-shadow-2xl"
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            Gapoo.
          </motion.h1>

          <motion.p
            className="mt-6 sm:mt-8 text-sm sm:text-base md:text-lg text-white/80 max-w-lg font-medium leading-relaxed tracking-wide"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.6 }}
          >
            pure single-serve honey sticks. No sticky spoons, no messy jars. Just nature in your pocket.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-center gap-4"
          >
            <Link
              to="/shop"
              className="group relative inline-flex items-center gap-3 px-10 py-5 rounded-full bg-white text-[#1a110a] shadow-2xl hover:shadow-[#f5a623]/40 transition-all duration-500 overflow-hidden"
              style={{ color: '#1a110a', textDecoration: 'none' }}
            >
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#f5a623] via-[#fbbf24] to-[#d97706] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
              <span className="relative z-10 font-bold tracking-[0.2em] uppercase text-xs sm:text-sm group-hover:text-white transition-colors duration-300 flex items-center gap-3">
                <span>Enter the Shop</span>
                <svg className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
            </Link>
            <a
              href="#story"
              className="text-xs sm:text-sm font-bold tracking-widest uppercase text-white/70 hover:text-white transition-colors duration-300 flex items-center gap-2"
              style={{ textDecoration: 'none' }}
            >
              {/* <span>Our Story</span> */}
              {/* <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg> */}
            </a>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 1 }}
        >
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/50">Scroll</span>
          <div className="w-[1px] h-10 bg-white/20 overflow-hidden rounded-full">
            <motion.div
              className="w-full h-full bg-[#f5a623]"
              animate={{ y: ['-100%', '100%'] }}
              transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
            />
          </div>
        </motion.div>
      </section>

      {/* ════════════════════════════════════════════════════════════ */}
      {/* 2. TRUST MARQUEE — Horizontal scrolling social proof        */}
      {/* ════════════════════════════════════════════════════════════ */}
      <div className="bg-[#c87a1e] pt-6 sm:pt-8 relative z-20">
        <Marquee speed={35}>
          <span className="inline-flex items-center gap-8 sm:gap-12 px-4 text-[10px] sm:text-xs font-bold tracking-[0.3em] uppercase text-[#fdfaf1]">
            <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-white" />Pure Honey</span>
            <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-white" />Zero Preservatives</span>
            <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-white" />Traceable Origin</span>
            <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-white" />Fair Trade Sourced</span>
            <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-white" />Earth Conscious</span>
            <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-white" />Single-Serve Sticks</span>
            <span className="text-white/40 mx-4">—</span>
          </span>
        </Marquee>
        {/* Wavy Divider Bottom */}
        <div className="absolute top-full left-0 w-full overflow-hidden leading-none z-20 -mt-[1px]">
          <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="w-full h-[40px] sm:h-[70px] lg:h-[100px] text-[#c87a1e]">
            <path fill="currentColor" d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"></path>
          </svg>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════ */}
      {/* 3. STORY SECTION — Editorial two-column with parallax imgs  */}
      {/* ════════════════════════════════════════════════════════════ */}
      <section id="story" className="py-28 sm:py-40 px-6 sm:px-12 lg:px-24 max-w-[1440px] mx-auto relative z-10 scroll-mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-28 items-start">

          {/* Left: Editorial Copy */}
          <div className="space-y-10 lg:pt-12 pl-10">
            <FadeIn>
              <div className="flex items-center gap-3 mb-2">
                <div className="h-[1px] w-10 bg-[#c87a1e]" />
                <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#c87a1e]">Our Story</span>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <h2 className="font-apricot text-5xl sm:text-6xl lg:text-7xl font-bold leading-[0.9] tracking-tighter text-[#1a110a]">
                Real honey doesn't come from factories.
              </h2>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="w-16 h-[2px] bg-[#c87a1e]" />
            </FadeIn>

            <FadeIn delay={0.25}>
              <div className="space-y-6 text-base sm:text-lg text-[#5c5247] leading-[1.8] font-medium">
                <p>
                  It comes from vast fields, patient beekeepers, and healthy hives.
                  We've partnered with a curated network of independent apiaries who prioritize the well-being of their bees over mass production.
                </p>
                <p>
                  We maintain a strict <strong className="text-[#1a110a]">Fair Trade Commitment</strong>, ensuring our beekeepers receive a premium for their craft—empowering traditional, ethical practices that protect local ecosystems.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.35}>
              <div className="flex items-center gap-10 pt-6">
                <div className="flex flex-col">
                  <span className="text-4xl sm:text-5xl font-bold text-[#c87a1e] tracking-tighter font-apricot">
                    <AnimatedCounter target="100" suffix="%" />
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#1a110a] mt-1">Traceable Origin</span>
                </div>
                <div className="w-[1px] h-14 bg-[#c87a1e]/20" />
                <div className="flex flex-col">
                  <span className="text-4xl sm:text-5xl font-bold text-[#c87a1e] tracking-tighter font-apricot">Select</span>
                  <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#1a110a] mt-1">Partner Apiaries</span>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Right: Parallax Image Stack */}
          <div className="relative h-[550px] sm:h-[700px] lg:h-[800px] w-full mt-8 lg:mt-0">
            {/* Bear watermark */}
            <motion.div
              style={{ y: bearY }}
              className="absolute -right-6 -bottom-8 w-[280px] h-auto opacity-[0.06] pointer-events-none mix-blend-multiply z-0 select-none"
            >
              <img src="/images/gapoo_bear_mascot_hd.png" alt="" className="w-full h-auto" />
            </motion.div>

            <motion.div
              style={{ y: storyImageY }}
              className="absolute right-0 top-0 w-[68%] h-[52%] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl z-20 border border-white/50"
            >
              <img src="/images/farming2.jpeg" alt="Close up of bees on honeycomb" className="w-full h-full object-cover scale-[1.08] hover:scale-[1.14] transition-transform duration-[1.5s]" />
            </motion.div>

            <motion.div
              style={{ y: storyImageY2 }}
              className="absolute left-0 bottom-8 w-[62%] h-[58%] rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl z-10 border border-white/50"
            >
              <img src="/images/farmin2.jpeg" alt="Beekeeper in golden field" className="w-full h-full object-cover scale-[1.08] hover:scale-[1.14] transition-transform duration-[1.5s]" />
            </motion.div>

            {/* Floating accent card */}
            <FadeIn delay={0.5} className="absolute right-4 bottom-20 z-30">
              <div className="bg-white/95 backdrop-blur-md border border-[#e8cd8c] rounded-2xl px-5 py-4 shadow-xl max-w-[200px]">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-[#10b981]" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#10b981]">Verified</span>
                </div>
                <p className="text-xs text-[#5c5247] leading-relaxed font-medium">
                  Every batch is tested and traceable to its source apiary.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════ */}
      {/* 3.5 BOLD SCROLL-REVEAL TYPOGRAPHY                           */}
      {/* ════════════════════════════════════════════════════════════ */}
      <section className="pt-24 sm:pt-32 pb-32 sm:pb-48 px-6 sm:px-12 lg:px-24 max-w-[1440px] mx-auto relative z-10 flex justify-center">
         <ScrollRevealText 
           text="Forget everything you know about honey. We stripped away the jars, the sticky spoons, and the artificial syrups. What remains is 100% pure, unadulterated energy — precisely measured and perfectly packaged for modern life."
           className="font-apricot text-5xl sm:text-7xl lg:text-[85px] leading-[1.3] sm:leading-[1.4] tracking-normal text-[#1a110a] max-w-5xl text-center"
         />
      </section>

      {/* ════════════════════════════════════════════════════════════ */}
      {/* 3.6 MASSIVE KINETIC TYPOGRAPHY                              */}
      {/* ════════════════════════════════════════════════════════════ */}
      <section ref={manifestoRef} className="py-40 sm:py-56 lg:py-72 min-h-[100svh] flex flex-col justify-center overflow-hidden relative border-t border-[#ebd8b0] bg-[#faecd0]">
         <div className="flex flex-col gap-6 sm:gap-10 opacity-90 relative z-10">
           <motion.div style={{ x: manifestoX1 }} className="whitespace-nowrap flex items-center">
              <h2 className="font-montserrat leading-[0.85] tracking-tighter font-black text-[#1a110a]" style={{ fontSize: 'clamp(3rem, 10vw, 10rem)' }}>
                 LEAVE THE JAR <span className="text-[#c87a1e] px-4 sm:px-8">✦</span> LEAVE THE JAR <span className="text-[#c87a1e] px-4 sm:px-8">✦</span> LEAVE THE JAR <span className="text-[#c87a1e] px-4 sm:px-8">✦</span> LEAVE THE JAR
              </h2>
           </motion.div>
           <motion.div style={{ x: manifestoX2 }} className="whitespace-nowrap flex items-center">
              <h2 className="font-montserrat leading-[0.85] tracking-tighter font-black text-transparent" style={{ WebkitTextStroke: '2px #1a110a', fontSize: 'clamp(4rem, 12vw, 12rem)' }}>
                 TEAR & SQUEEZE <span className="text-transparent px-4 sm:px-8" style={{ WebkitTextStroke: '2px #1a110a' }}>✦</span> TEAR & SQUEEZE <span className="text-transparent px-4 sm:px-8" style={{ WebkitTextStroke: '2px #1a110a' }}>✦</span> TEAR & SQUEEZE <span className="text-transparent px-4 sm:px-8" style={{ WebkitTextStroke: '2px #1a110a' }}>✦</span> TEAR & SQUEEZE
              </h2>
           </motion.div>
           <motion.div style={{ x: manifestoX3 }} className="whitespace-nowrap flex items-center">
              <h2 className="font-montserrat leading-[0.85] tracking-tighter font-black text-[#1a110a]" style={{ fontSize: 'clamp(3rem, 10vw, 10rem)' }}>
                 100% PURE <span className="text-[#c87a1e] px-4 sm:px-8">✦</span> 100% PURE <span className="text-[#c87a1e] px-4 sm:px-8">✦</span> 100% PURE <span className="text-[#c87a1e] px-4 sm:px-8">✦</span> 100% PURE
              </h2>
           </motion.div>
         </div>

         {/* Center floating image */}
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85vw] sm:w-[50vw] max-w-[500px] pointer-events-none z-20 mix-blend-multiply">
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 80, rotate: -6 }}
              whileInView={{ scale: 1, opacity: 1, y: 0, rotate: 3 }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true, margin: "-10%" }}
            >
              <img 
                src="/images/moment_pocket_clean.jpg" 
                alt="Honey sticks in pocket" 
                className="w-full h-auto rounded-[32px] sm:rounded-[40px] object-cover border-4 border-[#fdfaf1] shadow-2xl"
              />
            </motion.div>
         </div>
      </section>

      {/* ════════════════════════════════════════════════════════════ */}
      {/* 4. ANIMATED RIBBON DIVIDER                                  */}
      {/* ════════════════════════════════════════════════════════════ */}
      <div className="pt-8 pb-4 bg-[#c87a1e] relative z-20">
        {/* Wavy Divider Top */}
        <div className="absolute bottom-full left-0 w-full overflow-hidden leading-none z-20 -mb-[1px]">
          <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="w-full h-[40px] sm:h-[70px] lg:h-[100px] text-[#c87a1e]">
            <path fill="currentColor" d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
          </svg>
        </div>
        
        <motion.div
          style={{ x: ribbonX }}
          className="whitespace-nowrap pb-2"
        >
          <span className="inline-block text-[14px] sm:text-[18px] font-black tracking-[0.25em] uppercase text-[#fdfaf1] select-none drop-shadow-sm">
            {ribbonWords.repeat(6)}
          </span>
        </motion.div>

        {/* Wavy Divider Bottom (Transitions to dark product section) */}
        <div className="absolute top-full left-0 w-full overflow-hidden leading-none z-20 -mt-[1px]">
          <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="w-full h-[40px] sm:h-[60px] lg:h-[90px] text-[#c87a1e]">
            <path fill="currentColor" d="M0,32L60,42.7C120,53,240,75,360,74.7C480,75,600,53,720,48C840,43,960,53,1080,58.7C1200,64,1320,64,1380,64L1440,64L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"></path>
          </svg>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════ */}
      {/* 5. PRODUCT SHOWCASE — Horizontal Scroll                     */}
      {/* ════════════════════════════════════════════════════════════ */}
      <section ref={horizontalRef} className="bg-[#1a110a] h-[400vh] relative z-30">
        <div className="sticky top-0 h-[100svh] w-full overflow-hidden bg-[#1a110a] flex items-center">
          <motion.div style={{ x: horizontalX }} className="flex h-full w-[400vw]">
            
            {/* PANEL 1: Intro */}
            <div className="w-[100vw] h-full flex flex-col md:flex-row items-center justify-center px-6 sm:px-12 lg:px-24 gap-12 lg:gap-24 relative overflow-hidden shrink-0">
              <div className="w-full md:w-1/2 flex flex-col justify-center">
                 <div className="flex items-center gap-3 mb-6">
                   <div className="h-[1px] w-8 bg-[#c87a1e]" />
                   <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#c87a1e]">The Collection</span>
                 </div>
                 <h2 className="font-montserrat font-black text-6xl sm:text-7xl lg:text-[100px] leading-[0.85] tracking-tighter text-transparent" style={{ WebkitTextStroke: '2px #fdfaf1' }}>
                    PURE NATURE
                 </h2>
                 <h2 className="font-montserrat font-black text-6xl sm:text-7xl lg:text-[100px] leading-[0.85] tracking-tighter text-white mt-2">
                    MODERN FORM.
                 </h2>
                 <p className="text-lg sm:text-xl text-[#a39585] font-medium max-w-md mt-10 leading-relaxed">
                   Carefully harvested, naturally filtered, and perfectly infused with natural mint extract. No artificial syrups. No refined sugars.
                 </p>
              </div>
              <div className="w-full md:w-1/2 h-[50vh] md:h-[70vh] relative rounded-[40px] overflow-hidden shadow-2xl border border-white/10">
                 <img src="/images/gapoo_hero_travertine.jpg" className="w-full h-full object-cover" alt="Gapoo box" />
              </div>
            </div>

            {/* PANEL 2: Pure Honey */}
            <div className="w-[100vw] h-full flex flex-col-reverse md:flex-row items-center justify-center px-6 sm:px-12 lg:px-24 gap-12 lg:gap-24 relative shrink-0">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[40vw] font-apricot text-white/[0.03] select-none pointer-events-none">01</div>
              <div className="w-full md:w-1/2 h-[50vh] md:h-[70vh] relative rounded-[40px] overflow-hidden shadow-2xl border border-white/10">
                 <img src="/images/moment_tea_clean.jpg" className="w-full h-full object-cover" alt="Honey tea" />
              </div>
              <div className="w-full md:w-1/2 flex flex-col justify-center relative z-10">
                 <h3 className="font-montserrat font-black text-5xl sm:text-6xl lg:text-8xl text-white mb-6 tracking-tighter">
                   PURE HONEY
                 </h3>
                 <p className="text-xl sm:text-2xl text-[#c87a1e] font-medium max-w-md leading-relaxed">
                   Sourced from independent apiaries. Zero additives, zero preservatives.
                 </p>
              </div>
            </div>

            {/* PANEL 3: Mint Infusion */}
            <div className="w-[100vw] h-full flex flex-col md:flex-row items-center justify-center px-6 sm:px-12 lg:px-24 gap-12 lg:gap-24 relative shrink-0">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[40vw] font-apricot text-white/[0.03] select-none pointer-events-none">02</div>
              <div className="w-full md:w-1/2 flex flex-col justify-center relative z-10">
                 <h3 className="font-montserrat font-black text-5xl sm:text-6xl lg:text-8xl text-white mb-6 tracking-tighter">
                   NATURAL MINT
                 </h3>
                 <p className="text-xl sm:text-2xl text-[#10b981] font-medium max-w-md leading-relaxed">
                   A refreshing twist on classic golden honey — gentle and invigorating.
                 </p>
              </div>
              <div className="w-full md:w-1/2 h-[50vh] md:h-[70vh] relative rounded-[40px] overflow-hidden shadow-2xl border border-white/10">
                 <img src="/images/gapoo_hero_pour.jpg" className="w-full h-full object-cover" alt="Honey pour" />
              </div>
            </div>

            {/* PANEL 4: Earth Conscious & CTA */}
            <div className="w-[100vw] h-full flex flex-col-reverse md:flex-row items-center justify-center px-6 sm:px-12 lg:px-24 gap-12 lg:gap-24 relative shrink-0">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[40vw] font-apricot text-white/[0.03] select-none pointer-events-none">03</div>
              <div className="w-full md:w-1/2 h-[50vh] md:h-[70vh] relative rounded-[40px] overflow-hidden shadow-2xl border border-white/10">
                 <img src="/images/moment_pocket_clean.jpg" className="w-full h-full object-cover" alt="Pocket sticks" />
              </div>
              <div className="w-full md:w-1/2 flex flex-col justify-center relative z-10">
                 <h3 className="font-montserrat font-black text-5xl sm:text-6xl lg:text-8xl text-white mb-6 tracking-tighter">
                   EARTH AWARE
                 </h3>
                 <p className="text-xl sm:text-2xl text-[#d4af37] font-medium max-w-md leading-relaxed mb-12">
                   Single-serve sticks designed for recycling. Guilt-free on the go.
                 </p>
                 <Link
                   to="/shop"
                   className="inline-flex items-center justify-center w-max px-12 py-6 rounded-full bg-white text-[#1a110a] font-bold tracking-[0.2em] uppercase text-sm hover:bg-[#c87a1e] hover:text-white transition-all duration-500 shadow-[0_0_40px_rgba(255,255,255,0.1)] hover:shadow-[0_0_40px_rgba(200,122,30,0.3)]"
                   style={{ textDecoration: 'none' }}
                 >
                   Explore the Collection
                 </Link>
              </div>
            </div>

          </motion.div>
        </div>
      </section>



      {/* ════════════════════════════════════════════════════════════ */}
      {/* FINAL CTA — Expanding Capsule Interactive                   */}
      {/* ════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[100svh] flex flex-col items-center justify-center overflow-hidden bg-[#fdfaf1] py-32 px-4 sm:px-6 z-10 border-t border-[#ebd8b0]">
        
        {/* Background ambient text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none opacity-[0.03] select-none">
           <h2 className="font-montserrat font-black text-[35vw] leading-none text-[#1a110a] whitespace-nowrap">GAPOO</h2>
        </div>

        <div className="relative z-10 flex flex-col items-center w-full max-w-7xl mx-auto">
           {/* Top text */}
           <FadeIn>
             <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2">
                <h2 className="font-montserrat font-black text-[12vw] sm:text-[9vw] lg:text-[120px] xl:text-[150px] leading-[0.85] text-[#1a110a] uppercase tracking-tighter drop-shadow-sm text-center">
                   TASTE THE
                </h2>
             </div>
           </FadeIn>

           {/* Middle Row with interactive capsule */}
           <FadeIn delay={0.1}>
             <div className="flex flex-col sm:flex-row justify-center items-center gap-y-6 gap-x-4 sm:gap-x-8 mt-4 sm:mt-6 w-full">
                <h2 className="font-apricot text-[20vw] sm:text-[12vw] lg:text-[160px] xl:text-[200px] leading-[0.7] text-[#c87a1e] tracking-tighter sm:pr-4 drop-shadow-md">
                   purest
                </h2>
                
                <Link to="/shop" className="shrink-0 group block" style={{ textDecoration: 'none' }}>
                  <motion.div 
                    className="h-[25vw] sm:h-[10vw] lg:h-[130px] rounded-[100px] overflow-hidden relative cursor-pointer shadow-[0_20px_50px_rgba(200,122,30,0.3)] border-4 border-white group-hover:border-[#c87a1e] transition-colors duration-700"
                    initial={{ width: "60vw" }}
                    whileHover={{ width: "80vw" }}
                    animate={{ minWidth: "200px" }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <img src="/images/gapoo_hero_unboxing.jpg" alt="Unboxing" className="absolute inset-0 w-full h-full object-cover scale-[1.15] group-hover:scale-100 transition-transform duration-[1.5s] ease-[0.16,1,0.3,1]" />
                    <div className="absolute inset-0 bg-[#c87a1e]/20 mix-blend-multiply group-hover:opacity-0 transition-opacity duration-500" />
                    
                    {/* "Shop Now" pill that appears on hover */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-[50ms]">
                       <span className="bg-white/90 backdrop-blur-md text-[#1a110a] px-6 py-3 rounded-full font-bold uppercase tracking-[0.2em] text-[10px] sm:text-xs whitespace-nowrap shadow-xl">
                         Shop Now
                       </span>
                    </div>
                  </motion.div>
                </Link>
             </div>
           </FadeIn>

           {/* Bottom Text */}
           <FadeIn delay={0.2}>
             <div className="flex flex-wrap justify-center items-center mt-6 sm:mt-8">
                <h2 className="font-montserrat font-black text-[12vw] sm:text-[9vw] lg:text-[120px] xl:text-[150px] leading-[0.85] text-[#1a110a] uppercase tracking-tighter drop-shadow-sm text-center">
                   DIFFERENCE.
                </h2>
             </div>
           </FadeIn>
           
           <FadeIn delay={0.3}>
             <p className="mt-12 sm:mt-16 text-base sm:text-lg lg:text-xl text-[#5c5247] max-w-xl text-center font-medium leading-relaxed px-4 mx-auto">
               Experience the new standard of honey. Delivered straight to your doorstep in individual tear-and-pour sticks. No spoons, no sticky jars.
             </p>
           </FadeIn>

           <FadeIn delay={0.4}>
             <div className="mt-12 sm:mt-16 flex justify-center">
                <Link
                  to="/shop"
                  className="group relative inline-flex items-center gap-3 px-10 sm:px-12 py-5 sm:py-6 rounded-full bg-[#1a110a] text-white shadow-[0_20px_40px_rgba(26,17,10,0.2)] hover:shadow-[0_20px_60px_rgba(200,122,30,0.4)] transition-all duration-700 overflow-hidden transform hover:-translate-y-1"
                  style={{ textDecoration: 'none' }}
                >
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#f5a623] via-[#fbbf24] to-[#d97706] transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-700 ease-[0.16,1,0.3,1]" />
                  <span className="relative z-10 font-bold tracking-[0.2em] uppercase text-[10px] sm:text-xs text-white transition-colors duration-300 flex items-center gap-4">
                    <span>Explore the Collection</span>
                    <svg
                      className="w-4 h-4 transform group-hover:translate-x-2 transition-transform duration-500 ease-out"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                </Link>
             </div>
           </FadeIn>

           {/* Bear logo watermark at bottom */}
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 1.5, delay: 0.6 }}
             className="mt-20 sm:mt-24 pointer-events-none"
           >
             <img
               src="/images/gapoo_bear_mascot_hd.png"
               alt=""
               className="w-16 sm:w-20 h-auto opacity-[0.4] mx-auto select-none mix-blend-multiply filter contrast-150 grayscale sepia hue-rotate-30"
             />
           </motion.div>
        </div>
      </section>

    </div>
  );
}
