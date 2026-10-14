import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * SensoryNotes — Botanical Tasting Notes, Pairing Guide, & Enzyme Care.
 * Sommelier / specialty culinary breakdown of the Mint Honey infusion.
 * Pure line-art craftsmanship, zero AI slop, zero blinding lights.
 */

const PAIRINGS = [
  {
    id: 'tea',
    name: 'Morning Green & Black Tea',
    icon: '🍵',
    idealTemp: '65°C – 70°C',
    flavorProfile: 'Bright mint opens the palate; amber honey rounds out tannins.',
    tip: 'Add after steeping for 3 minutes so raw invertase enzymes stay alive.',
    notes: ['Floral', 'Spearmint Lift', 'Tannin Softener'],
  },
  {
    id: 'lemon',
    name: 'Warm Lemon Water',
    icon: '🍋',
    idealTemp: '55°C – 60°C',
    flavorProfile: 'Zesty citrus acidity balanced by deep multifloral sweetness.',
    tip: 'Your 7:00 AM digestive wake-up ritual on an empty stomach.',
    notes: ['Crisp Cleanse', 'Alkalizing', 'Throat Coating'],
  },
  {
    id: 'breakfast',
    name: 'Greek Yogurt & Walnuts',
    icon: '🥣',
    idealTemp: 'Chilled / Room Temp',
    flavorProfile: 'Silky amber drizzle over creamy tart dairy and toasted crunch.',
    tip: 'Squeeze zigzag ribbons directly from the stick over your bowl.',
    notes: ['Velvety Ribbon', 'Rich Caramel', 'Cool Contrast'],
  },
  {
    id: 'workout',
    name: 'Pre-Workout Fuel',
    icon: '⚡',
    idealTemp: 'Straight From Stick',
    flavorProfile: 'Pure natural glucose + fructose burst with cooling respiratory mint.',
    tip: 'Tear and squeeze directly into mouth 15 minutes before running or gym.',
    notes: ['Immediate Glucose', 'Zero G.I. Distress', 'Clean Energy'],
  },
];

