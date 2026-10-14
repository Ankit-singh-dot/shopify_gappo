import { useState } from 'react';
import { motion } from 'framer-motion';

/**
 * JarVsStick — "The Pantry Cleanse"
 * Side-by-side mechanical and lifestyle contrast:
 * The traditional 500g glass jar nightmare vs. The 6g single-serve ritual.
 * Pure line-art craft, zero AI slop, zero blinding lights.
 */

const COMPARISON_ROWS = [
  {
    feature: 'Prep Time & Effort',
    jar: '45 seconds (hunt for spoon, wrestle crystallized lid)',
    stick: '3 seconds (snap, squeeze, stir with tea bag or sip)',
    stickHighlight: true,
  },
  {
    feature: 'Utensils Required',
    jar: '1 metal spoon + paper towels for counter drips',
    stick: 'Zero utensils. The stick is its own dispenser.',
    stickHighlight: true,
  },
  {
    feature: 'Countertop Residue',
    jar: 'Sticky rings, honey trails, pantry ant magnet',
    stick: '100% spotless. Zero trailing droplets.',
    stickHighlight: true,
  },
  {
    feature: 'Portion Accuracy',
    jar: 'Wild guesstimates (often 12–18g, causing sugar crash)',
    stick: 'Precisely 6.0g single serving (21 clean calories)',
    stickHighlight: true,
  },
  {
    feature: 'Portability',
    jar: 'Trapped in the kitchen cupboard forever',
    stick: 'Pockets, gym duffels, flights, desk drawers',
    stickHighlight: true,
  },
  {
    feature: 'Crystallization Waste',
    jar: '~25% abandoned at jar bottom in hard sugar crystals',
    stick: '100% evacuated. Squeeze from bottom up.',
    stickHighlight: true,
  },
];

