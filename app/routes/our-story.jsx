import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { AppleLogoReveal } from '~/components/AppleLogoReveal';

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

/* ─── Shared layout tokens (one source of truth for spacing) ─── */
const SECTION = 'w-full max-w-5xl mx-auto';
const CARD_LIGHT =
  'flex flex-col gap-6 sm:gap-8 bg-white rounded-[28px] sm:rounded-[40px] lg:rounded-[48px] p-7 sm:p-12 lg:p-16 border border-[#eee4d4] shadow-[0_20px_50px_rgba(26,17,10,0.05)]';
const CHAPTER_PILL =
  'self-start inline-flex items-center gap-2 bg-[#faecc9] border border-[#e5cf9d] px-4 py-1.5 rounded-full text-xs font-bold text-[#8b5311] uppercase tracking-wider';
const H2 = 'font-apricot text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1a110a] leading-tight';
const LEAD = 'text-base sm:text-lg lg:text-xl text-[#3d3228] leading-relaxed font-medium';
const BODY = 'text-sm sm:text-base text-[#5c5043] leading-relaxed';
const DIVIDER_BLOCK = 'flex flex-col gap-6 sm:gap-8 pt-8 sm:pt-10 border-t border-[#f0e4d2]';
const SUB_CARD =
  'flex flex-col gap-2 p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-[#faf6ee] border border-[#ebdccb]';
const PRIMARY_BTN =
  'group inline-flex items-center justify-center gap-2.5 px-8 sm:px-10 py-4 rounded-full bg-gradient-to-r from-[#f5a623] to-[#d97706] hover:from-[#fbbf24] hover:to-[#ea580c] text-white text-xs sm:text-sm font-bold tracking-[0.16em] uppercase shadow-[0_12px_28px_rgba(200,122,30,0.35)] hover:shadow-[0_16px_36px_rgba(200,122,30,0.48)] transition-all duration-300 hover:scale-105 active:scale-95 no-underline';

function PrimaryCta() {
  return (
    <Link to="/shop" className={PRIMARY_BTN} style={{ color: '#ffffff', textDecoration: 'none' }}>
      <span>Explore Honey Sticks</span>
      <span className="transition-transform group-hover:translate-x-1">→</span>
    </Link>
  );
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay },
});