export function SensoryNotes() {
  const [activePairingId, setActivePairingId] = useState('tea');
  const activePairing = PAIRINGS.find((p) => p.id === activePairingId) || PAIRINGS[0];

  return (
    <section className="py-20 sm:py-28 lg:py-32 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto relative font-montserrat">
      {/* Section Header */}
      <div className="max-w-3xl mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 bg-[#faecc9] border border-[#e5cf9d] px-4 py-1.5 rounded-full text-xs font-bold text-[#8b5311] shadow-2xs mb-4">
          <span className="text-sm">🌿</span>
          <span className="uppercase tracking-widest text-[11px] font-mono">
            Sommelier Flavor Architecture
          </span>
        </div>

        <h2 className="font-apricot text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1a110a] leading-[1.05] tracking-tight">
          Botanical notes &amp; sensory pairings.
        </h2>

        <p className="mt-4 text-base sm:text-lg text-[#5c5043] leading-relaxed max-w-2xl font-medium">
          Gapoo is not generic sugar syrup. It is raw, unpasteurized multifloral nectar
          infused with steam-distilled wild mint essence. Here is how the flavor unrolls across your palate.
        </p>
      </div>

      {/* Flavor Architecture 3-Column Sommelier Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {/* Top Note */}
        <div className="p-7 rounded-3xl bg-white border border-[#eee4d4] shadow-xs space-y-3 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs font-bold text-[#15803d] tracking-widest uppercase">
              Top Note · 0–3 Seconds
            </span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#eef8f1] text-[#15803d] font-bold font-mono">
              Cooling
            </span>
          </div>
          <h3 className="font-apricot text-3xl font-bold text-[#1a110a]">
            Wild Spearmint
          </h3>
          <p className="text-xs sm:text-sm text-[#5c5043] leading-relaxed">
            A crisp, aromatic herbal breeze that instantly clears the sinuses and primes the tongue.
            Never artificial or candy-like; pure field-distilled botanical clarity.
          </p>
          <div className="pt-3 border-t border-[#f0e6d6] flex items-center gap-2 text-[11px] font-mono text-[#8a7a6a]">
            <span>AROMA: Mentha Spicata</span>
            <span>·</span>
            <span>ZERO SYNTHETICS</span>
          </div>
        </div>

        {/* Heart Note */}
        <div className="p-7 rounded-3xl bg-white border-2 border-[#c87a1e]/40 shadow-xs space-y-3 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs font-bold text-[#c87a1e] tracking-widest uppercase">
              Heart Note · 3–15 Seconds
            </span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#faecc9] text-[#8b5311] font-bold font-mono">
              Amber Body
            </span>
          </div>
          <h3 className="font-apricot text-3xl font-bold text-[#1a110a]">
            Multifloral Nectar
          </h3>
          <p className="text-xs sm:text-sm text-[#5c5043] leading-relaxed">
            Rich, warm, and velvety. Subtle undertones of caramelized wildflower pollen,
            sun-drenched clover, and deep golden warmth that coats the throat.
          </p>
          <div className="pt-3 border-t border-[#f0e6d6] flex items-center gap-2 text-[11px] font-mono text-[#8a7a6a]">
            <span>HARVEST: Indian Apiaries</span>
            <span>·</span>
            <span>RAW UNFILTERED</span>
          </div>
        </div>

        {/* Finish */}
        <div className="p-7 rounded-3xl bg-white border border-[#eee4d4] shadow-xs space-y-3 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs font-bold text-[#8b5311] tracking-widest uppercase">
              Finish · 15+ Seconds
            </span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#faf2e4] text-[#8b5311] font-bold font-mono">
              Clean Palate
            </span>
          </div>
          <h3 className="font-apricot text-3xl font-bold text-[#1a110a]">
            Clean Herbaceous Lift
          </h3>
          <p className="text-xs sm:text-sm text-[#5c5043] leading-relaxed">
            Unlike refined cane sugar that leaves a cloying, heavy film in your mouth,
            the mint finishes clean, leaving your breath fresh and your palate refreshed.
          </p>
          <div className="pt-3 border-t border-[#f0e6d6] flex items-center gap-2 text-[11px] font-mono text-[#8a7a6a]">
            <span>AFTERTASTE: Zero Cloying Residue</span>
          </div>
        </div>
      </div>

      {/* Interactive Pairing Studio & Enzyme Care Guide */}
      <div className="rounded-[32px] sm:rounded-[40px] bg-white border border-[#eee4d4] p-6 sm:p-10 shadow-sm relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Pairing Selector (5 cols) */}
          <div className="lg:col-span-5 space-y-3">
            <span className="font-mono text-xs font-bold text-[#c87a1e] tracking-widest uppercase block mb-1">
              Select Your Ritual
            </span>
            <div className="space-y-2">
              {PAIRINGS.map((p) => {
                const isSelected = activePairingId === p.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setActivePairingId(p.id)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'bg-[#1a110a] text-white border-[#1a110a] shadow-sm'
                        : 'bg-[#faf6ee] text-[#1a110a] border-[#ebdccb] hover:border-[#c87a1e]/60 hover:bg-[#fcf7ed]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{p.icon}</span>
                      <div>
                        <h4 className="font-bold text-sm leading-snug">{p.name}</h4>
                        <span
                          className={`text-[11px] font-mono ${
                            isSelected ? 'text-[#f5a623]' : 'text-[#8a7a6a]'
                          }`}
                        >
                          Target: {p.idealTemp}
                        </span>
                      </div>
                    </div>
                    <span className="text-sm font-bold opacity-60">→</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Active Ritual Card + Enzyme Science (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activePairing.id}
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.25 }}
                className="p-6 sm:p-8 rounded-3xl bg-[#faf6ee] border border-[#ebdccb] space-y-4"
              >
                <div className="flex items-center justify-between flex-wrap gap-2 pb-4 border-b border-[#ebdccb]">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{activePairing.icon}</span>
                    <h4 className="font-apricot text-2xl sm:text-3xl font-bold text-[#1a110a]">
                      {activePairing.name}
                    </h4>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-white border border-[#ebdccb] text-xs font-mono font-bold text-[#c87a1e]">
                    Ideal: {activePairing.idealTemp}
                  </span>
                </div>

                <p className="text-sm sm:text-base text-[#4a3e32] leading-relaxed font-medium">
                  {activePairing.flavorProfile}
                </p>

                <div className="p-4 rounded-2xl bg-white border border-[#ebdccb] text-xs sm:text-sm text-[#736555] space-y-1">
                  <span className="font-bold text-[#1a110a] block">Ritual Pro-Tip:</span>
                  <p>{activePairing.tip}</p>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  {activePairing.notes.map((note, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-full bg-white/80 border border-[#e5cf9d] text-xs font-bold font-mono text-[#8b5311]"
                    >
                      #{note}
                    </span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Crucial Raw Enzyme Care Banner */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#fff9ec] border border-[#e8cd8c] flex items-start gap-4">
              <span className="text-xl shrink-0 mt-0.5">⚠️</span>
              <div className="space-y-1 text-xs sm:text-sm">
                <h5 className="font-bold text-[#1a110a]">
                  The Golden Rule: Never pour boiling water (100°C) directly on raw honey.
                </h5>
                <p className="text-[#6b5d4f] leading-relaxed">
                  Raw honey contains live beneficial enzymes (invertase, diastase, glucose oxidase).
                  Let your boiled water or tea cool for 2–3 minutes below 70°C before stirring in Gapoo
                  so you protect every living nutrient.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SensoryNotes;
