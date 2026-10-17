import { useState, useEffect, useRef, useMemo } from 'react';
import { useLoaderData, Link, useFetcher, data } from 'react-router';
import { CartForm } from '@shopify/hydrogen';
import { useAside } from '~/components/Aside';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { AppleLogoReveal } from '~/components/AppleLogoReveal';
import { SnapSqueezeSip } from '~/components/shop/SnapSqueezeSip';
import { HoneycombPattern } from '~/components/shop/motion';
import { JarVsStick } from '~/components/shop/JarVsStick';
import { LabVerifiedSection } from '~/components/LabVerifiedSection';

export { SnapSqueezeSip, HoneycombPattern };

/**
 * @type {Route.MetaFunction}
 */
export const meta = () => {
  return [
    { title: 'Shop Gapoo Honey Sticks | Snap. Squeeze. Sip.' },
    {
      name: 'description',
      content:
        'Pure multifloral honey infused with natural mint in a convenient tear-and-pour stick. No spoons, no sticky jars. 1 Pack ₹189, 3 Pack ₹399, 6 Pack ₹699.',
    },
  ];
};

/* ─── Reusable Fade-In Wrapper ─── */
function FadeIn({ children, className = '', delay = 0, direction = 'up', distance = 24 }) {
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
 * 1 Pack: ₹189 (MSRP ₹199 · 10 Sticks · + ₹70 Delivery)
 * 3 Pack: ₹399 (MSRP ₹597 · 30 Sticks · FREE Delivery · Most Popular)
 * 6 Pack: ₹699 (MSRP ₹1194 · 60 Sticks · FREE Delivery · Best Value)
 */
const PACK_OPTIONS = [
  {
    id: '1-pack',
    name: '1 Pack',
    title: '1 Pack · 10 Sticks',
    badge: 'Starter',
    sticks: 10,
    price: 189,
    originalPrice: 199,
    savingsText: 'Save ₹10',
    pricePerStick: '₹18.9',
    unitQty: 1,
    popular: false,
    bestValue: false,
    freeShipping: false,
    shippingNote: '+ ₹70 Delivery',
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
    originalPrice: 597,
    savingsText: 'Save ₹198',
    pricePerStick: '₹13.3',
    unitQty: 3,
    popular: true,
    bestValue: false,
    freeShipping: true,
    shippingNote: 'FREE Delivery',
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
    originalPrice: 1194,
    savingsText: 'Save ₹495',
    pricePerStick: '₹11.6',
    unitQty: 6,
    popular: false,
    bestValue: true,
    freeShipping: true,
    shippingNote: 'FREE Delivery',
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
    return data({ success: true });
  }

  return data({ error: 'Invalid intent' }, { status: 400 });
}

/**
 * @param {Route.LoaderArgs} args
 */
export async function loader(args) {
  const criticalData = await loadCriticalData(args);
  return { ...criticalData };
}

async function loadCriticalData({ context }) {
  const productsData = await context.storefront
    .query(STORE_PRODUCTS_QUERY)
    .catch(() => null);

  const storeProducts = productsData?.products?.nodes || [];
  return {
    storeProducts,
  };
}

export default function ShopPage() {
  /** @type {LoaderReturnData} */
  const loaderData = useLoaderData();
  const { open } = useAside();

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Parallax transforms for Hero
  const bearY = useTransform(scrollYProgress, [0, 0.25], ['0%', '35%']);
  const heroGalleryY = useTransform(scrollYProgress, [0, 0.25], ['0%', '-5%']);
  const floatingBeeY = useTransform(scrollYProgress, [0, 0.2], ['0px', '-35px']);

  // Massive Manifesto Typography Parallax (from home page)
  const manifestoRef = useRef(null);
  const { scrollYProgress: manifestoScroll } = useScroll({
    target: manifestoRef,
    offset: ['start end', 'end start'],
  });
  const manifestoX1 = useTransform(manifestoScroll, [0, 1], ['0%', '-40%']);
  const manifestoX2 = useTransform(manifestoScroll, [0, 1], ['-20%', '10%']);
  const manifestoX3 = useTransform(manifestoScroll, [0, 1], ['-10%', '-50%']);
  const bgCardY1 = useTransform(manifestoScroll, [0, 1], ['-40px', '40px']);
  const bgCardY2 = useTransform(manifestoScroll, [0, 1], ['45px', '-45px']);
  const bgCardY3 = useTransform(manifestoScroll, [0, 1], ['-30px', '50px']);
  const bgCardY4 = useTransform(manifestoScroll, [0, 1], ['35px', '-35px']);

  const storeProducts = loaderData?.storeProducts || [];

  // Dynamically resolve pack options against real Shopify products
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
      const effectiveOriginalPrice =
        pack.originalPrice ??
        (variant?.compareAtPrice?.amount
          ? Math.round(parseFloat(variant.compareAtPrice.amount))
          : undefined);
      const savings = (effectiveOriginalPrice || 0) - shopifyPrice;
      const savingsText =
        savings > 0 ? `Save ₹${savings.toLocaleString('en-IN')}` : pack.savingsText;

      return {
        ...pack,
        shopifyProduct: product,
        shopifyVariant: variant,
        variantId,
        availableForSale,
        price: shopifyPrice,
        originalPrice: effectiveOriginalPrice,
        savingsText,
      };
    });
  }, [storeProducts]);

  // Selected pack: Default to 3-pack (index 1)
  const [selectedPackIndex, setSelectedPackIndex] = useState(1);
  const activePack = resolvedPacks[selectedPackIndex] || resolvedPacks[0];

  // Stepper Multiplier
  const [bundleMultiplier, setBundleMultiplier] = useState(1);

  // Product pack images mapped to 1-pack, 3-pack, 6-pack
  const PACK_IMAGES = [
    '/images/1pack.jpg',
    '/images/3pack.png',
    '/images/6pack.png',
  ];

  const PACK_TITLES = [
    '10 Single Sticks · 1 Box',
    '30 Single Sticks · 3 Boxes',
    '60 Single Sticks · 6 Boxes',
  ];

  const [slideDirection, setSlideDirection] = useState(1);
  const lastScrollTime = useRef(0);

  // Wheel scroll interaction on the circle portal
  const handleCircleWheel = (e) => {
    const now = Date.now();
    if (now - lastScrollTime.current < 260) return;

    const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    if (Math.abs(delta) < 10) return;

    lastScrollTime.current = now;
    if (delta > 0) {
      setSlideDirection(1);
      setSelectedPackIndex((prev) => (prev + 1) % resolvedPacks.length);
    } else {
      setSlideDirection(-1);
      setSelectedPackIndex((prev) => (prev - 1 + resolvedPacks.length) % resolvedPacks.length);
    }
  };

  // Drag / swipe gesture handler on the circle portal
  const handleCircleDragEnd = (event, info) => {
    if (info.offset.x < -30 || info.velocity.x < -180) {
      setSlideDirection(1);
      setSelectedPackIndex((prev) => (prev + 1) % resolvedPacks.length);
    } else if (info.offset.x > 30 || info.velocity.x > 180) {
      setSlideDirection(-1);
      setSelectedPackIndex((prev) => (prev - 1 + resolvedPacks.length) % resolvedPacks.length);
    }
  };

  const [purchaseType, setPurchaseType] = useState('one-time');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('mode') === 'subscribe' || window.location.hash === '#subscribe') {
        setPurchaseType('subscribe');
      }
    }
  }, []);

  const isSubscribe = purchaseType === 'subscribe';
  const packEffectivePrice = isSubscribe ? Math.round(activePack.price * 0.9) : activePack.price;
  const totalSticks = activePack.sticks * bundleMultiplier;
  const totalPrice = packEffectivePrice * bundleMultiplier;
  const totalOriginalPrice = (activePack.originalPrice || activePack.price) * bundleMultiplier;

  return (
    <div ref={containerRef} className="bg-[#fdfaf1] text-[#20140b] relative w-full overflow-clip">
      {/* ============================================================ */}
      {/* PROLINO-INSPIRED ICONIC HERO SECTION                         */}
      {/* ============================================================ */}
      {/* PROLINO-INSPIRED ICONIC HERO SECTION (POLISHED APOTHECARY)   */}
      {/* ============================================================ */}
      <section
        id="buy-now"
        className="relative pt-4 sm:pt-6 lg:pt-8 pb-16 sm:pb-24 px-5 sm:px-8 lg:px-12 max-w-7xl mx-auto overflow-visible scroll-mt-24"
      >
        {/* Ambient Warm Honey Glow */}
        <div
          className="absolute inset-0 -z-10 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 70% 50% at 50% 25%, #fceecb 0%, #fcf5e7 50%, #fdfaf1 100%)',
          }}
        />

        {/* Faint Gapoo Bear Line-art Mascot Watermark */}
        <motion.img
          src="/images/gapoo_bear_mascot_clean.png"
          alt=""
          style={{ y: bearY }}
          className="absolute -bottom-8 left-6 w-88 h-auto opacity-[0.032] pointer-events-none select-none z-0"
        />

        {/* ========================================================== */}
        {/* MAIN SPLIT HERO: CIRCULAR PORTAL + BOLD STATEMENT          */}
        {/* ========================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* ======================================================== */}
          {/* LEFT: SCRIPT NOTE + 3 FLOATING STAT BADGES + CIRCLE      */}
          {/* ======================================================== */}
          <div className="lg:col-span-6 relative flex flex-col items-center lg:items-end">
            {/* Handwritten Script Title with Apricot Typography */}
            <div className="w-full max-w-[480px] mb-3 text-left pl-4 sm:pl-8">
              <span className="font-apricot italic text-2xl sm:text-3xl font-bold text-[#5c5043] tracking-normal inline-block -rotate-2 select-none">
                Real Multifloral, Zero Sticky Mess
              </span>
            </div>

            <div className="relative flex items-center justify-center w-full max-w-[480px]">
              {/* 3 Floating Stat Badges with Dynamic Animated Curved Arrows */}
              <div className="absolute -left-10 sm:-left-18 lg:-left-26 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-4 sm:gap-6 select-none">
                {/* Badge 1: Sticks Count */}
                <div className="relative group">
                  <motion.div
                    whileHover={{ scale: 1.08, x: -2 }}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/95 backdrop-blur-md border border-[#ebdccb]/90 shadow-[0_12px_28px_rgba(26,17,10,0.12)] flex flex-col items-center justify-center text-center p-2 transition-shadow hover:shadow-[0_16px_32px_rgba(200,122,30,0.2)]"
                  >
                    <span className="font-apricot font-bold text-2xl sm:text-3xl text-[#1a110a] leading-none">
                      {activePack.sticks}
                      <span className="text-sm font-bold text-[#c87a1e]">x</span>
                    </span>
                    <span className="text-[8.5px] sm:text-[9.5px] text-[#736555] font-bold uppercase tracking-wider leading-none mt-1">
                      Single Sticks
                    </span>
                  </motion.div>

                  {/* Curved Arrow 1: Arcing Down-Right into the Circle */}
                  <div className="absolute left-[calc(100%-2px)] top-1/2 -translate-y-1/2 pointer-events-none w-10 sm:w-14 lg:w-20 h-10 overflow-visible z-10">
                    <svg className="w-full h-full overflow-visible" viewBox="0 0 70 30" fill="none">
                      <defs>
                        <marker
                          id="amber-arrow-1"
                          viewBox="0 0 10 10"
                          refX="6"
                          refY="5"
                          markerWidth="6"
                          markerHeight="6"
                          orient="auto"
                        >
                          <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#c87a1e" />
                        </marker>
                      </defs>
                      <circle cx="3" cy="6" r="2.5" fill="#c87a1e" />
                      <motion.path
                        key={`arrow-1-${selectedPackIndex}`}
                        d="M 3 6 C 26 6, 46 16, 64 24"
                        fill="none"
                        stroke="#c87a1e"
                        strokeWidth="2"
                        strokeLinecap="round"
                        markerEnd="url(#amber-arrow-1)"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 0.9 }}
                        transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                      />
                    </svg>
                  </div>
                </div>

                {/* Badge 2: Added Sugar */}
                <div className="relative group">
                  <motion.div
                    whileHover={{ scale: 1.08, x: -2 }}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/95 backdrop-blur-md border border-[#ebdccb]/90 shadow-[0_12px_28px_rgba(26,17,10,0.12)] flex flex-col items-center justify-center text-center p-2 transition-shadow hover:shadow-[0_16px_32px_rgba(200,122,30,0.2)]"
                  >
                    <span className="font-apricot font-bold text-2xl sm:text-3xl text-[#1a110a] leading-none">
                      0<span className="text-sm font-bold text-[#c87a1e]">%</span>
                    </span>
                    <span className="text-[8.5px] sm:text-[9.5px] text-[#736555] font-bold uppercase tracking-wider leading-none mt-1">
                      Added Sugar
                    </span>
                  </motion.div>

                  {/* Curved Arrow 2: Arcing Horizontally into the Circle */}
                  <div className="absolute left-[calc(100%-2px)] top-1/2 -translate-y-1/2 pointer-events-none w-10 sm:w-14 lg:w-20 h-10 overflow-visible z-10">
                    <svg className="w-full h-full overflow-visible" viewBox="0 0 70 30" fill="none">
                      <defs>
                        <marker
                          id="amber-arrow-2"
                          viewBox="0 0 10 10"
                          refX="6"
                          refY="5"
                          markerWidth="6"
                          markerHeight="6"
                          orient="auto"
                        >
                          <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#c87a1e" />
                        </marker>
                      </defs>
                      <circle cx="3" cy="15" r="2.5" fill="#c87a1e" />
                      <motion.path
                        key={`arrow-2-${selectedPackIndex}`}
                        d="M 3 15 C 24 10, 44 20, 64 15"
                        fill="none"
                        stroke="#c87a1e"
                        strokeWidth="2"
                        strokeLinecap="round"
                        markerEnd="url(#amber-arrow-2)"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 0.9 }}
                        transition={{ duration: 0.75, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                      />
                    </svg>
                  </div>
                </div>

                {/* Badge 3: Price Per Cup */}
                <div className="relative group">
                  <motion.div
                    whileHover={{ scale: 1.08, x: -2 }}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/95 backdrop-blur-md border border-[#ebdccb]/90 shadow-[0_12px_28px_rgba(26,17,10,0.12)] flex flex-col items-center justify-center text-center p-2 transition-shadow hover:shadow-[0_16px_32px_rgba(200,122,30,0.2)]"
                  >
                    <span className="font-apricot font-bold text-xl sm:text-2xl text-[#1a110a] leading-none">
                      {activePack.pricePerStick}
                    </span>
                    <span className="text-[8.5px] sm:text-[9.5px] text-[#736555] font-bold uppercase tracking-wider leading-none mt-1">
                      Per Cup
                    </span>
                  </motion.div>

                  {/* Curved Arrow 3: Arcing Up-Right into the Circle */}
                  <div className="absolute left-[calc(100%-2px)] top-1/2 -translate-y-1/2 pointer-events-none w-10 sm:w-14 lg:w-20 h-10 overflow-visible z-10">
                    <svg className="w-full h-full overflow-visible" viewBox="0 0 70 30" fill="none">
                      <defs>
                        <marker
                          id="amber-arrow-3"
                          viewBox="0 0 10 10"
                          refX="6"
                          refY="5"
                          markerWidth="6"
                          markerHeight="6"
                          orient="auto"
                        >
                          <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#c87a1e" />
                        </marker>
                      </defs>
                      <circle cx="3" cy="24" r="2.5" fill="#c87a1e" />
                      <motion.path
                        key={`arrow-3-${selectedPackIndex}`}
                        d="M 3 24 C 26 24, 46 14, 64 6"
                        fill="none"
                        stroke="#c87a1e"
                        strokeWidth="2"
                        strokeLinecap="round"
                        markerEnd="url(#amber-arrow-3)"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 0.9 }}
                        transition={{ duration: 0.75, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Center-Left Circular Portal (with Wheel Scroll & Drag Swipe) */}
              <div
                onWheel={handleCircleWheel}
                className="relative w-[280px] h-[280px] sm:w-[400px] sm:h-[400px] lg:w-[440px] lg:h-[440px] rounded-full overflow-hidden border-[4px] sm:border-[6px] border-white shadow-[0_25px_60px_rgba(26,17,10,0.14)] bg-[#f7efe1] group cursor-grab active:cursor-grabbing select-none"
              >
                {/* Floating Pack Format Plaque (Top Center) */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 pointer-events-none flex items-center gap-2 bg-[#1a110a]/85 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/25 text-white font-montserrat shadow-md whitespace-nowrap">
                  <span className="w-2 h-2 rounded-full bg-[#f5a623] animate-pulse" />
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#fbbf24]">
                    {PACK_TITLES[selectedPackIndex]}
                  </span>
                </div>

                {/* Left & Right Switcher Chevron Buttons */}
                <button
                  type="button"
                  onClick={() => {
                    setSlideDirection(-1);
                    setSelectedPackIndex(
                      (prev) => (prev - 1 + resolvedPacks.length) % resolvedPacks.length
                    );
                  }}
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/95 backdrop-blur-md shadow-[0_4px_14px_rgba(0,0,0,0.12)] border border-[#ebdccb]/60 flex items-center justify-center text-[#1a110a] hover:bg-[#c87a1e] hover:text-white transition-all cursor-pointer font-bold text-xl select-none opacity-85 hover:opacity-100"
                  aria-label="Previous pack"
                >
                  ‹
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setSlideDirection(1);
                    setSelectedPackIndex((prev) => (prev + 1) % resolvedPacks.length);
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/95 backdrop-blur-md shadow-[0_4px_14px_rgba(0,0,0,0.12)] border border-[#ebdccb]/60 flex items-center justify-center text-[#1a110a] hover:bg-[#c87a1e] hover:text-white transition-all cursor-pointer font-bold text-xl select-none opacity-85 hover:opacity-100"
                  aria-label="Next pack"
                >
                  ›
                </button>

                {/* Animated Image mapped to active pack with Drag */}
                <motion.div
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragEnd={handleCircleDragEnd}
                  className="w-full h-full relative"
                >
                  <AnimatePresence custom={slideDirection} mode="wait">
                    <motion.img
                      key={selectedPackIndex}
                      src={PACK_IMAGES[selectedPackIndex]}
                      alt={activePack.title}
                      custom={slideDirection}
                      variants={{
                        enter: (dir) => ({ x: dir > 0 ? 50 : -50, opacity: 0, scale: 0.95 }),
                        center: { x: 0, opacity: 1, scale: 1 },
                        exit: (dir) => ({ x: dir > 0 ? -50 : 50, opacity: 0, scale: 0.95 }),
                      }}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="w-full h-full object-cover select-none pointer-events-none"
                      draggable={false}
                    />
                  </AnimatePresence>
                </motion.div>

                {/* Ambient vignette */}
                <div className="absolute inset-0 bg-radial from-transparent via-transparent to-black/15 pointer-events-none" />

                {/* Bottom 3 Pill Dots corresponding to 1 Pack, 3 Pack, 6 Pack */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 bg-[#1a110a]/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 shadow-md select-none">
                  {resolvedPacks.map((p, idx) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => {
                        setSlideDirection(idx > selectedPackIndex ? 1 : -1);
                        setSelectedPackIndex(idx);
                      }}
                      className={`h-2 rounded-full transition-all cursor-pointer ${
                        selectedPackIndex === idx
                          ? 'w-6 bg-[#f5a623]'
                          : 'w-2 bg-white/50 hover:bg-white'
                      }`}
                      aria-label={p.name}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Hint text below circle */}
            <div className="w-full max-w-[480px] text-center mt-3">
              <span className="text-[11px] font-semibold text-[#8c7e6e] inline-flex items-center gap-1.5">
                <span>Scroll or swipe circle to switch pack</span>
                <span className="text-xs">⟷</span>
              </span>
            </div>
          </div>

          {/* ======================================================== */}
          {/* RIGHT: BOLD STATEMENT + INGREDIENTS + PURCHASE DOCK      */}
          {/* ======================================================== */}
          <div className="lg:col-span-6 space-y-6">
            {/* Grand Headline with Signature Apricot Brand Typography */}
            <div>
              <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.25em] uppercase text-[#c87a1e] block mb-2 font-montserrat">
                Single-Serve Multifloral Nectar
              </span>
              <h1 className="font-apricot font-bold text-5xl sm:text-6xl lg:text-[76px] leading-[0.94] tracking-tight text-[#1a110a]">
                <span className="text-[#c87a1e] block">Raw Honey</span>
                <span className="block">Meets</span>
                <span className="block">Zero Mess<span className="text-[#c87a1e]">.</span></span>
              </h1>
              <p className="mt-4 sm:mt-5 text-base sm:text-lg text-[#5c5043] leading-relaxed max-w-lg font-montserrat font-medium">
                Our Gapoo Single-Serve Stick blends raw multifloral honey with cold-steeped garden mint into a mess-free tear-and-pour stick. No spoons, no sticky jars, no countertop drips. Maximum daily ritual.
              </p>
            </div>

            {/* Flavor / Botanical Pills (like Prolino's Aromatic Cardamom, Kesar Warmth...) */}
            <div className="flex flex-wrap items-center gap-2 pt-1 font-montserrat">
              <span className="px-3.5 py-1.5 rounded-full bg-white/80 backdrop-blur-sm border border-[#ebdccb] text-xs font-bold text-[#2a1e14] shadow-2xs hover:border-[#c87a1e] transition-colors">
                • Garden Mint Infusion
              </span>
              <span className="px-3.5 py-1.5 rounded-full bg-white/80 backdrop-blur-sm border border-[#ebdccb] text-xs font-bold text-[#2a1e14] shadow-2xs hover:border-[#c87a1e] transition-colors">
                • Raw Multifloral
              </span>
              <span className="px-3.5 py-1.5 rounded-full bg-white/80 backdrop-blur-sm border border-[#ebdccb] text-xs font-bold text-[#2a1e14] shadow-2xs hover:border-[#c87a1e] transition-colors">
                • 100% Hive Harvest
              </span>
              <span className="px-3.5 py-1.5 rounded-full bg-white/80 backdrop-blur-sm border border-[#ebdccb] text-xs font-bold text-[#2a1e14] shadow-2xs hover:border-[#c87a1e] transition-colors">
                • Cold Infused
              </span>
              <span className="px-3.5 py-1.5 rounded-full bg-white/80 backdrop-blur-sm border border-[#ebdccb] text-xs font-bold text-[#2a1e14] shadow-2xs hover:border-[#c87a1e] transition-colors">
                • Zero Added Sugar
              </span>
            </div>

            {/* Organic Wave Doodle Separator (like Prolino) */}
            <div className="py-1">
              <svg
                className="w-40 h-4 text-[#c87a1e]"
                viewBox="0 0 160 14"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              >
                <path d="M2 7 Q 20 1, 40 7 T 80 7 T 120 7 T 158 7" />
              </svg>
            </div>

            {/* Integrated Pack Selector & Purchase Dock */}
            <div id="purchase-dock" className="space-y-4 pt-1 font-montserrat">
              {/* Pack Pills Switcher (from left to right in exact order: 1 Pack, 3 Pack, 6 Pack) */}
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                {resolvedPacks.map((pack, idx) => {
                  const isSelected = selectedPackIndex === idx;
                  return (
                    <button
                      key={pack.id}
                      type="button"
                      onClick={() => {
                        setSlideDirection(idx > selectedPackIndex ? 1 : -1);
                        setSelectedPackIndex(idx);
                      }}
                      className={`p-3 sm:p-3.5 rounded-2xl border-2 text-left transition-all cursor-pointer relative ${
                        isSelected
                          ? 'border-[#c87a1e] bg-white shadow-[0_10px_28px_rgba(200,122,30,0.18)] ring-2 ring-[#c87a1e]/35 scale-[1.02]'
                          : 'border-[#ebdccb] bg-white/70 hover:bg-white hover:border-[#dfc8b0]'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[10.5px] font-extrabold uppercase tracking-wider mb-1">
                        <span className={isSelected ? 'text-[#c87a1e]' : 'text-[#8c7e6e]'}>
                          {pack.name}
                        </span>
                        {pack.popular && (
                          <span className="bg-[#f5a623] text-black text-[9px] px-2 py-0.5 rounded-full font-black uppercase tracking-wider">
                            POPULAR
                          </span>
                        )}
                        {pack.bestValue && (
                          <span className="bg-[#1a110a] text-[#fbbf24] text-[9px] px-2 py-0.5 rounded-full font-black uppercase tracking-wider border border-[#f5a623]/40">
                            VALUE
                          </span>
                        )}
                      </div>
                      <div className="font-apricot text-2xl sm:text-3xl font-bold text-[#1a110a] leading-none">
                        ₹{pack.price}
                      </div>
                      <div className="text-[10px] font-semibold text-[#8c7e6e] mt-1.5">
                        {pack.sticks} Sticks · {pack.pricePerStick}/cup
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Purchase Mode Toggle: One-Time Purchase vs Subscribe & Save */}
              <div className="bg-[#f0e6d8] p-1 rounded-2xl flex items-center gap-1 font-montserrat">
                <button
                  type="button"
                  onClick={() => setPurchaseType('one-time')}
                  className={`flex-1 py-2 sm:py-2.5 px-3 rounded-xl text-xs font-bold transition-all text-center cursor-pointer ${
                    !isSubscribe
                      ? 'bg-white text-[#1a110a] shadow-xs'
                      : 'text-[#736555] hover:text-[#1a110a]'
                  }`}
                >
                  One-Time Purchase
                </button>
                <button
                  type="button"
                  onClick={() => setPurchaseType('subscribe')}
                  className={`flex-1 py-2 sm:py-2.5 px-3 rounded-xl text-xs font-bold transition-all text-center flex items-center justify-center gap-1.5 cursor-pointer ${
                    isSubscribe
                      ? 'bg-[#1a110a] text-[#fbbf24] shadow-xs'
                      : 'text-[#736555] hover:text-[#1a110a]'
                  }`}
                >
                  <span>Subscribe &amp; Save</span>
                  <span className="text-[10px] bg-[#f5a623] text-black px-1.5 py-0.5 rounded-full font-black leading-none">
                    10% OFF
                  </span>
                </button>
              </div>

              {/* Subscribe & Save Consumable Food Notice */}
              {isSubscribe && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3.5 rounded-2xl bg-[#faecc9]/75 border border-[#e5cf9d] text-xs text-[#8b5311] space-y-1 font-montserrat"
                >
                  <div className="flex items-center gap-1.5 font-bold">
                    <span>🔄</span>
                    <span>Delivered every 30 days · Save extra 10% · Pause or cancel anytime</span>
                  </div>
                  <p className="text-[11px] text-[#78460d] leading-relaxed">
                    <strong>🌿 Consumable Product Health Notice:</strong> Because pure raw honey is an edible, consumable wellness product, delivered boxes cannot be returned for food safety reasons. You have total freedom to pause, change frequency, or cancel your subscription anytime prior to renewal.
                  </p>
                </motion.div>
              )}

              {/* Price Row + Stepper + Big CTA Button */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                {/* Live Price Tag */}
                <div className="flex items-baseline gap-2 sm:pr-2">
                  <span className="font-apricot text-4xl sm:text-5xl font-bold text-[#1a110a] leading-none">
                    ₹{totalPrice}
                  </span>
                  {(totalOriginalPrice > totalPrice || isSubscribe) && (
                    <>
                      <span className="text-sm font-semibold text-[#8c7e6e] line-through">
                        ₹{totalOriginalPrice}
                      </span>
                      <span className="text-xs font-black text-[#15803d] bg-[#dcfce7] px-2.5 py-0.5 rounded-full">
                        {isSubscribe ? 'Save 10% Subscribed' : activePack.savingsText}
                      </span>
                    </>
                  )}
                </div>

                {/* Stepper */}
                <div className="flex items-center justify-between sm:justify-start border border-[#d6cbba] bg-white rounded-full p-1 shadow-2xs">
                  <button
                    type="button"
                    onClick={() => setBundleMultiplier(Math.max(1, bundleMultiplier - 1))}
                    className="w-9 h-9 flex items-center justify-center text-[#736555] hover:text-[#1a110a] hover:bg-[#faf2e4] rounded-full font-bold text-base cursor-pointer"
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <span className="px-3 font-bold text-sm text-[#1a110a] min-w-[24px] text-center">
                    {bundleMultiplier}
                  </span>
                  <button
                    type="button"
                    onClick={() => setBundleMultiplier(bundleMultiplier + 1)}
                    className="w-9 h-9 flex items-center justify-center text-[#736555] hover:text-[#1a110a] hover:bg-[#faf2e4] rounded-full font-bold text-base cursor-pointer"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart Form Button */}
                {activePack?.variantId && (
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
                              { key: 'Purchase Option', value: isSubscribe ? 'Subscribe & Save (10% OFF · Recurring)' : 'One-Time Purchase' },
                              { key: 'Total Sticks', value: `${totalSticks} Sticks` },
                              { key: 'Bundle Deal', value: `₹${totalPrice}` },
                            ],
                          },
                        ],
                      }}
                      action={CartForm.ACTIONS.LinesAdd}
                    >
                      {(cartFetcher) => (
                        <button
                          type="submit"
                          onClick={() => open('cart')}
                          disabled={cartFetcher.state !== 'idle'}
                          className="w-full inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-[#1a110a] text-white font-bold text-xs sm:text-sm uppercase tracking-wider hover:bg-[#c87a1e] hover:shadow-[0_10px_30px_rgba(200,122,30,0.3)] transition-all cursor-pointer shadow-md disabled:opacity-70"
                        >
                          <span>
                            {cartFetcher.state !== 'idle'
                              ? 'Adding...'
                              : `Add ${activePack.name} ↗`}
                          </span>
                        </button>
                      )}
                    </CartForm>
                  </div>
                )}
              </div>

              {/* Shipping & Delivery Guarantee Note */}
              <div className="flex items-center justify-between text-xs font-semibold text-[#736555] pt-1.5 border-t border-[#ebdccb]">
                <span className="flex items-center gap-1.5">
                  <span className={activePack.freeShipping ? 'text-[#15803d]' : 'text-[#b45309]'}>
                    {activePack.freeShipping ? '✓' : '📦'}
                  </span>
                  <span className={activePack.freeShipping ? 'text-[#15803d]' : 'text-[#b45309]'}>
                    {activePack.shippingNote}
                  </span>
                </span>
                <span>6g Single Dose · 100% Raw Multifloral</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* THE HIVE MANIFESTO: KINETIC PARALLAX & BOTANICAL SHOWCASE    */}
      {/* ============================================================ */}
      <section
        ref={manifestoRef}
        className="py-24 sm:py-36 lg:py-48 min-h-[92vh] flex flex-col justify-center overflow-hidden relative bg-[#17100b] text-[#fdfaf1]"
      >
        {/* Organic Honey Wave Transition (Top) */}
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-none z-20">
          <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="w-full h-[40px] sm:h-[70px] text-[#fdfaf1]">
            <path
              fill="currentColor"
              d="M0,0 L1440,0 L1440,64 C1360,58.7 1280,53 1120,43 C960,48 800,53 640,75 C480,80 320,85 160,75 L0,64 Z"
            />
          </svg>
        </div>

        {/* Ambient Honeycomb Background Lattice */}
        <HoneycombPattern
          id="manifesto-honeycomb"
          color="#c87a1e"
          opacity={0.06}
          size={36}
          className="absolute inset-0 w-full h-full pointer-events-none"
        />

        {/* Ambient Golden Amber Radial Glows */}
        <div
          className="absolute inset-0 pointer-events-none -z-0"
          style={{
            background:
              'radial-gradient(circle at 50% 50%, rgba(200,122,30,0.18) 0%, rgba(26,17,10,0.85) 60%, #17100b 100%)',
          }}
        />

        {/* ========================================================== */}
        {/* AESTHETIC BACKGROUND FLOATING ARCHIVAL TILES               */}
        {/* ========================================================== */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          {/* Card 1: Indian Apiarist Harvest (Top-Left) */}
          <motion.div
            style={{ y: bgCardY1 }}
            className="absolute top-8 sm:top-12 -left-6 sm:left-6 lg:left-12 w-48 sm:w-64 lg:w-76 rounded-2xl sm:rounded-3xl overflow-hidden border border-[#ebdccb]/20 bg-[#1f150e]/90 shadow-[0_25px_60px_rgba(0,0,0,0.6)] -rotate-3 opacity-45 hover:opacity-95 transition-all duration-500 pointer-events-auto group"
          >
            <div className="relative aspect-4/3 overflow-hidden">
              <img
                src="/images/indian_apiarist_harvest.jpg"
                alt="Generational Indian Apiarist Harvesting Pure Comb"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
              <div className="absolute bottom-2.5 sm:bottom-3 left-3 sm:left-4 right-3 text-white">
                <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-[#f5a623] block leading-none">
                  Source Terroir
                </span>
                <span className="text-[11px] sm:text-xs font-semibold text-white/95 leading-tight block mt-0.5 truncate">
                  Generational Apiary Harvest
                </span>
              </div>
            </div>
          </motion.div>

          {/* Card 2: High-Altitude Organic Honey Farming in Nepal (Top-Right) */}
          <motion.div
            style={{ y: bgCardY2 }}
            className="absolute top-6 sm:top-14 -right-6 sm:right-6 lg:right-12 w-48 sm:w-64 lg:w-76 rounded-2xl sm:rounded-3xl overflow-hidden border border-[#ebdccb]/20 bg-[#1f150e]/90 shadow-[0_25px_60px_rgba(0,0,0,0.6)] rotate-4 opacity-45 hover:opacity-95 transition-all duration-500 pointer-events-auto group"
          >
            <div className="relative aspect-4/3 overflow-hidden">
              <img
                src="/images/Organic%20Honey%20Farming%20in%20Nepal%20%E2%80%93%20Complete%20Guide%20for%20Beginners.jpeg"
                alt="Organic Himalayan Honey Farming and Wild Flora"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
              <div className="absolute bottom-2.5 sm:bottom-3 left-3 sm:left-4 right-3 text-white">
                <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-[#4ade80] block leading-none">
                  Himalayan Flora
                </span>
                <span className="text-[11px] sm:text-xs font-semibold text-white/95 leading-tight block mt-0.5 truncate">
                  Wild High-Altitude Apiaries
                </span>
              </div>
            </div>
          </motion.div>

          {/* Card 3: Morning Breakfast Ritual (Mid/Bottom-Left) */}
          <motion.div
            style={{ y: bgCardY3 }}
            className="absolute bottom-20 sm:bottom-28 -left-8 sm:left-8 lg:left-14 w-44 sm:w-56 lg:w-68 rounded-2xl sm:rounded-3xl overflow-hidden border border-[#ebdccb]/20 bg-[#1f150e]/90 shadow-[0_25px_60px_rgba(0,0,0,0.6)] rotate-2 opacity-40 hover:opacity-95 transition-all duration-500 pointer-events-auto group"
          >
            <div className="relative aspect-4/3 overflow-hidden">
              <img
                src="/images/moment_breakfast_clean.jpg"
                alt="Clean Honey Pour Morning Ritual"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
              <div className="absolute bottom-2.5 sm:bottom-3 left-3 sm:left-4 right-3 text-white">
                <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-[#fbbf24] block leading-none">
                  Daily Ritual
                </span>
                <span className="text-[11px] sm:text-xs font-semibold text-white/95 leading-tight block mt-0.5 truncate">
                  Mess-Free Morning Drizzle
                </span>
              </div>
            </div>
          </motion.div>

          {/* Card 4: Botanical Infusions Trio (Mid/Bottom-Right) */}
          <motion.div
            style={{ y: bgCardY4 }}
            className="absolute bottom-14 sm:bottom-24 -right-8 sm:right-8 lg:right-16 w-48 sm:w-60 lg:w-72 rounded-2xl sm:rounded-3xl overflow-hidden border border-[#ebdccb]/20 bg-[#1f150e]/90 shadow-[0_25px_60px_rgba(0,0,0,0.6)] -rotate-3 opacity-40 hover:opacity-95 transition-all duration-500 pointer-events-auto group"
          >
            <div className="relative aspect-4/3 overflow-hidden">
              <img
                src="/images/botanical_infusions_trio.jpg"
                alt="Botanical Infusions Trio cold-steeped in raw honey"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
              <div className="absolute bottom-2.5 sm:bottom-3 left-3 sm:left-4 right-3 text-white">
                <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-[#ea580c] block leading-none">
                  Botanical Trio
                </span>
                <span className="text-[11px] sm:text-xs font-semibold text-white/95 leading-tight block mt-0.5 truncate">
                  Mint, Chili & Turmeric
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* 3-Layer Massive Kinetic Parallax Typography */}
        <div className="flex flex-col gap-5 sm:gap-8 opacity-90 relative z-10 select-none py-8">
          {/* Row 1: Solid Warm Gold Typography */}
          <motion.div style={{ x: manifestoX1 }} className="whitespace-nowrap flex items-center">
            <h2
              className="font-montserrat leading-[0.85] tracking-tighter font-black text-[#fdfaf1]"
              style={{ fontSize: 'clamp(2.5rem, 8vw, 8rem)' }}
            >
              GARDEN + POOL <span className="text-[#f5a623] px-4 sm:px-8">✦</span> THE HIVE AWAKENING <span className="text-[#f5a623] px-4 sm:px-8">✦</span> GARDEN + POOL <span className="text-[#f5a623] px-4 sm:px-8">✦</span> THE HIVE AWAKENING
            </h2>
          </motion.div>

          {/* Row 2: Luminous Outlined Architectural Typography */}
          <motion.div style={{ x: manifestoX2 }} className="whitespace-nowrap flex items-center">
            <h2
              className="font-montserrat leading-[0.85] tracking-tighter font-black text-transparent"
              style={{
                WebkitTextStroke: '2px rgba(245,166,35,0.75)',
                fontSize: 'clamp(3rem, 10vw, 9.5rem)',
              }}
            >
              UNTAMED NECTAR <span className="text-transparent px-4 sm:px-8" style={{ WebkitTextStroke: '2px rgba(245,166,35,0.75)' }}>✦</span> NATURAL PHARMACY <span className="text-transparent px-4 sm:px-8" style={{ WebkitTextStroke: '2px rgba(245,166,35,0.75)' }}>✦</span> UNTAMED NECTAR <span className="text-transparent px-4 sm:px-8" style={{ WebkitTextStroke: '2px rgba(245,166,35,0.75)' }}>✦</span> NATURAL PHARMACY
            </h2>
          </motion.div>

          {/* Row 3: Solid Warm Gold Typography */}
          <motion.div style={{ x: manifestoX3 }} className="whitespace-nowrap flex items-center">
            <h2
              className="font-montserrat leading-[0.88] tracking-tighter font-black text-[#fdfaf1]"
              style={{ fontSize: 'clamp(2.5rem, 8vw, 8rem)' }}
            >
              100% TRACEABLE <span className="text-[#f5a623] px-4 sm:px-8">✦</span> BEYOND THE JAR <span className="text-[#f5a623] px-4 sm:px-8">✦</span> 100% TRACEABLE <span className="text-[#f5a623] px-4 sm:px-8">✦</span> BEYOND THE JAR
            </h2>
          </motion.div>
        </div>

        {/* Organic Honey Wave Transition (Bottom) */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-20">
          <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="w-full h-[40px] sm:h-[70px] text-[#fdfaf1]">
            <path
              fill="currentColor"
              d="M0,56 C160,68 320,78 480,72 C640,68 800,48 960,42 C1120,38 1280,48 1360,54 L1440,60 L1440,120 L0,120 Z"
            />
          </svg>
        </div>
      </section>

      {/* ============================================================ */}
      {/* ============================================================ */}
      {/* SECTION 1: HOW IT WORKS · ABOUT THREE SECONDS                */}
      {/* (01 SNAP · 02 SQUEEZE · 03 SIP)                              */}
      {/* ============================================================ */}
      <section id="how-it-works" className="relative scroll-mt-24">
        <SnapSqueezeSip />
      </section>

      {/* ============================================================ */}
      {/* SECTION 2: WHY HONEY · THE PANTRY CLEANSE                    */}
      {/* ============================================================ */}
      <JarVsStick id="why-honey" />

      {/* ============================================================ */}
      {/* SECTION 3: LAB VERIFIED · 100% PURITY & COA ANALYSIS         */}
      {/* ============================================================ */}
      <LabVerifiedSection id="lab-verified" className="border-t border-[#ebd8b0]/60" />

      {/* ============================================================ */}
      {/* SECTION 4: THE FINALE GAPOO BEAR LOGO REVEAL & HONEY CURTAIN */}
      {/* ============================================================ */}
      <AppleLogoReveal />
    </div>
  );
}

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

/** @typedef {import('./+types/_index').Route} Route */
/** @typedef {ReturnType<typeof useLoaderData<typeof loader>>} LoaderReturnData */
