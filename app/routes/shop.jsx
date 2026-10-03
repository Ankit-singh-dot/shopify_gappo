import { useState, useEffect, useRef } from 'react';
import { Await, useLoaderData, Link, useFetcher, data } from 'react-router';
import { Suspense } from 'react';
import { CartForm } from '@shopify/hydrogen';
import { useAside } from '~/components/Aside';
import { motion, useInView } from 'framer-motion';
import { AppleLogoReveal } from '~/components/AppleLogoReveal';

/**
 * @type {Route.MetaFunction}
 */
export const meta = () => {
  return [
    { title: 'Gapoo | Honey, finally without the mess' },
    {
      name: 'description',
      content:
        'Pure honey infused with natural mint extract in a convenient tear-and-pour stick. No spoons, no sticky jars. 1 Pack ₹189, 3 Pack ₹399, 6 Pack ₹699.',
    },
  ];
};

/* ─── Reusable Fade-In Wrapper ─── */
function FadeIn({ children, className = '', delay = 0, direction = 'up', distance = 20 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-6%' });
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
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * THREE PRICING TIERS
 * 1 Pack: ₹189 (10 Sticks · ₹18.9 / stick)
 * 3 Pack: ₹399 (30 Sticks · ₹13.3 / stick · Save ₹168 vs single packs)
 * 6 Pack: ₹699 (60 Sticks · ₹11.6 / stick · Save ₹435 vs single packs)
 */
const PACK_OPTIONS = [
  {
    id: '1-pack',
    name: '1 Pack',
    title: '1 Pack · 10 Sticks',
    badge: 'Starter',
    sticks: 10,
    price: 189,
    savingsText: '',
    pricePerStick: '₹18.9',
    unitQty: 1,
    cartQty: 1,
    popular: false,
    bestValue: false,
    freeShipping: false,
    note: 'Standard shipping · Free over ₹500',
  },
  {
    id: '3-pack',
    name: '3 Pack',
    title: '3 Pack · 30 Sticks',
    badge: '🔥 Most Popular',
    sticks: 30,
    price: 399,
    savingsText: 'Save ₹168',
    pricePerStick: '₹13.3',
    unitQty: 3,
    cartQty: 3,
    popular: true,
    bestValue: false,
    freeShipping: true,
    note: 'FREE Shipping Included',
  },
  {
    id: '6-pack',
    name: '6 Pack',
    title: '6 Pack · 60 Sticks',
    badge: '⚡ Best Value',
    sticks: 60,
    price: 699,
    savingsText: 'Save ₹435',
    pricePerStick: '₹11.6',
    unitQty: 6,
    cartQty: 6,
    popular: false,
    bestValue: true,
    freeShipping: true,
    note: 'FREE Shipping Included',
  },
];

/**
 * @param {Route.ActionArgs} args
 */
export async function action({ request, context }) {
  const formData = await request.formData();
  const email = String(formData.get('email') || '');
  const intent = String(formData.get('intent') || '');

  if (intent === 'newsletter') {
    if (!email) {
      return data({ error: 'Email is required' }, { status: 400 });
    }

    try {
      const dummyPassword = Math.random().toString(36).slice(-8) + 'A1!';
      const CUSTOMER_CREATE_MUTATION = `#graphql
        mutation customerCreate($input: CustomerCreateInput!) {
          customerCreate(input: $input) {
            customer {
              id
              email
            }
            customerUserErrors {
              code
              field
              message
            }
          }
        }
      `;

      const response = await context.storefront.mutate(CUSTOMER_CREATE_MUTATION, {
        variables: {
          input: {
            email,
            password: dummyPassword,
            acceptsMarketing: true,
          },
        },
      });

      const errors = response?.customerCreate?.customerUserErrors || [];
      if (errors.length > 0) {
        console.warn('Newsletter signup warning:', errors);
      }

      return data({ success: true });
    } catch (error) {
      console.error('Newsletter signup error:', error);
      return data({ error: 'Failed to sign up. Please try again later.' }, { status: 500 });
    }
  }

  return data({ error: 'Invalid intent' }, { status: 400 });
}

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

export default function ShopPage() {
  /** @type {LoaderReturnData} */
  const loaderData = useLoaderData();
  const fetcher = useFetcher();
  const { open } = useAside();

  const storeProducts = loaderData?.storeProducts || [];
  const defaultVariantId = storeProducts[0]?.variants?.nodes?.[0]?.id;

  // Selected pack: Default to 3-pack
  const [selectedPackIndex, setSelectedPackIndex] = useState(1);
  const activePack = PACK_OPTIONS[selectedPackIndex];

  // Bundle Quantity Multiplier
  const [bundleMultiplier, setBundleMultiplier] = useState(1);

  // Gallery Slide State
  const [activeSlide, setActiveSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Newsletter Success State
  const isNewsletterSuccess = fetcher.data?.success;

  const heroSlides = [
    {
      src: '/images/gapoo_minted_studio_hero.jpg',
      alt: 'Gapoo Minted Goodness 10 Honey Sticks with Morning Brew',
    },
    {
      src: '/images/gapoo_hero_pour.jpg',
      alt: 'Gapoo Snap & Squeeze Pure Amber Mint Honey Pour',
    },
    {
      src: '/images/gapoo_hero_unboxing.jpg',
      alt: 'Gapoo 10 Single-Serve Honey Sticks Unboxed',
    },
    {
      src: '/images/gapoo_hero_travertine.jpg',
      alt: 'Gapoo Box and Sachets on Travertine Stone',
    },
  ];

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [isHovered, heroSlides.length]);

  // Lifestyle Moments
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

  const totalSticks = activePack.sticks * bundleMultiplier;
  const totalPrice = activePack.price * bundleMultiplier;

  return (
    <div className="bg-[#fdfaf1] text-[#20140b] relative w-full overflow-clip">
      {/* ============================================================ */}
      {/* 1. HERO BUY BOX SECTION (CLEAN & BALANCED)                   */}
      {/* ============================================================ */}
      <section
        id="buy-now"
        className="relative pt-16 sm:pt-24 lg:pt-32 pb-24 md:pb-36 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto overflow-visible scroll-mt-36"
      >
        <span id="shop" className="absolute -top-32 left-0 pointer-events-none" />

        {/* Ambient Radial Honey Glow */}
        <div
          className="absolute inset-0 -z-10 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 70% 60% at 70% 40%, #faecc9 0%, #fcf4e5 50%, #fdfaf1 100%)',
          }}
        />

        {/* Faint Gapoo Bear Line-art Mascot Watermark */}
        <img
          src="/images/gapoo_bear_mascot_clean.png"
          alt=""
          className="absolute -bottom-8 left-6 w-80 h-auto opacity-[0.03] pointer-events-none select-none z-0"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center relative z-10">
          {/* Left Column: Copy & Buy Box */}
          <div className="lg:col-span-6 space-y-6">
            {/* Pill Tag with generous breathing room from header */}
            <div className="pt-4 sm:pt-6 mb-4 sm:mb-6">
              <div className="inline-flex items-center gap-2 bg-[#faecc9] border border-[#e5cf9d] px-4 py-2 rounded-full text-xs font-bold text-[#8b5311] font-montserrat shadow-xs">
                <img
                  src="/images/golden_bee_clean.png"
                  alt="Golden Bee"
                  className="w-3.5 h-3.5 object-contain"
                />
                <span className="uppercase tracking-wider">10 Single-Serve Sticks · 60g Pack</span>
              </div>
            </div>

            {/* Headline */}
            <div>
              <h1 className="font-apricot text-4xl sm:text-5xl lg:text-[60px] leading-[1.05] font-bold text-[#1a110a] tracking-tight">
                Honey, finally<br />without the mess.
              </h1>
              <p className="mt-3 text-base text-[#5c5247] leading-relaxed max-w-lg font-montserrat font-normal">
                Gapoo honey sticks pack real honey infused with natural mint extract into a convenient tear-and-pour stick. No sticky jars. No spoons. Just snap, squeeze, and sip.
              </p>
            </div>

            {/* ─── 3-TIER PACK SELECTOR CARDS ─── */}
            <div className="space-y-2.5 font-montserrat pt-1">
              <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#736555] mb-1">
                <span>Select Pack Option</span>
                <span className="text-[#c87a1e]">Snap · Squeeze · Sip</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {PACK_OPTIONS.map((pack, idx) => {
                  const isSelected = selectedPackIndex === idx;
                  return (
                    <button
                      key={pack.id}
                      type="button"
                      onClick={() => setSelectedPackIndex(idx)}
                      className={`relative text-left p-3.5 sm:p-4 rounded-2xl border-2 transition-all duration-200 cursor-pointer flex flex-col justify-between group ${
                        isSelected
                          ? 'border-[#c87a1e] bg-[#fffcf5] shadow-[0_4px_16px_rgba(200,122,30,0.15)] ring-1 ring-[#c87a1e]'
                          : 'border-[#e8ded0] bg-white hover:border-[#d6c8b6] hover:bg-[#faf6ee]'
                      }`}
                    >
                      {/* Top Header of Card: Badge + Radio */}
                      <div className="flex items-center justify-between mb-2">
                        <span
                          className={`text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                            pack.bestValue
                              ? 'bg-[#1a110a] text-[#fbbf24] border border-[#f5a623]/50'
                              : pack.popular
                              ? 'bg-[#f5a623] text-black font-extrabold'
                              : 'bg-[#faf2e1] text-[#8b5311]'
                          }`}
                        >
                          {pack.badge}
                        </span>

                        <div
                          className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${
                            isSelected
                              ? 'border-[#c87a1e] bg-[#c87a1e] text-white'
                              : 'border-[#d0c2b0] bg-white group-hover:border-[#c87a1e]'
                          }`}
                        >
                          {isSelected && (
                            <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 12 12">
                              <path d="M10 3L4.5 8.5L2 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                            </svg>
                          )}
                        </div>
                      </div>

                      <div className="space-y-0.5">
                        <span className="font-bold text-sm text-[#1a110a] block">
                          {pack.name}
                        </span>
                        <span className="text-[11px] text-[#786a5a] block font-medium">
                          {pack.sticks} Sticks
                        </span>
                      </div>

                      <div className="pt-2.5 border-t border-[#f0e4d2] mt-2.5">
                        <div className="font-apricot text-2xl font-bold text-[#1a110a] leading-none">
                          ₹{pack.price}
                        </div>
                        <div className="mt-1 text-[11px] text-[#8c7e6e] font-medium flex items-center justify-between">
                          <span>{pack.pricePerStick}/ea</span>
                          {pack.savingsText && (
                            <span className="text-[#15803d] font-bold">{pack.savingsText}</span>
                          )}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ─── ACTION BAR: STEPPER + DYNAMIC ADD TO CART ─── */}
            <div className="pt-1 font-montserrat flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              {/* Stepper */}
              <div className="flex items-center justify-between sm:justify-start border border-[#d6cbba] bg-white rounded-full p-1.5 shadow-xs">
                <button
                  type="button"
                  onClick={() => setBundleMultiplier(Math.max(1, bundleMultiplier - 1))}
                  className="w-9 h-9 flex items-center justify-center text-[#736555] hover:text-[#1a110a] hover:bg-[#faf2e4] rounded-full font-bold text-base cursor-pointer select-none transition-colors"
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <div className="px-3 text-center min-w-[28px]">
                  <span className="font-bold text-sm text-[#1a110a] block leading-none">
                    {bundleMultiplier}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setBundleMultiplier(bundleMultiplier + 1)}
                  className="w-9 h-9 flex items-center justify-center text-[#736555] hover:text-[#1a110a] hover:bg-[#faf2e4] rounded-full font-bold text-base cursor-pointer select-none transition-colors"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              {/* Add to Cart Form Button */}
              {defaultVariantId ? (
                <CartForm
                  route="/cart"
                  inputs={{
                    lines: [
                      {
                        merchandiseId: defaultVariantId,
                        quantity: activePack.cartQty * bundleMultiplier,
                        attributes: [
                          { key: 'Pack', value: activePack.title },
                          { key: 'Total Sticks', value: `${totalSticks} Sticks` },
                          { key: 'Bundle Deal', value: `₹${totalPrice}` },
                        ],
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
                      className="w-full sm:flex-1 group relative inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#1a110a] text-white shadow-[0_8px_20px_rgba(26,17,10,0.18)] hover:shadow-[0_12px_30px_rgba(200,122,30,0.3)] transition-all duration-300 overflow-hidden cursor-pointer disabled:opacity-70"
                    >
                      <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#f5a623] via-[#fbbf24] to-[#d97706] transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-[0.16,1,0.3,1]" />

                      <span className="relative z-10 font-bold tracking-wider uppercase text-xs sm:text-sm text-white transition-colors duration-300 flex items-center gap-2">
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                          <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                          <line x1="3" y1="6" x2="21" y2="6" />
                          <path d="M16 10a4 4 0 01-8 0" />
                        </svg>
                        <span>
                          {fetcher.state !== 'idle'
                            ? 'Adding to Cart...'
                            : `Add ${activePack.name} · ₹${totalPrice}`}
                        </span>
                        <span className="text-base transform group-hover:translate-x-1 transition-transform duration-300">
                          →
                        </span>
                      </span>
                    </button>
                  )}
                </CartForm>
              ) : (
                <button
                  type="button"
                  onClick={() => open('cart')}
                  className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 bg-[#f5a623] hover:bg-[#e09419] text-[#1a110a] px-8 py-3.5 rounded-full text-sm font-bold tracking-wide shadow-md transition-all cursor-pointer"
                >
                  <span>Add ${activePack.name} · ₹${totalPrice}</span>
                  <span>→</span>
                </button>
              )}
            </div>

            {/* Clean Delivery & Value Info Strip */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 text-xs font-medium text-[#6e6152] font-montserrat border-t border-[#f0e4d2]">
              <span className="font-semibold text-[#1a110a] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#15803d]" />
                <span>{activePack.note}</span>
              </span>
              <span>10 Sticks (60g Box)</span>
              <span>Snap · Squeeze · Sip</span>
            </div>
          </div>

          {/* Right Column: Studio Slideshow with Bottom Notch */}
          <div className="lg:col-span-6 relative flex flex-col items-center justify-center">
            <div
              className="relative w-full aspect-[4/3] rounded-[32px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-[#ebdccb] group bg-[#f7f3eb]"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* Slides */}
              {heroSlides.map((slide, index) => (
                <div
                  key={slide.src}
                  className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                    activeSlide === index ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                  }`}
                >
                  <img
                    src={slide.src}
                    alt={slide.alt}
                    className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.02]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-black/5 pointer-events-none" />
                </div>
              ))}

              {/* Floating Bottom Notch Controls */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#18130e]/85 hover:bg-[#18130e]/95 backdrop-blur-md border border-white/20 shadow-[0_10px_25px_rgba(0,0,0,0.35)] transition-all">
                <button
                  type="button"
                  onClick={() => setActiveSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)}
                  className="w-6 h-6 flex items-center justify-center rounded-full text-white/70 hover:text-white hover:bg-white/15 transition-all cursor-pointer"
                  aria-label="Previous image"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                <div className="flex items-center gap-1.5 px-1">
                  {heroSlides.map((slide, index) => (
                    <button
                      key={slide.src}
                      type="button"
                      onClick={() => setActiveSlide(index)}
                      className={`transition-all duration-300 rounded-full cursor-pointer ${
                        activeSlide === index
                          ? 'w-7 h-1.5 bg-gradient-to-r from-[#f5a623] to-[#e68a00] shadow-[0_0_8px_#f5a623]'
                          : 'w-1.5 h-1.5 bg-white/40 hover:bg-white/80'
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => setActiveSlide((prev) => (prev + 1) % heroSlides.length)}
                  className="w-6 h-6 flex items-center justify-center rounded-full text-white/70 hover:text-white hover:bg-white/15 transition-all cursor-pointer"
                  aria-label="Next image"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                <div className="h-3 w-[1px] bg-white/20 mx-0.5" />
                <span className="text-[10px] font-mono font-bold text-white/80 pr-1 tracking-wider">
                  0{activeSlide + 1} / 0{heroSlides.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Subtle Divider Line with Ample Vertical Margin */}
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 my-6 sm:my-10">
        <div className="h-[1px] bg-[#ebdccb]/60" />
      </div>

      {/* ============================================================ */}
      {/* 2. YOUR DAILY RITUAL (TIMELINE + PHOTO MOMENTS)              */}
      {/* ============================================================ */}
      <section id="ritual" className="py-20 md:py-28 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto scroll-mt-24 relative">
        <span id="how-to-use" className="absolute -top-24 left-0 pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <FadeIn>
            <div className="flex items-center gap-2 mb-2">
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
            <h2 className="font-apricot text-4xl sm:text-5xl font-bold text-[#1a110a]">
              From first sip to evening unwind.
            </h2>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="inline-flex items-center gap-2 bg-[#faecc9]/90 border border-[#e8cd8c] px-4 py-2 rounded-full text-xs font-semibold text-[#8b5311] font-montserrat shrink-0 shadow-2xs">
              <span className="text-base">🐝</span>
              <span>1 Stick = Exactly 1 Cup of Tea or Breakfast Serving</span>
            </div>
          </FadeIn>
        </div>

        {/* 5-step Daily Timeline */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5 font-montserrat mb-16">
          <div className="p-5 rounded-2xl bg-white border border-[#eee6d6] shadow-xs hover:border-[#f5a623] hover:shadow-md transition-all group">
            <span className="text-xs font-bold text-[#c87a1e] block font-mono">06:30</span>
            <h4 className="font-bold text-sm text-[#1a110a] mt-1 group-hover:text-[#c87a1e] transition-colors">
              Morning Brew
            </h4>
            <p className="text-xs text-[#736555] mt-1.5 leading-relaxed">
              Stir into warm lemon water, green tea or your morning brew.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-[#eee6d6] shadow-xs hover:border-[#f5a623] hover:shadow-md transition-all group">
            <span className="text-xs font-bold text-[#c87a1e] block font-mono">11:00</span>
            <h4 className="font-bold text-sm text-[#1a110a] mt-1 group-hover:text-[#c87a1e] transition-colors">
              Mid-work Fuel
            </h4>
            <p className="text-xs text-[#736555] mt-1.5 leading-relaxed">
              Quick natural energy hit during back-to-back work calls.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-[#eee6d6] shadow-xs hover:border-[#f5a623] hover:shadow-md transition-all group">
            <span className="text-xs font-bold text-[#c87a1e] block font-mono">14:00</span>
            <h4 className="font-bold text-sm text-[#1a110a] mt-1 group-hover:text-[#c87a1e] transition-colors">
              Post-Lunch
            </h4>
            <p className="text-xs text-[#736555] mt-1.5 leading-relaxed">
              Drizzle on fresh fruit bowls, Greek yogurt or rolled oats.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-[#eee6d6] shadow-xs hover:border-[#f5a623] hover:shadow-md transition-all group">
            <span className="text-xs font-bold text-[#c87a1e] block font-mono">17:30</span>
            <h4 className="font-bold text-sm text-[#1a110a] mt-1 group-hover:text-[#c87a1e] transition-colors">
              Pre-Workout
            </h4>
            <p className="text-xs text-[#736555] mt-1.5 leading-relaxed">
              Clean natural fuel before running, gym workouts, or cycling.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-[#eee6d6] shadow-xs hover:border-[#f5a623] hover:shadow-md transition-all group">
            <span className="text-xs font-bold text-[#c87a1e] block font-mono">21:00</span>
            <h4 className="font-bold text-sm text-[#1a110a] mt-1 group-hover:text-[#c87a1e] transition-colors">
              Wind Down
            </h4>
            <p className="text-xs text-[#736555] mt-1.5 leading-relaxed">
              Soothing chamomile tea with minted honey before sleep.
            </p>
          </div>
        </div>

        {/* 3 Lifestyle Moment Photo Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {moments.map((m, idx) => (
            <FadeIn
              key={m.step}
              delay={idx * 0.15}
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
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. WHY HONEY: TINY STICK. BIG BENEFITS.                      */}
      {/* ============================================================ */}
      <section id="why-honey" className="py-24 md:py-32 bg-[#fdfaf1] scroll-mt-24 relative overflow-hidden border-t border-[#f0e4d2]">
        {/* Ambient Glow */}
        <div
          className="absolute inset-0 -z-10 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 70% 50% at 50% 35%, #faecc9 0%, #fdfaf1 100%)',
          }}
        />

        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative">
          <FadeIn className="text-center max-w-2xl mx-auto mb-16 space-y-2">
            <span className="text-xs font-bold tracking-widest text-[#c87a1e] uppercase font-montserrat">
              Why Honey
            </span>
            <h2 className="font-apricot text-4xl sm:text-5xl lg:text-[56px] font-bold text-[#1a110a] leading-tight">
              Tiny stick. Big benefits.
            </h2>
            <p className="text-sm sm:text-base text-[#6e6152] font-montserrat max-w-xl mx-auto leading-relaxed">
              For thousands of years, honey has done more than sweeten. Here's what science and traditional medicine agree on.
            </p>
          </FadeIn>

          {/* 4 Stat Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 font-montserrat relative z-10 mb-20">
            <div className="relative overflow-hidden bg-white rounded-[26px] p-6 sm:p-7 border border-[#efe7d6] text-left shadow-sm hover:shadow-md transition-all group">
              <span className="font-apricot text-4xl sm:text-5xl font-bold text-[#c86a14] block mb-1">
                Pure
              </span>
              <h4 className="text-xs font-bold tracking-wider text-[#1a110a] uppercase mb-1">
                Natural Sweetness
              </h4>
              <p className="text-xs sm:text-sm text-[#736555]">
                Just what the bees made.
              </p>
            </div>

            <div className="relative overflow-hidden bg-white rounded-[26px] p-6 sm:p-7 border border-[#efe7d6] text-left shadow-sm hover:shadow-md transition-all group">
              <span className="font-apricot text-4xl sm:text-5xl font-bold text-[#c86a14] block mb-1">
                Rich
              </span>
              <h4 className="text-xs font-bold tracking-wider text-[#1a110a] uppercase mb-1">
                In Antioxidants
              </h4>
              <p className="text-xs sm:text-sm text-[#736555]">
                Naturally occurring trace minerals.
              </p>
            </div>

            <div className="relative overflow-hidden bg-white rounded-[26px] p-6 sm:p-7 border border-[#efe7d6] text-left shadow-sm hover:shadow-md transition-all group">
              <span className="font-apricot text-4xl sm:text-5xl font-bold text-[#c86a14] block mb-1">
                Real
              </span>
              <h4 className="text-xs font-bold tracking-wider text-[#1a110a] uppercase mb-1">
                Apiary Honey
              </h4>
              <p className="text-xs sm:text-sm text-[#736555]">
                Infused with natural mint extract.
              </p>
            </div>

            <div className="relative overflow-hidden bg-white rounded-[26px] p-6 sm:p-7 border border-[#efe7d6] text-left shadow-sm hover:shadow-md transition-all group">
              <span className="font-apricot text-4xl sm:text-5xl font-bold text-[#c86a14] block mb-1">
                Quick
              </span>
              <h4 className="text-xs font-bold tracking-wider text-[#1a110a] uppercase mb-1">
                Energy Boost
              </h4>
              <p className="text-xs sm:text-sm text-[#736555]">
                Natural carbs, ready to burn.
              </p>
            </div>
          </div>

          {/* Diagram + Benefits Checklist + Mascot */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center max-w-7xl mx-auto relative">
            <div className="lg:col-span-4 flex justify-center">
              <img
                src="/images/why_honey_diagram_transparent.png"
                alt="Honey Benefits Diagram"
                className="w-68 sm:w-76 lg:w-80 h-auto object-contain transition-transform hover:scale-105 duration-500 drop-shadow-sm"
              />
            </div>

            <div className="lg:col-span-5 space-y-6 max-w-xl font-montserrat">
              <h3 className="text-2xl sm:text-3xl lg:text-[34px] font-bold text-[#1a110a] leading-tight font-serif tracking-tight">
                <span>Real ingredients.</span>{' '}
                <span className="text-[#c86a14]">A whole lot of good.</span>
              </h3>

              <div className="space-y-4">
                <div className="flex items-start gap-3.5">
                  <div className="w-5 h-5 rounded-full bg-[#f4a22b] text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5 font-bold text-xs">
                    ✓
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-bold text-[#1a110a]">
                      Soothes sore throats
                    </h4>
                    <p className="text-xs sm:text-sm text-[#736555] mt-0.5">
                      Coats and calms — a teaspoon at bedtime works wonders.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-5 h-5 rounded-full bg-[#f4a22b] text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5 font-bold text-xs">
                    ✓
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-bold text-[#1a110a]">
                      Natural quick energy
                    </h4>
                    <p className="text-xs sm:text-sm text-[#736555] mt-0.5">
                      Glucose + fructose = ready-to-burn fuel for your day.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-5 h-5 rounded-full bg-[#f4a22b] text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5 font-bold text-xs">
                    ✓
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-bold text-[#1a110a]">
                      Packed with antioxidants
                    </h4>
                    <p className="text-xs sm:text-sm text-[#736555] mt-0.5">
                      Real honey carries polyphenols and trace minerals.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-5 h-5 rounded-full bg-[#f4a22b] text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5 font-bold text-xs">
                    ✓
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-bold text-[#1a110a]">
                      Gentler than sugar
                    </h4>
                    <p className="text-xs sm:text-sm text-[#736555] mt-0.5">
                      Sweeter per gram, so you use less.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-3 flex flex-col items-center justify-center relative pt-4 lg:pt-0">
              <div className="relative group flex flex-col items-center">
                <div className="w-48 sm:w-56 lg:w-58 h-auto relative z-10">
                  <img
                    src="/images/gapoo_bear_mascot_hd.png"
                    alt="Gapoo Bear Mascot"
                    className="w-full h-auto object-contain drop-shadow-xl transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="mt-3 inline-flex items-center gap-1.5 bg-white/95 backdrop-blur-sm border border-[#e8cd8c] px-4 py-1.5 rounded-full text-xs font-bold text-[#8b5311] shadow-md font-montserrat relative z-10">
                  <span className="w-2 h-2 rounded-full bg-[#d97706] animate-pulse" />
                  <span>Bear Approved</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Explicit Spacer & Divider between Why Honey and The Next Chapter */}
      <div className="w-full max-w-5xl mx-auto px-6 sm:px-8 my-10 sm:my-16">
        <div className="h-[1px] bg-[#ebdccb]/70" />
      </div>

      {/* ============================================================ */}
      {/* 4. COMING SOON: THE NEXT CHAPTER (CONTAINED CARD SHOWCASE)   */}
      {/* ============================================================ */}
      <section className="my-8 sm:my-14 lg:my-20 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto font-montserrat">
        <div className="bg-[#140e0a] text-white rounded-[32px] sm:rounded-[44px] overflow-hidden flex flex-col md:flex-row shadow-[0_25px_60px_rgba(0,0,0,0.25)] border border-[#2e1d10]">
          {/* Left Panel: Ginger Curcumin */}
          <div className="relative w-full md:w-1/2 p-8 sm:p-12 lg:p-16 flex flex-col justify-between group overflow-hidden bg-[#18110b] border-b md:border-b-0 md:border-r border-[#2a1f14]">
            <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-[#d4a373] opacity-[0.06] blur-[120px] rounded-full pointer-events-none" />

            <div className="relative z-10 space-y-4">
              <span className="inline-block text-[10px] font-bold tracking-[0.2em] text-[#d4a373] uppercase border border-[#d4a373]/30 px-3 py-1.5 rounded-full">
                The Next Chapter
              </span>
              <h3 className="font-apricot text-4xl sm:text-5xl lg:text-6xl font-bold text-[#f2e6d5] leading-[0.95] tracking-tighter">
                Ginger Curcumin
              </h3>
              <span className="text-xs font-bold tracking-[0.15em] uppercase text-[#8c5a2b] block">
                The Ultimate Immunity & Wellness Tonic
              </span>
            </div>

            <div className="relative z-10 mt-10 sm:mt-14 space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-1.5 h-1.5 rounded-full bg-[#d4a373] mt-2 shrink-0" />
                <div>
                  <strong className="block text-[#f2e6d5] text-sm mb-0.5 uppercase tracking-wider font-bold">
                    Joint & Anti-Inflammatory
                  </strong>
                  <span className="text-xs text-[#a38062] leading-relaxed">
                    Powerful curcumin helps active adults and desk workers relieve stiffness and accelerate recovery.
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-1.5 h-1.5 rounded-full bg-[#d4a373] mt-2 shrink-0" />
                <div>
                  <strong className="block text-[#f2e6d5] text-sm mb-0.5 uppercase tracking-wider font-bold">
                    Digestive Comfort
                  </strong>
                  <span className="text-xs text-[#a38062] leading-relaxed">
                    Traditional ginger relieves indigestion, bloating, and nausea for a soothing after-meal ritual.
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-1.5 h-1.5 rounded-full bg-[#d4a373] mt-2 shrink-0" />
                <div>
                  <strong className="block text-[#f2e6d5] text-sm mb-0.5 uppercase tracking-wider font-bold">
                    Instant Wellness Tea
                  </strong>
                  <span className="text-xs text-[#a38062] leading-relaxed">
                    Snap directly into warm water or green tea to create a soothing herbal drink anywhere.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel: Chilly */}
          <div className="relative w-full md:w-1/2 p-8 sm:p-12 lg:p-16 flex flex-col justify-between group overflow-hidden bg-[#0d120d]">
            <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-[#f05423] opacity-[0.06] blur-[120px] rounded-full pointer-events-none" />

            <div className="relative z-10 space-y-4">
              <span className="inline-block text-[10px] font-bold tracking-[0.2em] text-[#f05423] uppercase border border-[#f05423]/30 px-3 py-1.5 rounded-full">
                The Next Chapter
              </span>
              <h3 className="font-apricot text-4xl sm:text-5xl lg:text-6xl font-bold text-[#e6d8c3] leading-[0.95] tracking-tighter">
                Chilly
              </h3>
              <span className="text-xs font-bold tracking-[0.15em] uppercase text-[#a33917] block">
                The Bold & Functional Use Cases
              </span>
            </div>

            <div className="relative z-10 mt-10 sm:mt-14 space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-1.5 h-1.5 rounded-full bg-[#f05423] mt-2 shrink-0" />
                <div>
                  <strong className="block text-[#e6d8c3] text-sm mb-0.5 uppercase tracking-wider font-bold">
                    Artisanal Pairings
                  </strong>
                  <span className="text-xs text-[#8a998a] leading-relaxed">
                    An instant flavor-profile booster when drizzled over sharp aged cheddar or charcuterie.
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-1.5 h-1.5 rounded-full bg-[#f05423] mt-2 shrink-0" />
                <div>
                  <strong className="block text-[#e6d8c3] text-sm mb-0.5 uppercase tracking-wider font-bold">
                    Cocktail Rim / Mixer
                  </strong>
                  <span className="text-xs text-[#8a998a] leading-relaxed">
                    Craft spicy-sweet beverages like a spicy margarita with precise portion control.
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-1.5 h-1.5 rounded-full bg-[#f05423] mt-2 shrink-0" />
                <div>
                  <strong className="block text-[#e6d8c3] text-sm mb-0.5 uppercase tracking-wider font-bold">
                    Winter Warm-Up
                  </strong>
                  <span className="text-xs text-[#8a998a] leading-relaxed">
                    Blend into hot lemon water or tea to provide a soothing, warming chest sensation.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Explicit Spacer & Divider between The Next Chapter and Newsletter */}
      <div className="w-full max-w-4xl mx-auto px-6 sm:px-8 my-10 sm:my-16">
        <div className="h-[1px] bg-[#ebdccb]/70" />
      </div>

      {/* ============================================================ */}
      {/* 5. NEWSLETTER CTA                                            */}
      {/* ============================================================ */}
      <section className="py-20 sm:py-28 lg:py-36 px-6 sm:px-8 max-w-3xl mx-auto text-center space-y-8 relative">
        <FadeIn className="space-y-4 text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 bg-[#faecc9] border border-[#e8cd8c] px-4 py-1.5 rounded-full text-xs font-bold tracking-widest text-[#8b5311] uppercase font-montserrat shadow-2xs">
            <span>Unlock the Goodness</span>
          </div>
          <h2 className="font-apricot text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1a110a] text-center">
            Get 10% off your first box
          </h2>
          <p className="text-base sm:text-lg text-[#736555] max-w-lg mx-auto font-montserrat text-center leading-relaxed">
            Sweet perks, secret restocks, and a smile in your inbox. No spam, just real honey.
          </p>
        </FadeIn>

        {isNewsletterSuccess ? (
          <div className="inline-block bg-[#faecc9] border border-[#e8cd8c] text-[#8b5311] px-6 py-4 rounded-full text-sm font-semibold font-montserrat shadow-sm">
            🎉 Welcome to the club! Check your inbox for your 10% discount code.
          </div>
        ) : (
          <fetcher.Form
            method="post"
            className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto font-montserrat mt-4"
          >
            <input type="hidden" name="intent" value="newsletter" />
            <input
              type="email"
              name="email"
              required
              placeholder="you@email.com"
              className="w-full sm:flex-1 px-6 py-3.5 rounded-full bg-white border border-[#d6cbba] focus:border-[#1a110a] focus:outline-none text-base shadow-sm font-medium"
              disabled={fetcher.state === 'submitting'}
            />
            <button
              type="submit"
              className="w-full sm:w-auto bg-[#1a110a] hover:bg-[#2e1d10] text-white px-8 py-3.5 rounded-full text-sm font-bold tracking-wide shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer whitespace-nowrap disabled:opacity-70 disabled:cursor-not-allowed"
              disabled={fetcher.state === 'submitting'}
            >
              {fetcher.state === 'submitting' ? 'Sweetening...' : 'Sweeten me up'}
            </button>
            {fetcher.data?.error && (
              <p className="text-red-500 text-sm mt-2 absolute -bottom-6 w-full text-center">
                {fetcher.data.error}
              </p>
            )}
          </fetcher.Form>
        )}
      </section>

      {/* ============================================================ */}
      {/* 6. APPLE-STYLE SCROLL-DRIVEN MASCOT LOGO FINALE              */}
      {/* ============================================================ */}
      <AppleLogoReveal />
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
        variants(first: 10) {
          nodes {
            id
            title
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
