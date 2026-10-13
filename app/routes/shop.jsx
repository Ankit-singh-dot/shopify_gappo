import { useState, useEffect, useRef, useMemo } from 'react';
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
 * THREE PRICING TIERS (INTEGRATED WITH SHOPIFY PRODUCTS)
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
    originalPrice: 249,
    savingsText: 'Save ₹60',
    pricePerStick: '₹18.9',
    unitQty: 1,
    popular: false,
    bestValue: false,
    freeShipping: false,
    shippingNote: '+ ₹70 Delivery',
    note: '₹70 Delivery Charges Apply · Free delivery on 3+ packs',
    matchTitles: ['1 pack', '1-pack'],
    matchHandles: ['test2', '1-pack'],
    defaultVariantId: 'gid://shopify/ProductVariant/43245994213427',
  },
  {
    id: '3-pack',
    name: '3 Pack',
    title: '3 Pack · 30 Sticks',
    badge: '🔥 Most Popular',
    sticks: 30,
    price: 399,
    originalPrice: 567,
    savingsText: 'Save ₹168',
    pricePerStick: '₹13.3',
    unitQty: 3,
    popular: true,
    bestValue: false,
    freeShipping: true,
    shippingNote: 'FREE Delivery',
    note: 'FREE Delivery Included (Saved ₹70)',
    matchTitles: ['3 pack', '3-pack', 'pack-3'],
    matchHandles: ['pack-3', '3-pack'],
    defaultVariantId: 'gid://shopify/ProductVariant/45044237762611',
  },
  {
    id: '6-pack',
    name: '6 Pack',
    title: '6 Pack · 60 Sticks',
    badge: '⚡ Best Value',
    sticks: 60,
    price: 699,
    originalPrice: 1134,
    savingsText: 'Save ₹435',
    pricePerStick: '₹11.6',
    unitQty: 6,
    popular: false,
    bestValue: true,
    freeShipping: true,
    shippingNote: 'FREE Delivery',
    note: 'FREE Delivery Included (Saved ₹70)',
    matchTitles: ['6 pack', '6-pack'],
    matchHandles: ['6-pack'],
    defaultVariantId: 'gid://shopify/ProductVariant/45044241367091',
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

  const storeProducts = productsData?.products?.nodes || [];
  console.log('STOREFRONT_PRODUCTS_DEBUG:', JSON.stringify(storeProducts));

  return {
    featuredCollection: collections?.nodes?.[0] || null,
    storeProducts,
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

  // Dynamically resolve each pack option against real Shopify products
  const resolvedPacks = useMemo(() => {
    return PACK_OPTIONS.map((pack) => {
      const product = storeProducts.find((p) => {
        const titleLower = (p.title || '').trim().toLowerCase();
        const handleLower = (p.handle || '').trim().toLowerCase();
        return (
          pack.matchTitles.some((t) => titleLower === t || titleLower.startsWith(t)) ||
          pack.matchHandles.some((h) => handleLower === h)
        );
      });

      const variant = product?.variants?.nodes?.[0];
      const variantId = variant?.id || pack.defaultVariantId;
      const availableForSale = variant ? variant.availableForSale : true;
      const shopifyPrice = variant?.price?.amount
        ? Math.round(parseFloat(variant.price.amount))
        : pack.price;
      const shopifyCompareAtPrice = variant?.compareAtPrice?.amount
        ? Math.round(parseFloat(variant.compareAtPrice.amount))
        : pack.originalPrice;
      const savings = (shopifyCompareAtPrice || pack.originalPrice) - shopifyPrice;
      const savingsText =
        savings > 0 ? `Save ₹${savings.toLocaleString('en-IN')}` : pack.savingsText;

      return {
        ...pack,
        shopifyProduct: product,
        shopifyVariant: variant,
        variantId,
        availableForSale,
        price: shopifyPrice,
        originalPrice: shopifyCompareAtPrice,
        savingsText,
      };
    });
  }, [storeProducts]);

  // Selected pack: Default to 3-pack (index 1)
  const [selectedPackIndex, setSelectedPackIndex] = useState(1);
  const activePack = resolvedPacks[selectedPackIndex] || resolvedPacks[0];

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
  const totalOriginalPrice = (activePack.originalPrice || activePack.price) * bundleMultiplier;

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
                {resolvedPacks.map((pack, idx) => {
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
                        <div className="flex items-baseline gap-1.5 flex-wrap">
                          {pack.originalPrice && pack.originalPrice > pack.price && (
                            <span className="text-xs sm:text-sm font-semibold text-[#8c7e6e] line-through decoration-[#8c7e6e]/70">
                              ₹{pack.originalPrice.toLocaleString('en-IN')}
                            </span>
                          )}
                          <span className="font-apricot text-2xl font-bold text-[#1a110a] leading-none">
                            ₹{pack.price}
                          </span>
                        </div>
                        <div className="mt-1 text-[11px] text-[#8c7e6e] font-medium flex items-center justify-between">
                          <span>{pack.pricePerStick}/ea</span>
                          {pack.savingsText && (
                            <span className="text-[#15803d] font-bold">{pack.savingsText}</span>
                          )}
                        </div>
                        {pack.shippingNote && (
                          <div
                            className={`mt-2 pt-1.5 border-t border-[#f2e6d6] text-[10.5px] font-bold flex items-center gap-1.5 ${
                              pack.freeShipping ? 'text-[#15803d]' : 'text-[#b45309]'
                            }`}
                          >
                            <span>{pack.freeShipping ? '✓' : '📦'}</span>
                            <span>{pack.shippingNote}</span>
                          </div>
                        )}
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
              {activePack?.variantId ? (
                <div className="w-full sm:flex-1">
                  <CartForm
                    route="/cart"
                    inputs={{
                      lines: [
                        {
                          merchandiseId: activePack.variantId,
                          quantity: 1 * bundleMultiplier,
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
                    {(cartFetcher) => (
                      <div className="w-full">
                        <button
                          type="submit"
                          onClick={() => open('cart')}
                          disabled={cartFetcher.state !== 'idle'}
                          className="w-full group relative inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#1a110a] text-white shadow-[0_8px_20px_rgba(26,17,10,0.18)] hover:shadow-[0_12px_30px_rgba(200,122,30,0.3)] transition-all duration-300 overflow-hidden cursor-pointer disabled:opacity-70"
                        >
                          <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#f5a623] via-[#fbbf24] to-[#d97706] transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-[0.16,1,0.3,1]" />

                          <span className="relative z-10 font-bold tracking-wider uppercase text-xs sm:text-sm text-white transition-colors duration-300 flex items-center gap-2">
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                              <line x1="3" y1="6" x2="21" y2="6" />
                              <path d="M16 10a4 4 0 01-8 0" />
                            </svg>
                            <span className="inline-flex items-center gap-1.5 flex-wrap justify-center">
                              {cartFetcher.state !== 'idle' ? (
                                'Adding to Cart...'
                              ) : (
                                <>
                                  <span>Add {activePack.name} ·</span>
                                  {totalOriginalPrice > totalPrice && (
                                    <span className="line-through text-white/60 text-xs sm:text-sm font-normal">
                                      ₹{totalOriginalPrice.toLocaleString('en-IN')}
                                    </span>
                                  )}
                                  <span className="text-[#f5a623] group-hover:text-white font-extrabold">
                                    ₹{totalPrice}
                                  </span>
                                  {!activePack.freeShipping && (
                                    <span className="text-[11px] text-amber-200/90 font-medium ml-0.5">
                                      (+ ₹70 delivery)
                                    </span>
                                  )}
                                </>
                              )}
                            </span>
                            <span className="text-base transform group-hover:translate-x-1 transition-transform duration-300">
                              →
                            </span>
                          </span>
                        </button>

                        {/* Error warning if Shopify Cart reports out-of-stock */}
                        {cartFetcher.data?.errors?.length > 0 && (
                          <div className="mt-2.5 p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 font-medium text-center">
                            <span>⚠️ {cartFetcher.data.errors[0].message}</span>
                            <span className="block mt-1 text-[11px] text-amber-700">
                              (Tip: In Shopify Admin, check &ldquo;Continue selling when out of stock&rdquo; or update inventory for {activePack.name}.)
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                  </CartForm>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => open('cart')}
                  className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 bg-[#f5a623] hover:bg-[#e09419] text-[#1a110a] px-8 py-3.5 rounded-full text-sm font-bold tracking-wide shadow-md transition-all cursor-pointer"
                >
                  <span className="inline-flex items-center gap-1.5 flex-wrap justify-center">
                    <span>Add {activePack.name} ·</span>
                    {totalOriginalPrice > totalPrice && (
                      <span className="line-through text-[#786a5a] text-xs sm:text-sm font-normal">
                        ₹{totalOriginalPrice.toLocaleString('en-IN')}
                      </span>
                    )}
                    <span className="font-extrabold">₹{totalPrice}</span>
                    {!activePack.freeShipping && (
                      <span className="text-[11px] text-[#786a5a] font-medium ml-0.5">
                        (+ ₹70 delivery)
                      </span>
                    )}
                  </span>
                  <span>→</span>
                </button>
              )}
            </div>

            {/* Clean Delivery & Value Info Strip */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 text-xs font-medium text-[#6e6152] font-montserrat border-t border-[#f0e4d2]">
              <span className="font-semibold text-[#1a110a] flex items-center gap-1.5">
                <span
                  className={`w-2 h-2 rounded-full ${
                    activePack.freeShipping ? 'bg-[#15803d]' : 'bg-[#d97706]'
                  }`}
                />
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
      {/* 4. OUR STORY (DIRECT FROM GAPOO STORY DOCUMENT)              */}
      {/* ============================================================ */}
      <section id="our-story" className="my-10 sm:my-16 lg:my-24 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto font-montserrat scroll-mt-28 relative">
        <span id="story" className="absolute -top-32 left-0 pointer-events-none" />

        {/* ─── CHAPTER 1: THE HIVE AWAKENING ─── */}
        <div className="bg-white rounded-[32px] sm:rounded-[44px] p-8 sm:p-12 lg:p-16 border border-[#eee4d4] shadow-sm mb-10 sm:mb-14 relative overflow-hidden">
          <div className="max-w-3xl space-y-6 relative z-10">
            <div className="inline-flex items-center gap-2 bg-[#faecc9] border border-[#e5cf9d] px-4 py-1.5 rounded-full text-xs font-bold text-[#8b5311] uppercase tracking-wider shadow-2xs">
              <span>Chapter 01 · The Hive Awakening</span>
            </div>

            <h2 className="font-apricot text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1a110a] leading-[1.05]">
              The Hive Awakening
            </h2>

            <p className="text-base sm:text-lg text-[#3d3228] leading-relaxed font-medium">
              The seed for Gapoo was planted not in a corporate boardroom, but in the dirt and the hum of the hives during a hands-on bee farming training session. It blossomed from the simple, grounded concept of &ldquo;Garden+Pool&rdquo;—a vision to reconnect the modern adult wellness lifestyle with the untamed, natural bounty of the earth.
            </p>

            <p className="text-sm sm:text-base text-[#5c5043] leading-relaxed">
              As we worked alongside local Indian beekeepers, we uncovered a profound betrayal of consumer trust. India&apos;s commercial honey market is highly fragmented, with pure nectar passing through multiple aggregators where genuine batches easily get mixed with compromised syrups. The market is flooded with cheap rice, corn, and cane syrups specifically designed to bypass standard domestic purity tests.
            </p>

            {/* Investigation findings from CSE Report */}
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

          {/* Faint Mascot Watermark */}
          <img
            src="/images/gapoo_bear_mascot_clean.png"
            alt=""
            className="absolute -bottom-10 right-4 w-72 h-auto opacity-[0.04] pointer-events-none select-none"
          />
        </div>

        {/* ─── CHAPTER 2: THE GAPOO PROMISE & BOTANICAL INFUSIONS ─── */}
        <div className="bg-white rounded-[32px] sm:rounded-[44px] p-8 sm:p-12 lg:p-16 border border-[#eee4d4] shadow-sm mb-10 sm:mb-14 space-y-8">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 bg-[#faecc9] border border-[#e5cf9d] px-4 py-1.5 rounded-full text-xs font-bold text-[#8b5311] uppercase tracking-wider shadow-2xs">
              <span>Chapter 02 · The Gapoo Promise</span>
            </div>

            <h2 className="font-apricot text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1a110a] leading-[1.05]">
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

          {/* Botanical Infusions Showcase */}
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

        {/* ─── CHAPTER 3: THE INDIAN HONEY FINGERPRINT ─── */}
        <div className="bg-white rounded-[32px] sm:rounded-[44px] p-8 sm:p-12 lg:p-16 border border-[#eee4d4] shadow-sm mb-10 sm:mb-14 relative overflow-hidden">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 bg-[#faecc9] border border-[#e5cf9d] px-4 py-1.5 rounded-full text-xs font-bold text-[#8b5311] uppercase tracking-wider shadow-2xs">
              <span>Chapter 03 · Traceability &amp; Standards</span>
            </div>

            <h2 className="font-apricot text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1a110a] leading-[1.05]">
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
        </div>

        {/* ─── CHAPTER 4: BEYOND HONEY: THE TRUE POWER OF THE HIVE ─── */}
        <div className="bg-[#140e0a] text-white rounded-[32px] sm:rounded-[44px] p-8 sm:p-12 lg:p-16 border border-[#2e1d10] shadow-[0_25px_60px_rgba(0,0,0,0.25)] space-y-10 relative overflow-hidden">
          <div className="max-w-3xl space-y-6 relative z-10">
            <div className="inline-flex items-center gap-2 bg-[#2a1d13] border border-[#d4a373]/40 px-4 py-1.5 rounded-full text-xs font-bold text-[#d4a373] uppercase tracking-wider">
              <span>Chapter 04 · The True Power of the Hive</span>
            </div>

            <h2 className="font-apricot text-4xl sm:text-5xl lg:text-6xl font-bold text-[#f2e6d5] leading-[1.05]">
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

          {/* Coming Soon Finishing Items */}
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

      {/* Explicit Spacer & Divider between Our Story and Newsletter */}
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
            compareAtPrice {
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
