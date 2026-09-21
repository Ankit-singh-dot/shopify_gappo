import { useState, useEffect } from 'react';
import { Await, useLoaderData, Link, useFetcher, data } from 'react-router';
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
      // Storefront API customerCreate mutation for newsletter signup
      // We generate a dummy password to satisfy the API requirement, but the user doesn't need to know it
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
          }
        }
      });

      const errors = response?.customerCreate?.customerUserErrors || [];
      if (errors.length > 0) {
        // If the email is already taken, we still return success to the user (security best practice)
        // or we could show a custom message. We will just return success so they see the thank you message.
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
  /** @type {LoaderReturnData} */
  const data = useLoaderData();
  const fetcher = useFetcher();
  const { open } = useAside();
  
  const [activeSlide, setActiveSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Check if newsletter signup was successful
  const isNewsletterSuccess = fetcher.data?.success;
  const storeProducts = data?.storeProducts || [];
  const defaultVariantId = storeProducts[0]?.variants?.nodes?.[0]?.id;

  const [selectedQty, setSelectedQty] = useState(1);

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



        {/* Faint Gapoo Bear Line-art Mascot Watermark */}
        <img
          src="/images/gapoo_bear_mascot_clean.png"
          alt=""
          className="absolute -bottom-6 left-6 w-80 h-auto opacity-[0.03] pointer-events-none select-none z-0"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center relative z-10">
          {/* Left Column: Copy & Quick Purchase */}
          <div className="lg:col-span-6 space-y-6">


            {/* Main Headline */}
            <h1 className="font-apricot text-5xl sm:text-6xl lg:text-[68px] leading-[1.08] font-bold text-[#1a1612] tracking-tight">
              Honey, finally<br className="hidden sm:inline" /> without the mess.
            </h1>

            {/* Subheading compliant with legal mandate */}
            <p className="text-base sm:text-lg text-[#5c5247] leading-relaxed max-w-xl font-montserrat">
              Gapoo honey sticks pack real honey infused with natural mint extract into a convenient tear-and-pour stick. No sticky jars. No spoons. Just snap, squeeze, and sip.
            </p>

            {/* Packaging Feature Badges Removed */}

            {/* Price & Savings Display */}
            <div className="flex flex-wrap items-baseline gap-3 pt-2 font-montserrat">
              <span className="font-apricot text-4xl sm:text-5xl font-bold text-[#1a1612]">
                ₹{289 * selectedQty}
              </span>
              <span className="text-base text-[#968674] line-through font-medium">
                ₹{359 * selectedQty}
              </span>
              <span className="text-xs font-bold text-[#15803d] bg-[#dcfce7] border border-[#bbf7d0] px-2 py-0.5 rounded-full uppercase tracking-wider">
                Save 20%
              </span>
              <span className="text-xs text-[#736555] font-medium">
                (10 Single Serves · ₹19.9/stick)
              </span>
            </div>

            {/* Hero Purchase Action: Quantity Selector + Add to Cart + Daily Ritual */}
            <div className="pt-2 font-montserrat flex flex-wrap items-center gap-3">
              {/* Clean Quantity Selector */}
              <div className="flex items-center border border-[#d6cbba] bg-white rounded-full p-1 shadow-xs">
                <button
                  type="button"
                  onClick={() => setSelectedQty(Math.max(1, selectedQty - 1))}
                  className="w-8 h-8 flex items-center justify-center text-[#736555] hover:text-[#1a1612] hover:bg-[#f5ede0] rounded-full font-bold text-base cursor-pointer select-none transition-colors"
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span className="w-9 text-center font-bold text-sm text-[#1a1612]">
                  {selectedQty}
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedQty(selectedQty + 1)}
                  className="w-8 h-8 flex items-center justify-center text-[#736555] hover:text-[#1a1612] hover:bg-[#f5ede0] rounded-full font-bold text-base cursor-pointer select-none transition-colors"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

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
                      className="inline-flex items-center justify-center gap-2 bg-[#f5a623] hover:bg-[#e09419] active:scale-[0.98] text-[#1a1612] px-8 py-3.5 rounded-full text-sm font-bold tracking-wide shadow-md transition-all hover:scale-105 cursor-pointer disabled:opacity-60"
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                        <line x1="3" y1="6" x2="21" y2="6" />
                        <path d="M16 10a4 4 0 01-8 0" />
                      </svg>
                      <span>
                        {fetcher.state !== 'idle'
                          ? 'Adding...'
                          : `Add to Cart · ₹${289 * selectedQty}`}
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
                  <span>Add to Cart · ₹289</span>
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

            {/* Clean Trust Markers (No AI Emojis) */}
            <div className="flex items-center gap-3 pt-2 text-xs font-medium text-[#6e6152] font-montserrat">
              <span className="font-semibold text-[#1a1612]">Snap · Squeeze · Sip</span>
              <span className="text-[#d0c4b2]">|</span>
              <div>10 Honey Sticks (60g Pack)</div>
              <span className="text-[#d0c4b2]">|</span>
              <div>Free shipping over ₹500</div>
            </div>
          </div>

          {/* Right Column: Premium Commercial Studio Slideshow with Bottom Notch */}
          <div className="lg:col-span-6 relative flex flex-col items-center lg:items-end">
            <div
              className="relative w-full max-w-lg lg:max-w-none aspect-[4/3] rounded-[28px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.12)] border border-[#ebdccb] group bg-[#f7f3eb]"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* Slides with Cross-Fade Transition */}
              {heroSlides.map((slide, index) => (
                <div
                  key={slide.src}
                  className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${activeSlide === index ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                    }`}
                >
                  <img
                    src={slide.src}
                    alt={slide.alt}
                    className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.02]"
                  />
                  {/* Subtle ambient gradient at bottom for notch readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/5 pointer-events-none" />
                </div>
              ))}

              {/* Floating Premium Notch at Bottom Middle */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#18130e]/85 hover:bg-[#18130e]/95 backdrop-blur-md border border-white/20 shadow-[0_10px_25px_rgba(0,0,0,0.35)] transition-all">
                {/* Previous Button */}
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

                {/* Progress Indicators */}
                <div className="flex items-center gap-1.5 px-1">
                  {heroSlides.map((slide, index) => (
                    <button
                      key={slide.src}
                      type="button"
                      onClick={() => setActiveSlide(index)}
                      className={`transition-all duration-300 rounded-full cursor-pointer ${activeSlide === index
                        ? 'w-7 h-1.5 bg-gradient-to-r from-[#f5a623] to-[#e68a00] shadow-[0_0_8px_#f5a623]'
                        : 'w-1.5 h-1.5 bg-white/40 hover:bg-white/80'
                        }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>

                {/* Next Button */}
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

                {/* Divider & Counter */}
                <div className="h-3 w-[1px] bg-white/20 mx-0.5" />
                <span className="text-[10px] font-mono font-bold text-white/80 pr-1 tracking-wider">
                  0{activeSlide + 1} / 0{heroSlides.length}
                </span>
              </div>
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
              {/* Card 1: Naturally Sweet */}
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
                  Pure
                </span>
                <h4 className="text-xs font-bold tracking-wider text-[#1a1612] uppercase mb-1">
                  Natural Sweetness
                </h4>
                <p className="text-xs sm:text-sm text-[#736555]">
                  Just what the bees made.
                </p>
              </div>

              {/* Card 2: Antioxidants */}
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
                  Rich
                </span>
                <h4 className="text-xs font-bold tracking-wider text-[#1a1612] uppercase mb-1">
                  In Antioxidants
                </h4>
                <p className="text-xs sm:text-sm text-[#736555]">
                  Naturally occurring trace minerals.
                </p>
              </div>

              {/* Card 3: Real Honey */}
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
                  Real
                </span>
                <h4 className="text-xs font-bold tracking-wider text-[#1a1612] uppercase mb-1">
                  Apiary Honey
                </h4>
                <p className="text-xs sm:text-sm text-[#736555]">
                  Infused with natural mint extract.
                </p>
              </div>

              {/* Card 4: Energy Boost */}
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
                  Quick
                </span>
                <h4 className="text-xs font-bold tracking-wider text-[#1a1612] uppercase mb-1">
                  Energy Boost
                </h4>
                <p className="text-xs sm:text-sm text-[#736555]">
                  Natural carbs, ready to burn.
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
                    <p className="text-xs sm:text-sm text-[#736555] leading-relaxed mt-0.5 ">
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
      {/* 4c. COMING SOON: EXPANDING THE HIVE (DaVinci Level)          */}
      {/* ============================================================ */}
      <section className="bg-[#121212] text-white overflow-hidden font-montserrat flex flex-col md:flex-row min-h-[800px]">

        {/* Left Panel: Ginger Curcumin */}
        <div className="relative w-full md:w-1/2 p-10 sm:p-16 lg:p-24 flex flex-col justify-between group overflow-hidden bg-[#18110b] border-b md:border-b-0 md:border-r border-[#2a1f14]">
          {/* Immersive Glow */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#d4a373] opacity-[0.05] blur-[120px] rounded-full pointer-events-none transition-opacity duration-700 group-hover:opacity-[0.1]" />

          <div className="relative z-10 space-y-6">
            <span className="inline-block text-[10px] font-bold tracking-[0.2em] text-[#d4a373] uppercase border border-[#d4a373]/30 px-3 py-1.5 rounded-full">
              The Next Chapter
            </span>

            <h3 className="font-apricot text-5xl sm:text-6xl lg:text-7xl font-bold text-[#f2e6d5] leading-[0.9] tracking-tighter">
              Ginger Curcumin
            </h3>
            <span className="text-xs font-bold tracking-[0.15em] uppercase text-[#8c5a2b] block">
              The Ultimate Immunity & Wellness Tonic
            </span>
          </div>

          <div className="relative z-10 mt-16 sm:mt-24">
            <ul className="space-y-8">
              <li className="flex items-start gap-4">
                <div className="w-1.5 h-1.5 rounded-full bg-[#d4a373] mt-2 flex-shrink-0"></div>
                <div>
                  <strong className="block text-[#f2e6d5] text-sm mb-1 uppercase tracking-wider font-bold">Joint & Anti-Inflammatory</strong>
                  <span className="text-xs text-[#a38062] leading-relaxed">Powerful curcumin helps active adults and desk workers relieve stiffness and accelerate recovery.</span>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-1.5 h-1.5 rounded-full bg-[#d4a373] mt-2 flex-shrink-0"></div>
                <div>
                  <strong className="block text-[#f2e6d5] text-sm mb-1 uppercase tracking-wider font-bold">Digestive Comfort</strong>
                  <span className="text-xs text-[#a38062] leading-relaxed">Traditional ginger relieves indigestion, bloating, and nausea for a soothing after-meal ritual.</span>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-1.5 h-1.5 rounded-full bg-[#d4a373] mt-2 flex-shrink-0"></div>
                <div>
                  <strong className="block text-[#f2e6d5] text-sm mb-1 uppercase tracking-wider font-bold">Instant Wellness Tea</strong>
                  <span className="text-xs text-[#a38062] leading-relaxed">Snap directly into warm water or green tea to create a soothing herbal drink anywhere.</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Subtle Honeycomb Pattern */}
          <div className="absolute -bottom-24 -right-24 w-96 h-96 opacity-10 pointer-events-none text-[#d4a373]">
            <svg viewBox="0 0 100 115" fill="currentColor">
              <polygon points="50,0 100,28.8 100,86.6 50,115.4 0,86.6 0,28.8" />
            </svg>
          </div>
        </div>

        {/* Right Panel: Chilly */}
        <div className="relative w-full md:w-1/2 p-10 sm:p-16 lg:p-24 flex flex-col justify-between group overflow-hidden bg-[#0d120d]">
          {/* Immersive Glow */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#f05423] opacity-[0.05] blur-[120px] rounded-full pointer-events-none transition-opacity duration-700 group-hover:opacity-[0.1]" />

          <div className="relative z-10 space-y-6">
            <span className="inline-block text-[10px] font-bold tracking-[0.2em] text-[#f05423] uppercase border border-[#f05423]/30 px-3 py-1.5 rounded-full">
              The Next Chapter
            </span>

            <h3 className="font-apricot text-5xl sm:text-6xl lg:text-7xl font-bold text-[#e6d8c3] leading-[0.9] tracking-tighter">
              Chilly
            </h3>
            <span className="text-xs font-bold tracking-[0.15em] uppercase text-[#a33917] block">
              The Bold & Functional Use Cases
            </span>
          </div>

          <div className="relative z-10 mt-16 sm:mt-24">
            <ul className="space-y-8">
              <li className="flex items-start gap-4">
                <div className="w-1.5 h-1.5 rounded-full bg-[#f05423] mt-2 flex-shrink-0"></div>
                <div>
                  <strong className="block text-[#e6d8c3] text-sm mb-1 uppercase tracking-wider font-bold">Artisanal Pairings</strong>
                  <span className="text-xs text-[#8a998a] leading-relaxed">An instant flavor-profile booster when drizzled over sharp aged cheddar or charcuterie.</span>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-1.5 h-1.5 rounded-full bg-[#f05423] mt-2 flex-shrink-0"></div>
                <div>
                  <strong className="block text-[#e6d8c3] text-sm mb-1 uppercase tracking-wider font-bold">Cocktail Rim / Mixer</strong>
                  <span className="text-xs text-[#8a998a] leading-relaxed">Craft spicy-sweet beverages like a spicy margarita with precise portion control.</span>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-1.5 h-1.5 rounded-full bg-[#f05423] mt-2 flex-shrink-0"></div>
                <div>
                  <strong className="block text-[#e6d8c3] text-sm mb-1 uppercase tracking-wider font-bold">Winter Warm-Up</strong>
                  <span className="text-xs text-[#8a998a] leading-relaxed">Blend into hot lemon water or tea to provide a soothing, warming chest sensation.</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Subtle Chili Pattern */}
          <div className="absolute -bottom-24 -right-24 w-96 h-96 opacity-10 pointer-events-none text-[#f05423]">
            <svg viewBox="0 0 100 115" fill="currentColor">
              <polygon points="50,0 100,28.8 100,86.6 50,115.4 0,86.6 0,28.8" />
            </svg>
          </div>
        </div>

      </section>

      {/* ============================================================ */}
      {/* 5. NEWSLETTER CTA: UNLOCK THE GOODNESS                       */}
      {/* ============================================================ */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto text-center space-y-8 relative" style={{ paddingTop: '8rem', paddingBottom: '8rem' }}>
        <div className="space-y-3 text-center flex flex-col items-center">
          <span className="text-xs font-bold tracking-widest text-[#c87a1e] uppercase font-montserrat text-center block">
            Unlock the Goodness
          </span>
          <h2 className="font-apricot text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1a1612] text-center">
            Get 10% off your first box
          </h2>
          <p className="text-base sm:text-lg text-[#736555] max-w-lg mx-auto font-montserrat text-center leading-relaxed">
            Sweet perks, secret restocks, and a smile in your inbox. No spam, just real honey.
          </p>
        </div>

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
              className="w-full sm:flex-1 px-6 py-3.5 rounded-full bg-white border border-[#d6cbba] focus:border-[#18181b] focus:outline-none text-base shadow-sm"
              disabled={fetcher.state === 'submitting'}
            />
            <button
              type="submit"
              className="w-full sm:w-auto bg-[#18181b] hover:bg-[#27272a] text-white px-8 py-3.5 rounded-full text-sm font-bold tracking-wide shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer whitespace-nowrap disabled:opacity-70 disabled:cursor-not-allowed"
              disabled={fetcher.state === 'submitting'}
            >
              {fetcher.state === 'submitting' ? 'Sweetening...' : 'Sweeten me up'}
            </button>
            {fetcher.data?.error && (
              <p className="text-red-500 text-sm mt-2 absolute -bottom-6 w-full text-center">{fetcher.data.error}</p>
            )}
          </fetcher.Form>
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
