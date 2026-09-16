import {Money} from '@shopify/hydrogen';

/**
 * @param {{
 *   price?: MoneyV2;
 *   compareAtPrice?: MoneyV2 | null;
 * }}
 */
export function ProductPrice({price, compareAtPrice}) {
  const renderPrice = (moneyData) => {
    if (!moneyData) return null;
    return <span>₹{parseFloat(moneyData.amount).toFixed(2).replace(/\.00$/, '')}</span>;
  };

  return (
    <div aria-label="Price" className="product-price" role="group">
      {compareAtPrice ? (
        <div className="product-price-on-sale">
          {price ? renderPrice(price) : null}
          <s>
            {renderPrice(compareAtPrice)}
          </s>
        </div>
      ) : price ? (
        renderPrice(price)
      ) : (
        <span>&nbsp;</span>
      )}
    </div>
  );
}

/** @typedef {import('@shopify/hydrogen/storefront-api-types').MoneyV2} MoneyV2 */
