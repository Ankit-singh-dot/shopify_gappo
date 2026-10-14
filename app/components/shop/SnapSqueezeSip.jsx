import {useRef} from 'react';
import {motion, useScroll, useTransform} from 'framer-motion';
import {HoneycombPattern} from './motion';

/**
 * Scroll-driven demo of the product's own gesture.
 * A line-art stick tears, flips over a cup, gets pinched, pours, and the tea steams.
 * Everything is hand-drawn SVG in the bear mascot's line weight — no stock assets.
 */

const STAGES = [
  {
    n: '01',
    word: 'Snap.',
    range: [0, 0.33],
    body: 'Tear at the notch. No scissors, no lid to wrestle, no spoon hunt through the drawer.',
  },
  {
    n: '02',
    word: 'Squeeze.',
    range: [0.33, 0.66],
    body: 'Flip it over your cup and squeeze from the bottom up. 6g of honey, the same every time.',
  },
  {
    n: '03',
    word: 'Sip.',
    range: [0.66, 1],
    body: 'Stir it in and you’re done. The cupboard stays clean, because there is no jar.',
  },
];

function StageText({progress, stage, index, total}) {
  const [a, b] = stage.range;
  const first = index === 0;
  const last = index === total - 1;

  const input = first
    ? [0, b - 0.05, b + 0.01]
    : last
      ? [a - 0.01, a + 0.05, 1]
      : [a - 0.01, a + 0.05, b - 0.05, b + 0.01];
  const fade = first ? [1, 1, 0] : last ? [0, 1, 1] : [0, 1, 1, 0];
  const lift = first ? [0, 0, -36] : last ? [36, 0, 0] : [36, 0, 0, -36];

  const opacity = useTransform(progress, input, fade);
  const y = useTransform(progress, input, lift);

  return (
    <motion.div
      style={{opacity, y}}
      className="absolute inset-0 flex flex-col justify-center"
      aria-hidden={index !== 0}
    >
      <span className="font-mono text-xs font-bold text-[#c87a1e] tracking-[0.25em]">
        {stage.n} / 03
      </span>
      <h3 className="font-apricot text-[60px] sm:text-[96px] lg:text-[128px] leading-[0.88] text-[#1a110a] mt-2 tracking-tight">
        {stage.word}
      </h3>
      <p className="mt-4 max-w-md text-sm sm:text-lg text-[#5c5043] leading-relaxed font-medium">
        {stage.body}
      </p>
    </motion.div>
  );
}