export function JarVsStick() {
  const [cupsPerDay, setCupsPerDay] = useState(2);

  // Annual friction math
  const annualSpoonsSaved = cupsPerDay * 365;
  const annualWastedGramsSaved = Math.round(cupsPerDay * 365 * 1.8);
  const minutesSaved = Math.round((cupsPerDay * 365 * 40) / 60);

  return (
    <section className="py-20 sm:py-28 lg:py-32 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto relative font-montserrat">
      {/* Section Header */}
      <div className="max-w-3xl mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 bg-[#faecc9] border border-[#e5cf9d] px-4 py-1.5 rounded-full text-xs font-bold text-[#8b5311] shadow-2xs mb-4">
          <span className="text-sm">🍯</span>
          <span className="uppercase tracking-widest text-[11px] font-mono">
            The Pantry Cleanse
          </span>
        </div>

        <h2 className="font-apricot text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1a110a] leading-[1.05] tracking-tight">
          Why jars belong in 1920.
        </h2>

        <p className="mt-4 text-base sm:text-lg text-[#5c5043] leading-relaxed max-w-2xl font-medium">
          Honey is nature’s most miraculous superfood, but glass jars made it an annoying chore.
          Here is what happens when you rethink the vessel from the ground up.
        </p>
      </div>

      {/* Visual Side-by-Side Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-12">
        {/* Left: The 500g Glass Jar (Tired, Messy) */}
        <div className="rounded-[32px] p-8 sm:p-10 bg-[#faf6f0] border border-[#ebdccb] relative overflow-hidden flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-6 border-b border-[#ebdccb]">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#8a7a6a] block">
                  The Old Way
                </span>
                <h3 className="font-apricot text-2xl sm:text-3xl font-bold text-[#4a3e32] mt-0.5">
                  The Sticky Glass Jar
                </h3>
              </div>
              <span className="px-3 py-1 rounded-full bg-[#ebdccb] text-[#736555] text-xs font-bold font-mono">
                500g Bulky Glass
              </span>
            </div>

            {/* Line-Art Illustration of the Messy Jar */}
            <div className="py-8 flex justify-center">
              <svg
                viewBox="0 0 240 180"
                className="w-48 h-auto select-none opacity-75"
                aria-hidden="true"
              >
                {/* Dripping Puddle on counter */}
                <ellipse cx="120" cy="165" rx="70" ry="8" fill="#d89635" opacity="0.3" />
                <path
                  d="M60 165 Q85 160 110 166 T170 165 T180 165"
                  stroke="#c87a1e"
                  strokeWidth="2"
                  fill="none"
                />

                {/* Jar Outline */}
                <rect
                  x="70"
                  y="40"
                  width="100"
                  height="115"
                  rx="12"
                  fill="#ffffff"
                  stroke="#4a3e32"
                  strokeWidth="2"
                />

                {/* Jar Lid (Welded with dried sugar crystals) */}
                <rect
                  x="64"
                  y="26"
                  width="112"
                  height="16"
                  rx="3"
                  fill="#d6c6b4"
                  stroke="#4a3e32"
                  strokeWidth="2"
                />

                {/* Sugar Crystals on rim */}
                <circle cx="68" cy="42" r="3" fill="#c87a1e" />
                <circle cx="172" cy="42" r="3.5" fill="#c87a1e" />
                <circle cx="170" cy="48" r="2" fill="#c87a1e" />

                {/* Honey Level in Jar (Crystallized Bottom) */}
                <path
                  d="M72 90 Q120 84 168 90 V145 Q168 153 160 153 H80 Q72 153 72 145 Z"
                  fill="#f6cf8a"
                  opacity="0.6"
                />

                {/* Hard Crystallized Solid Chunk at bottom */}
                <path
                  d="M72 128 L95 120 L120 126 L145 118 L168 124 V153 H72 Z"
                  fill="#e0a94d"
                  opacity="0.8"
                />
                <text
                  x="120"
                  y="144"
                  textAnchor="middle"
                  fill="#7a460a"
                  fontSize="8"
                  fontFamily="monospace"
                  fontWeight="bold"
                >
                  CRYSTALLIZED TRAP
                </text>

                {/* Messy Spoon Dropping Drips */}
                <path
                  d="M175 30 L210 5 L218 10 L185 36"
                  stroke="#4a3e32"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  fill="none"
                />
                <circle cx="173" cy="38" r="8" fill="#e8dfd4" stroke="#4a3e32" strokeWidth="2" />
                {/* Drips falling onto counter */}
                <path
                  d="M173 46 Q173 60 171 66 C170 68 168 70 170 72 C172 74 174 72 173 70 Z"
                  fill="#c87a1e"
                />
                <circle cx="171" cy="94" r="3" fill="#c87a1e" />
                <circle cx="171" cy="120" r="3" fill="#c87a1e" />
              </svg>
            </div>

            <ul className="space-y-3 pt-2 text-xs sm:text-sm text-[#6b5d4f]">
              <li className="flex items-start gap-2.5">
                <span className="text-red-700 font-bold shrink-0">✕</span>
                <span>Metal lid gets welded shut by dried caramelized sugars</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-red-700 font-bold shrink-0">✕</span>
                <span>The spoon drips across your counter on every single cup</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-red-700 font-bold shrink-0">✕</span>
                <span>Cannot be brought on flights, into meetings, or during commutes</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-red-700 font-bold shrink-0">✕</span>
                <span>Last 100 grams harden into a solid rock at the base</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Right: The 6g Gapoo Stick (Modern, Pure, Clean) */}
        <div className="rounded-[32px] p-8 sm:p-10 bg-white border-2 border-[#c87a1e] shadow-[0_12px_36px_rgba(200,122,30,0.12)] relative overflow-hidden flex flex-col justify-between">
          {/* Subtle Ambient Honey Glow */}
          <div
            className="absolute top-0 right-0 w-64 h-64 pointer-events-none -z-0 opacity-40"
            style={{
              background: 'radial-gradient(circle, #fbd38a 0%, transparent 70%)',
            }}
          />

          <div className="relative z-10">
            <div className="flex items-center justify-between pb-6 border-b border-[#f0e4d2]">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#c87a1e] block">
                  The Gapoo Ritual
                </span>
                <h3 className="font-apricot text-2xl sm:text-3xl font-bold text-[#1a110a] mt-0.5">
                  The 6g Single-Serve Stick
                </h3>
              </div>
              <span className="px-3 py-1 rounded-full bg-[#faecc9] border border-[#e5cf9d] text-[#8b5311] text-xs font-bold font-mono">
                Pure Honey + Wild Mint
              </span>
            </div>

            {/* Line-Art Illustration of the Clean Stick Snap */}
            <div className="py-8 flex justify-center">
              <svg
                viewBox="0 0 240 180"
                className="w-48 h-auto select-none"
                aria-hidden="true"
              >
                {/* Spotless Ceramic Saucer & Cup below */}
                <ellipse cx="120" cy="160" rx="44" ry="7" fill="none" stroke="#1a110a" strokeWidth="2" opacity="0.3" />
                <path
                  d="M96 130 L102 155 Q104 160 112 160 L128 160 Q136 160 138 155 L144 130 Z"
                  fill="#faf6ee"
                  stroke="#1a110a"
                  strokeWidth="2"
                />
                {/* Tea Fill */}
                <ellipse cx="120" cy="132" rx="22" ry="4" fill="#e39a35" />

                {/* Elegant Steam rising */}
                <path
                  d="M115 120 Q112 110 116 102 T114 88"
                  stroke="#c87a1e"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  fill="none"
                  opacity="0.6"
                />
                <path
                  d="M125 118 Q128 108 124 100 T126 86"
                  stroke="#c87a1e"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  fill="none"
                  opacity="0.6"
                />

                {/* The Stick held at angle pouring clean ribbon */}
                <g transform="rotate(-35 120 70)">
                  <rect
                    x="80"
                    y="50"
                    width="110"
                    height="28"
                    rx="6"
                    fill="#fdfaf3"
                    stroke="#1a110a"
                    strokeWidth="2"
                  />
                  <rect
                    x="90"
                    y="55"
                    width="85"
                    height="18"
                    rx="4"
                    fill="#f5b04a"
                  />
                  <text
                    x="132"
                    y="67"
                    textAnchor="middle"
                    fill="#1a110a"
                    fontSize="7"
                    fontFamily="serif"
                    fontWeight="bold"
                  >
                    gapoo.
                  </text>
                  {/* Clean Pour Ribbon into cup */}
                  <path
                    d="M80 64 L50 82 Q46 95 48 110"
                    stroke="#e2912a"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    fill="none"
                  />
                </g>

                {/* Little Fresh Mint Leaf */}
                <path
                  d="M136 130 C144 126 148 132 144 138 C140 142 134 138 136 130 Z"
                  fill="#15803d"
                />
              </svg>
            </div>

            <ul className="space-y-3 pt-2 text-xs sm:text-sm text-[#3d3228] font-medium">
              <li className="flex items-start gap-2.5">
                <span className="text-[#15803d] font-bold shrink-0">✓</span>
                <span>Snaps open cleanly with two fingers in 1 second flat</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#15803d] font-bold shrink-0">✓</span>
                <span>Zero utensils to clean. Zero sticky residue on fingers or desk</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#15803d] font-bold shrink-0">✓</span>
                <span>Slip 3 sticks into your laptop bag, coat, or flight carry-on</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#15803d] font-bold shrink-0">✓</span>
                <span>Infused with botanical mint extract for a crisp, cooling finish</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Interactive Annual Friction Calculator Strip */}
      <div className="rounded-[32px] bg-white border border-[#eee4d4] p-6 sm:p-10 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          {/* Slider input */}
          <div className="max-w-md space-y-3">
            <span className="font-mono text-xs font-bold text-[#c87a1e] tracking-widest uppercase">
              Ritual Metric Calculator
            </span>
            <h3 className="font-apricot text-2xl sm:text-3xl font-bold text-[#1a110a]">
              How often do you sweeten your day?
            </h3>
            <p className="text-xs sm:text-sm text-[#736555] leading-relaxed">
              Adjust your daily tea, lemon water, or breakfast servings to see what you save over 1 year.
            </p>

            <div className="pt-2">
              <div className="flex items-center justify-between text-xs font-bold font-mono text-[#1a110a] mb-2">
                <span>{cupsPerDay} stick{cupsPerDay > 1 ? 's' : ''} / day</span>
                <span className="text-[#c87a1e]">{cupsPerDay * 7} / week</span>
              </div>
              <input
                type="range"
                min="1"
                max="5"
                step="1"
                value={cupsPerDay}
                onChange={(e) => setCupsPerDay(parseInt(e.target.value, 10))}
                className="w-full accent-[#c87a1e] cursor-pointer"
              />
            </div>
          </div>

          {/* Calculated Output Badges */}
          <div className="grid grid-cols-3 gap-3 sm:gap-4 lg:w-1/2">
            <div className="p-4 sm:p-5 rounded-2xl bg-[#faf6ee] border border-[#ebdccb] text-center">
              <span className="font-apricot text-2xl sm:text-3xl lg:text-4xl font-bold text-[#c87a1e] block leading-none">
                {annualSpoonsSaved}
              </span>
              <span className="text-[10px] sm:text-xs font-bold text-[#1a110a] uppercase tracking-wider block mt-1.5">
                Spoons Washed
              </span>
              <span className="text-[9px] text-[#8a7a6a] font-mono">Avoided / Year</span>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-[#faf6ee] border border-[#ebdccb] text-center">
              <span className="font-apricot text-2xl sm:text-3xl lg:text-4xl font-bold text-[#c87a1e] block leading-none">
                {annualWastedGramsSaved}g
              </span>
              <span className="text-[10px] sm:text-xs font-bold text-[#1a110a] uppercase tracking-wider block mt-1.5">
                Wasted Nectar
              </span>
              <span className="text-[9px] text-[#8a7a6a] font-mono">Saved From Trash</span>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-[#faf6ee] border border-[#ebdccb] text-center">
              <span className="font-apricot text-2xl sm:text-3xl lg:text-4xl font-bold text-[#c87a1e] block leading-none">
                {minutesSaved}m
              </span>
              <span className="text-[10px] sm:text-xs font-bold text-[#1a110a] uppercase tracking-wider block mt-1.5">
                Time Reclaimed
              </span>
              <span className="text-[9px] text-[#8a7a6a] font-mono">Zero Counter Scrubbing</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default JarVsStick;
