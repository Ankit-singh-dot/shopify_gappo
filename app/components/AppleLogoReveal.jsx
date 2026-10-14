import {useRef, useState} from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from 'framer-motion';
import {HandwrittenGapoo} from '~/components/HandwrittenGapoo';
import {HoneycombPattern} from '~/components/shop/motion';

/**
 * Finale: honey pours down over the page.
 *
 * 1. The bear drops in large and settles.
 * 2. A dark honey curtain with real drips slides down the screen; as its amber edge
 *    passes the bear, the bear flips to light line-art.
 * 3. On the dark, a honeycomb surfaces and "Gapoo." writes itself in the same
 *    handwriting as the landing hero — so the shop ends where the site begins.
 * 4. Snap. Squeeze. Sip. lands word by word, then a way back up to the buy box.
 *
 * Ends on #1a110a so it hands off to the footer without a seam.
 */

const DRIPS = [
  {cx: 90, hw: 22, len: 120},
  {cx: 260, hw: 16, len: 70},
  {cx: 430, hw: 28, len: 170},
  {cx: 610, hw: 14, len: 60},
  {cx: 760, hw: 24, len: 140},
  {cx: 930, hw: 18, len: 92},
  {cx: 1110, hw: 30, len: 185},
  {cx: 1290, hw: 16, len: 80},
  {cx: 1392, hw: 20, len: 115},
];
const BASE = 24;

function buildDripPath() {
  let d = `M0 0 H1440 V${BASE}`;
  [...DRIPS]
    .sort((a, b) => b.cx - a.cx)
    .forEach(({cx, hw, len}) => {
      const r = hw * 0.62;
      const by = BASE + len - r;
      d += ` L${cx + hw} ${BASE}`;
      d += ` C${cx + hw * 0.35} ${BASE} ${cx + hw * 0.4} ${BASE + len * 0.45} ${cx + r * 0.9} ${by}`;
      d += ` A${r} ${r} 0 1 1 ${cx - r * 0.9} ${by}`;
      d += ` C${cx - hw * 0.4} ${BASE + len * 0.45} ${cx - hw * 0.35} ${BASE} ${cx - hw} ${BASE}`;
    });
  return `${d} L0 ${BASE} Z`;
}
const DRIP_PATH = buildDripPath();

function Word({progress, range, children}) {
  const opacity = useTransform(progress, range, [0, 1]);
  const y = useTransform(progress, range, [24, 0]);
  const blur = useTransform(progress, range, ['blur(6px)', 'blur(0px)']);
  return (
    <motion.span style={{opacity, y, filter: blur}} className="inline-block">
      {children}
    </motion.span>
  );
}

