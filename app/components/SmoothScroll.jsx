import { useEffect } from 'react';
import Lenis from 'lenis';

/**
 * SmoothScroll — Lenis smooth scrolling provider for ultra-fluid, cinematic scroll experience.
 */
export function SmoothScroll({ children }) {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.05,
      touchMultiplier: 1.5,
      infinite: false,
    });

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);
    window.lenis = lenis;

    // Handle initial hash scroll if arriving with #anchor
    const scrollToHash = () => {
      if (window.location.hash) {
        const target = document.querySelector(window.location.hash);
        if (target) {
          lenis.scrollTo(target, { offset: -90, duration: 1.2 });
        }
      }
    };
    const timer = setTimeout(scrollToHash, 300);

    const onHashChange = () => {
      scrollToHash();
    };
    window.addEventListener('hashchange', onHashChange);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('hashchange', onHashChange);
      cancelAnimationFrame(rafId);
      lenis.destroy();
      delete window.lenis;
    };
  }, []);

  return <>{children}</>;
}
