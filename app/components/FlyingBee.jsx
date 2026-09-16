import React, {useState, useEffect, useRef} from 'react';

/**
 * Ultra-Premium Flying Honeybee Companion for Gapoo Storefront
 *
 * Features:
 * - Handcrafted animated SVG bee with flapping wings & golden pollen glow
 * - Dynamic SVG dashed honey flight trail (like the official packaging flight loop)
 * - Autonomous organic flight physics with rotational heading towards velocity
 * - Scroll-driven swoop dynamics (flies along with user's reading flow)
 * - Click Easter egg: 360° celebratory loop-de-loop with pollen burst & honey fun facts
 * - Discreet toggle button & prefers-reduced-motion support
 * - 60fps/120fps hardware-accelerated transforms (translate3d, zero layout thrashing)
 */

const HONEY_QUOTES = [
  'Bzzz! Minted Goodness ✨',
  'Bee Positive! 💛',
  'Under $1 a stick — zero sticky mess! ✨',
  'Did you know? Honey never spoils! ⏳',
  'Harvested with care from family hives 🐝',
  'Snap, squeeze, enjoy! 🚀',
];

export function FlyingBee() {
  const [mounted, setMounted] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [quote, setQuote] = useState(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [sparkles, setSparkles] = useState([]);

  const beeRef = useRef(null);
  const trailPathRef = useRef(null);
  const animFrameRef = useRef(null);

  // Physics state
  const stateRef = useRef({
    x: 100,
    y: 200,
    vx: 1.5,
    vy: 0.8,
    targetX: 300,
    targetY: 250,
    angle: 0,
    history: [],
    lastScrollY: 0,
    time: 0,
    lastTargetTime: 0,
  });

  // Check prefers-reduced-motion & mark mounted
  useEffect(() => {
    setMounted(true);
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setIsActive(false);
    }
  }, []);

  // Initialize and main animation loop
  useEffect(() => {
    if (!isActive || typeof window === 'undefined') return;

    // Start position near top-right
    stateRef.current.x = Math.min(window.innerWidth - 120, 600);
    stateRef.current.y = 180;
    stateRef.current.targetX = stateRef.current.x;
    stateRef.current.targetY = stateRef.current.y;
    stateRef.current.lastScrollY = window.scrollY;

    const pickNewTarget = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      // Stay within viewport with 80px margin
      const margin = 80;
      const newX = margin + Math.random() * (w - margin * 2);
      const newY = margin + Math.random() * (h - margin * 2);
      stateRef.current.targetX = newX;
      stateRef.current.targetY = newY;
    };

    // Scroll listener to boost velocity along scroll
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const deltaY = currentScrollY - stateRef.current.lastScrollY;
      stateRef.current.lastScrollY = currentScrollY;

      // Nudge bee with scroll
      if (Math.abs(deltaY) > 2) {
        stateRef.current.vy += Math.sign(deltaY) * Math.min(Math.abs(deltaY) * 0.08, 4);
        stateRef.current.targetY += Math.sign(deltaY) * 60;
        // Clamp target within viewport
        stateRef.current.targetY = Math.max(80, Math.min(window.innerHeight - 80, stateRef.current.targetY));
      }
    };

    window.addEventListener('scroll', handleScroll, {passive: true});

    let lastTime = performance.now();

    const loop = (now) => {
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;
      const s = stateRef.current;
      s.time += dt;

      // Periodically pick new wandering target
      if (s.time - s.lastTargetTime > 3.5) {
        pickNewTarget();
        s.lastTargetTime = s.time;
      }

      // Physics: smooth spring attraction to target
      const dx = s.targetX - s.x;
      const dy = s.targetY - s.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Desired speed
      const baseSpeed = dist > 400 ? 160 : dist > 150 ? 110 : 70;
      const targetVx = (dx / (dist || 1)) * baseSpeed;
      const targetVy = (dy / (dist || 1)) * baseSpeed;

      // Smooth acceleration
      const accel = 2.2;
      s.vx += (targetVx - s.vx) * accel * dt;
      s.vy += (targetVy - s.vy) * accel * dt;

      // Add gentle organic hovering sinusoidal wobble
      const wobbleX = Math.cos(s.time * 3.2) * 18;
      const wobbleY = Math.sin(s.time * 4.1) * 22;

      // Integrate position
      s.x += (s.vx + wobbleX) * dt;
      s.y += (s.vy + wobbleY) * dt;

      // Keep within screen bounds
      const margin = 40;
      if (s.x < margin) { s.x = margin; s.vx = Math.abs(s.vx) * 0.8; s.targetX = margin + 150; }
      if (s.x > window.innerWidth - margin) { s.x = window.innerWidth - margin; s.vx = -Math.abs(s.vx) * 0.8; s.targetX = window.innerWidth - margin - 150; }
      if (s.y < margin) { s.y = margin; s.vy = Math.abs(s.vy) * 0.8; s.targetY = margin + 150; }
      if (s.y > window.innerHeight - margin) { s.y = window.innerHeight - margin; s.vy = -Math.abs(s.vy) * 0.8; s.targetY = window.innerHeight - margin - 150; }

      // Compute heading angle from actual velocity
      const targetAngle = Math.atan2(s.vy, s.vx) * (180 / Math.PI) + 90; // +90 because bee points upwards
      // Smooth angle interpolation
      let angleDiff = (targetAngle - s.angle) % 360;
      if (angleDiff > 180) angleDiff -= 360;
      if (angleDiff < -180) angleDiff += 360;
      s.angle += angleDiff * 6 * dt;

      // Record history for the honey dashed flight trail (store last 28 points)
      s.history.unshift({x: s.x, y: s.y});
      if (s.history.length > 28) {
        s.history.pop();
      }

      // Update Bee DOM element
      if (beeRef.current) {
        beeRef.current.style.transform = `translate3d(${s.x}px, ${s.y}px, 0) rotate(${s.angle}deg)`;
      }

      // Update SVG Flight Trail Path
      if (trailPathRef.current && s.history.length > 2) {
        let d = `M ${s.history[0].x} ${s.history[0].y}`;
        for (let i = 1; i < s.history.length - 1; i++) {
          const xc = (s.history[i].x + s.history[i + 1].x) / 2;
          const yc = (s.history[i].y + s.history[i + 1].y) / 2;
          d += ` Q ${s.history[i].x} ${s.history[i].y}, ${xc} ${yc}`;
        }
        trailPathRef.current.setAttribute('d', d);
      }

      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [isActive]);

  // Handle Bee Click Easter Egg
  const handleBeeClick = (e) => {
    e.stopPropagation();

    // 360° spin loop
    setIsSpinning(true);
    setTimeout(() => setIsSpinning(false), 700);

    // Pick a fun quote
    const randomQuote = HONEY_QUOTES[Math.floor(Math.random() * HONEY_QUOTES.length)];
    setQuote(randomQuote);
    setTimeout(() => setQuote(null), 3200);

    // Create burst of golden pollen sparkles
    const newSparkles = Array.from({length: 8}, (_, i) => {
      const angle = (i / 8) * Math.PI * 2;
      const speed = 30 + Math.random() * 35;
      return {
        id: Date.now() + i,
        dx: Math.cos(angle) * speed,
        dy: Math.sin(angle) * speed,
        size: 3 + Math.random() * 4,
      };
    });
    setSparkles(newSparkles);
    setTimeout(() => setSparkles([]), 900);

    // Make bee dash to a new playful target
    stateRef.current.targetX = Math.random() * (window.innerWidth - 160) + 80;
    stateRef.current.targetY = Math.random() * (window.innerHeight - 160) + 80;
  };

  if (!mounted) return null;

  return (
    <>
      <style>{`
        @keyframes beeWingFlapLeft {
          0%, 100% { transform: rotate(0deg) scaleX(1); }
          50% { transform: rotate(-32deg) scaleX(0.7); }
        }
        @keyframes beeWingFlapRight {
          0%, 100% { transform: rotate(0deg) scaleX(1); }
          50% { transform: rotate(32deg) scaleX(0.7); }
        }
        @keyframes beeSpinLoop {
          0% { transform: scale(1) rotate(0deg); }
          50% { transform: scale(1.35) rotate(180deg); }
          100% { transform: scale(1) rotate(360deg); }
        }
        @keyframes pollenFade {
          0% { opacity: 1; transform: translate(0, 0) scale(1); }
          100% { opacity: 0; transform: translate(var(--pollen-dx), var(--pollen-dy)) scale(0.2); }
        }
        .bee-wing-left {
          transform-origin: 22px 14px;
          animation: beeWingFlapLeft 48ms infinite alternate ease-in-out;
        }
        .bee-wing-right {
          transform-origin: 22px 14px;
          animation: beeWingFlapRight 48ms infinite alternate ease-in-out;
        }
        .bee-spinning {
          animation: beeSpinLoop 700ms cubic-bezier(0.34, 1.56, 0.64, 1);
        }
      `}</style>

      {isActive && (
        <>
          {/* SVG Flight Trail (Smooth golden dashed honey flight path) */}
          <svg
            className="fixed inset-0 w-full h-full pointer-events-none z-30 select-none overflow-hidden"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="honeyTrailGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f5a623" stopOpacity="0.75" />
                <stop offset="60%" stopColor="#f7be54" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#fdfaf1" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              ref={trailPathRef}
              fill="none"
              stroke="url(#honeyTrailGrad)"
              strokeWidth="2.5"
              strokeDasharray="4 6"
              strokeLinecap="round"
            />
          </svg>

          {/* The Flying Bee */}
          <div
            ref={beeRef}
            onClick={handleBeeClick}
            className="fixed top-0 left-0 w-11 h-11 -ml-5.5 -mt-5.5 z-40 cursor-pointer pointer-events-auto select-none group"
            title="Click me for honey fun!"
            style={{willChange: 'transform'}}
          >
            <div className={`w-full h-full relative transition-transform ${isSpinning ? 'bee-spinning' : 'group-hover:scale-115'}`}>
              {/* Golden Ambient Aura Glow */}
              <div className="absolute inset-0 rounded-full bg-[#f5a623]/25 blur-[6px] -z-10 pointer-events-none group-hover:bg-[#f5a623]/40 transition-colors" />

              {/* Handcrafted Animated Golden Bee SVG */}
              <svg viewBox="0 0 44 44" fill="none" className="w-full h-full drop-shadow-md">
                {/* Left Wing */}
                <ellipse
                  cx="12"
                  cy="11"
                  rx="7"
                  ry="4.2"
                  transform="rotate(-28 12 11)"
                  fill="rgba(255, 255, 255, 0.85)"
                  stroke="#e2931a"
                  strokeWidth="1.2"
                  className="bee-wing-left"
                />

                {/* Right Wing */}
                <ellipse
                  cx="32"
                  cy="11"
                  rx="7"
                  ry="4.2"
                  transform="rotate(28 32 11)"
                  fill="rgba(255, 255, 255, 0.85)"
                  stroke="#e2931a"
                  strokeWidth="1.2"
                  className="bee-wing-right"
                />

                {/* Antennae */}
                <path
                  d="M 19 9 Q 16 3 13 4"
                  stroke="#1a1612"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  fill="none"
                />
                <circle cx="13" cy="4" r="1" fill="#1a1612" />
                <path
                  d="M 25 9 Q 28 3 31 4"
                  stroke="#1a1612"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  fill="none"
                />
                <circle cx="31" cy="4" r="1" fill="#1a1612" />

                {/* Head */}
                <circle cx="22" cy="11" r="5" fill="#f5a623" stroke="#d97706" strokeWidth="1" />
                {/* Eyes */}
                <circle cx="20" cy="10" r="1" fill="#1a1612" />
                <circle cx="24" cy="10" r="1" fill="#1a1612" />

                {/* Abdomen / Body */}
                <ellipse cx="22" cy="22" rx="7.5" ry="9.5" fill="#f5a623" stroke="#d97706" strokeWidth="1" />
                {/* Dark Honeycomb Stripes */}
                <path d="M 15.5 17 Q 22 19 28.5 17" stroke="#1a1612" strokeWidth="1.8" strokeLinecap="round" />
                <path d="M 15 22 Q 22 24 29 22" stroke="#1a1612" strokeWidth="1.8" strokeLinecap="round" />
                <path d="M 16.5 27 Q 22 28.5 27.5 27" stroke="#1a1612" strokeWidth="1.8" strokeLinecap="round" />

                {/* Stinger */}
                <polygon points="22,33 20.5,30.5 23.5,30.5" fill="#1a1612" />
              </svg>

              {/* Pollen Burst Sparkles on Click */}
              {sparkles.map((sp) => (
                <div
                  key={sp.id}
                  className="absolute left-1/2 top-1/2 rounded-full bg-[#f5a623] shadow-sm pointer-events-none"
                  style={{
                    width: `${sp.size}px`,
                    height: `${sp.size}px`,
                    '--pollen-dx': `${sp.dx}px`,
                    '--pollen-dy': `${sp.dy}px`,
                    animation: 'pollenFade 700ms forwards ease-out',
                  }}
                />
              ))}

              {/* Floating Speech Bubble with Honey Quote */}
              {quote && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-3 py-1.5 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-[#e8cd8c] text-[11px] font-bold text-[#8b5311] whitespace-nowrap font-montserrat animate-bounce pointer-events-none z-50">
                  <span>{quote}</span>
                  {/* Little speech bubble tail */}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-white" />
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {/* Discrete Bee Companion Toggle (Bottom-Left) */}
      <button
        type="button"
        onClick={() => setIsActive((prev) => !prev)}
        className="fixed bottom-4 left-4 z-40 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/85 hover:bg-white backdrop-blur-md border border-[#eee6d6] shadow-sm hover:shadow text-xs font-semibold text-[#6e6152] hover:text-[#1a1612] transition-all font-montserrat cursor-pointer hover:scale-105 active:scale-95"
        title={isActive ? 'Rest the honeybee' : 'Let the honeybee fly'}
        aria-label="Toggle Flying Bee animation"
      >
        <span className="text-sm">🐝</span>
        <span className="hidden sm:inline text-[11px]">
          {isActive ? 'Bee: Active' : 'Bee: Resting'}
        </span>
      </button>
    </>
  );
}
