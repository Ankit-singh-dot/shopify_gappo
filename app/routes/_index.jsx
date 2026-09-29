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
  const productImageY = useTransform(scrollYProgress, [0.35, 0.65], ['10%', '-10%']);
  const productBearScale = useTransform(scrollYProgress, [0.4, 0.6], [0.95, 1.05]);

  // Lifestyle moments data
  const moments = [
    { img: '/images/moment_tea_clean.jpg', label: 'Morning Tea', caption: 'Drop it in. Stir. Sip.' },
    { img: '/images/moment_breakfast_clean.jpg', label: 'Breakfast Bowl', caption: 'Drizzle over oats & berries.' },
    { img: '/images/moment_pocket_clean.jpg', label: 'On The Trail', caption: 'Nature in your pocket.' },
  ];

  const ribbonWords = 'PURE · ZERO MESS · SNAP & SQUEEZE · NATURAL MINT · TRACEABLE ORIGIN · EARTH CONSCIOUS · ';

  return (
    <div ref={containerRef} className="bg-[#fdfaf1] text-[#1a110a] font-montserrat relative">

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
      <div className="bg-[#1a110a] py-4 sm:py-5 relative overflow-hidden">
        <Marquee speed={35}>
          <span className="inline-flex items-center gap-8 sm:gap-12 px-4 text-[10px] sm:text-xs font-bold tracking-[0.3em] uppercase text-[#d4af37]/80">
            <span className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-[#f5a623]" />Pure Honey</span>
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
      {/* 5. PRODUCT SHOWCASE — Cinematic split panel with parallax   */}
      {/* ════════════════════════════════════════════════════════════ */}
      <section className="bg-[#1a110a] text-white relative overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-[#d4af37] opacity-[0.03] blur-[140px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#c87a1e] opacity-[0.04] blur-[120px] rounded-full pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[85vh]">
          {/* Left: Product Image with Parallax */}
          <div className="relative overflow-hidden min-h-[400px] sm:min-h-[500px] lg:min-h-full">
            <motion.div
              style={{ y: productImageY }}
              className="absolute inset-0 -inset-y-[15%]"
            >
              <img
                src="/images/gapoo_hero_travertine.jpg"
                alt="Gapoo honey sticks arrangement"
                className="w-full h-full object-cover"
              />
            </motion.div>
            {/* Subtle overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#1a110a]/30 lg:to-[#1a110a]/60" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1a110a]/40 via-transparent to-transparent lg:hidden" />

            {/* Bear badge floating element */}
            <motion.div
              style={{ scale: productBearScale }}
              className="absolute bottom-8 left-8 sm:bottom-12 sm:left-12 z-10"
            >
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-2xl">
                <img src="/images/gapoo_bear_mascot_hd.png" alt="" className="w-14 h-14 sm:w-16 sm:h-16 object-contain" />
              </div>
            </motion.div>
          </div>

          {/* Right: Editorial Copy */}
          <div className="flex flex-col justify-center px-8 sm:px-12 lg:px-20 xl:px-28 py-20 sm:py-28 lg:py-36 relative z-10">
            <FadeIn direction="right">
              <div className="flex items-center gap-3 mb-8">
                <div className="h-[1px] w-8 bg-[#d4af37]" />
                <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#d4af37]">The Product</span>
              </div>
            </FadeIn>

            <FadeIn delay={0.1} direction="right">
              <h2 className="font-apricot text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tighter leading-[0.9] mb-8">
                <span className="text-white">Pure nature.</span>
                <br />
                <span className="text-[#d4af37] mt-1 block">Modern convenience.</span>
              </h2>
            </FadeIn>

            <FadeIn delay={0.2} direction="right">
              <p className="text-base sm:text-lg text-[#a39585] leading-[1.8] font-medium max-w-lg mb-10">
                Carefully harvested, naturally filtered, and perfectly infused with natural mint extract.
                No artificial syrups. No refined sugars. What you taste is pure, unrefined natural sweetness.
              </p>
            </FadeIn>

            {/* Feature list — clean, no emojis */}
            <div className="space-y-6 mb-12">
              {[
                { title: 'Pure Honey', desc: 'Sourced from independent apiaries. Zero additives, zero preservatives.' },
                { title: 'Natural Mint Infusion', desc: 'A refreshing twist on classic golden honey — gentle and invigorating.' },
                { title: 'Earth Conscious Packaging', desc: 'Single-serve sticks designed for recycling. Guilt-free on the go.' },
              ].map((f, i) => (
                <FadeIn key={f.title} delay={0.25 + 0.08 * i} direction="right">
                  <div className="flex items-start gap-4 group">
                    <div className="mt-1.5 flex-shrink-0">
                      <div className="w-2 h-2 rounded-full bg-[#d4af37] group-hover:scale-150 transition-transform duration-300" />
                    </div>
                    <div>
                      <h3 className="text-sm sm:text-base font-bold text-white mb-1 tracking-tight">{f.title}</h3>
                      <p className="text-xs sm:text-sm text-[#8a7d70] leading-relaxed">{f.desc}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>

            <FadeIn delay={0.5} direction="right">
              <Link
                to="/shop"
                className="group inline-flex items-center gap-3 text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-[#d4af37] hover:text-white transition-colors duration-300"
                style={{ textDecoration: 'none', color: '#d4af37' }}
              >
                <span>Explore the Collection</span>
                <svg className="w-4 h-4 transform group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
                <div className="h-[1px] flex-1 max-w-[60px] bg-[#d4af37]/30 group-hover:bg-white/30 transition-colors duration-300" />
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════ */}
      {/* BENEFITS STACK — Sticky stacking cards                      */}
      {/* ════════════════════════════════════════════════════════════ */}
      <section id="benefits-stacked" className="relative w-full bg-[#fdfaf1]">
        {/* Section Intro */}
        <div className="pt-24 sm:pt-36 pb-6 px-6 sm:px-8 max-w-7xl mx-auto text-center">
          <FadeIn>
            <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-[#faecd0] border border-[#ebd8b0] mb-6 shadow-sm">
              <div className="w-1.5 h-1.5 rounded-full bg-[#c87a1e]" />
              <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.25em] uppercase text-[#8b5311]">
                Functional Daily Wellness
              </span>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h2 className="font-apricot text-5xl sm:text-6xl lg:text-7xl font-bold text-[#1a110a] tracking-tighter leading-[0.95]">
              Honey with benefits
            </h2>
          </FadeIn>

          <FadeIn delay={0.15}>
            <p className="mt-5 sm:mt-6 text-base sm:text-lg text-[#5c5247] font-medium leading-relaxed max-w-xl mx-auto" style={{ textAlign: 'center' }}>
              Full of energy, packed with goodness and as close to nature as it gets.
            </p>
          </FadeIn>
        </div>

        {/* Stacking Cards */}
        <div className="relative w-full pb-28 md:pb-44">
          {[
            {
              id: 'soothe',
              number: '01',
              category: 'DAILY WELLNESS · SOOTHE',
              title: 'Soothe',
              subtitle: 'Natural throat coat & inner calm — Rich in raw bio-active enzymes that soothe irritated airways, calm inflammation, and restore gentle digestive balance.',
              col1Label: 'THE SCIENCE',
              col1Text: 'Raw unheated honey coats inflamed mucosal membranes with active bio-defensins and natural hydrogen peroxide precursors for soothing relief without side effects.',
              col2Label: 'THE RITUAL',
              col2Text: 'Drop one stick into steaming green tea, herbal chamomile, or warm lemon water. Can also be taken straight from the stick for immediate throat comfort.',
              image: '/images/moment_tea_clean.jpg',
              imageAlt: 'Sipping warm herbal tea with soothing raw honey',
              mediaTag: 'Tea & Throat Care',
            },
            {
              id: 'energize',
              number: '02',
              category: 'CLEAN FUEL · ENERGIZE',
              title: 'Energize',
              subtitle: 'Clean, crash-free physical stamina — An unrefined natural balance of fructose and glucose that your brain and muscles absorb immediately for sustained energy.',
              col1Label: 'THE SCIENCE',
              col1Text: 'Naturally balanced simple carbohydrates deliver an immediate cellular glycogen recharge without the insulin spike and crash of refined white sugar.',
              col2Label: 'THE RITUAL',
              col2Text: 'Drizzle over morning rolled oats, Greek yogurt, or take 15 minutes before running, cycling, or high-intensity gym sessions for clean athletic fuel.',
              image: '/images/moment_breakfast_clean.jpg',
              imageAlt: 'Drizzle pure honey on berries, oats, and morning breakfast',
              mediaTag: 'Morning Oats & Workouts',
            },
            {
              id: 'nourish',
              number: '03',
              category: 'RAW ORIGIN · NOURISH',
              title: 'Nourish',
              subtitle: 'Alive with wild pollen & antioxidants — Never boiled or hyper-filtered past natural hive temperatures to protect 100% of living enzymes and micronutrients.',
              col1Label: 'THE SCIENCE',
              col1Text: 'Preserves active bee pollen, amino acids, and antioxidant polyphenols that commercial factory honeys destroy through high-heat pasteurization.',
              col2Label: 'THE RITUAL',
              col2Text: 'Take one stick every morning with warm water as a daily holistic immunity tonic, or blend seamlessly into fruit smoothies and salad dressings.',
              image: '/images/farming2.jpeg',
              imageAlt: 'Healthy bees and raw honeycomb from ethical apiaries',
              mediaTag: '100% Raw Comb Origin',
            },
            {
              id: 'pocket-ready',
              number: '04',
              category: 'MESS-FREE · POCKET READY',
              title: 'Pocket Ready',
              subtitle: 'Snap, squeeze & go anywhere — No heavy glass jars to shatter, no sticky knives or dripping spoons. Slide sticks into any pocket, backpack, or carry-on.',
              col1Label: 'THE DESIGN',
              col1Text: 'Precision tear system ensures a clean, controlled single-stream flow with zero sticky residual dripping onto your fingers or clothes.',
              col2Label: 'THE RITUAL',
              col2Text: 'Stash sticks in your laptop bag, running vest, or flight kit. Compliant with carry-on regulations for instant natural energy on the go.',
              image: '/images/moment_pocket_clean.jpg',
              imageAlt: 'Gapoo honey sticks in pocket on outdoor trail',
              mediaTag: 'On The Trail & Travel',
            },
          ].map((card, index) => (
            <div
              key={card.id}
              className="sticky w-full px-4 sm:px-6 md:px-12"
              style={{
                top: `calc(12vh + ${index * 40}px)`,
                zIndex: index + 10,
                marginBottom: '70vh',
              }}
            >
              <div className="w-full max-w-6xl mx-auto rounded-[28px] sm:rounded-[36px] shadow-[0_-8px_30px_-12px_rgba(0,0,0,0.12),0_20px_50px_-12px_rgba(0,0,0,0.2)] overflow-hidden border border-[#ebd8b0] bg-white">
                <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[440px] sm:min-h-[480px]">

                  {/* Left: Dark image panel with giant watermark number */}
                  <div className="lg:col-span-5 bg-[#18110b] relative p-5 sm:p-8 flex items-center justify-center overflow-hidden min-h-[240px] lg:min-h-full">
                    {/* Giant translucent number watermark */}
                    <span className="font-apricot font-bold text-[100px] sm:text-[160px] lg:text-[200px] leading-none text-white/[0.06] absolute top-0 left-3 sm:left-5 select-none pointer-events-none tracking-tighter">
                      {card.number}
                    </span>

                    {/* Image */}
                    <div className="relative z-10 w-full aspect-[4/3] sm:aspect-[16/11] rounded-2xl sm:rounded-[24px] overflow-hidden border border-white/10 shadow-2xl group">
                      <img
                        src={card.image}
                        alt={card.imageAlt}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

                      {/* Media tag */}
                      <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4">
                        <span className="px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md text-[10px] sm:text-[11px] font-bold text-[#1a110a] uppercase tracking-wider shadow-md">
                          {card.mediaTag}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right: White editorial content */}
                  <div className="lg:col-span-7 bg-white p-6 sm:p-8 lg:p-12 flex flex-col justify-between">
                    <div>
                      {/* Category + arrow */}
                      <div className="flex items-center justify-between gap-4 mb-4 sm:mb-5">
                        <span className="px-3 py-1.5 rounded-full bg-[#faecd0] text-[#5c5247] text-[10px] sm:text-[11px] font-bold tracking-[0.2em] uppercase">
                          {card.category}
                        </span>
                        <Link
                          to="/shop"
                          className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-black/10 flex items-center justify-center hover:bg-[#c87a1e] hover:text-white hover:border-[#c87a1e] transition-all duration-300 text-[#1a110a] flex-shrink-0 group"
                          style={{ textDecoration: 'none' }}
                        >
                          <svg className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M7 17L17 7M17 7H7M17 7V17" />
                          </svg>
                        </Link>
                      </div>

                      {/* Title */}
                      <h3 className="font-apricot font-bold text-3xl sm:text-4xl lg:text-5xl text-[#1a110a] tracking-tight leading-[1.05] mb-3">
                        {card.title}
                      </h3>

                      {/* Subtitle */}
                      <p className="text-sm sm:text-base text-[#5c5247] font-medium leading-relaxed max-w-xl">
                        {card.subtitle}
                      </p>
                    </div>

                    {/* Two-column details */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-6 mt-5 border-t border-[#f0e8d8]">
                      <div>
                        <h4 className="text-[10px] sm:text-[11px] font-bold tracking-[0.2em] uppercase text-[#c87a1e] mb-1.5">
                          {card.col1Label}
                        </h4>
                        <p className="text-xs sm:text-[13px] text-[#5c5247] leading-relaxed font-medium">
                          {card.col1Text}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-[10px] sm:text-[11px] font-bold tracking-[0.2em] uppercase text-[#c87a1e] mb-1.5">
                          {card.col2Label}
                        </h4>
                        <p className="text-xs sm:text-[13px] text-[#5c5247] leading-relaxed font-medium">
                          {card.col2Text}
                        </p>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* ════════════════════════════════════════════════════════════ */}
      {/* FINAL CTA — Cinematic full-bleed closer                      */}
      {/* ════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Full-bleed background image with parallax */}
        <motion.div
          style={{ y: ctaBearY }}
          className="absolute inset-0 -inset-y-[10%] z-0"
        >
          <img
            src="/images/gapoo_hero_unboxing.jpg"
            alt="Gapoo honey sticks"
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Dark cinematic overlay */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/60 via-black/50 to-black/75" />

        {/* Warm glow accent */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#d4af37] opacity-[0.08] blur-[100px] rounded-full pointer-events-none z-[2]" />

        {/* Content */}
        <div className="relative z-10 text-center px-6 w-full flex flex-col items-center" style={{ padding: '6rem 1.5rem' }}>
          {/* <FadeIn>
            <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 mb-10">
              <div className="w-1.5 h-1.5 rounded-full bg-[#f5a623] animate-pulse" />
              <span className="text-[10px] sm:text-xs font-bold tracking-[0.3em] uppercase text-white/80">
                Join the Movement
              </span>
            </div>
          </FadeIn> */}

          <FadeIn delay={0.1}>
            <h2 className="font-apricot text-5xl sm:text-7xl lg:text-9xl xl:text-[140px] font-bold text-white leading-[0.85] tracking-tighter drop-shadow-2xl">
              Ready to taste<br />the difference?
            </h2>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="mt-8 sm:mt-10 text-sm sm:text-base md:text-lg text-white/60 max-w-lg mx-auto font-medium leading-relaxed" style={{ textAlign: 'center' }}>
              Experience the new standard of honey. Delivered straight to your doorstep in individual tear-and-pour sticks.
            </p>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="mt-12 sm:mt-14 flex flex-col sm:flex-row items-center gap-5">
              <Link
                to="/shop"
                className="group relative inline-flex items-center gap-3 px-12 py-6 rounded-full bg-white text-[#1a110a] shadow-2xl hover:shadow-[#f5a623]/40 transition-all duration-500 overflow-hidden"
                style={{ color: '#1a110a', textDecoration: 'none' }}
              >
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#f5a623] via-[#fbbf24] to-[#d97706] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
                <span className="relative z-10 font-bold tracking-[0.22em] uppercase text-xs sm:text-sm group-hover:text-white transition-colors duration-300 flex items-center gap-3">
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

          {/* Bear logo watermark at bottom */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.6 }}
            className="mt-16 sm:mt-24"
          >
            <img
              src="/images/gapoo_bear_mascot_hd.png"
              alt=""
              className="w-16 sm:w-20 h-auto opacity-[0.25] mx-auto select-none invert brightness-200"
            />
          </motion.div>
        </div>
      </section>

    </div>
  );
}