export default function OurStoryPage() {
  return (
    <div className="relative w-full min-h-screen overflow-clip bg-[#fdfaf1] text-[#1a110a] font-montserrat">
      {/* ─── HERO HEADER ─── */}
      <section className="relative z-10 w-full max-w-5xl mx-auto px-5 sm:px-8 lg:px-12 pt-20 sm:pt-28 lg:pt-32 pb-16 sm:pb-20 lg:pb-24">
        {/* Warm ambient glow */}
        <div className="pointer-events-none absolute top-1/2 left-1/2 -z-10 h-[360px] w-[700px] max-w-full -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse,rgba(245,166,35,0.22)_0%,transparent_70%)] blur-3xl" />

        {/* Mascot watermark */}
        <div className="pointer-events-none absolute right-0 top-4 -z-10 w-40 sm:w-56 select-none opacity-[0.04] mix-blend-multiply">
          <img src="/images/gapoo_bear_mascot_hd.png" alt="" className="h-auto w-full" />
        </div>

        <div className="flex flex-col items-center gap-6 sm:gap-8 text-center">
          {/* Pill badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2.5 rounded-full border border-[#e5cf9d] bg-gradient-to-r from-[#faecc9] to-[#fdecc4] px-5 py-2.5 text-xs font-bold text-[#8b5311] shadow-sm"
          >
            <img
              src="/images/golden_bee_clean.png"
              alt="Golden Bee"
              className="h-4 w-4 animate-bounce object-contain"
              style={{ animationDuration: '3s' }}
            />
            <span className="uppercase tracking-[0.2em]">The Story of Gapoo · Origin Archive</span>
          </motion.div>

          {/* Headline */}
          <motion.div {...fadeUp(0.1)} className="flex flex-col items-center gap-4">
            <h1 className="font-apricot max-w-4xl text-5xl sm:text-7xl lg:text-8xl font-bold leading-[0.96] tracking-tight text-[#1a110a]">
              The Hive{' '}
              <span className="bg-gradient-to-r from-[#c87a1e] via-[#e08920] to-[#b45309] bg-clip-text text-transparent">
                Awakening.
              </span>
            </h1>
            <div className="flex items-center justify-center gap-3">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#c87a1e]" />
              <span className="text-xs text-[#c87a1e]">✦</span>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#c87a1e]" />
            </div>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            {...fadeUp(0.2)}
            className="max-w-2xl text-base sm:text-lg lg:text-xl font-medium leading-relaxed text-[#5c5043]"
          >
            Born not in a corporate boardroom, but in the dirt and the hum of the hives during hands-on bee farming training sessions.
          </motion.p>

          {/* Provenance badges */}
          <motion.div
            {...fadeUp(0.25)}
            className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#8b5311]"
          >
            {[
              ['bg-[#10b981]', '100% Raw & Single-Origin'],
              ['bg-[#c87a1e]', 'Generational Indian Apiaries'],
              ['bg-[#10b981]', 'Zero Added Syrups'],
            ].map(([dot, label]) => (
              <span
                key={label}
                className="inline-flex items-center gap-1.5 rounded-full border border-[#ebd8b0] bg-white/70 px-3 py-1.5"
              >
                <span className={`h-1.5 w-1.5 rounded-full ${dot}`} /> {label}
              </span>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div {...fadeUp(0.3)} className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-2">
            <PrimaryCta />
            <a
              href="#chapter-01"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[#ebd8b0] bg-white/90 px-7 sm:px-9 py-4 text-xs sm:text-sm font-bold uppercase tracking-[0.16em] text-[#1a110a] no-underline shadow-sm transition-all duration-300 hover:scale-105 hover:border-[#c87a1e] hover:bg-white hover:shadow-md active:scale-95"
              style={{ textDecoration: 'none' }}
            >
              <span>Read The Story</span>
              <span className="text-sm">↓</span>
            </a>
          </motion.div>
        </div>
      </section>

      {/* ─── CHAPTERS: one column, consistent gap between every card ─── */}
      <main className="flex flex-col gap-10 sm:gap-14 lg:gap-20 px-5 sm:px-8 lg:px-12 pb-16 sm:pb-24">
        {/* CHAPTER 1 */}
        <section id="chapter-01" className={`${SECTION} scroll-mt-28`}>
          <div className={CARD_LIGHT}>
            <span className={CHAPTER_PILL}>Chapter 01 · The Hive Awakening</span>
            <h2 className={H2}>The Hive Awakening</h2>
            <p className={LEAD}>
              The seed for Gapoo was planted not in a corporate boardroom, but in the dirt and the hum of the hives during a hands-on bee farming training session. It blossomed from the simple, grounded concept of &ldquo;Garden+Pool&rdquo;—a vision to reconnect the modern adult wellness lifestyle with the untamed, natural bounty of the earth.
            </p>
            <p className={BODY}>
              As we worked alongside local Indian beekeepers, we uncovered a profound betrayal of consumer trust. India&apos;s commercial honey market is highly fragmented, with pure nectar passing through multiple aggregators where genuine batches easily get mixed with compromised syrups. The market is flooded with cheap rice, corn, and cane syrups specifically designed to bypass standard domestic purity tests.
            </p>

            {/* CSE findings */}
            <div className="flex flex-col gap-6 rounded-2xl sm:rounded-3xl border border-[#ebdccb] bg-[#faf5ec] p-6 sm:p-10">
              <p className="text-xs sm:text-sm leading-relaxed text-[#4a3e32]">
                A 2020 Centre for Science and Environment investigation revealed a heartbreaking reality: 77 percent of tested samples were adulterated with sugar syrups, and only 3 of 13 brands passed the internationally accepted NMR test. This race-to-the-bottom pricing doesn&apos;t just trick the consumer; it ruthlessly exploits the hardworking apiarists who harvest true nectar.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 border-t border-[#ebdccb] pt-6">
                <div className="flex items-center gap-4">
                  <span className="font-apricot shrink-0 text-3xl sm:text-4xl font-bold leading-none text-[#c87a1e]">77%</span>
                  <span className="text-xs font-semibold leading-snug text-[#5c5043]">
                    Tested samples adulterated with sugar syrups in CSE investigation
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-apricot shrink-0 text-3xl sm:text-4xl font-bold leading-none text-[#c87a1e]">3 of 13</span>
                  <span className="text-xs font-semibold leading-snug text-[#5c5043]">
                    Brands passed the internationally accepted NMR test
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CHAPTER 2 */}
        <section className={SECTION}>
          <div className={CARD_LIGHT}>
            <span className={CHAPTER_PILL}>Chapter 02 · The Gapoo Promise</span>
            <h2 className={H2}>The Gapoo Promise</h2>
            <p className={LEAD}>
              Gapoo was born from a frustrating realization: behind milk, honey has quietly become the most ignored and heavily adulterated commodity in the global consumer market. We watched consumers routinely prioritize cheap prices, risking their health because the alternative—investing in a massive, expensive jar of 100% pure honey—felt like too big of a financial gamble just to try it.
            </p>
            <p className={BODY}>
              Even when people did make the investment, traditional glass jars proved to be a messy, sticky, spill-prone hassle that trapped this incredible superfood in the kitchen cabinet. The biggest problem wasn&apos;t just the deceit; it was that true honey was stubbornly stuck as a cumbersome home product rather than an accessible, everyday wellness tool.
            </p>
            <p className={BODY}>
              Gapoo was created to strip away this deceit and inconvenience. By bypassing fragmented trader networks, we source 100% traceable, hive-to-bottle raw multifloral honey infused with flavours directly from local farmers and pack it into a sleek, mess-free stick format that travels effortlessly with you.
            </p>

            <div className={DIVIDER_BLOCK}>
              <h3 className="text-sm sm:text-base font-bold uppercase tracking-wider text-[#1a110a]">
                Beyond pure nectar, we craft individual botanical infusions for specific daily rituals:
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
                {[
                  ['text-[#15803d]', 'Cooling', 'Mint Honey', 'A clean, mindful sweetener providing cooling relief from the heat.'],
                  ['text-[#c2410c]', 'Spicy Kick', 'Chilly Honey', 'To add a bold, spicy culinary kick to your meals and snacks.'],
                  ['text-[#b45309]', 'Wellness', 'Ginger & Turmeric Honey', 'A potent, antioxidant-rich wellness blend for a natural immunity boost.'],
                ].map(([color, tag, name, desc]) => (
                  <div key={name} className={SUB_CARD}>
                    <span className={`text-xs font-bold uppercase tracking-wider ${color}`}>{tag}</span>
                    <h4 className="font-apricot text-2xl sm:text-3xl font-bold text-[#1a110a]">{name}</h4>
                    <p className="text-xs sm:text-sm leading-relaxed text-[#5c5043]">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CHAPTER 3 */}
        <section className={SECTION}>
          <div className={CARD_LIGHT}>
            <span className={CHAPTER_PILL}>Chapter 03 · Traceability &amp; Standards</span>
            <h2 className={H2}>The Indian Honey Fingerprint</h2>
            <p className={LEAD}>
              Our vision is fiercely protective of India&apos;s natural heritage. We are building the definitive Indian Honey Fingerprint System—mapping the botanical, chemical, functional, and physical markers of our nectar to elevate it to a premium global standard.
            </p>
            <p className={BODY}>
              Historically, Indian honey has faced global shipment rejections due to traces of antibiotics, heavy metals, and a lack of rigorous NMR testing, casting a shadow of &ldquo;guilt by association&rdquo; over our nation&apos;s true nectar. We are closing that gap by ensuring every batch is rigorously tested at FSSAI registered labs, accompanied by a Certificate of Analysis to guarantee zero adulteration, zero antibiotics, and zero heavy metals.
            </p>
            <p className={BODY}>
              We are determined to make Indian honey uniquely competitive, creating a place on the world map for the country not just for the monumental Taj Mahal, but for exporting world-class, naturally sourced honey.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 border-t border-[#f0e4d2] pt-8 sm:pt-10">
              <div className={SUB_CARD}>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#1a110a]">FSSAI Registered Labs</h4>
                <p className="text-xs sm:text-sm leading-relaxed text-[#5c5043]">
                  Accompanied by a Certificate of Analysis for every batch.
                </p>
              </div>
              <div className={SUB_CARD}>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#1a110a]">Purity Guarantee</h4>
                <p className="text-xs sm:text-sm leading-relaxed text-[#5c5043]">
                  Zero adulteration, zero antibiotics, and zero heavy metals.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CHAPTER 4 (dark) */}
        <section className={SECTION}>
          <div className="flex flex-col gap-6 sm:gap-8 rounded-[28px] sm:rounded-[40px] lg:rounded-[48px] border border-[#2e1d10] bg-[#140e0a] p-7 sm:p-12 lg:p-16 text-white shadow-[0_25px_60px_rgba(0,0,0,0.3)]">
            <span className="self-start inline-flex items-center gap-2 rounded-full border border-[#d4a373]/40 bg-[#2a1d13] px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#d4a373]">
              Chapter 04 · The True Power of the Hive
            </span>
            <h2 className="font-apricot text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-[#f2e6d5]">
              Beyond Honey: The True Power of the Hive
            </h2>
            <p className="text-base sm:text-lg lg:text-xl font-medium leading-relaxed text-[#d9cbb8]">
              Most people believe bees exist solely to forage honey and pollinate flowers, completely unaware of the miraculous, natural pharmacy hidden within the hive. Gapoo aims to change this narrative and introduce the general public to the vast, untapped potential of the bees&apos; labor.
            </p>
            <blockquote className="rounded-2xl sm:rounded-3xl border-l-4 border-[#c87a1e] bg-[#1c140d] p-6 sm:p-8 text-xs sm:text-sm leading-relaxed text-[#b8a896]">
              You may have heard the chilling quote often attributed to Albert Einstein: &ldquo;If the bee disappeared off the face of the Earth, man would only have four years left to live.&rdquo; While historians debate whether Einstein actually spoke those exact words, the scientific reality behind the claim is absolutely valid—without bees pollinating over a third of our global food supply, our ecosystems and agricultural survival would face catastrophic collapse.
            </blockquote>
            <p className="text-xs sm:text-sm leading-relaxed text-[#b8a896]">
              These tiny architects are profound scientific marvels. Did you know that a single worker bee will produce only about 1/12th of a teaspoon of honey in her entire lifetime? Or that bees generate an invisible electrostatic charge as they fly, acting like a literal magnet to pull pollen off flowers before they even touch the petals? Every single drop of the hive&apos;s yield is precious.
            </p>

            <div className="flex flex-col gap-6 sm:gap-8 border-t border-[#2a1d13] pt-8 sm:pt-10">
              <div className="flex max-w-2xl flex-col gap-2">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#d4a373]">Coming Soon</span>
                <p className="text-xs sm:text-sm leading-relaxed text-[#d9cbb8]">
                  To honor this incredible insect and empower our farmers to scale beyond basic liquid honey, Gapoo is expanding. Coming soon to both the everyday consumable market and the B2B manufacturing sector, we will introduce the hive&apos;s highest-value finishing items:
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                {[
                  ['Dietary Superfood', 'Bee Pollen', 'A high-protein, nutrient-dense dietary superfood utilized as a natural energy booster.'],
                  ['Hive Defense', 'Propolis', 'The hive’s “bee glue,” acting as a raw, natural antibiotic defense for immune support and antimicrobial oral care.'],
                  ['Cellular Superfood', 'Royal Jelly', 'A highly-prized cellular superfood utilized in premium anti-aging and fertility health supplements.'],
                  ['Eco-Friendly', 'Beeswax', 'A natural, eco-friendly wax processed into skin-nourishing cosmetics, salves, and lip balms.'],
                ].map(([tag, name, desc]) => (
                  <div key={name} className="flex flex-col gap-2 rounded-2xl border border-[#2a1d13] bg-[#1a120c] p-6">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#f5a623]">{tag}</span>
                    <h4 className="font-apricot text-2xl font-bold text-[#f2e6d5]">{name}</h4>
                    <p className="text-xs leading-relaxed text-[#a39482]">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FINALE CALLOUT */}
        <section className={`${SECTION} text-center`}>
          <div className="flex flex-col items-center gap-6 rounded-[28px] sm:rounded-[40px] lg:rounded-[48px] border border-[#ebd8b0] bg-gradient-to-br from-[#faecc9]/80 via-[#fdfaf1] to-[#faecc9]/60 p-8 sm:p-14 lg:p-20 shadow-lg">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#c87a1e]">Join The Movement</span>
            <h2 className={`${H2} max-w-2xl`}>Taste the untamed standard.</h2>
            <p className="max-w-xl text-sm sm:text-base font-medium leading-relaxed text-[#5c5043]">
              100% single-origin raw nectar in sleek tear-and-pour sticks. No sticky spoons, no industrial adulteration.
            </p>
            <div className="pt-2">
              <PrimaryCta />
            </div>
          </div>
        </section>
      </main>

      {/* ─── MASCOT LOGO FINALE ─── */}
      <div className="pb-16 sm:pb-24">
        <AppleLogoReveal />
      </div>
    </div>
  );
}