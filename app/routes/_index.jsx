import { useState } from 'react';
import { Await, useLoaderData, Link } from 'react-router';
import { Suspense } from 'react';
import { CartForm } from '@shopify/hydrogen';
import { useAside } from '~/components/Aside';

/**
 * @type {Route.MetaFunction}
 */
export const meta = () => {
  return [
    { title: 'Gapoo | Honey, finally without the mess' },
    {
      name: 'description',
      content:
        'Gapoo honey sticks pack real honey infused with refreshing mint into a tear-and-pour stick. Naturally sweetened, no spoons, no sticky jars.',
    },
  ];
};

/**
 * @param {Route.LoaderArgs} args
 */
export async function loader(args) {
  const deferredData = loadDeferredData(args);
  const criticalData = await loadCriticalData(args);
  return { ...deferredData, ...criticalData };
}

/**
 * Load critical data
 * @param {Route.LoaderArgs}
 */
async function loadCriticalData({ context }) {
  const [{ collections }, productsData] = await Promise.all([
    context.storefront
      .query(FEATURED_COLLECTION_QUERY)
      .catch(() => ({ collections: { nodes: [] } })),
    context.storefront
      .query(STORE_PRODUCTS_QUERY)
      .catch(() => null),
  ]);

  return {
    featuredCollection: collections?.nodes?.[0] || null,
    storeProducts: productsData?.products?.nodes || [],
  };
}

/**
 * Load deferred data
 * @param {Route.LoaderArgs}
 */
function loadDeferredData({ context }) {
  const recommendedProducts = context.storefront
    .query(RECOMMENDED_PRODUCTS_QUERY)
    .catch((error) => {
      console.error(error);
      return null;
    });

  return {
    recommendedProducts,
  };
}

