import { Suspense } from 'react';
import { Await, NavLink, useAsyncValue, Link } from 'react-router';
import { useAnalytics, useOptimisticCart } from '@shopify/hydrogen';
import { useAside } from '~/components/Aside';

/**
 * @param {HeaderProps}
 */
export function Header({ header, isLoggedIn, cart, publicStoreDomain }) {
  const { open } = useAside();

  return (
    <header className="sticky top-3 sm:top-5 z-50 px-3 sm:px-6 pointer-events-none transition-all">
      <div className="max-w-4xl mx-auto pointer-events-auto rounded-full bg-[#fdfaf1]/85 backdrop-blur-xl border border-[#ebdccb]/90 shadow-[0_12px_36px_rgba(26,17,10,0.08)] px-4 sm:px-6 py-2 sm:py-2.5 flex items-center justify-between transition-all duration-300 hover:shadow-[0_18px_45px_rgba(200,122,30,0.14)] hover:border-[#c87a1e]/40">
        {/* Logo with Gapoo Bear Mascot Badge */}
        <Link to="/" className="flex items-center gap-2.5 group no-underline">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#faecc9] border border-[#e2c792] p-1 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-2xs">
            <img
              src="/images/gapoo_bear_amber_badge.png"
              alt="Gapoo Mascot"
              className="w-full h-full object-contain"
            />
          </div>
          <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#1a110a] group-hover:text-[#c87a1e] transition-colors leading-none">
            Gapoo<span className="text-[#c87a1e]">.</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-7 font-montserrat text-xs font-bold tracking-wider uppercase text-[#4a4036]" role="navigation">
          {[
            { href: '/shop', label: 'Shop Sticks' },
            { href: '/shop#how-it-works', label: 'How It Works' },
            { href: '/story', label: 'Our Story' },
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="relative py-1 text-[#4a4036] hover:text-[#1a110a] transition-colors font-bold no-underline hover:no-underline group"
              style={{ textDecoration: 'none' }}
            >
              <span>{item.label}</span>
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#c87a1e] transition-all duration-300 group-hover:w-full rounded-full pointer-events-none" />
            </a>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          {/* Cart Pill Button */}
          <CartToggle cart={cart} />

          {/* Mobile hamburger */}
          <button
            type="button"
            className="md:hidden p-1.5 rounded-full text-[#4a4036] hover:bg-[#faecc9]/60 transition-colors"
            onClick={() => open('mobile')}
            aria-label="Open menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}

/**
 * @param {{
 *   menu: HeaderProps['header']['menu'];
 *   primaryDomainUrl: HeaderProps['header']['shop']['primaryDomain']['url'];
 *   viewport: Viewport;
 *   publicStoreDomain: HeaderProps['publicStoreDomain'];
 * }}
 */
export function HeaderMenu({
  menu,
  primaryDomainUrl,
  viewport,
  publicStoreDomain,
}) {
  const className = `header-menu-${viewport}`;
  const { close } = useAside();

  return (
    <nav className="flex flex-col space-y-4 p-4 text-lg font-medium text-[#4a4036]" role="navigation">
      <a href="/shop" onClick={close} className="hover:text-black no-underline hover:no-underline">
        Shop Sticks
      </a>
      <a href="/story" onClick={close} className="hover:text-black no-underline hover:no-underline">
        Our Story
      </a>
      <Link
        to="/story#coa"
        onClick={close}
        className="hover:text-black no-underline hover:no-underline flex items-center justify-between"
      >
        <span>Lab Certified (COA)</span>
        <span className="text-[10px] bg-[#faecc9] border border-[#e2c792] text-[#8b5311] px-2 py-0.5 rounded-full font-bold">
          View ↗
        </span>
      </Link>
    </nav>
  );
}

/**
 * @param {{count: number}}
 */
function CartBadge({ count }) {
  const { open } = useAside();
  const { publish, shop, cart, prevCart } = useAnalytics();

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        open('cart');
        publish('cart_viewed', {
          cart,
          prevCart,
          shop,
          url: window.location.href || '',
        });
      }}
      className="inline-flex items-center gap-2 bg-[#18181b] hover:bg-[#27272a] text-white px-4 py-2 rounded-full text-xs font-semibold tracking-wide shadow-sm transition-all hover:scale-105 active:scale-95 cursor-pointer"
    >
      <span>Cart</span>
      <span className="inline-flex items-center justify-center w-5 h-5 bg-[#f5a623] text-black font-bold text-[11px] rounded-full">
        {count}
      </span>
    </button>
  );
}

/**
 * @param {Pick<HeaderProps, 'cart'>}
 */
function CartToggle({ cart }) {
  return (
    <Suspense fallback={<CartBadge count={0} />}>
      <Await resolve={cart}>
        <CartBanner />
      </Await>
    </Suspense>
  );
}

function CartBanner() {
  const originalCart = useAsyncValue();
  const cart = useOptimisticCart(originalCart);
  return <CartBadge count={cart?.totalQuantity ?? 0} />;
}

/** @typedef {'desktop' | 'mobile'} Viewport */
/**
 * @typedef {Object} HeaderProps
 * @property {HeaderQuery} header
 * @property {Promise<CartApiQueryFragment|null>} cart
 * @property {Promise<boolean>} isLoggedIn
 * @property {string} publicStoreDomain
 */

/** @typedef {import('@shopify/hydrogen').CartViewPayload} CartViewPayload */
/** @typedef {import('storefrontapi.generated').HeaderQuery} HeaderQuery */
/** @typedef {import('storefrontapi.generated').CartApiQueryFragment} CartApiQueryFragment */
