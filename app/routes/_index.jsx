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

  // Lifestyle moments data
  const moments = [
    { img: '/images/moment_tea_clean.jpg', label: 'Morning Tea', caption: 'Drop it in. Stir. Sip.' },
    { img: '/images/moment_breakfast_clean.jpg', label: 'Breakfast Bowl', caption: 'Drizzle over oats & berries.' },
    { img: '/images/moment_pocket_clean.jpg', label: 'On The Trail', caption: 'Nature in your pocket.' },
  ];

  const ribbonWords = '100% PURE · ZERO MESS · SNAP & SQUEEZE · NATURAL MINT · TRACEABLE ORIGIN · EARTH CONSCIOUS · ';

  return (
    <div ref={containerRef} className="bg-[#fdfaf1] text-[#1a110a] font-montserrat relative overflow-hidden">

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
            100% pure single-serve honey sticks. No sticky spoons, no messy jars. Just nature in your pocket.
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
              <span>Our Story</span>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
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
      <div className="bg-[#1a110a] py-4 sm:py-5 relative overflow-hidden">
        <Marquee speed={35}>
          <span className="inline-flex items-center gap-8 sm:gap-12 px-4 text-[10px] sm:text-xs font-bold tracking-[0.3em] uppercase text-[#d4af37]/80">
            <span className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-[#f5a623]" />100% Pure Honey</span>
            <span className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-[#f5a623]" />Zero Preservatives</span>
            <span className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-[#f5a623]" />Traceable Origin</span>
            <span className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-[#f5a623]" />Fair Trade Sourced</span>
            <span className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-[#f5a623]" />Earth Conscious</span>
            <span className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-[#f5a623]" />Single-Serve Sticks</span>
            <span className="text-[#d4af37]/30 mx-4">—</span>
          </span>
        </Marquee>
      </div>

      {/* ════════════════════════════════════════════════════════════ */}
      {/* 3. STORY SECTION — Editorial two-column with parallax imgs  */}
      {/* ════════════════════════════════════════════════════════════ */}
      <section id="story" className="py-28 sm:py-40 px-6 sm:px-12 lg:px-24 max-w-[1440px] mx-auto relative z-10 scroll-mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-28 items-start">

          {/* Left: Editorial Copy */}
          <div className="space-y-10 lg:pt-12">
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
      {/* 4. ANIMATED RIBBON DIVIDER                                  */}
      {/* ════════════════════════════════════════════════════════════ */}
      <div className="py-6 bg-[#c87a1e] overflow-hidden relative">
        <motion.div
          style={{ x: ribbonX }}
          className="whitespace-nowrap"
        >
          <span className="inline-block text-[14px] sm:text-[18px] font-black tracking-[0.25em] uppercase text-white/90 select-none">
            {ribbonWords.repeat(6)}
          </span>
        </motion.div>
      </div>

      {/* ════════════════════════════════════════════════════════════ */}
      {/* 5. PRODUCT SHOWCASE — "Pure Nature. Modern Convenience."    */}
      {/* ════════════════════════════════════════════════════════════ */}
      <section className="py-28 sm:py-40 bg-[#1a110a] text-white relative overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#d4af37] opacity-[0.04] blur-[160px] rounded-full pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 sm:px-12 relative z-10">
          <div className="text-center mb-20 sm:mb-28">
            <FadeIn>
              <span className="text-[10px] sm:text-xs font-bold tracking-[0.3em] uppercase text-[#d4af37] block mb-6">The Product</span>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="font-apricot text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.9]">
                <span className="text-white">Pure nature.</span>
                <br />
                <span className="text-[#d4af37]">Modern convenience.</span>
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="mt-8 text-base sm:text-lg text-[#a39585] max-w-2xl mx-auto leading-relaxed font-medium" style={{ textAlign: 'center' }}>
                Carefully harvested, naturally filtered, and perfectly infused with natural mint extract.
                No artificial syrups. No refined sugars. Just pure, unrefined sweetness.
              </p>
            </FadeIn>
          </div>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6 lg:gap-10">
            {[
              { icon: '🍯', title: '100% Pure', desc: 'Sourced from independent apiaries with zero additives or preservatives.' },
              { icon: '🌿', title: 'Mint Infused', desc: 'Natural mint extract for a refreshing twist on classic golden honey.' },
              { icon: '♻️', title: 'Earth Conscious', desc: 'Single-serve sticks designed for recycling. Guilt-free sweetness on the go.' },
            ].map((f, i) => (
              <FadeIn key={f.title} delay={0.1 * i}>
                <div className="group bg-white/[0.04] backdrop-blur-sm border border-white/[0.08] rounded-2xl sm:rounded-3xl p-8 sm:p-10 hover:bg-white/[0.08] hover:border-[#d4af37]/30 transition-all duration-500 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#d4af37]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10">
                    <span className="text-3xl sm:text-4xl block mb-5">{f.icon}</span>
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-3 tracking-tight">{f.title}</h3>
                    <p className="text-sm text-[#a39585] leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════ */}
      {/* 6. LIFESTYLE MOMENTS — Immersive photography grid            */}
      {/* ════════════════════════════════════════════════════════════ */}
      <section className="py-28 sm:py-40 bg-[#fdfaf1] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-12">
          <div className="text-center mb-16 sm:mb-24">
            <FadeIn>
              <span className="text-[10px] sm:text-xs font-bold tracking-[0.3em] uppercase text-[#c87a1e] block mb-5">Every Moment</span>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="font-apricot text-5xl sm:text-7xl font-bold tracking-tighter text-[#1a110a] leading-[0.9]">
                Made for your life.
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="mt-6 text-base sm:text-lg text-[#5c5247] max-w-xl mx-auto font-medium leading-relaxed" style={{ textAlign: 'center' }}>
                From morning tea to mountain trails—Gapoo fits wherever you go.
              </p>
            </FadeIn>
          </div>

          {/* Moments Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
            {moments.map((m, i) => (
              <FadeIn key={m.label} delay={0.1 * i}>
                <div className="group relative rounded-2xl sm:rounded-3xl overflow-hidden aspect-[3/4] cursor-pointer">
                  <img
                    src={m.img}
                    alt={m.label}
                    className="w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 z-10">
                    <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#f5a623] block mb-2">{m.label}</span>
                    <p className="text-lg sm:text-xl font-bold text-white leading-tight tracking-tight">{m.caption}</p>
                  </div>
                  {/* Hover shine */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#f5a623]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════ */}
      {/* 7. NUMBERS STRIP — Impact stats                             */}
      {/* ════════════════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-28 bg-[#faecc9] border-y border-[#e8cd8c] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#faecc9] via-[#fef3da] to-[#faecc9] pointer-events-none" />
        <div className="max-w-5xl mx-auto px-6 sm:px-12 relative z-10">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-10 sm:gap-8 text-center">
            {[
              { num: '100', suffix: '%', label: 'Pure Honey' },
              { num: '12', suffix: '+', label: 'Sticks per Box' },
              { num: '0', suffix: '', label: 'Preservatives', prefix: '' },
              { num: '5000', suffix: '+', label: 'Happy Customers' },
            ].map((s, i) => (
              <FadeIn key={s.label} delay={0.08 * i}>
                <div className="flex flex-col items-center">
                  <span className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1a110a] tracking-tighter font-apricot">
                    <AnimatedCounter target={s.num} suffix={s.suffix} prefix={s.prefix} />
                  </span>
                  <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] font-bold text-[#8b5311] mt-2">{s.label}</span>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════ */}
      {/* 8. FINAL CTA — Cinematic closer                             */}
      {/* ════════════════════════════════════════════════════════════ */}
      <section className="relative py-36 sm:py-48 px-6 text-center bg-[#fdfaf1] overflow-hidden">
        {/* Parallax Bear */}
        <motion.div
          style={{ y: ctaBearY }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0"
        >
          <img
            src="/images/gapoo_bear_mascot_hd.png"
            className="w-[350px] sm:w-[500px] lg:w-[650px] h-auto object-contain opacity-[0.06] mix-blend-multiply select-none"
            alt=""
          />
        </motion.div>

        <div className="relative z-10 max-w-3xl mx-auto">
          <FadeIn>
            <span className="text-[10px] sm:text-xs font-bold tracking-[0.3em] uppercase text-[#c87a1e] block mb-6">
              Join the Movement
            </span>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h2 className="font-apricot text-5xl sm:text-7xl lg:text-8xl font-bold text-[#1a110a] leading-[0.9] tracking-tighter">
              Ready to taste<br />the difference?
            </h2>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="mt-8 text-base sm:text-lg text-[#5c5247] max-w-md mx-auto font-medium leading-relaxed" style={{ textAlign: 'center' }}>
              Experience the new standard of honey. Delivered straight to your doorstep in individual tear-and-pour sticks.
            </p>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="mt-12 flex justify-center">
              <Link
                to="/shop"
                className="group relative inline-flex items-center gap-3 px-12 py-6 rounded-full bg-[#1a110a] text-white shadow-2xl hover:shadow-[#f5a623]/30 transition-all duration-500 overflow-hidden border border-[#d4af37]/30 hover:border-[#f5a623]"
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
            </div>
          </FadeIn>
        </div>
      </section>

    </div>
  );
}