function Scene({p}) {
  // 1 · Snap — the tab tears off the top
  const tabX = useTransform(p, [0.06, 0.24], [0, 48]);
  const tabY = useTransform(p, [0.06, 0.24], [0, -74]);
  const tabRotate = useTransform(p, [0.06, 0.24], [0, 42]);
  const tabOpacity = useTransform(p, [0.17, 0.29], [1, 0]);
  const burst = useTransform(p, [0.08, 0.13, 0.24], [0, 1, 0]);

  // 2 · Flip + pinch + squeeze
  const flip = useTransform(p, [0.33, 0.45], [0, 180]);
  const fingerL = useTransform(p, [0.42, 0.56], [-70, 0]);
  const fingerR = useTransform(p, [0.42, 0.56], [70, 0]);
  const fingerOpacity = useTransform(p, [0.42, 0.48, 0.84, 0.92], [0, 1, 1, 0]);
  const squeeze = useTransform(p, [0.5, 0.6], [1, 0.74]);
  const honeyLevel = useTransform(p, [0.54, 0.84], [1, 0.12]);

  // Pour
  const stream = useTransform(p, [0.52, 0.64], [0, 1]);
  const streamOpacity = useTransform(p, [0.5, 0.53, 0.82, 0.88], [0, 1, 1, 0]);
  const swirl = useTransform(p, [0.58, 0.7, 0.92], [0, 1, 0.55]);

  // 3 · Sip — level rises, steam, mint
  const fillY = useTransform(p, [0, 0.55, 0.82], [34, 34, 8]);
  const steam = useTransform(p, [0.78, 0.94], [0, 1]);
  const leafScale = useTransform(p, [0.86, 0.96], [0, 1]);
  const stickY = useTransform(p, [0.86, 0.98], ['0%', '-14%']);
  const stickOpacity = useTransform(p, [0.86, 0.97], [1, 0]);

  return (
    <div className="relative h-[42vh] sm:h-[50vh] lg:h-[72vh] max-h-[660px] aspect-[400/520]">
      {/* ─── Cup layer ─── */}
      <svg
        viewBox="0 0 400 520"
        className="absolute inset-0 w-full h-full overflow-visible"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="sss-tea" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#e39a35" />
            <stop offset="1" stopColor="#9a5410" />
          </linearGradient>
          <clipPath id="sss-cup-clip">
            <path d="M133 398 L144 486 Q146 495 157 495 L243 495 Q254 495 256 486 L267 398 Z" />
          </clipPath>
        </defs>

        <ellipse
          cx="200"
          cy="507"
          rx="106"
          ry="8"
          fill="none"
          stroke="#1a110a"
          strokeWidth="2.5"
          opacity="0.45"
        />

        <g clipPath="url(#sss-cup-clip)">
          <motion.g style={{y: fillY}}>
            <rect
              x="120"
              y="404"
              width="160"
              height="110"
              fill="url(#sss-tea)"
            />
            <path
              d="M120 406 Q150 399 180 406 T240 406 T300 406 V414 H120 Z"
              fill="#f5b04a"
              opacity="0.65"
            />
            <motion.ellipse
              cx="200"
              cy="412"
              rx="34"
              ry="4"
              fill="none"
              stroke="#fbd38a"
              strokeWidth="3"
              strokeLinecap="round"
              style={{opacity: swirl}}
            />
          </motion.g>
        </g>

        <path
          d="M128 392 L140 488 Q142 500 156 500 L244 500 Q258 500 260 488 L272 392 Z"
          fill="none"
          stroke="#1a110a"
          strokeWidth="3"
          strokeLinejoin="round"
        />
        <path
          d="M268 416 Q302 416 302 444 Q302 472 262 472"
          fill="none"
          stroke="#1a110a"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* Steam */}
        {[
          'M172 382 q-10 -14 0 -28 t0 -28',
          'M200 378 q-10 -16 0 -32 t0 -32',
          'M228 382 q-10 -14 0 -28 t0 -28',
        ].map((d) => (
          <motion.path
            key={d}
            d={d}
            fill="none"
            stroke="#1a110a"
            strokeWidth="2.5"
            strokeLinecap="round"
            style={{pathLength: steam, opacity: steam}}
          />
        ))}

        {/* Mint sprig on the rim */}
        <motion.g style={{scale: leafScale, originX: 0, originY: 1}}>
          <path
            d="M252 394 C 254 372, 276 362, 292 366 C 290 384, 272 396, 252 394 Z"
            fill="#6f9e4f"
            stroke="#1a110a"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          <path
            d="M254 392 C 264 384, 276 374, 288 369"
            fill="none"
            stroke="#1a110a"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </motion.g>
      </svg>

      {/* ─── Honey stream (does not rotate) ─── */}
      <svg
        viewBox="0 0 400 520"
        className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
        aria-hidden="true"
      >
        <motion.path
          d="M200 262 C198 300 202 345 200 404"
          fill="none"
          stroke="#e8962c"
          strokeWidth="7"
          strokeLinecap="round"
          style={{pathLength: stream, opacity: streamOpacity}}
        />
      </svg>

      {/* ─── Stick layer: rotates about its own centre (200,170 in viewBox units) ─── */}
      <motion.div
        className="absolute inset-0"
        style={{
          rotate: flip,
          y: stickY,
          opacity: stickOpacity,
          transformOrigin: '50% 32.7%',
        }}
      >
        <svg
          viewBox="0 0 400 520"
          className="w-full h-full overflow-visible"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="sss-honey" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#f7b733" />
              <stop offset="1" stopColor="#c87a1e" />
            </linearGradient>
          </defs>

          {/* Tear-off tab */}
          <motion.g
            style={{
              x: tabX,
              y: tabY,
              rotate: tabRotate,
              opacity: tabOpacity,
              originX: 0,
              originY: 1,
            }}
          >
            <rect
              x="168"
              y="40"
              width="64"
              height="40"
              rx="10"
              fill="#fdfaf1"
              stroke="#1a110a"
              strokeWidth="3"
            />
            <text
              x="200"
              y="64"
              textAnchor="middle"
              fontSize="10"
              fontWeight="800"
              letterSpacing="2.5"
              fill="#c87a1e"
              className="font-montserrat"
            >
              TEAR
            </text>
          </motion.g>

          {/* Body */}
          <motion.g style={{scaleX: squeeze, originX: 0.5, originY: 0.5}}>
            <rect
              x="168"
              y="80"
              width="64"
              height="220"
              rx="12"
              fill="#fdfaf1"
              stroke="#1a110a"
              strokeWidth="3"
            />
            <motion.rect
              x="178"
              y="94"
              width="44"
              height="192"
              rx="10"
              fill="url(#sss-honey)"
              style={{scaleY: honeyLevel, originY: 0}}
            />
            <text
              transform="rotate(-90 200 190)"
              x="200"
              y="200"
              textAnchor="middle"
              fontSize="30"
              fill="#fdfaf1"
              className="font-apricot"
            >
              Gapoo
            </text>
            <path
              d="M168 74 L177 80 L168 86"
              fill="#fdfaf1"
              stroke="#1a110a"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            <path
              d="M232 74 L223 80 L232 86"
              fill="#fdfaf1"
              stroke="#1a110a"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
          </motion.g>

          {/* Snap burst */}
          <motion.g
            style={{opacity: burst}}
            stroke="#c87a1e"
            strokeWidth="3"
            strokeLinecap="round"
          >
            <path d="M244 70 L257 59" />
            <path d="M247 80 L264 80" />
            <path d="M244 90 L257 101" />
          </motion.g>
        </svg>
      </motion.div>

      {/* ─── Pinching fingers (line art) ─── */}
      <svg
        viewBox="0 0 400 520"
        className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
        aria-hidden="true"
      >
        <motion.g style={{x: fingerL, opacity: fingerOpacity}}>
          <rect
            x="102"
            y="132"
            width="74"
            height="34"
            rx="17"
            fill="#fdfaf1"
            stroke="#1a110a"
            strokeWidth="3"
          />
          <path
            d="M160 140 q8 9 0 18"
            fill="none"
            stroke="#1a110a"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </motion.g>
        <motion.g style={{x: fingerR, opacity: fingerOpacity}}>
          <rect
            x="224"
            y="132"
            width="74"
            height="34"
            rx="17"
            fill="#fdfaf1"
            stroke="#1a110a"
            strokeWidth="3"
          />
          <path
            d="M240 140 q-8 9 0 18"
            fill="none"
            stroke="#1a110a"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </motion.g>
      </svg>

      {/* Resident bee */}
      <motion.img
        src="/images/golden_bee_clean.png"
        alt=""
        animate={{x: [0, 10, -4, 0], y: [0, -8, 4, 0], rotate: [-6, 6, -2, -6]}}
        transition={{duration: 6, repeat: Infinity, ease: 'easeInOut'}}
        className="absolute right-[2%] top-[6%] w-7 sm:w-9 h-auto pointer-events-none select-none"
      />
    </div>
  );
}

