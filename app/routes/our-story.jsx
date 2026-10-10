import { Link } from 'react-router';
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

export default function OurStoryPage() {
  return (
    <div className="bg-[#fdfaf1] text-[#1a110a] font-montserrat min-h-screen relative w-full overflow-clip">
      {/* ─── HERO HEADER ─── */}
      <section className="relative pt-20 sm:pt-28 lg:pt-36 pb-16 sm:pb-24 px-6 sm:px-8 lg:px-12 max-w-5xl mx-auto text-center space-y-6">
        <div className="inline-flex items-center gap-2 bg-[#faecc9] border border-[#e5cf9d] px-4 py-2 rounded-full text-xs font-bold text-[#8b5311] shadow-2xs">
          <img
            src="/images/golden_bee_clean.png"
            alt="Golden Bee"
            className="w-3.5 h-3.5 object-contain"
          />
          <span className="uppercase tracking-wider">The Story of Gapoo</span>
        </div>

        <h1 className="font-apricot text-5xl sm:text-6xl lg:text-7xl font-bold text-[#1a110a] leading-[1.02] tracking-tight max-w-4xl mx-auto">
          The Hive Awakening
        </h1>

        <p className="text-base sm:text-lg text-[#5c5043] leading-relaxed max-w-2xl mx-auto font-medium">
          Born not in a corporate boardroom, but in the dirt and the hum of the hives during a hands-on bee farming training session.
        </p>

        <div className="pt-2 flex items-center justify-center gap-4">
          <Link
            to="/shop"
            className="inline-flex items-center justify-center bg-[#1a110a] hover:bg-[#2e1d10] text-white px-8 py-3.5 rounded-full text-sm font-bold tracking-wide shadow-md transition-all hover:scale-105 active:scale-95"
          >
            Explore Honey Sticks
          </Link>
        </div>
      </section>

      {/* ─── CHAPTER 1: THE HIVE AWAKENING ─── */}
      <section className="py-8 sm:py-12 px-6 sm:px-8 lg:px-12 max-w-5xl mx-auto">
        <div className="bg-white rounded-[32px] sm:rounded-[44px] p-8 sm:p-12 lg:p-16 border border-[#eee4d4] shadow-sm space-y-6 relative overflow-hidden">
          <div className="inline-flex items-center gap-2 bg-[#faecc9] border border-[#e5cf9d] px-4 py-1.5 rounded-full text-xs font-bold text-[#8b5311] uppercase tracking-wider shadow-2xs">
            <span>Chapter 01 · The Hive Awakening</span>
          </div>

          <h2 className="font-apricot text-4xl sm:text-5xl font-bold text-[#1a110a] leading-tight">
            The Hive Awakening
          </h2>

          <p className="text-base sm:text-lg text-[#3d3228] leading-relaxed font-medium">
            The seed for Gapoo was planted not in a corporate boardroom, but in the dirt and the hum of the hives during a hands-on bee farming training session. It blossomed from the simple, grounded concept of &ldquo;Garden+Pool&rdquo;—a vision to reconnect the modern adult wellness lifestyle with the untamed, natural bounty of the earth.
          </p>

          <p className="text-sm sm:text-base text-[#5c5043] leading-relaxed">
            As we worked alongside local Indian beekeepers, we uncovered a profound betrayal of consumer trust. India&apos;s commercial honey market is highly fragmented, with pure nectar passing through multiple aggregators where genuine batches easily get mixed with compromised syrups. The market is flooded with cheap rice, corn, and cane syrups specifically designed to bypass standard domestic purity tests.
          </p>

          {/* CSE Report findings */}
          <div className="p-6 sm:p-7 rounded-2xl bg-[#faf5ec] border border-[#ebdccb] space-y-4">
            <p className="text-xs sm:text-sm text-[#4a3e32] leading-relaxed">
              A 2020 Centre for Science and Environment investigation revealed a heartbreaking reality: 77 percent of tested samples were adulterated with sugar syrups, and only 3 of 13 brands passed the internationally accepted NMR test. This race-to-the-bottom pricing doesn&apos;t just trick the consumer; it ruthlessly exploits the hardworking apiarists who harvest true nectar.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-[#ebdccb]">
              <div className="flex items-center gap-3">
                <span className="font-apricot text-3xl sm:text-4xl font-bold text-[#c87a1e] leading-none">
                  77%
                </span>
                <span className="text-xs font-semibold text-[#5c5043] leading-tight">
                  Tested samples adulterated with sugar syrups in CSE investigation
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-apricot text-3xl sm:text-4xl font-bold text-[#c87a1e] leading-none">
                  3 of 13
                </span>
                <span className="text-xs font-semibold text-[#5c5043] leading-tight">
                  Brands passed the internationally accepted NMR test
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CHAPTER 2: THE GAPOO PROMISE ─── */}
      <section className="py-8 sm:py-12 px-6 sm:px-8 lg:px-12 max-w-5xl mx-auto">
        <div className="bg-white rounded-[32px] sm:rounded-[44px] p-8 sm:p-12 lg:p-16 border border-[#eee4d4] shadow-sm space-y-8">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 bg-[#faecc9] border border-[#e5cf9d] px-4 py-1.5 rounded-full text-xs font-bold text-[#8b5311] uppercase tracking-wider shadow-2xs">
              <span>Chapter 02 · The Gapoo Promise</span>
            </div>

            <h2 className="font-apricot text-4xl sm:text-5xl font-bold text-[#1a110a] leading-tight">
              The Gapoo Promise
            </h2>

            <p className="text-base sm:text-lg text-[#3d3228] leading-relaxed font-medium">
              Gapoo was born from a frustrating realization: behind milk, honey has quietly become the most ignored and heavily adulterated commodity in the global consumer market. We watched consumers routinely prioritize cheap prices, risking their health because the alternative—investing in a massive, expensive jar of 100% pure honey—felt like too big of a financial gamble just to try it.
            </p>

            <p className="text-sm sm:text-base text-[#5c5043] leading-relaxed">
              Even when people did make the investment, traditional glass jars proved to be a messy, sticky, spill-prone hassle that trapped this incredible superfood in the kitchen cabinet. The biggest problem wasn&apos;t just the deceit; it was that true honey was stubbornly stuck as a cumbersome home product rather than an accessible, everyday wellness tool.
            </p>

            <p className="text-sm sm:text-base text-[#5c5043] leading-relaxed">
              Gapoo was created to strip away this deceit and inconvenience. By bypassing fragmented trader networks, we source 100% traceable, hive-to-bottle raw multifloral honey infused with flavours directly from local farmers and pack it into a sleek, mess-free stick format that travels effortlessly with you.
            </p>
          </div>

          <div className="pt-4 border-t border-[#f0e4d2] space-y-4">
            <h3 className="text-sm sm:text-base font-bold text-[#1a110a] uppercase tracking-wider">
              Beyond pure nectar, we craft individual botanical infusions for specific daily rituals:
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
              <div className="p-6 rounded-2xl bg-[#faf6ee] border border-[#ebdccb] space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#15803d] block">
                  Cooling
                </span>
                <h4 className="font-apricot text-2xl font-bold text-[#1a110a]">
                  Mint Honey
                </h4>
                <p className="text-xs sm:text-sm text-[#5c5043] leading-relaxed">
                  A clean, mindful sweetener providing cooling relief from the heat.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#faf6ee] border border-[#ebdccb] space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#c2410c] block">
                  Spicy Kick
                </span>
                <h4 className="font-apricot text-2xl font-bold text-[#1a110a]">
                  Chilly Honey
                </h4>
                <p className="text-xs sm:text-sm text-[#5c5043] leading-relaxed">
                  To add a bold, spicy culinary kick to your meals and snacks.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#faf6ee] border border-[#ebdccb] space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#b45309] block">
                  Wellness
                </span>
                <h4 className="font-apricot text-2xl font-bold text-[#1a110a]">
                  Ginger &amp; Turmeric Honey
                </h4>
                <p className="text-xs sm:text-sm text-[#5c5043] leading-relaxed">
                  A potent, antioxidant-rich wellness blend for a natural immunity boost.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CHAPTER 3: THE INDIAN HONEY FINGERPRINT ─── */}
      <section className="py-8 sm:py-12 px-6 sm:px-8 lg:px-12 max-w-5xl mx-auto">
        <div className="bg-white rounded-[32px] sm:rounded-[44px] p-8 sm:p-12 lg:p-16 border border-[#eee4d4] shadow-sm space-y-6">
          <div className="inline-flex items-center gap-2 bg-[#faecc9] border border-[#e5cf9d] px-4 py-1.5 rounded-full text-xs font-bold text-[#8b5311] uppercase tracking-wider shadow-2xs">
            <span>Chapter 03 · Traceability &amp; Standards</span>
          </div>

          <h2 className="font-apricot text-4xl sm:text-5xl font-bold text-[#1a110a] leading-tight">
            The Indian Honey Fingerprint
          </h2>

          <p className="text-base sm:text-lg text-[#3d3228] leading-relaxed font-medium">
            Our vision is fiercely protective of India&apos;s natural heritage. We are building the definitive Indian Honey Fingerprint System—mapping the botanical, chemical, functional, and physical markers of our nectar to elevate it to a premium global standard.
          </p>

          <p className="text-sm sm:text-base text-[#5c5043] leading-relaxed">
            Historically, Indian honey has faced global shipment rejections due to traces of antibiotics, heavy metals, and a lack of rigorous NMR testing, casting a shadow of &ldquo;guilt by association&rdquo; over our nation&apos;s true nectar. We are closing that gap by ensuring every batch is rigorously tested at FSSAI registered labs, accompanied by a Certificate of Analysis to guarantee zero adulteration, zero antibiotics, and zero heavy metals.
          </p>

          <p className="text-sm sm:text-base text-[#5c5043] leading-relaxed">
            We are determined to make Indian honey uniquely competitive, creating a place on the world map for the country not just for the monumental Taj Mahal, but for exporting world-class, naturally sourced honey.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#f0e4d2]">
            <div className="p-4 rounded-xl bg-[#faf6ee] border border-[#ebdccb]">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#1a110a] mb-1">
                FSSAI Registered Labs
              </h4>
              <p className="text-xs text-[#5c5043]">
                Accompanied by a Certificate of Analysis for every batch.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#faf6ee] border border-[#ebdccb]">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#1a110a] mb-1">
                Purity Guarantee
              </h4>
              <p className="text-xs text-[#5c5043]">
                Zero adulteration, zero antibiotics, and zero heavy metals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CHAPTER 4: BEYOND HONEY: THE TRUE POWER OF THE HIVE ─── */}
      <section className="py-8 sm:py-12 px-6 sm:px-8 lg:px-12 max-w-5xl mx-auto mb-16">
        <div className="bg-[#140e0a] text-white rounded-[32px] sm:rounded-[44px] p-8 sm:p-12 lg:p-16 border border-[#2e1d10] shadow-[0_25px_60px_rgba(0,0,0,0.25)] space-y-10 relative overflow-hidden">
          <div className="space-y-6 relative z-10">
            <div className="inline-flex items-center gap-2 bg-[#2a1d13] border border-[#d4a373]/40 px-4 py-1.5 rounded-full text-xs font-bold text-[#d4a373] uppercase tracking-wider">
              <span>Chapter 04 · The True Power of the Hive</span>
            </div>

            <h2 className="font-apricot text-4xl sm:text-5xl font-bold text-[#f2e6d5] leading-tight">
              Beyond Honey: The True Power of the Hive
            </h2>

            <p className="text-base sm:text-lg text-[#d9cbb8] leading-relaxed font-medium">
              Most people believe bees exist solely to forage honey and pollinate flowers, completely unaware of the miraculous, natural pharmacy hidden within the hive. Gapoo aims to change this narrative and introduce the general public to the vast, untapped potential of the bees&apos; labor.
            </p>

            <blockquote className="p-5 rounded-2xl bg-[#1c140d] border-l-4 border-[#c87a1e] text-xs sm:text-sm text-[#b8a896] leading-relaxed">
              You may have heard the chilling quote often attributed to Albert Einstein: &ldquo;If the bee disappeared off the face of the Earth, man would only have four years left to live.&rdquo; While historians debate whether Einstein actually spoke those exact words, the scientific reality behind the claim is absolutely valid—without bees pollinating over a third of our global food supply, our ecosystems and agricultural survival would face catastrophic collapse.
            </blockquote>

            <p className="text-xs sm:text-sm text-[#b8a896] leading-relaxed">
              These tiny architects are profound scientific marvels. Did you know that a single worker bee will produce only about 1/12th of a teaspoon of honey in her entire lifetime? Or that bees generate an invisible electrostatic charge as they fly, acting like a literal magnet to pull pollen off flowers before they even touch the petals? Every single drop of the hive&apos;s yield is precious.
            </p>
          </div>

          <div className="pt-6 border-t border-[#2a1d13] space-y-6 relative z-10">
            <div className="max-w-2xl">
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#d4a373] block mb-1">
                Coming Soon
              </span>
              <p className="text-xs sm:text-sm text-[#d9cbb8] leading-relaxed">
                To honor this incredible insect and empower our farmers to scale beyond basic liquid honey, Gapoo is expanding. Coming soon to both the everyday consumable market and the B2B manufacturing sector, we will introduce the hive&apos;s highest-value finishing items:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-[#1a120c] border border-[#2a1d13] space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#f5a623] block">
                  Dietary Superfood
                </span>
                <h4 className="font-apricot text-2xl font-bold text-[#f2e6d5]">
                  Bee Pollen
                </h4>
                <p className="text-xs text-[#a39482] leading-relaxed">
                  A high-protein, nutrient-dense dietary superfood utilized as a natural energy booster.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#1a120c] border border-[#2a1d13] space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#f5a623] block">
                  Hive Defense
                </span>
                <h4 className="font-apricot text-2xl font-bold text-[#f2e6d5]">
                  Propolis
                </h4>
                <p className="text-xs text-[#a39482] leading-relaxed">
                  The hive&apos;s &ldquo;bee glue,&rdquo; acting as a raw, natural antibiotic defense for immune support and antimicrobial oral care.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#1a120c] border border-[#2a1d13] space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#f5a623] block">
                  Cellular Superfood
                </span>
                <h4 className="font-apricot text-2xl font-bold text-[#f2e6d5]">
                  Royal Jelly
                </h4>
                <p className="text-xs text-[#a39482] leading-relaxed">
                  A highly-prized cellular superfood utilized in premium anti-aging and fertility health supplements.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#1a120c] border border-[#2a1d13] space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#f5a623] block">
                  Eco-Friendly
                </span>
                <h4 className="font-apricot text-2xl font-bold text-[#f2e6d5]">
                  Beeswax
                </h4>
                <p className="text-xs text-[#a39482] leading-relaxed">
                  A natural, eco-friendly wax processed into skin-nourishing cosmetics, salves, and lip balms.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── MASCOT LOGO FINALE ─── */}
      <AppleLogoReveal />
    </div>
  );
}
