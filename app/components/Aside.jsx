import {createContext, useContext, useEffect, useState} from 'react';
import {useId} from 'react';

/**
 * A side bar component with Overlay
 * @example
 * ```jsx
 * <Aside type="search" heading="SEARCH">
 *  <input type="search" />
 *  ...
 * </Aside>
 * ```
 * @param {{
 *   children?: React.ReactNode;
 *   type: AsideType;
 *   heading: React.ReactNode;
 * }}
 */
export function Aside({children, heading, type}) {
  const {type: activeType, close} = useAside();
  const expanded = type === activeType;
  const id = useId();
  useEffect(() => {
    const abortController = new AbortController();

    if (expanded) {
      document.addEventListener(
        'keydown',
        function handler(event) {
          if (event.key === 'Escape') {
            close();
          }
        },
        {signal: abortController.signal},
      );
    }
    return () => abortController.abort();
  }, [close, expanded]);

  return (
    <div
      aria-modal
      className={`overlay ${expanded ? 'expanded' : ''}`}
      role="dialog"
      aria-labelledby={id}
    >
      <button
        type="button"
        className="close-outside"
        onClick={(e) => {
          e.preventDefault();
          close();
        }}
        aria-label="Close drawer overlay"
      />
      <aside>
        <header className="flex items-center justify-between px-6 py-4 border-b border-[#ede3d0] bg-[#fdfaf1]/95 backdrop-blur-sm shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 border border-[#e8cd8c] p-0.5 bg-white shadow-xs">
              <img
                src="/images/gapoo_bear_amber_badge.png"
                alt="Gapoo Bear"
                className="w-full h-full object-contain"
              />
            </div>
            <h3 id={id} className="font-apricot text-2xl font-bold text-[#1a1612] tracking-tight">
              {heading === 'CART'
                ? 'Your Honey Cart'
                : heading === 'SEARCH'
                ? 'Search Gapoo'
                : heading === 'MENU'
                ? 'Explore Gapoo'
                : heading}
            </h3>
          </div>
          <button
            type="button"
            className="w-9 h-9 rounded-full bg-[#f4ebe1] hover:bg-[#faecc9] active:bg-[#f0dca8] text-[#5c5247] hover:text-[#1a1612] flex items-center justify-center transition-all cursor-pointer shadow-xs relative z-50 pointer-events-auto"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              close();
            }}
            aria-label="Close drawer"
          >
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </header>
        <main className="flex-1 overflow-y-auto bg-[#fdfaf1]">{children}</main>
      </aside>
    </div>
  );
}

const AsideContext = createContext(null);

Aside.Provider = function AsideProvider({children}) {
  const [type, setType] = useState('closed');

  return (
    <AsideContext.Provider
      value={{
        type,
        open: setType,
        close: () => setType('closed'),
      }}
    >
      {children}
    </AsideContext.Provider>
  );
};

export function useAside() {
  const aside = useContext(AsideContext);
  if (!aside) {
    throw new Error('useAside must be used within an AsideProvider');
  }
  return aside;
}

/** @typedef {'search' | 'cart' | 'mobile' | 'closed'} AsideType */
/**
 * @typedef {{
 *   type: AsideType;
 *   open: (mode: AsideType) => void;
 *   close: () => void;
 * }} AsideContextValue
 */

/** @typedef {import('react').ReactNode} ReactNode */
