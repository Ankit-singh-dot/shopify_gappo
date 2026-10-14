import { useState, useRef } from 'react';
import { Link } from 'react-router';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { AppleLogoReveal } from '~/components/AppleLogoReveal';
import { CertificateOfAnalysisModal } from '~/components/CertificateOfAnalysisModal';

/**
 * @type {Route.MetaFunction}
 */
export const meta = () => {
  return [
    { title: 'Our Story | Gapoo Honey Sticks' },
    {
      name: 'description',
      content:
        'The Hive Awakening: How Gapoo blossomed from hands-on bee farming into a mission for 100% traceable, hive-to-bottle raw honey in mess-free sticks.',
    },
  ];
};

/* ─── Shared Layout Design Tokens ─── */
const SECTION_CONTAINER = 'w-full max-w-6xl mx-auto';
const CARD_LIGHT =
  'flex flex-col gap-6 sm:gap-8 bg-white/90 backdrop-blur-sm rounded-[28px] sm:rounded-[40px] lg:rounded-[48px] p-6 sm:p-10 lg:p-14 border border-[#ebdccb] shadow-[0_20px_50px_rgba(26,17,10,0.06)]';
const CHAPTER_PILL =
  'self-start inline-flex items-center gap-2 bg-[#faecc9] border border-[#e5cf9d] px-4 py-1.5 rounded-full text-xs font-bold text-[#8b5311] uppercase tracking-wider shadow-2xs';
const H2 = 'font-apricot text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1a110a] leading-tight';
const LEAD = 'text-base sm:text-lg lg:text-xl text-[#3d3228] leading-relaxed font-medium';
const BODY = 'text-sm sm:text-base text-[#5c5043] leading-relaxed font-normal';
const SUB_CARD =
  'flex flex-col gap-2 p-5 sm:p-7 rounded-2xl sm:rounded-3xl bg-[#faf6ee] border border-[#ebdccb] transition-all hover:border-[#c87a1e]/40 hover:shadow-sm';
const PRIMARY_BTN =
  'group inline-flex items-center justify-center gap-2.5 px-8 sm:px-10 py-4 rounded-full bg-gradient-to-r from-[#f5a623] to-[#d97706] hover:from-[#fbbf24] hover:to-[#ea580c] text-white text-xs sm:text-sm font-bold tracking-[0.16em] uppercase shadow-[0_12px_28px_rgba(200,122,30,0.35)] hover:shadow-[0_16px_36px_rgba(200,122,30,0.48)] transition-all duration-300 hover:scale-105 active:scale-95 no-underline';