export function AppleLogoReveal() {
  const ref = useRef(null);
  const {scrollYProgress: p} = useScroll({
    target: ref,
    offset: ['start end', 'end end'],
  });

  // Bear
  const bearScale = useTransform(p, [0.12, 0.48], [2.3, 1]);
  const bearY = useTransform(p, [0.12, 0.48], ['24vh', '0vh']);
  const bearRotate = useTransform(p, [0.12, 0.48], [-8, 0]);
  const bearFilter = useTransform(
    p,
    [0.44, 0.55],
    ['invert(0) brightness(1)', 'invert(1) brightness(2)'],
  );

  // Honey curtain
  const pourY = useTransform(p, [0.28, 0.62], ['-116%', '0%']);
  const dripScale = useTransform(p, [0.28, 0.5, 0.62], [0.25, 1, 1.15]);

  // Atmosphere on the dark
  const combOpacity = useTransform(p, [0.58, 0.8], [0, 1]);
  const glowOpacity = useTransform(p, [0.6, 0.85], [0, 1]);

  // CTA
  const ctaOpacity = useTransform(p, [0.9, 0.97], [0, 1]);
  const ctaY = useTransform(p, [0.9, 0.97], [16, 0]);
  const ctaEvents = useTransform(ctaOpacity, (v) =>
    v > 0.5 ? 'auto' : 'none',
  );

  // Mount the handwriting when the curtain has landed; unmount when scrolled back so it replays.
  const [showMark, setShowMark] = useState(false);
  useMotionValueEvent(p, 'change', (v) => {
    if (v > 0.62 && !showMark) setShowMark(true);
    else if (v < 0.45 && showMark) setShowMark(false);
  });

  return (
    <section
      ref={ref}
      className="relative h-[320vh] bg-[#fdfaf1]"
      aria-label="Gapoo"
    >
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden bg-[#fdfaf1]">
        {/* Honey curtain */}
        <motion.div
          style={{y: pourY}}
          className="absolute inset-x-0 top-0 h-[150%] z-10 pointer-events-none"
        >
          <div
            className="h-full w-full"
            style={{
              background:
                'linear-gradient(to bottom, #1a110a 0%, #1a110a 66%, #2c1b0c 76%, #5a3410 88%, #8b5311 100%)',
            }}
          />
          <motion.svg
            viewBox="0 0 1440 240"
            preserveAspectRatio="none"
            className="absolute top-full left-0 w-full h-[22vh] -mt-px"
            style={{scaleY: dripScale, originY: 0}}
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="finale-drip" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#8b5311" />
                <stop offset="1" stopColor="#d18a2a" />
              </linearGradient>
            </defs>
            <path d={DRIP_PATH} fill="url(#finale-drip)" />
          </motion.svg>
        </motion.div>

        <motion.div
          style={{opacity: combOpacity}}
          className="absolute inset-0 z-[11]"
        >
          <HoneycombPattern id="finale-comb" opacity={0.12} size={30} />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#1a110a_78%)]" />
        </motion.div>

        <motion.div
          style={{opacity: glowOpacity}}
          className="absolute inset-0 z-[12] pointer-events-none bg-[radial-gradient(circle_at_50%_42%,rgba(200,122,30,0.35),transparent_55%)]"
        />

        {/* Content */}
        <div className="relative z-20 h-full flex flex-col items-center justify-center px-6 font-montserrat">
          <h2 className="sr-only">Gapoo</h2>

          <motion.img
            src="/images/gapoo_bear_mascot_hd.png"
            alt=""
            style={{
              scale: bearScale,
              y: bearY,
              rotate: bearRotate,
              filter: bearFilter,
            }}
            className="w-[24vw] min-w-[140px] max-w-[250px] object-contain select-none pointer-events-none"
          />

          <div className="mt-2 sm:mt-4 w-[min(88vw,860px)] aspect-[920/370]">
            {showMark && (
              <HandwrittenGapoo
                className="w-full"
                color="#e9a23b"
                startDelay={0.05}
                speedMultiplier={1.25}
                interactive={false}
              />
            )}
          </div>

          <div className="mt-1 flex items-baseline gap-3 sm:gap-6 font-apricot text-[#f2e6d5] text-3xl sm:text-5xl lg:text-6xl leading-none">
            <Word progress={p} range={[0.74, 0.8]}>
              Snap.
            </Word>
            <Word progress={p} range={[0.79, 0.85]}>
              Squeeze.
            </Word>
            <Word progress={p} range={[0.84, 0.9]}>
              <span className="text-[#e9a23b]">Sip.</span>
            </Word>
          </div>

          <motion.div
            style={{opacity: ctaOpacity, y: ctaY, pointerEvents: ctaEvents}}
            className="mt-9 sm:mt-11 flex flex-col items-center gap-3"
          >
            <a
              href="#buy-now"
              className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[#f5a623] hover:bg-[#fdfaf1] text-[#1a110a] font-bold tracking-[0.18em] uppercase text-xs transition-colors duration-300 shadow-[0_10px_40px_rgba(245,166,35,0.35)]"
            >
              <span>Pick your pack</span>
              <span className="transition-transform group-hover:-translate-y-0.5">
                ↑
              </span>
            </a>
            <span className="text-[10px] tracking-[0.3em] uppercase font-bold text-[#a39482]">
              Pure honey · natural mint · 10 sticks a box
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
