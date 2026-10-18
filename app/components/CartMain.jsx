import { useOptimisticCart } from '@shopify/hydrogen';
import { Link } from 'react-router';
import { useAside } from '~/components/Aside';
import { CartLineItem } from '~/components/CartLineItem';
import { CartSummary } from './CartSummary';
/**
 * Returns a map of all line items and their children.
 * @param {CartLine[]} lines
 * @return {import("/Users/ankitsingh/Desktop/shopify/gapoo-s-beehive/app/components/CartMain").LineItemChildrenMap}
 */
function getLineItemChildrenMap(lines) {
  const children = {};
  for (const line of lines) {
    if ('parentRelationship' in line && line.parentRelationship?.parent) {
      const parentId = line.parentRelationship.parent.id;
      if (!children[parentId]) children[parentId] = [];
      children[parentId].push(line);
    }
    if ('lineComponents' in line) {
      const lineChildren = getLineItemChildrenMap(line.lineComponents);
      for (const [parentId, childIds] of Object.entries(lineChildren)) {
        if (!children[parentId]) children[parentId] = [];
        children[parentId].push(...childIds);
      }
    }
  }
  return children;
}
/**
 * The main cart component that displays the cart items and summary.
 * It is used by both the /cart route and the cart aside dialog.
 * @param {CartMainProps}
 */
export function CartMain({ layout, cart: originalCart }) {
  const { close } = useAside();
  // The useOptimisticCart hook applies pending actions to the cart
  // so the user immediately sees feedback when they modify the cart.
  const cart = useOptimisticCart(originalCart);

  const linesCount = Boolean(cart?.lines?.nodes?.length || 0);
  const withDiscount =
    cart &&
    Boolean(cart?.discountCodes?.filter((code) => code.applicable)?.length);
  const className = `cart-main ${withDiscount ? 'with-discount' : ''}`;
  const cartHasItems = cart?.totalQuantity ? cart.totalQuantity > 0 : false;
  const childrenMap = getLineItemChildrenMap(cart?.lines?.nodes ?? []);

  return (
    <section
      className={className}
      aria-label={layout === 'page' ? 'Cart page' : 'Cart drawer'}
    >
      <CartEmpty hidden={linesCount} layout={layout} />
      <div className="cart-details">
        <p id="cart-lines" className="sr-only">
          Line items
        </p>

        {/* Lab Certified Batch COA (Direct PDF) */}
        <div className="mb-3 px-3 py-2.5 rounded-xl bg-[#fdfaf5] border border-[#ebdccb] flex items-center justify-between text-xs font-montserrat shadow-2xs shrink-0">
          <div className="flex items-center gap-2 text-[#2c2218] min-w-0">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#10b981]/15 text-[#10b981] text-xs font-bold shrink-0">
              ✓
            </span>
            <div className="truncate">
              <span className="font-bold text-[#1a110a] block text-[11px] sm:text-xs">
                Lab Verified Batch
              </span>
              <span className="text-[10px] text-[#736555] block">
                0 Heavy Metals · Raw Hive Nectar
              </span>
            </div>
          </div>
          <a
            href="/gapoo-coa-certificate.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#faecc9] hover:bg-[#f6dfa7] border border-[#e2c792] text-[#8b5311] hover:text-[#6a3e0b] text-[10px] sm:text-[11px] font-bold tracking-wide transition-all shadow-2xs shrink-0 cursor-pointer no-underline"
          >
            <span>📜 COA (PDF)</span>
            <span className="text-xs">↗</span>
          </a>
        </div>

        <div>
          <ul aria-labelledby="cart-lines">
            {(cart?.lines?.nodes ?? []).map((line) => {
              // we do not render non-parent lines at the root of the cart
              if (
                'parentRelationship' in line &&
                line.parentRelationship?.parent
              ) {
                return null;
              }
              return (
                <CartLineItem
                  key={line.id}
                  line={line}
                  layout={layout}
                  childrenMap={childrenMap}
                />
              );
            })}
          </ul>
        </div>
        {cartHasItems && <CartSummary cart={cart} layout={layout} />}
      </div>
    </section>
  );
}

/**
 * @param {{
 *   hidden: boolean;
 *   layout?: CartMainProps['layout'];
 * }}
 */
function CartEmpty({ hidden = false }) {
  const { close } = useAside();
  return (
    <div hidden={hidden} className="py-14 px-6 flex flex-col items-center text-center font-montserrat my-auto">
      {/* Official Gapoo Bear Mascot in warm golden badge */}
      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#fdf2d6] to-[#faecc9] border-2 border-[#f5cf80] p-3 flex items-center justify-center shadow-md mb-5 relative group hover:scale-105 transition-transform duration-300">
        <img
          src="/images/gapoo_bear_amber_badge.png"
          alt="Gapoo Bear Logo"
          className="w-full h-full object-contain drop-shadow-sm"
        />
      </div>

      <h4 className="font-apricot text-2xl sm:text-3xl font-bold text-[#1a1612] mb-2">
        Your Hive is Empty
      </h4>
      <p className="text-xs sm:text-sm text-[#736555] leading-relaxed max-w-xs mb-6">
        Single-serve honey sticks are waiting for you — real minted goodness with zero sticky mess.
      </p>

      {/* Action button linking directly to shop */}
      <a
        href="/shop"
        onClick={close}
        className="w-full py-3.5 px-6 rounded-full bg-[#18181b] hover:bg-[#27272a] text-white text-xs sm:text-sm font-bold tracking-wide shadow-md transition-all hover:scale-105 active:scale-95 text-center flex items-center justify-center gap-2 cursor-pointer no-underline"
      >
        <span className='text-amber-50'>Shop Minted Goodness</span>
        <span className='text-amber-50'>&rarr;</span>
      </a>

      {/* Brand value props */}
      <div className="mt-8 pt-6 border-t border-[#ede3d0] w-full grid grid-cols-2 gap-3 text-left">
        <div className="flex items-center gap-2 text-[11px] text-[#736555]">
          <span className="text-base">🚚</span>
          <span>Free delivery on 3 &amp; 6 Packs</span>
        </div>
        <div className="flex items-center gap-2 text-[11px] text-[#736555]">
          <span className="text-base">🌿</span>
          <span>Minted Goodness</span>
        </div>
      </div>

      {/* Lab Certificate PDF in Empty Cart */}
      <div className="mt-4 pt-3 border-t border-[#ede3d0] w-full flex flex-col items-center gap-1 text-center">
        <a
          href="/gapoo-coa-certificate.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#fdfaf5] hover:bg-[#faecc9] border border-[#ebdccb] text-[11px] font-bold text-[#8b5311] transition-all cursor-pointer no-underline shadow-2xs"
        >
          <span>📜 Inspect Batch Certificate of Analysis (PDF)</span>
          <span className="text-xs">↗</span>
        </a>
        <span className="text-[10px] text-[#8c7e6e]">
          Batch #HFL-GMG-08/26-01 · FSSAI Accredited Testing
        </span>
      </div>
    </div>
  );
}

/** @typedef {'page' | 'aside'} CartLayout */
/**
 * @typedef {{
 *   cart: CartApiQueryFragment | null;
 *   layout: CartLayout;
 * }} CartMainProps
 */
/** @typedef {{[parentId: string]: CartLine[]}} LineItemChildrenMap */

/** @typedef {import('storefrontapi.generated').CartApiQueryFragment} CartApiQueryFragment */
/** @typedef {import('~/components/CartLineItem').CartLine} CartLine */
