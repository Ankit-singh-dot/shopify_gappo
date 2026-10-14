import { Link } from 'react-router';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { HandwrittenGapoo } from '~/components/HandwrittenGapoo';
import { LabVerifiedSection } from '~/components/LabVerifiedSection';

/**
 * @type {Route.MetaFunction}
 */
export const meta = () => {
  return [
    { title: 'Gapoo | The Hive Awakening & Botanical Honey' },
    {
      name: 'description',
      content:
        'Born from hands-on bee farming and the vision of Garden+Pool. 100% traceable, hive-to-bottle raw botanical honey and the untapped natural pharmacy of the hive.',
    },
  ];
};

/* ─── Reusable Fade-In wrapper ─── */
function FadeIn({ children, className = '', delay = 0, direction = 'up', distance = 30 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-8%' });
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
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Horizontal Marquee ─── */
function Marquee({ children, speed = 32, className = '' }) {
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
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <span ref={ref}>
      {prefix}
      {count}
      {suffix}
    </span>
  );
}

/* ─── Scroll Reveal Text Component ─── */
function RevealWord({ word, progress, range }) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return (
    <motion.span style={{ opacity }} className="mr-[0.25em] inline-block">
      {word}
    </motion.span>
  );
}

function ScrollRevealText({ text, className }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 85%', 'end 45%'],
  });

  const words = text.split(' ');
  return (
    <div ref={ref} className={`flex flex-wrap ${className}`}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
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
  const bearY = useTransform(scrollYProgress, [0.05, 0.35], ['0%', '25%']);
  const storyImageY = useTransform(scrollYProgress, [0.15, 0.5], ['0%', '-6%']);
  const storyImageY2 = useTransform(scrollYProgress, [0.15, 0.5], ['0%', '-8%']);
  const ribbonX = useTransform(scrollYProgress, [0, 1], ['0%', '-40%']);

  // Manifesto Typography Parallax
  const manifestoRef = useRef(null);
  const { scrollYProgress: manifestoScroll } = useScroll({
    target: manifestoRef,
    offset: ['start end', 'end start'],
  });
  const manifestoX1 = useTransform(manifestoScroll, [0, 1], ['0%', '-40%']);
  const manifestoX2 = useTransform(manifestoScroll, [0, 1], ['-20%', '10%']);
  const manifestoX3 = useTransform(manifestoScroll, [0, 1], ['-10%', '-50%']);

  // Horizontal Scroll Parallax (4 Panels)
  const horizontalRef = useRef(null);
  const { scrollYProgress: horizontalScroll } = useScroll({ target: horizontalRef });
  const horizontalX = useTransform(horizontalScroll, [0, 1], ['0%', '-75%']);

  // Apple-style Final Logo Reveal
  const appleLogoRef = useRef(null);
  const { scrollYProgress: appleScroll } = useScroll({
    target: appleLogoRef,
    offset: ['start end', 'end end'],
  });

  const appleBearScale = useTransform(appleScroll, [0.3, 0.7], [5, 1]);
  const appleBearY = useTransform(appleScroll, [0.3, 0.7], ['60vh', '0vh']);
  const appleTextOpacity = useTransform(appleScroll, [0.7, 0.85], [0, 1]);
  const appleTextY = useTransform(appleScroll, [0.7, 0.85], ['40px', '0px']);

  const appleBgColor = useTransform(appleScroll, [0.85, 1], ['#fdfaf1', '#1a110a']);
  const appleBearFilter = useTransform(appleScroll, [0.85, 1], [
    'invert(0%) brightness(1)',
    'invert(100%) brightness(2)',
  ]);
  const appleTextColor = useTransform(appleScroll, [0.85, 1], ['#1a110a', '#c87a1e']);

  const ribbonWords =
    'THE HIVE AWAKENING · GARDEN + POOL · 100% TRACEABLE ORIGIN · BOTANICAL INFUSIONS · THE INDIAN HONEY FINGERPRINT · BEYOND HONEY: BEE POLLEN · PROPOLIS · ROYAL JELLY · BEESWAX · ';

  return (
    <div ref={containerRef} className="bg-[#fdfaf1] text-[#1a110a] font-montserrat relative w-full overflow-clip">
      {/* ════════════════════════════════════════════════════════════ */}
      {/* 1. CINEMATIC HERO — Clean Flex Column (Zero Overlapping)   */}
      {/* ════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[100svh] w-full flex flex-col items-center justify-center overflow-hidden bg-[#fdfaf1] py-16 sm:py-20">
        {/* Full-Bleed Cinematic Hero Background with Ambient Ken-Burns Camera Glide */}
        <div className="absolute inset-0 z-0 overflow-hidden bg-[#1a110a]">
          <motion.img
            src="/images/beekeeping-1024x683.jpg"
            alt="Authentic Beekeeper in Golden Flower Field with Hive and Smoker"
            className="w-full h-full object-cover object-[60%_center] sm:object-center"
            initial={{ scale: 1.08, opacity: 0.9 }}
            animate={{ scale: 1.0, opacity: 1 }}
            transition={{ duration: 2.4, ease: [0.25, 0.1, 0.25, 1] }}
          />
          {/* Permanent high-contrast cinematic dark gradient overlay so white text is ALWAYS 100% legible */}
          <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/65 via-black/45 to-black/85" />
          {/* Warm honey glow radial atmosphere */}
          <div className="absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_center,rgba(200,122,30,0.2)_0%,transparent_70%)] pointer-events-none" />
        </div>

        {/* Foreground Content — Single Natural Flex Column, Pure & Iconic */}
        <motion.div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center justify-center px-6 text-center">
          {/* The Iconic Brand Title — Authentic Human Handwriting Animation (G -> a -> p -> o -> o -> .) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="w-full max-w-[340px] xs:max-w-[440px] sm:max-w-[580px] md:max-w-[700px] lg:max-w-[800px] mx-auto mb-8 sm:mb-10"
          >
            <h1 className="sr-only">Gapoo.</h1>
            <HandwrittenGapoo
              className="w-full"
              color="#fdfaf1"
              startDelay={0.4}
              speedMultiplier={1.2}
            />
          </motion.div>

          {/* Dual CTAs — Distinct, high-contrast, perfectly spaced */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.8 }}
            className="flex flex-wrap items-center justify-center gap-3 sm:gap-4"
          >
            <a
              href="#story"
              className="group relative inline-flex items-center gap-2.5 px-8 sm:px-10 py-4 rounded-full bg-white text-[#1a110a] font-bold tracking-[0.16em] uppercase text-xs shadow-xl hover:shadow-2xl transition-all duration-300 no-underline cursor-pointer hover:scale-105 active:scale-95"
            >
              <span>Explore The Movement</span>
              <span className="text-sm">↓</span>
            </a>

            <Link
              to="/shop"
              className="inline-flex items-center gap-2 px-8 sm:px-10 py-4 rounded-full bg-gradient-to-r from-[#f5a623] to-[#d97706] hover:from-[#fbbf24] hover:to-[#ea580c] text-white font-bold tracking-[0.16em] uppercase text-xs transition-all duration-300 shadow-xl hover:shadow-2xl no-underline hover:scale-105 active:scale-95"
            >
              <span>Shop Honey Sticks · From ₹189</span>
              <span>→</span>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* ════════════════════════════════════════════════════════════ */}
      {/* 2. TRUST MARQUEE — Horizontal scrolling story standards    */}
      {/* ════════════════════════════════════════════════════════════ */}
      <div className="bg-[#c87a1e] pt-6 sm:pt-8 relative z-20">
        <Marquee speed={32}>
          <span className="inline-flex items-center gap-8 sm:gap-12 px-4 text-[10px] sm:text-xs font-bold tracking-[0.28em] uppercase text-[#fdfaf1]">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
              100% Traceable Origin
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
              Hive-To-Bottle Nectar
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
              The Indian Honey Fingerprint
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
              Direct Farmer Harvest
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
              Botanical Infusions
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
              Beyond Honey: The Natural Pharmacy
            </span>
            <span className="text-white/40 mx-4">—</span>
          </span>
        </Marquee>

        {/* Wavy Divider Bottom */}
        <div className="absolute top-full left-0 w-full overflow-hidden leading-none z-20 -mt-[1px]">
          <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="w-full h-[40px] sm:h-[70px] lg:h-[100px] text-[#c87a1e]">
            <path
              fill="currentColor"
              d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
            />
          </svg>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════ */}
      {/* 3. STORY SECTION — Chapter 01: The Hive Awakening           */}
      {/* ════════════════════════════════════════════════════════════ */}
      <section id="story" className="pt-20 sm:pt-28 pb-20 sm:pb-28 lg:pb-32 px-6 sm:px-12 lg:px-24 max-w-[1440px] mx-auto relative z-10 scroll-mt-20">
        <span id="our-story" className="absolute -top-32 left-0 pointer-events-none" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
          {/* Left: Editorial Story Narrative */}
          <div className="space-y-7 lg:pt-6 pl-2 sm:pl-4 lg:pl-8">
            <FadeIn>
              <div className="flex items-center gap-3 mb-2">
                <div className="h-[1px] w-10 bg-[#c87a1e]" />
                <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#c87a1e]">
                  Chapter 01 · Origin
                </span>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>

            </FadeIn>

            <FadeIn delay={0.15}>
              <div className="w-16 h-[2px] bg-[#c87a1e]" />
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="space-y-4 text-sm sm:text-base text-[#5c5247] leading-[1.8] font-medium">
                <p>
                  The seed for Gapoo was planted in the dirt and hum of the apiary during hands-on bee farming training sessions—not in a corporate boardroom. Born from the vision of Garden+Pool, we set out to reconnect modern wellness with the untamed, raw bounty of the earth.
                </p>
                <p>
                  By partnering directly with generational Indian beekeepers, we bypassed artificial syrups and bulky glass jars—harvesting 100% traceable, single-origin raw nectar directly into sleek tear-and-pour sticks that travel effortlessly with you.
                </p>
              </div>
            </FadeIn>

            {/* Verified Origin Stats */}
            <FadeIn delay={0.3}>
              <div className="grid grid-cols-3 gap-4 sm:gap-6 pt-4 border-t border-[#ebd8b0]">
                <div className="flex flex-col">
                  <span className="text-3xl sm:text-4xl font-bold text-[#c87a1e] tracking-tighter font-apricot">
                    <AnimatedCounter target="100" suffix="%" />
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#1a110a] mt-1">
                    Raw &amp; Traceable
                  </span>
                </div>

                <div className="flex flex-col">
                  <span className="text-3xl sm:text-4xl font-bold text-[#c87a1e] tracking-tighter font-apricot">
                    Single
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#1a110a] mt-1">
                    Origin Apiaries
                  </span>
                </div>

                <div className="flex flex-col">
                  <span className="text-3xl sm:text-4xl font-bold text-[#c87a1e] tracking-tighter font-apricot">
                    0%
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#1a110a] mt-1">
                    Added Syrups
                  </span>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.35}>
              <div className="pt-2">
                <Link
                  to="/story"
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#c87a1e] hover:text-[#1a110a] transition-colors group"
                >
                  <span>Explore The Full Story</span>
                  <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </div>
            </FadeIn>
          </div>

          {/* Right: Authentic Bee Farming Photo Stack (farming1.jpeg & farmin2.jpeg) */}
          <div className="relative h-[480px] sm:h-[580px] lg:h-[660px] w-full mt-6 lg:mt-0">
            {/* Bear watermark */}
            <motion.div
              style={{ y: bearY }}
              className="absolute -right-6 -bottom-8 w-[280px] h-auto opacity-[0.05] pointer-events-none mix-blend-multiply z-0 select-none"
            >
              <img src="/images/gapoo_bear_mascot_hd.png" alt="" className="w-full h-auto" />
            </motion.div>

            {/* Top Photo: The Beekeepers in forest smoke and morning rays */}
            <motion.div
              style={{ y: storyImageY }}
              className="absolute right-0 top-0 w-[72%] sm:w-[70%] h-[52%] sm:h-[54%] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl z-20 border border-white/50 group"
            >
              <img
                src="/images/farming1.jpeg"
                alt="Beekeepers working with wooden hives in morning forest sunbeams"
                className="w-full h-full object-cover scale-[1.05] group-hover:scale-[1.12] transition-transform duration-[1.5s]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent opacity-85" />
              <div className="absolute bottom-4 left-5 right-5 text-white">
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-amber-300 block mb-0.5">
                  The Morning Smoke
                </span>
                <span className="text-xs font-semibold text-white/95">
                  Traditional ethical hive care in wild forest apiaries.
                </span>
              </div>
            </motion.div>

            {/* Bottom Photo: Traditional valley meadow apiary boxes */}
            <motion.div
              style={{ y: storyImageY2 }}
              className="absolute left-0 bottom-14 sm:bottom-20 w-[62%] sm:w-[60%] h-[50%] sm:h-[52%] rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl z-10 border border-white/50 group"
            >
              <img
                src="/images/farmin2.jpeg"
                alt="Rustic wooden beehives in a mountain valley meadow"
                className="w-full h-full object-cover scale-[1.05] group-hover:scale-[1.12] transition-transform duration-[1.5s]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent opacity-85" />
              <div className="absolute bottom-4 left-5 right-5 text-white">
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-amber-300 block mb-0.5">
                  Valley Apiaries
                </span>
                <span className="text-xs font-semibold text-white/95">
                  Nestled in floral valleys surrounded by forest hills.
                </span>
              </div>
            </motion.div>

            {/* Floating Quality Tag — Sleek Pill at Top Right of Collage (Zero Overlap) */}
            <FadeIn delay={0.4} className="absolute -top-3.5 right-4 sm:right-8 z-30">
              <div className="bg-white/95 backdrop-blur-md border border-[#e8cd8c] rounded-full px-4 sm:px-5 py-2.5 shadow-xl flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
                <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#1a110a]">
                  100% Hive-To-Bottle Direct
                </span>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════ */}
      {/* 3.5 VISUAL EXHIBITION — The Wild Canopy in India             */}
      {/* ════════════════════════════════════════════════════════════ */}
      <section className="py-16 sm:py-20 lg:py-24 px-6 sm:px-12 lg:px-24 max-w-[1440px] mx-auto relative z-10">
        <div className="bg-[#f5ecda] rounded-[36px] sm:rounded-[48px] p-7 sm:p-12 lg:p-16 border border-[#e5d4b5] shadow-xl overflow-hidden relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left: The Breathtaking Giant Wild Beehive Tree Canopy Image */}
            <div className="lg:col-span-7 relative">
              <FadeIn direction="left">
                <div className="relative rounded-[28px] sm:rounded-[36px] overflow-hidden shadow-2xl border-4 border-white group aspect-[3/4] sm:aspect-[4/5] max-h-[620px]">
                  <img
                    src="/images/Beehive hanging over a tree in India by Andrey Armyagov _ 500px.jpeg"
                    alt="Wild Giant Beehives Hanging from Indian Forest Tree Canopy by Andrey Armyagov"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-[1.8s] ease-[0.16,1,0.3,1]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent pointer-events-none" />
                  <div className="absolute bottom-5 left-5 right-5 text-white">
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-[10px] font-bold uppercase tracking-wider text-amber-200 mb-2">
                      <span>✦</span> Wild Apis Dorsata Colony · Indian Forest Canopy
                    </span>
                    <p className="text-xs sm:text-sm text-white/95 font-medium leading-relaxed">
                      Giant natural honeycombs suspended high in ancient forest branches, untouched by commercial sugar syrups.
                    </p>
                  </div>
                </div>
              </FadeIn>
            </div>

            {/* Right: Crisp, punchy story replacing the heavy text wall */}
            <div className="lg:col-span-5 flex flex-col justify-center space-y-6">
              <FadeIn>
                <div className="flex items-center gap-3">
                  <div className="h-[1px] w-8 bg-[#c87a1e]" />
                  <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#c87a1e]">
                    Pure Untamed Origins
                  </span>
                </div>
              </FadeIn>

              <FadeIn delay={0.1}>
                <h2 className="font-apricot text-4xl sm:text-5xl lg:text-6xl font-bold leading-[0.95] tracking-tighter text-[#1a110a]">
                  Hung from living trees.
                </h2>
              </FadeIn>

              <FadeIn delay={0.15}>
                <p className="text-sm sm:text-base text-[#5c5247] leading-relaxed font-medium">
                  Before commercial syrups flooded grocery aisles, true honey was wild biodiversity gathered from living canopies and untouched floral valleys. We honor that raw standard in every single tear-and-pour stick.
                </p>
              </FadeIn>

              {/* 3 Visual Pillars */}
              <FadeIn delay={0.2}>
                <div className="space-y-3 pt-2">
                  <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-white/80 border border-[#e5d4b5] shadow-sm">
                    <span className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-[#c87a1e] font-bold text-xs shrink-0">
                      01
                    </span>
                    <div>
                      <span className="text-xs font-bold text-[#1a110a] block">Zero Heat &amp; Zero Ultra-Filtration</span>
                      <span className="text-[11px] text-[#786c5e]">Preserves 100% of live digestive enzymes and natural pollens.</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-white/80 border border-[#e5d4b5] shadow-sm">
                    <span className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-[#c87a1e] font-bold text-xs shrink-0">
                      02
                    </span>
                    <div>
                      <span className="text-xs font-bold text-[#1a110a] block">Direct Indigenous Apiary Trade</span>
                      <span className="text-[11px] text-[#786c5e]">Fair living wages paid directly to Indian beekeeping families.</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-white/80 border border-[#e5d4b5] shadow-sm">
                    <span className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-[#c87a1e] font-bold text-xs shrink-0">
                      03
                    </span>
                    <div>
                      <span className="text-xs font-bold text-[#1a110a] block">Single-Origin Terroirs</span>
                      <span className="text-[11px] text-[#786c5e]">Never blended with industrial corn, rice, or invert sugar syrups.</span>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════ */}
      {/* 3.6 MASSIVE KINETIC TYPOGRAPHY — The Hive Manifesto          */}
      {/* ════════════════════════════════════════════════════════════ */}
      <section
        ref={manifestoRef}
        className="py-32 sm:py-48 lg:py-60 min-h-[90svh] flex flex-col justify-center overflow-hidden relative border-t border-[#ebd8b0] bg-[#faecd0]"
      >
        <div className="flex flex-col gap-5 sm:gap-8 opacity-90 relative z-10">
          <motion.div style={{ x: manifestoX1 }} className="whitespace-nowrap flex items-center">
            <h2
              className="font-montserrat leading-[0.85] tracking-tighter font-black text-[#1a110a]"
              style={{ fontSize: 'clamp(2.5rem, 8vw, 8rem)' }}
            >
              GARDEN + POOL <span className="text-[#c87a1e] px-4 sm:px-8">✦</span> THE HIVE AWAKENING <span className="text-[#c87a1e] px-4 sm:px-8">✦</span> GARDEN + POOL <span className="text-[#c87a1e] px-4 sm:px-8">✦</span> THE HIVE AWAKENING
            </h2>
          </motion.div>

          <motion.div style={{ x: manifestoX2 }} className="whitespace-nowrap flex items-center">
            <h2
              className="font-montserrat leading-[0.85] tracking-tighter font-black text-transparent"
              style={{
                WebkitTextStroke: '2px #1a110a',
                fontSize: 'clamp(3rem, 10vw, 9.5rem)',
              }}
            >
              UNTAMED NECTAR <span className="text-transparent px-4 sm:px-8" style={{ WebkitTextStroke: '2px #1a110a' }}>✦</span> NATURAL PHARMACY <span className="text-transparent px-4 sm:px-8" style={{ WebkitTextStroke: '2px #1a110a' }}>✦</span> UNTAMED NECTAR <span className="text-transparent px-4 sm:px-8" style={{ WebkitTextStroke: '2px #1a110a' }}>✦</span> NATURAL PHARMACY
            </h2>
          </motion.div>

          <motion.div style={{ x: manifestoX3 }} className="whitespace-nowrap flex items-center">
            <h2
              className="font-montserrat leading-[0.85] tracking-tighter font-black text-[#1a110a]"
              style={{ fontSize: 'clamp(2.5rem, 8vw, 8rem)' }}
            >
              100% TRACEABLE <span className="text-[#c87a1e] px-4 sm:px-8">✦</span> BEYOND THE JAR <span className="text-[#c87a1e] px-4 sm:px-8">✦</span> 100% TRACEABLE <span className="text-[#c87a1e] px-4 sm:px-8">✦</span> BEYOND THE JAR
            </h2>
          </motion.div>
        </div>

        {/* Center floating image: Botanical Infusions Trio */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] sm:w-[45vw] max-w-[440px] pointer-events-none z-20 mix-blend-multiply">
          <motion.div
            initial={{ scale: 0.85, opacity: 0, y: 60, rotate: -4 }}
            whileInView={{ scale: 1, opacity: 1, y: 0, rotate: 2 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, margin: '-10%' }}
          >
            <img
              src="/images/botanical_infusions_trio.jpg"
              alt="Mint, Chili, Ginger and Turmeric Botanical Infusions"
              className="w-full h-auto rounded-[28px] sm:rounded-[36px] object-cover border-4 border-[#fdfaf1] shadow-2xl"
            />
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════ */}
      {/* 4. ANIMATED RIBBON DIVIDER                                  */}
      {/* ════════════════════════════════════════════════════════════ */}
      <div className="pt-8 pb-4 bg-[#c87a1e] relative z-20">
        <div className="absolute bottom-full left-0 w-full overflow-hidden leading-none z-20 -mb-[1px]">
          <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="w-full h-[40px] sm:h-[70px] lg:h-[100px] text-[#c87a1e]">
            <path
              fill="currentColor"
              d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
            />
          </svg>
        </div>

        <motion.div style={{ x: ribbonX }} className="whitespace-nowrap pb-2">
          <span className="inline-block text-[13px] sm:text-[16px] font-black tracking-[0.25em] uppercase text-[#fdfaf1] select-none drop-shadow-sm">
            {ribbonWords.repeat(6)}
          </span>
        </motion.div>

        <div className="absolute top-full left-0 w-full overflow-hidden leading-none z-20 -mt-[1px]">
          <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="w-full h-[40px] sm:h-[60px] lg:h-[90px] text-[#c87a1e]">
            <path
              fill="currentColor"
              d="M0,32L60,42.7C120,53,240,75,360,74.7C480,75,600,53,720,48C840,43,960,53,1080,58.7C1200,64,1320,64,1380,64L1440,64L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
            />
          </svg>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════ */}
      {/* 5. THE EXPANSIVE HIVE ECOSYSTEM — Horizontal Scroll Showcase */}
      {/* ════════════════════════════════════════════════════════════ */}
      <section ref={horizontalRef} id="the-hive" className="bg-[#1a110a] h-[400vh] relative z-30">
        <div className="sticky top-0 h-[100svh] w-full overflow-hidden bg-[#1a110a] flex items-center">
          <motion.div style={{ x: horizontalX }} className="flex h-full w-[400vw]">
            {/* PANEL 1: Format Innovation — Mess-Free Honey Sticks */}
            <div className="w-[100vw] h-full flex flex-col md:flex-row items-center justify-center px-6 sm:px-12 lg:px-20 gap-8 lg:gap-16 relative overflow-hidden shrink-0">
              <div className="w-full md:w-1/2 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-[1px] w-8 bg-[#c87a1e]" />
                  <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#c87a1e]">
                    01 · Format Innovation
                  </span>
                </div>
                <h2
                  className="font-montserrat font-black text-4xl sm:text-5xl lg:text-[76px] leading-[0.9] tracking-tighter text-transparent"
                  style={{ WebkitTextStroke: '2px #fdfaf1' }}
                >
                  BEYOND THE
                </h2>
                <h2 className="font-montserrat font-black text-4xl sm:text-5xl lg:text-[76px] leading-[0.9] tracking-tighter text-white mt-1">
                  STICKY JAR.
                </h2>
                <p className="text-sm sm:text-base text-[#a39585] font-medium max-w-lg mt-4 leading-relaxed">
                  Traditional glass jars trapped raw honey as a cumbersome kitchen product. We bypassed fragmented trader networks, sourcing 100% traceable multifloral honey directly into sleek tear-and-pour sticks that travel effortlessly with you.
                </p>
                <div className="mt-6 flex items-center gap-4">
                  <Link
                    to="/shop"
                    className="inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-white text-[#1a110a] font-bold tracking-[0.2em] uppercase text-xs hover:bg-[#c87a1e] hover:text-white transition-all duration-300 no-underline shadow-lg"
                  >
                    <span>Shop Sticks · 1, 3 &amp; 6 Packs</span>
                    <span className="ml-2">→</span>
                  </Link>
                </div>
              </div>
              <div className="w-full md:w-1/2 h-[42vh] md:h-[60vh] relative rounded-[32px] overflow-hidden shadow-2xl border border-white/10 group">
                <img
                  src="/images/gapoo_hero_travertine.jpg"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  alt="Gapoo Honey Sticks Box on Travertine"
                />
              </div>
            </div>

            {/* PANEL 2: Chapter 02 Botanical Infusions */}
            <div className="w-[100vw] h-full flex flex-col-reverse md:flex-row items-center justify-center px-6 sm:px-12 lg:px-20 gap-8 lg:gap-16 relative shrink-0">
              <div className="w-full md:w-1/2 h-[42vh] md:h-[60vh] relative rounded-[32px] overflow-hidden shadow-2xl border border-white/10 group">
                <img
                  src="/images/botanical_infusions_trio.jpg"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  alt="Botanical Honey Infusions"
                />
              </div>
              <div className="w-full md:w-1/2 flex flex-col justify-center relative z-10">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-[1px] w-8 bg-[#c87a1e]" />
                  <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#c87a1e]">
                    02 · Daily Rituals
                  </span>
                </div>
                <h3 className="font-montserrat font-black text-4xl sm:text-5xl lg:text-[76px] text-white tracking-tighter leading-[0.9]">
                  BOTANICAL
                </h3>
                <h3
                  className="font-montserrat font-black text-4xl sm:text-5xl lg:text-[76px] tracking-tighter leading-[0.9] text-transparent mt-1"
                  style={{ WebkitTextStroke: '2px #c87a1e' }}
                >
                  INFUSIONS.
                </h3>
                <p className="text-sm sm:text-base text-[#a39585] font-medium max-w-lg mt-4 leading-relaxed">
                  Beyond pure nectar, we craft individual botanical infusions for specific daily rituals:
                </p>

                {/* 3 Botanical highlights */}
                <div className="mt-3.5 space-y-2 max-w-lg">
                  <div className="flex items-center gap-3 p-2.5 rounded-xl bg-white/5 border border-white/10">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]" />
                    <span className="text-xs sm:text-sm font-bold text-white">Mint Honey</span>
                    <span className="text-xs text-[#a39585]">— Cooling relief from the heat</span>
                  </div>
                  <div className="flex items-center gap-3 p-2.5 rounded-xl bg-white/5 border border-white/10">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444]" />
                    <span className="text-xs sm:text-sm font-bold text-white">Chilly Honey</span>
                    <span className="text-xs text-[#a39585]">— Bold, spicy culinary kick</span>
                  </div>
                  <div className="flex items-center gap-3 p-2.5 rounded-xl bg-white/5 border border-white/10">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]" />
                    <span className="text-xs sm:text-sm font-bold text-white">Ginger &amp; Turmeric</span>
                    <span className="text-xs text-[#a39585]">— Antioxidant immunity blend</span>
                  </div>
                </div>
              </div>
            </div>

            {/* PANEL 3: Chapter 03 Generational Apiarists */}
            <div className="w-[100vw] h-full flex flex-col md:flex-row items-center justify-center px-6 sm:px-12 lg:px-20 gap-8 lg:gap-16 relative shrink-0">
              <div className="w-full md:w-1/2 flex flex-col justify-center relative z-10">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-[1px] w-8 bg-[#c87a1e]" />
                  <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#c87a1e]">
                    03 · Generational Heritage
                  </span>
                </div>
                <h3 className="font-montserrat font-black text-4xl sm:text-5xl lg:text-[76px] text-white tracking-tighter leading-[0.9]">
                  THE INDIAN
                </h3>
                <h3
                  className="font-montserrat font-black text-4xl sm:text-5xl lg:text-[76px] tracking-tighter leading-[0.9] text-transparent mt-1"
                  style={{ WebkitTextStroke: '2px #fdfaf1' }}
                >
                  BEEKEEPER.
                </h3>
                <p className="text-sm sm:text-base text-[#a39585] font-medium max-w-lg mt-4 leading-relaxed">
                  Working directly with indigenous, generational bee farmers across the Himalayan foothills and wild flowering meadows. We champion ethical hive-to-bottle harvesting that protects the native colonies, empowers local rural families with honest trade, and delivers pure golden nectar untouched by artificial processing.
                </p>
                <div className="mt-5 flex flex-wrap items-center gap-2.5 text-[11px] font-bold uppercase tracking-wider text-amber-300">
                  <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20">
                    Generational Bee Farmers
                  </span>
                  <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20">
                    Direct From The Hive
                  </span>
                  <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20">
                    Ethical &amp; Cruelty-Free
                  </span>
                </div>
              </div>
              <div className="w-full md:w-1/2 h-[42vh] md:h-[60vh] relative rounded-[32px] overflow-hidden shadow-2xl border border-white/10 group">
                <img
                  src="/images/indian_apiarist_harvest.jpg"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  alt="Authentic Indian Bee Farmer with Raw Honeycomb Frame"
                />
              </div>
            </div>

            {/* PANEL 4: Chapter 04 Beyond Honey: The Natural Pharmacy & Einstein Marvel */}
            <div className="w-[100vw] h-full flex flex-col-reverse md:flex-row items-center justify-center px-6 sm:px-12 lg:px-20 gap-8 lg:gap-16 relative shrink-0">
              <div className="w-full md:w-1/2 h-[42vh] md:h-[60vh] relative rounded-[32px] overflow-hidden shadow-2xl border border-white/10 group">
                <img
                  src="/images/natural_pharmacy_hive_treasures.jpg"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  alt="Bee Pollen, Propolis, Royal Jelly and Beeswax"
                />
              </div>
              <div className="w-full md:w-1/2 flex flex-col justify-center relative z-10">
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-[1px] w-8 bg-[#c87a1e]" />
                  <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#c87a1e]">
                    04 · The Untapped Pharmacy
                  </span>
                </div>
                <h3 className="font-montserrat font-black text-4xl sm:text-5xl lg:text-[76px] text-white tracking-tighter leading-[0.9]">
                  BEYOND
                </h3>
                <h3
                  className="font-montserrat font-black text-4xl sm:text-5xl lg:text-[76px] tracking-tighter leading-[0.9] text-transparent mt-1"
                  style={{ WebkitTextStroke: '2px #c87a1e' }}
                >
                  HONEY.
                </h3>

                {/* Einstein quote integrated organically where it belongs */}
                <blockquote className="my-3 p-3 rounded-xl bg-white/5 border-l-2 border-[#c87a1e] text-xs text-[#d4c9bc] leading-relaxed max-w-lg">
                  &ldquo;If the bee disappeared off the face of the Earth, man would only have four years left to live.&rdquo;
                  <span className="block text-[11px] text-[#a39585] mt-0.5">— Albert Einstein · Every single drop of the hive is precious.</span>
                </blockquote>

                <div className="grid grid-cols-2 gap-2 max-w-lg text-xs">
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                    <span className="font-bold text-amber-300 block text-xs">Bee Pollen</span>
                    <span className="text-[#a39585] text-[11px]">Dietary superfood &amp; energy</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                    <span className="font-bold text-amber-300 block text-xs">Propolis</span>
                    <span className="text-[#a39585] text-[11px]">Natural raw antibiotic</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                    <span className="font-bold text-amber-300 block text-xs">Royal Jelly</span>
                    <span className="text-[#a39585] text-[11px]">Cellular vitality</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                    <span className="font-bold text-amber-300 block text-xs">Beeswax</span>
                    <span className="text-[#a39585] text-[11px]">Skin-nourishing cosmetics</span>
                  </div>
                </div>

                <div className="mt-5">
                  <Link
                    to="/story"
                    className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-white text-[#1a110a] font-bold tracking-[0.2em] uppercase text-xs hover:bg-[#c87a1e] hover:text-white transition-all duration-300 no-underline shadow-lg"
                  >
                    <span>Read The Complete Story</span>
                    <span className="ml-2">→</span>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════ */}
      {/* 5.5 EDITORIAL PHOTO ARCHIVE — Real Living Apiaries           */}
      {/* ════════════════════════════════════════════════════════════ */}
      <section className="py-24 sm:py-32 px-6 sm:px-12 lg:px-20 max-w-[1440px] mx-auto relative z-10 bg-[#fdfaf1]">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="h-[1px] w-8 bg-[#c87a1e]" />
              <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#c87a1e]">
                Visual Field Notes
              </span>
            </div>
            <h2 className="font-apricot text-4xl sm:text-5xl lg:text-6xl font-bold leading-[0.95] tracking-tighter text-[#1a110a]">
              The Living Apiary Archive.
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#786c5e] max-w-sm leading-relaxed font-medium">
            Raw photographic glimpses from our partner apiaries across Himalayan valleys, high forest canopies, and living hives.
          </p>
        </div>

        {/* 4-Card Photojournalism Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
          {/* Photo 1: Wild Tree Canopy */}
          <FadeIn delay={0.05} className="h-full">
            <div className="group relative rounded-3xl overflow-hidden shadow-lg border border-[#ebd8b0] bg-[#faecd0] h-[380px] sm:h-[420px] flex flex-col justify-end">
              <img
                src="/images/Beehive hanging over a tree in India by Andrey Armyagov _ 500px.jpeg"
                alt="Wild honeybee hives hanging in tree canopy"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
              <div className="relative z-10 p-5 text-white">
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-amber-300 block mb-1">
                  01 · The Wild Canopy
                </span>
                <h3 className="font-bold text-sm sm:text-base leading-snug">
                  High Forest Living Hives
                </h3>
                <span className="text-[11px] text-white/80 block mt-1">
                  Wild colonies thriving in ancient Indian tree branches.
                </span>
              </div>
            </div>
          </FadeIn>

          {/* Photo 2: Valley Apiaries */}
          <FadeIn delay={0.1} className="h-full">
            <div className="group relative rounded-3xl overflow-hidden shadow-lg border border-[#ebd8b0] bg-[#faecd0] h-[380px] sm:h-[420px] flex flex-col justify-end">
              <img
                src="/images/farmin2.jpeg"
                alt="Traditional wooden beehive boxes in floral valley meadow"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
              <div className="relative z-10 p-5 text-white">
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-amber-300 block mb-1">
                  02 · Valley Apiaries
                </span>
                <h3 className="font-bold text-sm sm:text-base leading-snug">
                  Mountain Valley Meadows
                </h3>
                <span className="text-[11px] text-white/80 block mt-1">
                  Single-origin floral boxes nestled in lush hills.
                </span>
              </div>
            </div>
          </FadeIn>

          {/* Photo 3: The Morning Smoke */}
          <FadeIn delay={0.15} className="h-full">
            <div className="group relative rounded-3xl overflow-hidden shadow-lg border border-[#ebd8b0] bg-[#faecd0] h-[380px] sm:h-[420px] flex flex-col justify-end">
              <img
                src="/images/farming1.jpeg"
                alt="Beekeepers in forest sunbeams and smoke"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
              <div className="relative z-10 p-5 text-white">
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-amber-300 block mb-1">
                  03 · The Sacred Smoke
                </span>
                <h3 className="font-bold text-sm sm:text-base leading-snug">
                  Ethical Hands-On Care
                </h3>
                <span className="text-[11px] text-white/80 block mt-1">
                  Calming the bees naturally during dawn inspection.
                </span>
              </div>
            </div>
          </FadeIn>

          {/* Photo 4: Botanical Alchemy */}
          <FadeIn delay={0.2} className="h-full">
            <div className="group relative rounded-3xl overflow-hidden shadow-lg border border-[#ebd8b0] bg-[#faecd0] h-[380px] sm:h-[420px] flex flex-col justify-end">
              <img
                src="/images/botanical_infusions_trio.jpg"
                alt="Fresh mint, red chili, sliced ginger and raw honey on stone"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
              <div className="relative z-10 p-5 text-white">
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-amber-300 block mb-1">
                  04 · Raw Botanicals
                </span>
                <h3 className="font-bold text-sm sm:text-base leading-snug">
                  Functional Daily Rituals
                </h3>
                <span className="text-[11px] text-white/80 block mt-1">
                  Fresh mint, bold chili, ginger &amp; turmeric infusions.
                </span>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════ */}
      {/* 5.6 THE CLEAN HIVE STANDARD — Certificate of Analysis (COA)  */}
      {/* ════════════════════════════════════════════════════════════ */}
      <LabVerifiedSection id="lab-verified" className="border-t border-[#ebd8b0]" />

      {/* ════════════════════════════════════════════════════════════ */}
      {/* 6. FINAL MONUMENTAL CTA — Balanced Spacing & Proportions    */}
      {/* ════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden bg-[#fdfaf1] py-24 sm:py-32 px-6 z-10 border-t border-[#ebd8b0]">
        {/* Background ambient text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none opacity-[0.03] select-none">
          <h2 className="font-montserrat font-black whitespace-nowrap" style={{ fontSize: 'clamp(8rem, 25vw, 420px)', lineHeight: 0.8 }}>
            GAPOO
          </h2>
        </div>

        <div className="relative z-10 flex flex-col items-center w-full max-w-5xl mx-auto text-center">
          {/* Top text */}
          <FadeIn>
            <h2
              className="font-montserrat font-black text-[#1a110a] uppercase tracking-tighter"
              style={{ fontSize: 'clamp(2.5rem, 7vw, 86px)', lineHeight: 0.9 }}
            >
              TASTE THE
            </h2>
          </FadeIn>

          {/* Middle Row with interactive capsule */}
          <FadeIn delay={0.1}>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 my-4 sm:my-6 w-full">
              <h2
                className="font-apricot text-[#c87a1e] tracking-tighter"
                style={{ fontSize: 'clamp(3.5rem, 9vw, 110px)', lineHeight: 0.8 }}
              >
                purest
              </h2>

              <Link to="/shop" className="shrink-0 group block" style={{ textDecoration: 'none' }}>
                <motion.div
                  className="rounded-[200px] overflow-hidden relative cursor-pointer shadow-[0_15px_40px_rgba(200,122,30,0.25)] border-4 border-white group-hover:border-[#c87a1e] transition-colors duration-500"
                  style={{ height: 'clamp(90px, 12vw, 150px)' }}
                  initial={{ width: 'clamp(170px, 20vw, 280px)' }}
                  whileHover={{ width: 'clamp(210px, 26vw, 360px)' }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <img
                    src="/images/gapoo_hero_unboxing.jpg"
                    alt="Gapoo Honey Sticks Unboxing"
                    className="absolute inset-0 w-full h-full object-cover scale-[1.1] group-hover:scale-100 transition-transform duration-[1.2s] ease-[0.16,1,0.3,1]"
                  />
                  <div className="absolute inset-0 bg-[#c87a1e]/15 mix-blend-multiply group-hover:opacity-0 transition-opacity duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="bg-white/95 text-[#1a110a] px-5 py-2.5 rounded-full font-bold uppercase tracking-[0.2em] text-[10px] whitespace-nowrap shadow-lg">
                      Shop Now
                    </span>
                  </div>
                </motion.div>
              </Link>
            </div>
          </FadeIn>

          {/* Bottom Text */}
          <FadeIn delay={0.2}>
            <h2
              className="font-montserrat font-black text-[#1a110a] uppercase tracking-tighter"
              style={{ fontSize: 'clamp(2.5rem, 7vw, 86px)', lineHeight: 0.9 }}
            >
              DIFFERENCE.
            </h2>
          </FadeIn>

          <FadeIn delay={0.3}>
            <p className="mt-7 text-sm sm:text-base md:text-lg text-[#5c5247] max-w-lg mx-auto font-medium leading-relaxed">
              Experience the new standard of raw botanical nectar. 100% traceable, hive-to-bottle, and crafted for modern adult wellness.
            </p>
          </FadeIn>

          <FadeIn delay={0.4}>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              <Link
                to="/shop"
                className="group relative inline-flex items-center gap-2.5 px-8 sm:px-10 py-4 rounded-full bg-[#1a110a] text-white shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-0.5"
                style={{ textDecoration: 'none' }}
              >
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#f5a623] via-[#fbbf24] to-[#d97706] transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-[0.16,1,0.3,1]" />
                <span className="relative z-10 font-bold tracking-[0.18em] uppercase text-xs text-white transition-colors duration-300 flex items-center gap-3">
                  <span>Explore Honey Sticks </span>
                  <span className="text-sm">→</span>
                </span>
              </Link>

              <Link
                to="/story"
                className="inline-flex items-center gap-2 px-7 sm:px-8 py-4 rounded-full bg-white border border-[#ebd8b0] text-[#1a110a] font-bold tracking-[0.18em] uppercase text-xs hover:border-[#c87a1e] hover:bg-[#faf6ee] transition-all no-underline shadow-sm"
              >
                <span>Read The Story</span>
                <span>→</span>
              </Link>
            </div>
          </FadeIn>

          {/* Bear logo watermark at bottom */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.5 }}
            className="mt-14 pointer-events-none"
          >
            <img
              src="/images/gapoo_bear_mascot_hd.png"
              alt=""
              className="w-16 sm:w-20 h-auto opacity-[0.25] mx-auto select-none mix-blend-multiply filter contrast-150 grayscale sepia hue-rotate-30"
            />
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════ */}
      {/* 7. MASSIVE LOGO REVEAL — Apple Style                          */}
      {/* ════════════════════════════════════════════════════════════ */}
      <section ref={appleLogoRef} className="relative h-[300vh]">
        <motion.div
          className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden"
          style={{ backgroundColor: appleBgColor }}
        >
          {/* The Mascot */}
          <motion.div
            style={{ scale: appleBearScale, y: appleBearY, filter: appleBearFilter }}
            className="relative z-10 flex items-center justify-center"
          >
            <img
              src="/images/gapoo_bear_mascot_hd.png"
              alt="Gapoo Mascot"
              className="w-[28vw] min-w-[180px] max-w-[360px] object-contain select-none"
            />
          </motion.div>

          {/* The Text */}
          <motion.h2
            className="font-apricot text-center tracking-tighter mt-6 z-10 select-none"
            style={{
              opacity: appleTextOpacity,
              y: appleTextY,
              color: appleTextColor,
              fontSize: 'clamp(4.5rem, 13vw, 180px)',
              lineHeight: 0.8,
            }}
          >
            Gapoo
          </motion.h2>

          {/* Ambient transition glow when dark */}
          <motion.div
            style={{ opacity: appleTextOpacity }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] bg-[#c87a1e] blur-[150px] rounded-full pointer-events-none mix-blend-screen opacity-0"
          />
        </motion.div>
      </section>
    </div>
  );
}
