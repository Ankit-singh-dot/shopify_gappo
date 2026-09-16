import {Link} from 'react-router';

/**
 * @param {FooterProps}
 */
export function Footer({footer, header, publicStoreDomain}) {
  return (
    <footer className="bg-[#fdfaf1] border-t border-[#f0e7d3] pt-16 pb-12 text-[#4a4036]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 mb-12">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <Link to="/" className="inline-flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 shadow-sm transition-transform group-hover:scale-105">
                <img
                  src="/images/gapoo_bear_amber_badge.png"
                  alt="Gapoo Bear Mascot"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="font-apricot text-2xl font-bold text-[#1a1612] tracking-tight group-hover:text-[#c87a1e] transition-colors leading-none">
                Gapoo
              </span>
            </Link>
            <p className="text-sm text-[#736555] max-w-sm">
              Single-serve honey sticks. Minted goodness for everyday life.
            </p>
          </div>

          {/* Column 1: Shop */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold tracking-wider text-[#1a1612] uppercase font-montserrat">
              Shop
            </h4>
            <ul className="space-y-2 text-sm text-[#5c5247]">
              <li>
                <a href="#buy-now" className="hover:text-[#18181b] transition-colors">
                  Minted Goodness (10-Pack)
                </a>
              </li>
              <li>
                <a href="#ritual" className="hover:text-[#18181b] transition-colors">
                  Daily Ritual
                </a>
              </li>
              <li>
                <a href="#shop" className="hover:text-[#18181b] transition-colors">
                  Subscribe & save
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2: Learn */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold tracking-wider text-[#1a1612] uppercase font-montserrat">
              Learn
            </h4>
            <ul className="space-y-2 text-sm text-[#5c5247]">
              <li>
                <a href="#why-honey" className="hover:text-[#18181b] transition-colors">
                  Why honey
                </a>
              </li>
              <li>
                <a href="#how-to-use" className="hover:text-[#18181b] transition-colors">
                  Recipes
                </a>
              </li>
              <li>
                <a href="#our-story" className="hover:text-[#18181b] transition-colors">
                  Our story
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Help */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold tracking-wider text-[#1a1612] uppercase font-montserrat">
              Help
            </h4>
            <ul className="space-y-2 text-sm text-[#5c5247]">
              <li>
                <Link to="/policies/shipping-policy" className="hover:text-[#18181b] transition-colors">
                  Shipping & returns
                </Link>
              </li>
              <li>
                <a href="mailto:hello@gapoo.com" className="hover:text-[#18181b] transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="mailto:hello@gapoo.com" className="hover:text-[#18181b] transition-colors">
                  hello@gapoo.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#f0e7d3] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8c7e6e]">
          <p>© {new Date().getFullYear()} Gapoo Honey sticks • All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/policies/privacy-policy" className="hover:underline">
              Privacy Policy
            </Link>
            <Link to="/policies/terms-of-service" className="hover:underline">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

/**
 * @typedef {Object} FooterProps
 * @property {Promise<FooterQuery|null>} footer
 * @property {HeaderQuery} header
 * @property {string} publicStoreDomain
 */

/** @typedef {import('storefrontapi.generated').FooterQuery} FooterQuery */
/** @typedef {import('storefrontapi.generated').HeaderQuery} HeaderQuery */
