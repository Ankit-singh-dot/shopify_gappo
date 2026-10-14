import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * StickEngineering — Industrial design breakdown of the 6g stick.
 * Hand-drawn technical SVG line-art with interactive engineering hotspots.
 * Pure editorial craftsmanship — zero AI slop, zero blinding lights.
 */

const HOTSPOTS = [
  {
    id: 'notch',
    n: '01',
    label: 'Laser-Cut Tear Notch',
    subtitle: '1.2mm Precision Shear Guide',
    x: 16,
    y: 38,
    metric: '0.8 N',
    metricLabel: 'Tear Force Required',
    description:
      'A calibrated 45-degree micro-incision cut into the foil edge. Tears cleanly between thumb and knuckle in one motion. No scissors, no jagged edges, no sprayed drops.',
    detailPoints: [
      'Engineered to resist pocket wear while snapping easily on fold',
      'Dual-sided symmetry for left- or right-handed use',
      'Zero foil shedding into your beverage',
    ],
  },
  {
    id: 'barrier',
    n: '02',
    label: 'Aseptic Multi-Layer Foil',
    subtitle: 'Zero-Oxygen Barrier Matrix',
    x: 42,
    y: 52,
    metric: '40 kg',
    metricLabel: 'Burst Pressure Tested',
    description:
      'Three laminated layers: a soft-touch matte exterior, an impervious aluminum core to lock out light and oxygen, and a food-grade virgin inner lining. Won’t pop in a packed backpack or gym duffel.',
    detailPoints: [
      '100% UV and photo-oxidation protection',
      'Preserves live honey invertase and diastase enzymes',
      'Zero plasticizers or BPA leaching',
    ],
  },
  {
    id: 'dose',
    n: '03',
    label: '6.0g Micro-Dosed Chamber',
    subtitle: 'Calculated Single-Serving Mass',
    x: 64,
    y: 48,
    metric: '6.0 g',
    metricLabel: 'Exact Serving (±0.1g)',
    description:
      'Calibrated against standard tea mugs and morning bowls. One stick delivers exactly 21 calories of raw low-GI nectar — the sweet spot where tea flavor is elevated rather than masked.',
    detailPoints: [
      'Equal to exactly 1 leveled teaspoon of jarred honey',
      'Eliminates over-pouring and sticky spoon guesstimates',
      'Stable glycemic response with slow-release fructose',
    ],
  },
  {
    id: 'nozzle',
    n: '04',
    label: 'Laminar Flow Aperture',
    subtitle: 'Non-Drip Viscous Ribbon',
    x: 88,
    y: 40,
    metric: '0 Drips',
    metricLabel: 'Surface Trailing Cutoff',
    description:
      'Honey has a viscosity of ~10,000 cP. The tapered internal neck funnels the honey into a uniform laminar ribbon that ceases instantly when fingertip pressure stops.',
    detailPoints: [
      'Zero trailing honey strings clinging to packaging',
      'Smooth ribbon pour straight into mug or onto toast',
      'Clean fingers guaranteed — no sticky residue',
    ],
  },
];