export function SnapSqueezeSip() {
  const ref = useRef(null);
  const {scrollYProgress: p} = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  return (
    <section
      ref={ref}
      id="how-to-use"
      className="relative h-[320vh] bg-[#faecd0] font-montserrat scroll-mt-0"
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <HoneycombPattern id="sss-comb" opacity={0.09} />
        <div className="relative h-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex flex-col lg:grid lg:grid-cols-12 lg:items-center gap-4 lg:gap-10 pt-20 pb-6 lg:py-0">
          {/* Copy */}
          <div className="lg:col-span-6 order-2 lg:order-1 flex-1 lg:flex-none flex flex-col min-h-0">
            <div className="flex items-center gap-3 mb-2 lg:mb-6">
              <div className="h-[1px] w-8 bg-[#c87a1e]" />
              <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#c87a1e]">
                How it works · about three seconds
              </span>
            </div>
            <div className="flex gap-5 sm:gap-8 flex-1 lg:flex-none min-h-0">
              <div className="relative w-[2px] rounded-full bg-[#e5cf9d] self-stretch lg:h-[360px]">
                <motion.div
                  style={{scaleY: p, originY: 0}}
                  className="absolute inset-0 rounded-full bg-[#c87a1e]"
                />
              </div>
              <div className="relative flex-1 min-h-[190px] lg:h-[360px]">
                {STAGES.map((stage, i) => (
                  <StageText
                    key={stage.n}
                    progress={p}
                    stage={stage}
                    index={i}
                    total={STAGES.length}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Scene */}
          <div className="lg:col-span-6 order-1 lg:order-2 flex justify-center items-center">
            <Scene p={p} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default SnapSqueezeSip;