export default function Homepage() {
  const data = useLoaderData();
  const { open } = useAside();
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState('');
  const storeProducts = data?.storeProducts || [];
  const defaultVariantId = storeProducts[0]?.variants?.nodes?.[0]?.id;

  const [selectedQty, setSelectedQty] = useState(1);
  const [heroImage, setHeroImage] = useState('/images/gapoo_minted_studio_hero.jpg');

  // The 3 lifestyle moments using pure, high-res photography without baked-in text
  const moments = [
    {
      step: '01',
      title: 'Stir into tea',
      description: 'One stick = one perfectly sweet cup. No spoon, no sticky jar.',
      image: '/images/moment_tea_clean.jpg',
    },
    {
      step: '02',
      title: 'Top breakfast',
      description: 'Drizzle on oats, yogurt or toast. Portion-controlled sweetness.',
      image: '/images/moment_breakfast_clean.jpg',
    },
    {
      step: '03',
      title: 'Pocket energy',
      description: 'Slip a stick in your bag for hikes, runs or the afternoon recharge.',
      image: '/images/moment_pocket_clean.jpg',
    },
  ];

  return (
    <div className="bg-[#fdfaf1] text-[#2b241d] overflow-hidden">
      {/* ============================================================ */}
      {/* 1. HERO SECTION & TOP PRODUCT DISPLAY WITH ADD TO CART        */}
      {/* ============================================================ */}
      <section id="buy-now" className="relative pt-8 pb-16 md:pt-14 md:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-visible scroll-mt-24">
        {/* Anchor for any header shop link */}
        <span id="shop" className="absolute -top-24 left-0 pointer-events-none" />

        {/* Warm Ambient Radial Honey Glow */}
        <div
          className="absolute inset-0 -z-10 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 70% 60% at 70% 45%, #faebc9 0%, #fcf4e5 50%, #fdfaf1 100%)',
          }}
        />

        {/* Floating Golden Hexagons */}
        <svg
          className="absolute -top-4 -left-6 sm:-top-8 sm:-left-10 w-24 sm:w-32 h-auto pointer-events-none z-0 drop-shadow-sm opacity-85"
          viewBox="0 0 120 138"
          fill="none"
        >
          <defs>
            <linearGradient id="hexGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fce7a8" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#f5b94e" stopOpacity="0.75" />
            </linearGradient>
          </defs>
          <polygon
            points="60,3 117,36 117,102 60,135 3,102 3,36"
            fill="url(#hexGrad1)"
          />
        </svg>

        <svg
          className="absolute bottom-2 left-1/3 sm:left-[35%] w-14 sm:w-18 h-auto pointer-events-none z-0 drop-shadow-sm opacity-80"
          viewBox="0 0 120 138"
          fill="none"
        >
          <defs>
            <linearGradient id="hexGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fae298" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#f5b442" stopOpacity="0.7" />
            </linearGradient>
          </defs>
          <polygon
            points="60,3 117,36 117,102 60,135 3,102 3,36"
            fill="url(#hexGrad2)"
          />
        </svg>

        <svg
          className="absolute top-1/3 -right-4 sm:-right-8 w-20 sm:w-28 h-auto pointer-events-none z-0 drop-shadow-sm opacity-75"
          viewBox="0 0 120 138"
          fill="none"
        >
          <defs>
            <linearGradient id="hexGrad3" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fdeaba" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#f7be54" stopOpacity="0.75" />
            </linearGradient>
          </defs>
          <polygon
            points="60,3 117,36 117,102 60,135 3,102 3,36"
            fill="url(#hexGrad3)"
          />
        </svg>

        {/* Faint Gapoo Bear Line-art Mascot Watermark */}
        <img
          src="/images/gapoo_bear_mascot_clean.png"
          alt=""
          className="absolute -bottom-6 left-6 w-80 h-auto opacity-[0.03] pointer-events-none select-none z-0"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center relative z-10">
          {/* Left Column: Copy & Quick Purchase */}
          <div className="lg:col-span-6 space-y-6">
            {/* Pill Badge matching physical box */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#faecc9]/80 border border-[#e8cd8c] text-xs font-semibold text-[#8b5311] tracking-wider uppercase font-montserrat">
              <span className="w-2 h-2 rounded-full bg-[#d97706] animate-pulse" />
              <span>Minted Goodness · Easy Single-Serve Pack</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-apricot text-5xl sm:text-6xl lg:text-[68px] leading-[1.08] font-bold text-[#1a1612] tracking-tight">
              Honey, finally<br className="hidden sm:inline" /> without the mess.
            </h1>

            {/* Subheading compliant with legal mandate */}
            <p className="text-base sm:text-lg text-[#5c5247] leading-relaxed max-w-xl font-montserrat">
              Gapoo honey sticks pack real honey infused with natural mint extract into a convenient tear-and-pour stick. No sticky jars. No spoons. Just snap, squeeze, and sip.
            </p>

            {/* Packaging Feature Badges Removed */}

            {/* Hero Quick Purchase Action */}
            <div className="pt-2 font-montserrat flex flex-wrap items-center gap-4">
              {defaultVariantId ? (
                <CartForm
                  route="/cart"
                  inputs={{
                    lines: [
                      {
                        merchandiseId: defaultVariantId,
                        quantity: selectedQty,
                      },
                    ],
                  }}
                  action={CartForm.ACTIONS.LinesAdd}
                >
                  {(fetcher) => (
                    <button
                      type="submit"
                      onClick={() => open('cart')}
                      disabled={fetcher.state !== 'idle'}
                      className="inline-flex items-center justify-center gap-2 bg-[#f5a623] hover:bg-[#e09419] text-[#1a1612] px-8 py-3.5 rounded-full text-sm font-bold tracking-wide shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer disabled:opacity-60"
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                        <line x1="3" y1="6" x2="21" y2="6" />
                        <path d="M16 10a4 4 0 01-8 0" />
                      </svg>
                      <span>
                        {fetcher.state !== 'idle'
                          ? 'Adding...'
                          : `Add to Cart · ₹${199 * selectedQty}`}
                      </span>
                      <span className="text-base leading-none">→</span>
                    </button>
                  )}
                </CartForm>
              ) : (
                <button
                  type="button"
                  onClick={() => open('cart')}
                  className="inline-flex items-center justify-center gap-2 bg-[#f5a623] hover:bg-[#e09419] text-[#1a1612] px-8 py-3.5 rounded-full text-sm font-bold tracking-wide shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <span>Add to Cart · ₹199</span>
                  <span className="text-base leading-none">→</span>
                </button>
              )}

              <a
                href="#ritual"
                className="inline-flex items-center justify-center bg-white/90 hover:bg-white text-[#1a1612] border border-[#d6cbba] hover:border-[#18181b] px-6 py-3.5 rounded-full text-sm font-semibold tracking-wide transition-all shadow-xs hover:shadow cursor-pointer"
              >
                Daily Ritual
              </a>
            </div>

            {/* Trust Markers */}
            <div className="flex items-center gap-4 pt-2 text-xs font-medium text-[#6e6152] font-montserrat">
              <div className="flex items-center gap-1.5">
                <span className="text-[#f5a623] text-sm">★</span>
                <span className="font-semibold text-[#1a1612]">Snap · Squeeze · Sip</span>
              </div>
              <span className="text-[#d0c4b2]">|</span>
              <div>10 Honey Sticks (12g Pack)</div>
              <span className="text-[#d0c4b2]">|</span>
              <div>Free shipping over ₹500</div>
            </div>
          </div>

          {/* Right Column: AI-Polished Premium Commercial Product Display WITH Top Add-to-Cart */}
          <div className="lg:col-span-6 relative flex flex-col items-center lg:items-end">
            <div className="relative w-full max-w-lg lg:max-w-none rounded-[32px] bg-white border border-[#eae0d5] shadow-[0_20px_50px_rgba(0,0,0,0.08)] p-6 sm:p-8 flex flex-col overflow-hidden group">

              {/* 1. Top Header Bar: Product Title & Price */}
              <div className="flex items-center justify-between gap-3 pb-4 mb-4 border-b border-[#f4eee6] relative z-20 font-montserrat">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#10b981] animate-pulse shadow-[0_0_8px_#10b981]" />
                  <span className="text-sm font-bold text-[#1a1612] tracking-wide uppercase">
                    Minted Goodness · 10 Sticks
                  </span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="font-apricot text-3xl font-bold text-[#1a1612]">₹{199 * selectedQty}</span>
                </div>
              </div>

              {/* 2. Functional Add to Cart Bar ON TOP OF the Display Image */}
              <div className="pb-4 mb-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 relative z-20 font-montserrat">
                {/* Quantity Selector */}
                <div className="flex items-center justify-between sm:justify-center border border-[#e4d8c8] bg-[#fdfaf1] rounded-full px-4 py-2 shadow-inner">
                  <button
                    type="button"
                    onClick={() => setSelectedQty(Math.max(1, selectedQty - 1))}
                    className="w-8 h-8 flex items-center justify-center text-[#736555] hover:text-[#1a1612] hover:bg-white rounded-full font-bold text-lg cursor-pointer select-none transition-colors"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="w-10 text-center font-bold text-base text-[#1a1612]">
                    {selectedQty}
                  </span>
                  <button
                    type="button"
                    onClick={() => setSelectedQty(selectedQty + 1)}
                    className="w-8 h-8 flex items-center justify-center text-[#736555] hover:text-[#1a1612] hover:bg-white rounded-full font-bold text-lg cursor-pointer select-none transition-colors"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                {/* Direct Add to Cart Button */}
                {defaultVariantId ? (
                  <CartForm
                    route="/cart"
                    inputs={{
                      lines: [
                        {
                          merchandiseId: defaultVariantId,
                          quantity: selectedQty,
                        },
                      ],
                    }}
                    action={CartForm.ACTIONS.LinesAdd}
                  >
                    {(fetcher) => (
                      <button
                        type="submit"
                        onClick={() => open('cart')}
                        disabled={fetcher.state !== 'idle'}
                        className="flex-1 w-full bg-gradient-to-r from-[#18181b] to-[#27272a] hover:from-[#27272a] hover:to-[#3f3f46] active:scale-[0.98] text-white px-8 py-3.5 rounded-full text-sm font-bold tracking-wide shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-3 cursor-pointer disabled:opacity-60"
                      >
                        <svg className="w-5 h-5 text-[#f5a623]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                          <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                          <line x1="3" y1="6" x2="21" y2="6" />
                          <path d="M16 10a4 4 0 01-8 0" />
                        </svg>
                        <span>
                          {fetcher.state !== 'idle'
                            ? 'Adding to Cart...'
                            : `Add to Cart · ₹${199 * selectedQty}`}
                        </span>
                      </button>
                    )}
                  </CartForm>
                ) : (
                  <button
                    type="button"
                    onClick={() => open('cart')}
                    className="flex-1 w-full bg-gradient-to-r from-[#18181b] to-[#27272a] hover:from-[#27272a] hover:to-[#3f3f46] text-white px-8 py-3.5 rounded-full text-sm font-bold tracking-wide shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-3 cursor-pointer"
                  >
                    <span>Add to Cart · ₹199</span>
                  </button>
                )}
              </div>

              {/* 3. Realistic AI Studio Commercial Product Display Image */}
              <div className="relative rounded-[22px] overflow-hidden bg-[#fdfaf1] aspect-[4/3] sm:aspect-[16/11] flex items-center justify-center p-1.5 shadow-inner">
                <img
                  src={heroImage}
                  alt="Gapoo Minted Goodness 10 Honey Sticks Box and Sachets"
                  className="w-full h-full object-cover rounded-[18px] transition-transform duration-700 group-hover:scale-105"
                />

                {/* Floating badge removed */}

                {/* Image angle switcher */}
                <div className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-white/95 backdrop-blur-md p-1 rounded-full shadow-md border border-[#e8cd8c]/60">
                  <button
                    type="button"
                    onClick={() => setHeroImage('/images/gapoo_minted_studio_hero.jpg')}
                    className={`px-3 py-1 rounded-full text-[10px] font-bold transition-all cursor-pointer ${heroImage === '/images/gapoo_minted_studio_hero.jpg'
                      ? 'bg-[#18181b] text-white shadow-xs'
                      : 'text-[#736555] hover:text-[#1a1612]'
                      }`}
                  >
                    Studio Table
                  </button>
                  <button
                    type="button"
                    onClick={() => setHeroImage('/images/gapoo_minted_clean_pack.jpg')}
                    className={`px-3 py-1 rounded-full text-[10px] font-bold transition-all cursor-pointer ${heroImage === '/images/gapoo_minted_clean_pack.jpg'
                      ? 'bg-[#18181b] text-white shadow-xs'
                      : 'text-[#736555] hover:text-[#1a1612]'
                      }`}
                  >
                    Packshot
                  </button>
                </div>
              </div>

              {/* Packaging Sub-strip removed */}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 2. YOUR DAILY RITUAL (BROUGHT UP DIRECTLY BELOW HERO)        */}
      {/* ============================================================ */}
      <section id="ritual" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20 relative">
        <span id="how-to-use" className="absolute -top-24 left-0 pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs font-bold tracking-widest text-[#c87a1e] uppercase font-montserrat">
                Your Daily Ritual
              </span>
              <span className="text-[#d0c4b2]">·</span>
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8b5311] font-montserrat">
                <img
                  src="/images/golden_bee_clean.png"
                  alt="Golden Bee"
                  className="w-3.5 h-3.5 object-contain"
                />
                <span>Snap · Squeeze · Sip</span>
              </div>
            </div>
            <h2 className="font-apricot text-4xl sm:text-5xl font-bold text-[#1a1612]">
              From first sip to evening unwind.
            </h2>
          </div>

          {/* Packaging Fun Fact Badge */}
          <div className="inline-flex items-center gap-2 bg-[#faecc9]/90 border border-[#e8cd8c] px-4 py-2 rounded-full text-xs font-semibold text-[#8b5311] font-montserrat shrink-0 shadow-2xs">
            <span className="text-base">🐝</span>
            <span>Fun fact: What is a bee's blood type? <strong>Bee Positive!</strong></span>
          </div>
        </div>

        {/* 5-step Daily Timeline Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 font-montserrat mb-12">
          <div className="p-4 rounded-2xl bg-white border border-[#eee6d6] shadow-xs hover:border-[#f5a623] hover:shadow-md transition-all group">
            <span className="text-xs font-bold text-[#c87a1e] block font-mono">06:30</span>
            <h4 className="font-bold text-sm text-[#1a1612] mt-1 group-hover:text-[#c87a1e] transition-colors">Morning Brew</h4>
            <p className="text-xs text-[#736555] mt-1.5 leading-relaxed">Stir into warm lemon water, green tea or your morning brew.</p>
          </div>
          <div className="p-4 rounded-2xl bg-white border border-[#eee6d6] shadow-xs hover:border-[#f5a623] hover:shadow-md transition-all group">
            <span className="text-xs font-bold text-[#c87a1e] block font-mono">11:00</span>
            <h4 className="font-bold text-sm text-[#1a1612] mt-1 group-hover:text-[#c87a1e] transition-colors">Mid-work Fuel</h4>
            <p className="text-xs text-[#736555] mt-1.5 leading-relaxed">Quick natural energy hit during back-to-back work calls.</p>
          </div>
          <div className="p-4 rounded-2xl bg-white border border-[#eee6d6] shadow-xs hover:border-[#f5a623] hover:shadow-md transition-all group">
            <span className="text-xs font-bold text-[#c87a1e] block font-mono">14:00</span>
            <h4 className="font-bold text-sm text-[#1a1612] mt-1 group-hover:text-[#c87a1e] transition-colors">Post-Lunch</h4>
            <p className="text-xs text-[#736555] mt-1.5 leading-relaxed">Drizzle on fresh fruit bowls, Greek yogurt or rolled oats.</p>
          </div>
          <div className="p-4 rounded-2xl bg-white border border-[#eee6d6] shadow-xs hover:border-[#f5a623] hover:shadow-md transition-all group">
            <span className="text-xs font-bold text-[#c87a1e] block font-mono">17:30</span>
            <h4 className="font-bold text-sm text-[#1a1612] mt-1 group-hover:text-[#c87a1e] transition-colors">Pre-Workout</h4>
            <p className="text-xs text-[#736555] mt-1.5 leading-relaxed">Clean natural fuel before running, gym workouts, or cycling.</p>
          </div>
          <div className="p-4 rounded-2xl bg-white border border-[#eee6d6] shadow-xs hover:border-[#f5a623] hover:shadow-md transition-all group">
            <span className="text-xs font-bold text-[#c87a1e] block font-mono">21:00</span>
            <h4 className="font-bold text-sm text-[#1a1612] mt-1 group-hover:text-[#c87a1e] transition-colors">Wind Down</h4>
            <p className="text-xs text-[#736555] mt-1.5 leading-relaxed">Soothing chamomile tea with minted honey before sleep.</p>
          </div>
        </div>

        {/* 3 Lifestyle Moment Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12">
          {moments.map((m) => (
            <div
              key={m.step}
              className="group rounded-3xl overflow-hidden bg-white border border-[#eee6d6] shadow-sm hover:shadow-xl transition-all duration-500 relative aspect-[3/4] flex flex-col justify-end"
            >
              <img
                src={m.image}
                alt={m.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent transition-opacity duration-300 group-hover:from-black/90" />
              <div className="relative z-10 p-6 sm:p-7 text-white space-y-1.5 font-montserrat">
                <span className="text-xs font-bold tracking-widest text-[#f6a623] uppercase block">
                  {m.step}
                </span>
                <h3 className="font-apricot text-2xl sm:text-3xl font-bold text-white leading-tight">
                  {m.title}
                </h3>
                <p className="text-xs sm:text-sm text-stone-200 leading-relaxed max-w-xs">
                  {m.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Value Proposition Strip */}
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-medium text-[#6e6152] py-4 border-y border-[#f0e7d3] font-montserrat">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />
            <span>Subscribe & save 15%</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#f5a623]" />
            <span>Free returns within 30 days</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#18181b]" />
            <span>Ships in 1–2 business days</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c87a1e]" />
            <span>2 Honey Sticks (6g Each) per Pack</span>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. WHY HONEY: TINY STICK. BIG BENEFITS.                      */}
      {/* ============================================================ */}
      {/* 3. WHY HONEY: TINY STICK. BIG BENEFITS.                      */}
      {/* ============================================================ */}
      <section
        id="why-honey"
        className="py-18 md:py-28 bg-[#fdfaf1] scroll-mt-20 relative overflow-hidden"
      >
        {/* Ambient Warm Honey Glow matching Image 2 */}
        <div
          className="absolute inset-0 -z-10 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 70% 50% at 50% 35%, #faecc9 0%, #fdfaf1 100%)',
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
            <span className="text-xs font-bold tracking-widest text-[#c87a1e] uppercase font-montserrat">
              Why Honey
            </span>
            <h2 className="font-apricot text-4xl sm:text-5xl lg:text-[56px] font-bold text-[#1a1612] leading-tight">
              Tiny stick. Big benefits.
            </h2>
            <p className="text-sm sm:text-base text-[#6e6152] font-montserrat max-w-xl mx-auto leading-relaxed">
              For thousands of years, honey has done more than sweeten. Here's
              what science and your grandma already agree on.
            </p>
          </div>

          {/* 4 Stats Cards with Floating Golden Hexagons & Corner Accents matching Image 2 */}
          <div className="relative mb-20">
            {/* Background Golden Decorative Accents from Image 2 */}
            <div className="hidden lg:block w-2.5 h-7 rounded-full bg-[#f4a22b] absolute -left-2 top-12 pointer-events-none z-0" />
            <svg
              className="absolute -top-12 left-[18%] w-36 h-auto pointer-events-none opacity-30 z-0"
              viewBox="0 0 120 138"
              fill="none"
            >
              <polygon
                points="60,3 117,36 117,102 60,135 3,102 3,36"
                fill="#f5b94e"
              />
            </svg>
            <div className="hidden sm:block w-2 h-6 rounded-full bg-[#f4a22b] absolute left-1/2 -top-5 -translate-x-1/2 pointer-events-none z-0" />
            <svg
              className="absolute -top-10 right-4 sm:right-12 w-40 h-auto pointer-events-none opacity-30 z-0"
              viewBox="0 0 120 138"
              fill="none"
            >
              <polygon
                points="60,3 117,36 117,102 60,135 3,102 3,36"
                fill="#f5b94e"
              />
            </svg>
            <div className="hidden lg:block w-2.5 h-7 rounded-full bg-[#f4a22b] absolute -right-2 top-12 pointer-events-none z-0" />

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 font-montserrat relative z-10">
              {/* Card 1: 0g Added Sugar */}
              <div className="relative overflow-hidden bg-white rounded-[26px] p-6 sm:p-7 border border-[#efe7d6] text-left shadow-sm hover:shadow-md transition-all group">
                {/* Honeycomb corner accent matching Image 2 */}
                <div className="absolute -top-3 -right-3 w-16 h-16 pointer-events-none opacity-40 group-hover:opacity-65 transition-opacity">
                  <svg viewBox="0 0 100 115" fill="none" className="w-full h-full">
                    <polygon
                      points="50,0 100,28.8 100,86.6 50,115.4 0,86.6 0,28.8"
                      fill="#f6d582"
                    />
                  </svg>
                </div>
                <span className="font-apricot text-4xl sm:text-5xl font-bold text-[#c86a14] block mb-1">
                  0g
                </span>
                <h4 className="text-xs font-bold tracking-wider text-[#1a1612] uppercase mb-1">
                  Added Sugar
                </h4>
                <p className="text-xs sm:text-sm text-[#736555]">
                  Just what the bees made.
                </p>
              </div>

              {/* Card 2: 20+ Antioxidants */}
              <div className="relative overflow-hidden bg-white rounded-[26px] p-6 sm:p-7 border border-[#efe7d6] text-left shadow-sm hover:shadow-md transition-all group">
                {/* Honeycomb corner accent matching Image 2 */}
                <div className="absolute -top-3 -right-3 w-16 h-16 pointer-events-none opacity-40 group-hover:opacity-65 transition-opacity">
                  <svg viewBox="0 0 100 115" fill="none" className="w-full h-full">
                    <polygon
                      points="50,0 100,28.8 100,86.6 50,115.4 0,86.6 0,28.8"
                      fill="#f6d582"
                    />
                  </svg>
                </div>
                <span className="font-apricot text-4xl sm:text-5xl font-bold text-[#c86a14] block mb-1">
                  20+
                </span>
                <h4 className="text-xs font-bold tracking-wider text-[#1a1612] uppercase mb-1">
                  Antioxidants
                </h4>
                <p className="text-xs sm:text-sm text-[#736555]">
                  Naturally occurring antioxidants.
                </p>
              </div>

              {/* Card 3: 99.5% Real Honey */}
              <div className="relative overflow-hidden bg-white rounded-[26px] p-6 sm:p-7 border border-[#efe7d6] text-left shadow-sm hover:shadow-md transition-all group">
                {/* Honeycomb corner accent matching Image 2 */}
                <div className="absolute -top-3 -right-3 w-16 h-16 pointer-events-none opacity-40 group-hover:opacity-65 transition-opacity">
                  <svg viewBox="0 0 100 115" fill="none" className="w-full h-full">
                    <polygon
                      points="50,0 100,28.8 100,86.6 50,115.4 0,86.6 0,28.8"
                      fill="#f6d582"
                    />
                  </svg>
                </div>
                <span className="font-apricot text-4xl sm:text-5xl font-bold text-[#c86a14] block mb-1">
                  99.5%
                </span>
                <h4 className="text-xs font-bold tracking-wider text-[#1a1612] uppercase mb-1">
                  Real Honey
                </h4>
                <p className="text-xs sm:text-sm text-[#736555]">
                  Infused with natural mint extract.
                </p>
              </div>

              {/* Card 4: 60s Energy Boost */}
              <div className="relative overflow-hidden bg-white rounded-[26px] p-6 sm:p-7 border border-[#efe7d6] text-left shadow-sm hover:shadow-md transition-all group">
                {/* Honeycomb corner accent matching Image 2 */}
                <div className="absolute -top-3 -right-3 w-16 h-16 pointer-events-none opacity-40 group-hover:opacity-65 transition-opacity">
                  <svg viewBox="0 0 100 115" fill="none" className="w-full h-full">
                    <polygon
                      points="50,0 100,28.8 100,86.6 50,115.4 0,86.6 0,28.8"
                      fill="#f6d582"
                    />
                  </svg>
                </div>
                <span className="font-apricot text-4xl sm:text-5xl font-bold text-[#c86a14] block mb-1">
                  60s
                </span>
                <h4 className="text-xs font-bold tracking-wider text-[#1a1612] uppercase mb-1">
                  Energy Boost
                </h4>
                <p className="text-xs sm:text-sm text-[#736555]">
                  Quick natural carbs, no crash.
                </p>
              </div>
            </div>
          </div>

          {/* Feature Breakdown: Honeycomb Radial Diagram + Benefits + Gapoo Bear Mascot on the right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center max-w-7xl mx-auto relative px-4 sm:px-6">
            {/* Subtle Gapoo Bear mascot watermark in background */}
            <img
              src="/images/gapoo_bear_mascot_clean.png"
              alt=""
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-auto opacity-[0.025] pointer-events-none select-none -z-10"
            />

            {/* Left Column: The Honeycomb Radial Diagram */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="relative">
                <img
                  src="/images/why_honey_diagram_transparent.png"
                  alt="Honey Benefits: Throat care, Digestion, Sleep, Antioxidants, Energy, Immunity"
                  className="w-68 sm:w-76 lg:w-80 h-auto object-contain transition-transform hover:scale-105 duration-500 drop-shadow-sm"
                />
              </div>
            </div>

            {/* Middle Column: Benefits Checklist matching Image 2 & PDF */}
            <div className="lg:col-span-5 space-y-6 max-w-xl">
              <h3 className="text-2xl sm:text-3xl lg:text-[34px] xl:text-[38px] font-bold text-[#1a1612] leading-tight font-serif tracking-tight">
                <span className="inline-block whitespace-nowrap">Real ingredients.</span>{' '}
                <span className="text-[#c86a14] inline-block whitespace-nowrap">A whole lot of good.</span>
              </h3>

              <div className="space-y-4 font-montserrat">
                <div className="flex items-start gap-3.5">
                  <div className="w-5 h-5 rounded-full bg-[#f4a22b] text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm sm:text-base font-bold text-[#1a1612] leading-snug">
                      Soothes sore throats
                    </h4>
                    <p className="text-xs sm:text-sm text-[#736555] leading-relaxed mt-0.5">
                      Coats and calms — a teaspoon at bedtime works wonders.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-5 h-5 rounded-full bg-[#f4a22b] text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm sm:text-base font-bold text-[#1a1612] leading-snug">
                      Natural quick energy
                    </h4>
                    <p className="text-xs sm:text-sm text-[#736555] leading-relaxed mt-0.5">
                      Glucose + fructose = ready-to-burn fuel for your day.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-5 h-5 rounded-full bg-[#f4a22b] text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm sm:text-base font-bold text-[#1a1612] leading-snug">
                      Packed with antioxidants
                    </h4>
                    <p className="text-xs sm:text-sm text-[#736555] leading-relaxed mt-0.5">
                      Real honey carries polyphenols and trace minerals.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-5 h-5 rounded-full bg-[#f4a22b] text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm sm:text-base font-bold text-[#1a1612] leading-snug">
                      Gentler than sugar
                    </h4>
                    <p className="text-xs sm:text-sm text-[#736555] leading-relaxed mt-0.5">
                      Sweeter per gram, so you use less.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Gapoo Bear Mascot Image */}
            <div className="lg:col-span-3 flex flex-col items-center justify-center relative pt-4 lg:pt-0">
              <div className="relative group flex flex-col items-center">
                {/* Decorative golden honeycomb background accent */}
                <svg
                  className="absolute -top-8 -right-8 w-40 h-auto pointer-events-none opacity-25 transition-transform duration-700 group-hover:scale-110 z-0"
                  viewBox="0 0 120 138"
                  fill="none"
                >
                  <polygon
                    points="60,3 117,36 117,102 60,135 3,102 3,36"
                    fill="#f5b94e"
                  />
                </svg>

                {/* High-Resolution Official Gapoo Bear Mascot */}
                <div className="w-48 sm:w-56 lg:w-58 h-auto relative z-10">
                  <img
                    src="/images/gapoo_bear_mascot_hd.png"
                    alt="Gapoo Bear Mascot with sunglasses and hat"
                    className="w-full h-auto object-contain drop-shadow-xl transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Floating "Bear Approved" Pill Tag */}
                <div className="mt-3 inline-flex items-center gap-1.5 bg-white/95 backdrop-blur-sm border border-[#e8cd8c] px-4 py-1.5 rounded-full text-xs font-bold text-[#8b5311] shadow-md font-montserrat relative z-10 transition-transform duration-300 group-hover:scale-105">
                  <span className="w-2 h-2 rounded-full bg-[#d97706] animate-pulse" />
                  <span>Bear Approved</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 4. OUR STORY: FROM SMALL APIARIES                            */}
      {/* ============================================================ */}
      <section
        id="our-story"
        className="py-18 md:py-24 bg-[#20140b] text-[#fdfaf1] scroll-mt-20 relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Story Text & Metrics */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-bold tracking-widest text-[#f5a623] uppercase font-montserrat">
                Our Story
              </span>
              <h2 className="font-apricot text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
                From small apiaries, straight to your stick.
              </h2>
              <p className="text-sm sm:text-base text-[#d1c2b0] leading-relaxed max-w-xl font-montserrat">
                We work directly with family-run beekeepers, paying fair prices
                for real, unfiltered honey. Then we pack it into tear-open
                sticks so you can take it anywhere — without the sticky jar.
              </p>

              {/* 3 Highlights */}
              <div className="grid grid-cols-3 gap-6 pt-6 border-t border-[#3a2a1e] font-montserrat">
                <div>
                  <span className="font-apricot text-3xl sm:text-4xl font-bold text-[#f5a623] block">
                    120+
                  </span>
                  <span className="text-[10px] sm:text-xs tracking-wider uppercase text-[#b8a794]">
                    Partner Apiaries
                  </span>
                </div>
                <div>
                  <span className="font-apricot text-3xl sm:text-4xl font-bold text-[#f5a623] block">
                    0
                  </span>
                  <span className="text-[10px] sm:text-xs tracking-wider uppercase text-[#b8a794]">
                    Added Sugar
                  </span>
                </div>
                <div>
                  <span className="font-apricot text-3xl sm:text-4xl font-bold text-[#f5a623] block">
                    100%
                  </span>
                  <span className="text-[10px] sm:text-xs tracking-wider uppercase text-[#b8a794]">
                    Recyclable Packs
                  </span>
                </div>
              </div>
            </div>

            {/* Artisanal Beekeeper Illustration with Gapoo Bear Quality Seal */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-md bg-[#2d1c10] border border-[#4a3424] rounded-[32px] p-6 sm:p-8 relative shadow-2xl overflow-hidden group">
                <div className="relative z-10 flex flex-col items-center text-center">
                  <div className="w-full max-w-xs mb-4">
                    <img
                      src="/images/beekeeper_only_clean.png"
                      alt="Family Beekeeper Tending Hive in Wildflower Field"
                      className="w-full h-auto object-contain filter invert brightness-90 contrast-125 transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Gapoo Bear Seal */}
                  <div className="flex items-center gap-3 bg-[#1c1108]/90 border border-[#4a3424] px-4 py-2 rounded-full font-montserrat">
                    <img
                      src="/images/gapoo_bear_amber_badge.png"
                      alt="Gapoo Bear Mascot"
                      className="w-6 h-6 object-contain"
                    />
                    <span className="text-xs font-bold tracking-wide text-[#f5a623]">
                      Gapoo Standard · Real Apiary Honey & Mint
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 7. NEWSLETTER CTA: JOIN GAPOO'S BEEHIVE                     */}
      {/* ============================================================ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto text-center space-y-6">
        {/* Gapoo Bear Mascot Welcome Badge */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full overflow-hidden shadow-lg border-2 border-[#faecc9] p-1 bg-white hover:scale-105 transition-transform">
          <img
            src="/images/gapoo_bear_amber_badge.png"
            alt="Gapoo Bear Mascot"
            className="w-full h-full object-contain"
          />
        </div>

        <div className="space-y-2 text-center flex flex-col items-center">
          <span className="text-xs font-bold tracking-widest text-[#c87a1e] uppercase font-montserrat text-center block">
            Join Gapoo's Beehive
          </span>
          <h2 className="font-apricot text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1a1612] text-center">
            Get 10% off your first box
          </h2>
          <p className="text-sm sm:text-base text-[#736555] max-w-lg mx-auto font-montserrat text-center leading-relaxed">
            Sweet perks, secret restocks, occasional bee facts, and a smile in your inbox.
          </p>
        </div>

        {subscribed ? (
          <div className="inline-block bg-[#faecc9] border border-[#e8cd8c] text-[#8b5311] px-6 py-3 rounded-full text-sm font-semibold font-montserrat">
            🎉 Welcome to the hive! Check your inbox for your 10% discount code.
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (email) setSubscribed(true);
            }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto font-montserrat"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
              className="w-full sm:flex-1 px-5 py-3 rounded-full bg-white border border-[#d6cbba] focus:border-[#18181b] focus:outline-none text-sm shadow-sm"
            />
            <button
              type="submit"
              className="w-full sm:w-auto bg-[#18181b] hover:bg-[#27272a] text-white px-7 py-3 rounded-full text-sm font-semibold tracking-wide shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer whitespace-nowrap"
            >
              Sweeten me up
            </button>
          </form>
        )}
      </section>
    </div>
  );
}

const FEATURED_COLLECTION_QUERY = `#graphql
  fragment FeaturedCollection on Collection {
    id
    title
    image {
      id
      url
      altText
      width
      height
    }
    handle
  }
  query FeaturedCollection($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    collections(first: 1, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...FeaturedCollection
      }
    }
  }
`;

const STORE_PRODUCTS_QUERY = `#graphql
  query StoreProducts($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    products(first: 8, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        id
        title
        handle
        variants(first: 1) {
          nodes {
            id
            availableForSale
            price {
              amount
              currencyCode
            }
          }
        }
      }
    }
  }
`;

const RECOMMENDED_PRODUCTS_QUERY = `#graphql
  fragment RecommendedProduct on Product {
    id
    title
    handle
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    featuredImage {
      id
      url
      altText
      width
      height
    }
  }
  query RecommendedProducts ($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    products(first: 4, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...RecommendedProduct
      }
    }
  }
`;

/** @typedef {import('./+types/_index').Route} Route */
/** @typedef {import('storefrontapi.generated').FeaturedCollectionFragment} FeaturedCollectionFragment */
/** @typedef {import('storefrontapi.generated').RecommendedProductsQuery} RecommendedProductsQuery */
/** @typedef {ReturnType<typeof useLoaderData<typeof loader>>} LoaderReturnData */