export function StickEngineering() {
  const [activeId, setActiveId] = useState('notch');
  const activeSpot = HOTSPOTS.find((h) => h.id === activeId) || HOTSPOTS[0];

  return (
    <section className="py-20 sm:py-28 lg:py-32 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto relative font-montserrat">
      {/* Editorial Header */}
      <div className="max-w-3xl mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 bg-[#faecc9] border border-[#e5cf9d] px-4 py-1.5 rounded-full text-xs font-bold text-[#8b5311] shadow-2xs mb-4">
          <span className="w-2 h-2 rounded-full bg-[#c87a1e]" />
          <span className="uppercase tracking-widest text-[11px] font-mono">
            Industrial Design &amp; Packaging Specs
          </span>
        </div>

        <h2 className="font-apricot text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1a110a] leading-[1.05] tracking-tight">
          Engineered down to the millimeter.
        </h2>

        <p className="mt-4 text-base sm:text-lg text-[#5c5043] leading-relaxed max-w-2xl font-medium">
          A single stick took months of packaging trials and fluid testing.
          Because the difference between a mindful morning ritual and a sticky desk catastrophe
          is half a millimeter of foil engineering.
        </p>
      </div>

      {/* Main Interactive Blueprint Container */}
      <div className="rounded-[32px] sm:rounded-[40px] bg-white border border-[#eee4d4] shadow-sm p-6 sm:p-10 lg:p-12 relative overflow-hidden">
        {/* Subtle Engineering Grid Background */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.035]"
          style={{
            backgroundImage: `linear-gradient(to right, #1a110a 1px, transparent 1px), linear-gradient(to bottom, #1a110a 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
          }}
        />

        {/* Blueprint Top Bar / Specs Strip */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#f0e6d6] text-xs font-mono text-[#8a7a6a] relative z-10">
          <div className="flex items-center gap-3">
            <span className="font-bold text-[#1a110a] uppercase tracking-wider">
              DWG NO. GAP-STK-001
            </span>
            <span className="text-[#d0c2b0]">/</span>
            <span>REV 3.4</span>
            <span className="text-[#d0c2b0]">/</span>
            <span>TOLERANCE ±0.2mm</span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>DIM: 100mm × 18mm × 4mm</span>
            <span className="hidden sm:inline text-[#d0c2b0]">|</span>
            <span className="hidden sm:inline text-[#c87a1e] font-bold">RAW AMBER NECTAR 6.0G</span>
          </div>
        </div>

        {/* Interactive Schematic Diagram (SVG) */}
        <div className="my-8 sm:my-12 relative z-10">
          <div className="relative w-full max-w-4xl mx-auto py-6 sm:py-10">
            {/* The Blueprint SVG */}
            <svg
              viewBox="0 0 800 240"
              className="w-full h-auto overflow-visible select-none"
              aria-label="Gapoo Honey Stick Technical Schematic"
            >
              <defs>
                {/* Honey Liquid Fill Gradient */}
                <linearGradient id="stick-amber" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#e2912a" stopOpacity="0.85" />
                  <stop offset="50%" stopColor="#f5b04a" stopOpacity="0.95" />
                  <stop offset="100%" stopColor="#d17415" stopOpacity="0.85" />
                </linearGradient>

                {/* Foil Shimmer */}
                <linearGradient id="foil-sheen" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0.6" />
                  <stop offset="50%" stopColor="#ffffff" stopOpacity="0" />
                  <stop offset="100%" stopColor="#000000" stopOpacity="0.08" />
                </linearGradient>

                {/* Active Highlight Glow Filter */}
                <filter id="soft-glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Dimension Guide Lines (Top & Bottom) */}
              <g stroke="#d5c7b3" strokeWidth="1" strokeDasharray="3 3">
                {/* Top dimension */}
                <line x1="80" y1="28" x2="720" y2="28" />
                <line x1="80" y1="20" x2="80" y2="36" />
                <line x1="720" y1="20" x2="720" y2="36" />
                <text
                  x="400"
                  y="22"
                  textAnchor="middle"
                  fill="#8a7a6a"
                  fontSize="10"
                  fontFamily="monospace"
                  letterSpacing="0.1em"
                >
                  TOTAL PACKAGING LENGTH 100.0 mm
                </text>

                {/* Left dimension (Width) */}
                <line x1="48" y1="60" x2="48" y2="180" />
                <line x1="42" y1="60" x2="54" y2="60" />
                <line x1="42" y1="180" x2="54" y2="180" />
                <text
                  x="40"
                  y="124"
                  textAnchor="end"
                  fill="#8a7a6a"
                  fontSize="10"
                  fontFamily="monospace"
                >
                  18 mm
                </text>
              </g>

              {/* Stick Outer Body (Pouch Profile) */}
              <g>
                {/* Pouch drop shadow */}
                <rect
                  x="80"
                  y="62"
                  width="640"
                  height="116"
                  rx="14"
                  fill="#1a110a"
                  opacity="0.04"
                />

                {/* Foil Backing */}
                <rect
                  x="80"
                  y="60"
                  width="640"
                  height="120"
                  rx="14"
                  fill="#fdfaf3"
                  stroke="#1a110a"
                  strokeWidth="2"
                />

                {/* Sealed Crimped Left End */}
                <g fill="#eee2ce" opacity="0.65">
                  <rect x="80" y="60" width="34" height="120" rx="4" />
                  {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
                    <line
                      key={`crimp-l-${i}`}
                      x1={86 + i * 3.5}
                      y1="64"
                      x2={86 + i * 3.5}
                      y2="176"
                      stroke="#c8b8a0"
                      strokeWidth="1.2"
                    />
                  ))}
                </g>

                {/* Sealed Crimped Right End */}
                <g fill="#eee2ce" opacity="0.65">
                  <rect x="686" y="60" width="34" height="120" rx="4" />
                  {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
                    <line
                      key={`crimp-r-${i}`}
                      x1={692 + i * 3.5}
                      y1="64"
                      x2={692 + i * 3.5}
                      y2="176"
                      stroke="#c8b8a0"
                      strokeWidth="1.2"
                    />
                  ))}
                </g>

                {/* Internal Honey Reservoir (Visible Nectar Window) */}
                <rect
                  x="130"
                  y="74"
                  width="540"
                  height="92"
                  rx="10"
                  fill="url(#stick-amber)"
                />

                {/* Honey Flow Waves inside Reservoir */}
                <path
                  d="M130 114 Q220 98 310 114 T490 114 T670 114 V166 H130 Z"
                  fill="#c87012"
                  opacity="0.45"
                />
                <path
                  d="M130 132 Q250 120 370 132 T610 132 T670 132 V166 H130 Z"
                  fill="#9e5207"
                  opacity="0.4"
                />

                {/* Tiny Floating Pure Air Bubble (Shows Raw Nectar Viscosity) */}
                <ellipse
                  cx="540"
                  cy="98"
                  rx="14"
                  ry="9"
                  fill="#ffffff"
                  opacity="0.3"
                  stroke="#ffffff"
                  strokeWidth="1"
                />
                <circle cx="536" cy="95" r="2.5" fill="#ffffff" opacity="0.75" />

                {/* Natural Wild Mint Leaf Silhouette inside Reservoir */}
                <g transform="translate(380, 102) scale(0.9)" opacity="0.4">
                  <path
                    d="M0 -14 C12 -12 18 0 16 12 C14 22 2 24 0 24 C-2 24 -14 22 -16 12 C-18 0 -12 -12 0 -14 Z"
                    fill="#15803d"
                  />
                  <line x1="0" y1="-12" x2="0" y2="22" stroke="#ffffff" strokeWidth="1" />
                </g>

                {/* Branding on Stick Foil */}
                <g transform="translate(240, 126)">
                  <text
                    x="0"
                    y="0"
                    fill="#1a110a"
                    fontSize="22"
                    fontFamily="serif"
                    fontWeight="bold"
                    letterSpacing="0.05em"
                  >
                    gapoo.
                  </text>
                  <text
                    x="76"
                    y="-4"
                    fill="#8b5311"
                    fontSize="9"
                    fontFamily="monospace"
                    fontWeight="bold"
                    letterSpacing="0.18em"
                  >
                    RAW HONEY + WILD MINT
                  </text>
                  <text
                    x="76"
                    y="9"
                    fill="#736555"
                    fontSize="8"
                    fontFamily="monospace"
                    letterSpacing="0.12em"
                  >
                    SINGLE-SERVE · 6.0G NET
                  </text>
                </g>

                {/* Precision Laser Notch Cutout (Top Left) */}
                <path
                  d="M118 60 L122 72 L126 60 Z"
                  fill="#ffffff"
                  stroke="#1a110a"
                  strokeWidth="1.8"
                />
                {/* Bottom Notch Guide */}
                <path
                  d="M118 180 L122 168 L126 180 Z"
                  fill="#ffffff"
                  stroke="#1a110a"
                  strokeWidth="1.8"
                />

                {/* Tear Notch Dashed Guide Line */}
                <line
                  x1="122"
                  y1="72"
                  x2="122"
                  y2="168"
                  stroke="#c87a1e"
                  strokeWidth="1.5"
                  strokeDasharray="2 3"
                />

                {/* Foil Glare Sheen Layer */}
                <rect
                  x="80"
                  y="60"
                  width="640"
                  height="120"
                  rx="14"
                  fill="url(#foil-sheen)"
                  pointerEvents="none"
                />
              </g>

              {/* ─── Interactive Hotspot Pins along the Stick ─── */}
              {/* 1. Notch */}
              <g
                className="cursor-pointer transition-transform duration-200"
                onClick={() => setActiveId('notch')}
              >
                <circle
                  cx="122"
                  cy="46"
                  r="13"
                  fill={activeId === 'notch' ? '#c87a1e' : '#1a110a'}
                  className="transition-colors"
                />
                <circle cx="122" cy="46" r="17" fill="none" stroke="#c87a1e" strokeWidth="1.5" opacity={activeId === 'notch' ? 1 : 0.25} />
                <text x="122" y="50" textAnchor="middle" fill="#ffffff" fontSize="10" fontFamily="monospace" fontWeight="bold">
                  01
                </text>
                <line x1="122" y1="59" x2="122" y2="66" stroke="#c87a1e" strokeWidth="1.5" />
              </g>

              {/* 2. Barrier Foil */}
              <g
                className="cursor-pointer transition-transform duration-200"
                onClick={() => setActiveId('barrier')}
              >
                <circle
                  cx="280"
                  cy="204"
                  r="13"
                  fill={activeId === 'barrier' ? '#c87a1e' : '#1a110a'}
                  className="transition-colors"
                />
                <circle cx="280" cy="204" r="17" fill="none" stroke="#c87a1e" strokeWidth="1.5" opacity={activeId === 'barrier' ? 1 : 0.25} />
                <text x="280" y="208" textAnchor="middle" fill="#ffffff" fontSize="10" fontFamily="monospace" fontWeight="bold">
                  02
                </text>
                <line x1="280" y1="184" x2="280" y2="191" stroke="#c87a1e" strokeWidth="1.5" />
              </g>

              {/* 3. 6g Chamber */}
              <g
                className="cursor-pointer transition-transform duration-200"
                onClick={() => setActiveId('dose')}
              >
                <circle
                  cx="510"
                  cy="46"
                  r="13"
                  fill={activeId === 'dose' ? '#c87a1e' : '#1a110a'}
                  className="transition-colors"
                />
                <circle cx="510" cy="46" r="17" fill="none" stroke="#c87a1e" strokeWidth="1.5" opacity={activeId === 'dose' ? 1 : 0.25} />
                <text x="510" y="50" textAnchor="middle" fill="#ffffff" fontSize="10" fontFamily="monospace" fontWeight="bold">
                  03
                </text>
                <line x1="510" y1="59" x2="510" y2="70" stroke="#c87a1e" strokeWidth="1.5" />
              </g>

              {/* 4. Laminar Nozzle */}
              <g
                className="cursor-pointer transition-transform duration-200"
                onClick={() => setActiveId('nozzle')}
              >
                <circle
                  cx="690"
                  cy="204"
                  r="13"
                  fill={activeId === 'nozzle' ? '#c87a1e' : '#1a110a'}
                  className="transition-colors"
                />
                <circle cx="690" cy="204" r="17" fill="none" stroke="#c87a1e" strokeWidth="1.5" opacity={activeId === 'nozzle' ? 1 : 0.25} />
                <text x="690" y="208" textAnchor="middle" fill="#ffffff" fontSize="10" fontFamily="monospace" fontWeight="bold">
                  04
                </text>
                <line x1="690" y1="184" x2="690" y2="191" stroke="#c87a1e" strokeWidth="1.5" />
              </g>
            </svg>
          </div>
        </div>

        {/* Hotspot Selector Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-4 pb-8 border-b border-[#f0e6d6] relative z-10">
          {HOTSPOTS.map((spot) => {
            const isSelected = activeId === spot.id;
            return (
              <button
                key={spot.id}
                type="button"
                onClick={() => setActiveId(spot.id)}
                className={`p-3.5 sm:p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-[#1a110a] text-white border-[#1a110a] shadow-sm'
                    : 'bg-[#faf6ee] text-[#1a110a] border-[#ebdccb] hover:border-[#c87a1e]/60 hover:bg-[#fbf4e8]'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span
                    className={`font-mono text-xs font-bold ${
                      isSelected ? 'text-[#f5a623]' : 'text-[#c87a1e]'
                    }`}
                  >
                    {spot.n}
                  </span>
                  <span
                    className={`text-[10px] font-mono uppercase ${
                      isSelected ? 'text-white/60' : 'text-[#8a7a6a]'
                    }`}
                  >
                    {spot.metric}
                  </span>
                </div>
                <h4 className="font-bold text-xs sm:text-sm leading-snug">
                  {spot.label}
                </h4>
              </button>
            );
          })}
        </div>

        {/* Active Engineering Detail Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSpot.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="pt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10"
          >
            {/* Left Column: Metric Highlight (4 cols) */}
            <div className="lg:col-span-4 p-6 sm:p-7 rounded-2xl bg-[#faf6ee] border border-[#ebdccb] space-y-3">
              <span className="font-mono text-xs font-bold text-[#c87a1e] tracking-widest uppercase block">
                Engineering Target
              </span>
              <div className="flex items-baseline gap-2">
                <span className="font-apricot text-4xl sm:text-5xl font-bold text-[#1a110a] leading-none">
                  {activeSpot.metric}
                </span>
              </div>
              <p className="text-xs font-bold text-[#736555] uppercase tracking-wider">
                {activeSpot.metricLabel}
              </p>
              <div className="pt-2 border-t border-[#ebdccb]/80">
                <span className="text-[11px] text-[#8a7a6a] font-mono block">
                  SPECS ID: {activeSpot.id.toUpperCase()}-STK-V2
                </span>
              </div>
            </div>

            {/* Right Column: Narrative & Technical Points (8 cols) */}
            <div className="lg:col-span-8 space-y-4">
              <div>
                <span className="text-xs font-mono font-bold text-[#8a7a6a] tracking-wider uppercase">
                  {activeSpot.subtitle}
                </span>
                <h3 className="font-apricot text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1a110a] mt-0.5">
                  {activeSpot.label}
                </h3>
              </div>

              <p className="text-sm sm:text-base text-[#5c5043] leading-relaxed font-medium">
                {activeSpot.description}
              </p>

              <div className="space-y-2 pt-2">
                {activeSpot.detailPoints.map((point, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#c87a1e] mt-2 shrink-0" />
                    <span className="text-xs sm:text-sm text-[#4a3e32] leading-relaxed">
                      {point}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

export default StickEngineering;