/* ─── Reusable Fade-In Block ─── */
function FadeIn({ children, className = '', delay = 0, y = 20 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-6%' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function OurStoryPage() {
  const [isCoaOpen, setIsCoaOpen] = useState(false);
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const tickerX1 = useTransform(scrollYProgress, [0, 1], ['0%', '-35%']);
  const tickerX2 = useTransform(scrollYProgress, [0, 1], ['-35%', '0%']);

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-screen overflow-clip bg-[#fdfaf1] text-[#1a110a] font-montserrat"
    >
      {/* ════════════════════════════════════════════════════════════ */}
      {/* 1. CINEMATIC HERO: GENEROUS CLEARANCE FROM FLOATING NAVBAR   */}
      {/* ════════════════════════════════════════════════════════════ */}
      <section className="relative z-10 w-full max-w-5xl mx-auto px-5 sm:px-8 lg:px-12 pt-28 sm:pt-36 lg:pt-44 pb-20 sm:pb-28 lg:pb-36">
        {/* Warm Ambient Honey Atmosphere */}
        <div className="pointer-events-none absolute top-1/2 left-1/2 -z-10 h-[420px] w-[800px] max-w-full -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse,rgba(245,166,35,0.24)_0%,transparent_70%)] blur-3xl" />

        {/* Mascot Watermark */}
        <div className="pointer-events-none absolute right-0 top-0 -z-10 w-44 sm:w-64 select-none opacity-[0.038] mix-blend-multiply">
          <img src="/images/gapoo_bear_mascot_hd.png" alt="" className="h-auto w-full" />
        </div>

        <div className="flex flex-col items-center gap-6 sm:gap-8 text-center">
          {/* Pill Badge with Golden Bee */}


          {/* Grand Headline with Signature Apricot Brand Typography */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="flex flex-col items-center gap-4"
          >
            <h1 className="font-apricot max-w-4xl text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-bold leading-[0.94] tracking-tight text-[#1a110a]">
              The Hive{' '}
              <span className="bg-gradient-to-r from-[#c87a1e] via-[#e08920] to-[#b45309] bg-clip-text text-transparent">
                Awakening.
              </span>
            </h1>
            <div className="flex items-center justify-center gap-3">
              <div className="h-px w-14 bg-gradient-to-r from-transparent to-[#c87a1e]" />
              <span className="text-xs text-[#c87a1e]">✦</span>
              <div className="h-px w-14 bg-gradient-to-l from-transparent to-[#c87a1e]" />
            </div>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="max-w-2xl text-base sm:text-lg lg:text-xl font-medium leading-relaxed text-[#5c5043]"
          >
            Born not in a corporate boardroom, but in the dirt and the hum of the hives during hands-on bee farming training sessions.
          </motion.p>

          {/* Provenance Pills */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#8b5311]"
          >
            {[
              ['bg-[#10b981]', '100% Raw & Single-Origin'],
              ['bg-[#c87a1e]', 'Generational Indian Apiaries'],
              ['bg-[#10b981]', 'Zero Added Syrups'],
              ['bg-[#15803d]', 'COA Lab Certified (0 Heavy Metals)'],
            ].map(([dot, label]) => (
              <span
                key={label}
                className="inline-flex items-center gap-1.5 rounded-full border border-[#ebd8b0] bg-white/80 backdrop-blur-sm px-3.5 py-1.5 shadow-2xs"
              >
                <span className={`h-1.5 w-1.5 rounded-full ${dot}`} /> {label}
              </span>
            ))}
          </motion.div>

          {/* Primary Action Anchors */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-2 mb-2 sm:mb-4"
          >
            <Link to="/shop" className={PRIMARY_BTN} style={{ color: '#ffffff', textDecoration: 'none' }}>
              <span>Explore Honey Sticks</span>
              <span className="transition-transform group-hover:translate-x-1">↗</span>
            </Link>
            <a
              href="#chapter-01"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[#ebd8b0] bg-white/90 backdrop-blur-sm px-7 sm:px-9 py-4 text-xs sm:text-sm font-bold uppercase tracking-[0.16em] text-[#1a110a] no-underline shadow-2xs transition-all duration-300 hover:scale-105 hover:border-[#c87a1e] hover:bg-white hover:shadow-md active:scale-95"
              style={{ textDecoration: 'none' }}
            >
              <span>Read The Story</span>
              <span className="text-sm">↓</span>
            </a>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════ */}
      {/* 2. GRAND ARCHIVAL PHOTO BANNER                              */}
      {/* ════════════════════════════════════════════════════════════ */}
      <section className={`${SECTION_CONTAINER} px-5 sm:px-8 lg:px-12 pt-6 sm:pt-10 mb-20 sm:mb-32 lg:mb-40`}>
        <FadeIn>
          <div className="relative rounded-[32px] sm:rounded-[48px] overflow-hidden border-[3px] border-[#ebdccb] shadow-[0_25px_60px_rgba(26,17,10,0.12)] group">
            <img
              src="/images/bee_farming_training.jpg"
              alt="Hands-on Bee Farming Training Session in Indian Apiary"
              className="w-full h-[320px] sm:h-[480px] lg:h-[580px] object-cover object-center group-hover:scale-[1.02] transition-transform duration-700"
            />
            {/* Subtle Gradient Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent pointer-events-none" />

            {/* Overlay Plaque */}
            <div className="absolute bottom-5 sm:bottom-8 left-5 sm:left-8 right-5 sm:right-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div className="max-w-xl text-white">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-[10px] font-bold uppercase tracking-wider text-[#fbbf24] mb-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#f5a623] animate-pulse" />
                  Field Archives · Generation Zero
                </span>
                <p className="font-apricot text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight drop-shadow-md">
                  Reconnecting Modern Life with the Untamed Hive.
                </p>
                <p className="text-xs sm:text-sm text-[#fdfaf1]/90 mt-1 font-medium font-montserrat leading-relaxed">
                  Captured during our formative hands-on training sessions with generational Indian apiarists.
                </p>
              </div>

              <div className="shrink-0">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1a110a]/85 backdrop-blur-md border border-[#ebdccb]/40 text-xs font-bold text-[#f5a623] uppercase tracking-wider shadow-lg">
                  100% Hive Traceability
                </span>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ════════════════════════════════════════════════════════════ */}
      {/* 3. EDITORIAL STORY CHAPTERS                                  */}
      {/* ════════════════════════════════════════════════════════════ */}
      <main className="flex flex-col gap-12 sm:gap-16 lg:gap-24 px-5 sm:px-8 lg:px-12 pb-16 sm:pb-24">
        {/* ─── CHAPTER 1: THE HIVE AWAKENING & ADULTERATION CRISIS ─── */}
        <section id="chapter-01" className={`${SECTION_CONTAINER} scroll-mt-24`}>
          <div className={CARD_LIGHT}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <div className="lg:col-span-7 flex flex-col gap-5 sm:gap-6">
                <span className={CHAPTER_PILL}>Chapter 01 · The Hive Awakening</span>

                <p className={LEAD}>
                  The seed for Gapoo was planted not in a corporate boardroom, but in the dirt and the hum of the hives during a hands-on bee farming training session. It blossomed from the simple, grounded concept of &ldquo;Garden+Pool&rdquo;—a vision to reconnect the modern adult wellness lifestyle with the untamed, natural bounty of the earth.
                </p>
                <p className={BODY}>
                  As we worked alongside local Indian beekeepers, we uncovered a profound betrayal of consumer trust. India&apos;s commercial honey market is highly fragmented, with pure nectar passing through multiple middlemen where genuine batches easily get mixed with compromised syrups. The market is flooded with cheap rice, corn, and cane syrups specifically designed to bypass standard domestic purity tests.
                </p>

                {/* CSE Investigation Stat Box */}
                <div className="rounded-2xl sm:rounded-3xl border border-[#ebdccb] bg-[#faf5ec] p-5 sm:p-7 mt-2">
                  <p className="text-xs sm:text-sm leading-relaxed text-[#4a3e32] font-medium">
                    A landmark investigation by the Centre for Science and Environment (CSE) revealed a shocking reality: 77% of tested retail samples failed sugar adulteration tests, and only 3 of 13 leading brands passed international NMR spectroscopy tests.
                  </p>
                  <div className="grid grid-cols-2 gap-4 border-t border-[#ebdccb] pt-4 mt-4">
                    <div className="flex items-center gap-3">
                      <span className="font-apricot shrink-0 text-3xl sm:text-4xl font-bold leading-none text-[#c87a1e]">
                        77%
                      </span>
                      <span className="text-[11px] sm:text-xs font-semibold leading-tight text-[#5c5043]">
                        Samples adulterated with sugar syrups
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-apricot shrink-0 text-3xl sm:text-4xl font-bold leading-none text-[#c87a1e]">
                        3 of 13
                      </span>
                      <span className="text-[11px] sm:text-xs font-semibold leading-tight text-[#5c5043]">
                        Brands passed international NMR tests
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Visual Card: Indian Apiarist Harvest */}
              <div className="lg:col-span-5 relative flex flex-col items-center">
                <div className="relative w-full rounded-3xl overflow-hidden border-2 border-[#ebdccb] shadow-xl group">
                  <img
                    src="/images/indian_apiarist_harvest.jpg"
                    alt="Generational Indian Apiarist Harvesting Pure Comb"
                    className="w-full h-[360px] sm:h-[440px] object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#fbbf24] block mb-1">
                      Direct Apiary Harvest
                    </span>
                    <p className="font-apricot text-xl font-bold leading-tight">
                      Generational Indian Apiarists
                    </p>
                    <p className="text-xs text-white/80 font-medium mt-0.5">
                      Partnering directly to protect pure unadulterated nectar.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── KINETIC MARQUEE RIBBON ─── */}
        <div className="py-6 sm:py-8 bg-[#faecd0] border-y border-[#ebd8b0] overflow-hidden -mx-5 sm:-mx-8 lg:-mx-12 select-none">
          <motion.div style={{ x: tickerX1 }} className="whitespace-nowrap flex items-center">
            <span className="font-montserrat font-black text-2xl sm:text-3xl lg:text-4xl uppercase tracking-[0.2em] text-[#1a110a]">
              GARDEN + POOL <span className="text-[#c87a1e] px-4">✦</span> THE HIVE AWAKENING <span className="text-[#c87a1e] px-4">✦</span> 100% TRACEABLE ORIGIN <span className="text-[#c87a1e] px-4">✦</span> BOTANICAL INFUSIONS <span className="text-[#c87a1e] px-4">✦</span> THE INDIAN HONEY FINGERPRINT <span className="text-[#c87a1e] px-4">✦</span> REAL MULTIFLORAL <span className="text-[#c87a1e] px-4">✦</span>
            </span>
          </motion.div>
          <motion.div style={{ x: tickerX2 }} className="whitespace-nowrap flex items-center mt-2 opacity-75">
            <span
              className="font-montserrat font-black text-2xl sm:text-3xl lg:text-4xl uppercase tracking-[0.2em] text-transparent"
              style={{ WebkitTextStroke: '1.5px #1a110a' }}
            >
              UNTAMED NECTAR <span className="text-[#c87a1e] px-4">✦</span> BEYOND THE JAR <span className="text-[#c87a1e] px-4">✦</span> ZERO ADDED SUGAR <span className="text-[#c87a1e] px-4">✦</span> NATURAL PHARMACY <span className="text-[#c87a1e] px-4">✦</span> COA LAB VERIFIED <span className="text-[#c87a1e] px-4">✦</span>
            </span>
          </motion.div>
        </div>

        {/* ─── CHAPTER 2: THE GAPOO PROMISE & THE STICK REVOLUTION ─── */}
        <section className={SECTION_CONTAINER}>
          <div className={CARD_LIGHT}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Visual Card: Honey Pour / Stick Ritual */}
              <div className="lg:col-span-5 order-2 lg:order-1 relative flex flex-col items-center">
                <div className="relative w-full rounded-3xl overflow-hidden border-2 border-[#ebdccb] shadow-xl group">
                  <img
                    src="/images/gapoo_hero_pour.jpg"
                    alt="Gapoo Single-Serve Stick Mess-Free Pour"
                    className="w-full h-[360px] sm:h-[440px] object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#f5a623] block mb-1">
                      The Modern Ritual
                    </span>
                    <p className="font-apricot text-xl font-bold leading-tight">
                      Snap. Squeeze. Sip.
                    </p>
                    <p className="text-xs text-white/80 font-medium mt-0.5">
                      No spoons, no sticky jars, no countertop cleanup.
                    </p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 order-1 lg:order-2 flex flex-col gap-5 sm:gap-6">
                <span className={CHAPTER_PILL}>Chapter 02 · The Format Revolution</span>
                <h2 className={H2}>The Gapoo Promise.</h2>
                <p className={LEAD}>
                  Behind milk, honey has quietly become the most ignored and heavily adulterated commodity in the global consumer market. We watched consumers routinely prioritize cheap prices, risking their health because the alternative—investing in a massive, expensive jar of 100% pure honey—felt like too big of a gamble just to try it.
                </p>
                <p className={BODY}>
                  Even when people did make the investment, traditional glass jars proved to be a messy, sticky, spill-prone hassle that trapped this incredible superfood in the kitchen cabinet. True honey was stubbornly stuck as a cumbersome home product rather than an accessible daily wellness companion.
                </p>
                <p className={BODY}>
                  Gapoo was created to strip away both the deceit and the inconvenience. By bypassing middlemen, we harvest 100% traceable, raw multifloral honey directly into sleek single-dose sticks that travel effortlessly with you anywhere.
                </p>
              </div>
            </div>

            {/* 3 Botanical Infusions Showcase */}
            <div className="pt-8 sm:pt-10 border-t border-[#f0e4d2] flex flex-col gap-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h3 className="text-sm sm:text-base font-bold uppercase tracking-wider text-[#1a110a]">
                  Three Signature Cold-Steeped Botanical Infusions
                </h3>
                <span className="text-xs font-semibold text-[#8c7e6e]">
                  Available in 1-Pack, 3-Pack, &amp; 6-Pack
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
                <div className={SUB_CARD}>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#15803d]">Cooling Relief</span>
                    <span className="text-sm">🌿</span>
                  </div>
                  <h4 className="font-apricot text-2xl sm:text-3xl font-bold text-[#1a110a] mt-1">Mint Honey</h4>
                  <p className="text-xs sm:text-sm leading-relaxed text-[#5c5043]">
                    Cold-steeped natural garden mint in raw multifloral nectar. Clean, refreshing, and calming.
                  </p>
                </div>

                <div className={SUB_CARD}>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#c2410c]">Spicy Culinary Kick</span>
                    <span className="text-sm">🌶️</span>
                  </div>
                  <h4 className="font-apricot text-2xl sm:text-3xl font-bold text-[#1a110a] mt-1">Chilly Honey</h4>
                  <p className="text-xs sm:text-sm leading-relaxed text-[#5c5043]">
                    Raw multifloral honey infused with Kashmiri bird&apos;s eye chilies. Sweet heat for culinary daring.
                  </p>
                </div>

                <div className={SUB_CARD}>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#b45309]">Immunity Booster</span>
                    <span className="text-sm">🍯</span>
                  </div>
                  <h4 className="font-apricot text-2xl sm:text-3xl font-bold text-[#1a110a] mt-1">Ginger &amp; Turmeric</h4>
                  <p className="text-xs sm:text-sm leading-relaxed text-[#5c5043]">
                    A potent antioxidant-rich wellness blend with golden root botanicals for daily natural immunity.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── CHAPTER 3: THE INDIAN HONEY FINGERPRINT & NMR LAB STANDARDS ─── */}
        <section className={SECTION_CONTAINER}>
          <div className={CARD_LIGHT}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <div className="lg:col-span-7 flex flex-col gap-5 sm:gap-6">
                <span className={CHAPTER_PILL}>Chapter 03 · Traceability &amp; Standards</span>
                <h2 className={H2}>The Indian Honey Fingerprint.</h2>
                <p className={LEAD}>
                  Our vision is fiercely protective of India&apos;s natural heritage. We are building the definitive Indian Honey Fingerprint System—mapping the botanical, chemical, functional, and physical markers of our nectar to elevate it to a premium global benchmark.
                </p>
                <p className={BODY}>
                  Historically, Indian honey has faced global shipment rejections due to traces of antibiotics, heavy metals, and a lack of rigorous NMR testing, casting a shadow of &ldquo;guilt by association&rdquo; over our nation&apos;s true nectar. We are closing that gap by ensuring every batch is tested at FSSAI registered laboratories, accompanied by an open Certificate of Analysis to guarantee zero adulteration, zero antibiotics, and zero heavy metals.
                </p>
                <p className={BODY}>
                  We are determined to make Indian honey uniquely competitive, creating a place on the world map for the country not just for the monumental Taj Mahal, but for exporting world-class, naturally sourced honey.
                </p>

                {/* Direct Action Pill to Open Interactive COA Modal */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setIsCoaOpen(true)}
                    className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-[#1a110a] text-white text-xs sm:text-sm font-bold tracking-wider uppercase hover:bg-[#c87a1e] transition-all cursor-pointer shadow-md hover:shadow-lg hover:-translate-y-0.5"
                  >
                    <span>📜 Inspect Batch Certificate of Analysis (COA)</span>
                    <span className="text-[#f5a623]">↗</span>
                  </button>
                </div>
              </div>

              {/* Visual Card: NMR Lab Test */}
              <div className="lg:col-span-5 relative flex flex-col items-center">
                <div className="relative w-full rounded-3xl overflow-hidden border-2 border-[#ebdccb] shadow-xl group">
                  <img
                    src="/images/honey_nmr_lab_test.jpg"
                    alt="NMR Spectroscopic Lab Testing of Gapoo Honey"
                    className="w-full h-[360px] sm:h-[440px] object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#10b981] block mb-1">
                      Lab Verified &amp; Certified
                    </span>
                    <p className="font-apricot text-xl font-bold leading-tight">
                      FSSAI Registered Testing
                    </p>
                    <p className="text-xs text-white/80 font-medium mt-0.5">
                      Batch #HFL-GMG-08/26-01 · 0 Heavy Metals (BLQ)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quality Standard Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 border-t border-[#f0e4d2] pt-8 sm:pt-10">
              <div className={SUB_CARD}>
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#1a110a]">FSSAI Accredited</h4>
                  <span className="text-[10px] font-extrabold text-[#15803d] bg-[#15803d]/10 px-2 py-0.5 rounded-full">✓ Verified</span>
                </div>
                <p className="text-xs sm:text-sm leading-relaxed text-[#5c5043] mt-1">
                  Tested by Herbal Farm Life Care Pvt Ltd (FSSAI Lic. #13320002000438).
                </p>
              </div>

              <div className={SUB_CARD}>
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#1a110a]">Zero Heavy Metals</h4>
                  <span className="text-[10px] font-extrabold text-[#15803d] bg-[#15803d]/10 px-2 py-0.5 rounded-full">BLQ Purity</span>
                </div>
                <p className="text-xs sm:text-sm leading-relaxed text-[#5c5043] mt-1">
                  Lead (&lt;0.05 mg/kg), Cadmium (&lt;0.05 mg/kg), Arsenic (&lt;0.05 mg/kg) all Below Limit of Quantification.
                </p>
              </div>

              <div className={SUB_CARD}>
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#1a110a]">Zero Added Syrups</h4>
                  <span className="text-[10px] font-extrabold text-[#15803d] bg-[#15803d]/10 px-2 py-0.5 rounded-full">100% Raw</span>
                </div>
                <p className="text-xs sm:text-sm leading-relaxed text-[#5c5043] mt-1">
                  Strictly zero corn, cane, or rice C3/C4 sugar syrups. 100% hive harvest.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── CHAPTER 4: BEYOND HONEY: THE NATURAL PHARMACY (DARK SANCTUARY) ─── */}
        <section className={SECTION_CONTAINER}>
          <div className="flex flex-col gap-8 rounded-[28px] sm:rounded-[40px] lg:rounded-[48px] border border-[#2e1d10] bg-[#120c08] p-6 sm:p-12 lg:p-16 text-white shadow-[0_25px_60px_rgba(0,0,0,0.35)]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <div className="lg:col-span-7 flex flex-col gap-5 sm:gap-6">
                <span className="self-start inline-flex items-center gap-2 rounded-full border border-[#d4a373]/40 bg-[#2a1d13] px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#d4a373]">
                  Chapter 04 · Natural Pharmacy
                </span>
                <h2 className="font-apricot text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-[#f2e6d5]">
                  Beyond Honey: The Natural Pharmacy.
                </h2>
                <p className="text-base sm:text-lg lg:text-xl font-medium leading-relaxed text-[#d9cbb8]">
                  Most people believe bees exist solely to forage honey and pollinate flowers, completely unaware of the miraculous natural pharmacy hidden within the hive architecture. Gapoo is on a mission to introduce modern wellness to the vast, untapped potential of the bees&apos; labor.
                </p>

                {/* Einstein Quote Block */}
                <blockquote className="rounded-2xl sm:rounded-3xl border-l-4 border-[#c87a1e] bg-[#1c140d] p-5 sm:p-7 text-xs sm:text-sm leading-relaxed text-[#b8a896] italic">
                  &ldquo;If the bee disappeared off the face of the Earth, man would only have four years left to live.&rdquo;
                  <span className="block not-italic font-bold text-xs text-[#d4a373] mt-2">
                    — The Ecological Reality of Global Pollination
                  </span>
                </blockquote>

                <p className="text-xs sm:text-sm leading-relaxed text-[#b8a896]">
                  These tiny architects are profound scientific marvels. A single worker bee will produce only about 1/12th of a teaspoon of honey in her entire lifetime. And as bees fly, they generate an electrostatic charge that acts like a magnet to pull pollen from flowers before they even land. Every drop is irreplaceable.
                </p>
              </div>

              {/* Visual Card: Natural Pharmacy Hive Treasures */}
              <div className="lg:col-span-5 relative flex flex-col items-center">
                <div className="relative w-full rounded-3xl overflow-hidden border border-[#3d2919] shadow-2xl group">
                  <img
                    src="/images/natural_pharmacy_hive_treasures.jpg"
                    alt="Natural Pharmacy Hive Treasures: Bee Pollen, Propolis, Royal Jelly, Beeswax"
                    className="w-full h-[360px] sm:h-[440px] object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#f5a623] block mb-1">
                      The Expanding Frontier
                    </span>
                    <p className="font-apricot text-xl font-bold leading-tight text-[#f2e6d5]">
                      The 4 Hive Treasures
                    </p>
                    <p className="text-xs text-white/70 font-medium mt-0.5">
                      Pollen · Propolis · Royal Jelly · Beeswax
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 4 Hive Treasures Grid */}
            <div className="flex flex-col gap-6 border-t border-[#2a1d13] pt-8 sm:pt-10">
              <div className="flex max-w-2xl flex-col gap-1.5">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#d4a373]">
                  Expanding Roadmap · Coming Soon
                </span>
                <p className="text-xs sm:text-sm leading-relaxed text-[#d9cbb8]">
                  To empower our partner apiarists to scale beyond liquid honey, Gapoo is expanding into the hive&apos;s highest-value finishing items:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                <div className="flex flex-col gap-2 rounded-2xl border border-[#2a1d13] bg-[#1a120c] p-6 hover:border-[#c87a1e]/40 transition-colors">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#f5a623]">
                    Dietary Superfood
                  </span>
                  <h4 className="font-apricot text-2xl font-bold text-[#f2e6d5]">Bee Pollen</h4>
                  <p className="text-xs leading-relaxed text-[#a39482]">
                    High-protein, nutrient-dense dietary superfood utilized as an all-natural stamina booster.
                  </p>
                </div>

                <div className="flex flex-col gap-2 rounded-2xl border border-[#2a1d13] bg-[#1a120c] p-6 hover:border-[#c87a1e]/40 transition-colors">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#f5a623]">
                    Hive Defense
                  </span>
                  <h4 className="font-apricot text-2xl font-bold text-[#f2e6d5]">Propolis</h4>
                  <p className="text-xs leading-relaxed text-[#a39482]">
                    Nature&apos;s raw antibiotic &ldquo;bee glue&rdquo; for immune defense and antimicrobial oral wellness.
                  </p>
                </div>

                <div className="flex flex-col gap-2 rounded-2xl border border-[#2a1d13] bg-[#1a120c] p-6 hover:border-[#c87a1e]/40 transition-colors">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#f5a623]">
                    Cellular Superfood
                  </span>
                  <h4 className="font-apricot text-2xl font-bold text-[#f2e6d5]">Royal Jelly</h4>
                  <p className="text-xs leading-relaxed text-[#a39482]">
                    The queen bee&apos;s exclusive nourishment, prized for vitality, cellular health, and skin resilience.
                  </p>
                </div>

                <div className="flex flex-col gap-2 rounded-2xl border border-[#2a1d13] bg-[#1a120c] p-6 hover:border-[#c87a1e]/40 transition-colors">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#f5a623]">
                    Eco-Cosmetics
                  </span>
                  <h4 className="font-apricot text-2xl font-bold text-[#f2e6d5]">Beeswax</h4>
                  <p className="text-xs leading-relaxed text-[#a39482]">
                    Pure, natural wax processed into clean, skin-nourishing salves, candles, and lip balms.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── FINALE CALLOUT: JOIN THE MOVEMENT ─── */}
        <section className={`${SECTION_CONTAINER} text-center`}>
          <div className="flex flex-col items-center gap-6 rounded-[28px] sm:rounded-[40px] lg:rounded-[48px] border border-[#ebd8b0] bg-gradient-to-br from-[#faecc9]/80 via-[#fdfaf1] to-[#faecc9]/60 p-8 sm:p-14 lg:p-20 shadow-lg">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#c87a1e]">
              Join The Movement
            </span>
            <h2 className={`${H2} max-w-2xl`}>Taste the untamed standard.</h2>
            <p className="max-w-xl text-sm sm:text-base font-medium leading-relaxed text-[#5c5043]">
              100% single-origin raw multifloral nectar in sleek tear-and-pour sticks. No sticky spoons, no industrial adulteration.
            </p>
            <div className="pt-2">
              <Link to="/shop" className={PRIMARY_BTN} style={{ color: '#ffffff', textDecoration: 'none' }}>
                <span>Explore Honey Sticks</span>
                <span className="transition-transform group-hover:translate-x-1">↗</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* ════════════════════════════════════════════════════════════ */}
      {/* 4. THE ICONIC GAPOO BEAR REVEAL CURTAIN                      */}
      {/* ════════════════════════════════════════════════════════════ */}
      <div className="pb-16 sm:pb-24">
        <AppleLogoReveal />
      </div>

      {/* ════════════════════════════════════════════════════════════ */}
      {/* 5. INTERACTIVE COA MODAL                                     */}
      {/* ════════════════════════════════════════════════════════════ */}
      <CertificateOfAnalysisModal isOpen={isCoaOpen} onClose={() => setIsCoaOpen(false)} />
    </div>
  );
}