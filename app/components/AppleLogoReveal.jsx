import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export function AppleLogoReveal() {
  const appleLogoRef = useRef(null);
  const { scrollYProgress: appleScroll } = useScroll({
    target: appleLogoRef,
    offset: ['start end', 'end end'],
  });

  // Mascot scale & vertical motion: drops in and scales down to rest cleanly
  const appleBearScale = useTransform(appleScroll, [0.2, 0.65], [2.4, 1]);
  const appleBearY = useTransform(appleScroll, [0.2, 0.65], ['25vh', '0vh']);

  // Typography fades in after mascot settles
  const appleTextOpacity = useTransform(appleScroll, [0.65, 0.82], [0, 1]);
  const appleTextY = useTransform(appleScroll, [0.65, 0.82], ['30px', '0px']);

  // Background smoothly transitions to deep obsidian (#1a110a) to match the footer
  const appleBgColor = useTransform(appleScroll, [0.75, 0.98], ['#fdfaf1', '#1a110a']);
  const appleBearFilter = useTransform(appleScroll, [0.75, 0.98], [
    'invert(0%) brightness(1)',
    'invert(100%) brightness(2)',
  ]);
  const appleTextColor = useTransform(appleScroll, [0.75, 0.98], ['#1a110a', '#c87a1e']);

  return (
    <section ref={appleLogoRef} className="relative h-[250vh] bg-[#fdfaf1]">
      <motion.div
        className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden"
        style={{ backgroundColor: appleBgColor }}
      >
        {/* The Mascot */}
        <motion.div
          style={{ scale: appleBearScale, y: appleBearY, filter: appleBearFilter }}
          className="relative z-10 flex items-center justify-center pointer-events-none"
        >
          <img
            src="/images/gapoo_bear_mascot_hd.png"
            alt="Gapoo Bear Mascot"
            className="w-[28vw] min-w-[180px] max-w-[340px] object-contain select-none"
          />
        </motion.div>

        {/* The Cursive Wordmark */}
        <motion.h2
          className="font-apricot text-center tracking-tighter mt-6 z-10 select-none"
          style={{
            opacity: appleTextOpacity,
            y: appleTextY,
            color: appleTextColor,
            fontSize: 'clamp(4.5rem, 14vw, 180px)',
            lineHeight: 0.85,
          }}
        >
          Gapoo
        </motion.h2>

        {/* Ambient Gold Glow */}
        <motion.div
          style={{ opacity: appleTextOpacity }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] max-w-[700px] max-h-[700px] bg-[#c87a1e] blur-[140px] rounded-full pointer-events-none mix-blend-screen opacity-0"
        />
      </motion.div>
    </section>
  );
}
