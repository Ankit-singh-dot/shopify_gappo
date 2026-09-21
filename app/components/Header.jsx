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
    <header className="sticky top-0 z-40 bg-[#fdfaf1]/95 backdrop-blur-md border-b border-[#f2ebd9] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        {/* Logo with Gapoo Bear Mascot */}
        <Link to="/" className="flex items-center group">
          <div className="h-16 sm:h-20 w-auto transition-transform group-hover:scale-105">
            <img
              src="/images/logo-01-01.png"
              alt="Gapoo Logo"
              className="w-full h-full object-contain"
            />
          </div>
        </Link>

        {/* Desktop Navigation matching the design */}
        <nav className="hidden md:flex items-center space-x-8 font-medium text-sm text-[#4a4036]" role="navigation">
            {[
              { href: '/shop', label: 'Shop' },
              { href: '/shop#why-honey', label: 'Why honey' },
              { href: '/shop#how-to-use', label: 'How to use' },
              { href: '/shop#our-story', label: 'Our story' },
            ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="relative py-1 text-[#4a4036] hover:text-[#18181b] transition-colors font-medium no-underline hover:no-underline group"
              style={{ textDecoration: 'none' }}
            >
              <span>{item.label}</span>
              <span className="absolute bottom-0 left-0 w-0 h-[2.5px] bg-[#f5a623] transition-all duration-300 group-hover:w-full rounded-full pointer-events-none" />
            </a>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-4">
          {/* Cart Pill Button matching PDF */}
          <CartToggle cart={cart} />

          {/* Mobile hamburger */}
          <button
            type="button"
            className="md:hidden p-2 rounded-lg text-[#4a4036] hover:bg-stone-200/50 transition-colors"
            onClick={() => open('mobile')}
            aria-label="Open menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
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
        Shop
      </a>
      <a href="/shop#why-honey" onClick={close} className="hover:text-black no-underline hover:no-underline">
        Why honey
      </a>
      <a href="/shop#how-to-use" onClick={close} className="hover:text-black no-underline hover:no-underline">
        How to use
      </a>
      <a href="/shop#our-story" onClick={close} className="hover:text-black no-underline hover:no-underline">
        Our story
      </a>
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
