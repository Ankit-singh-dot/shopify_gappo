import {useLoaderData, data} from 'react-router';
import {CartForm} from '@shopify/hydrogen';
import {CartMain} from '~/components/CartMain';

/**
 * @type {Route.MetaFunction}
 */
export const meta = () => {
  return [{title: `Hydrogen | Cart`}];
};

/**
 * @type {HeadersFunction}
 */
export const headers = ({actionHeaders}) => actionHeaders;

/**
 * @param {Route.ActionArgs}
 */
export async function action({request, context}) {
  const {cart} = context;

  const formData = await request.formData();

  let {action, inputs} = CartForm.getFormInput(formData);

  if (!action && formData.get('action')) {
    action = String(formData.get('action'));
    inputs = {
      buyerIdentity: {
        email: formData.get('email'),
      },
      acceptsMarketing: formData.get('acceptsMarketing') !== 'false',
      ...inputs,
    };
  }

  if (!action) {
    throw new Error('No action provided');
  }

  let status = 200;
  let result;

  switch (action) {
    case CartForm.ACTIONS.LinesAdd:
      result = await cart.addLines(inputs.lines);
      break;
    case CartForm.ACTIONS.LinesUpdate:
      result = await cart.updateLines(inputs.lines);
      break;
    case CartForm.ACTIONS.LinesRemove:
      result = await cart.removeLines(inputs.lineIds);
      break;
    case CartForm.ACTIONS.DiscountCodesUpdate: {
      const formDiscountCode = inputs.discountCode;

      // User inputted discount code
      const discountCodes = formDiscountCode ? [formDiscountCode] : [];

      // Combine discount codes already applied on cart
      discountCodes.push(...inputs.discountCodes);

      result = await cart.updateDiscountCodes(discountCodes);
      break;
    }
    case CartForm.ACTIONS.GiftCardCodesAdd: {
      const formGiftCardCode = inputs.giftCardCode;

      const giftCardCodes = formGiftCardCode ? [formGiftCardCode] : [];

      result = await cart.addGiftCardCodes(giftCardCodes);
      break;
    }
    case CartForm.ACTIONS.GiftCardCodesRemove: {
      const appliedGiftCardIds = inputs.giftCardCodes;
      result = await cart.removeGiftCardCodes(appliedGiftCardIds);
      break;
    }
    case CartForm.ACTIONS.BuyerIdentityUpdate: {
      const buyerEmail = inputs.buyerIdentity?.email;
      const acceptsMarketing = inputs.acceptsMarketing !== false;

      // 1. Tag customer and set marketing consent silently via Admin API if token configured (No customer account created, no activation emails)
      if (buyerEmail) {
        const adminToken = context?.env?.PRIVATE_STOREFRONT_API_TOKEN;
        const shopDomain =
          context?.env?.PUBLIC_STORE_DOMAIN || 'ckgcyu-in.myshopify.com';
        if (adminToken) {
          try {
            const searchRes = await fetch(
              `https://${shopDomain}/admin/api/2024-01/customers/search.json?query=email:${encodeURIComponent(buyerEmail)}`,
              {
                headers: {
                  'Content-Type': 'application/json',
                  'X-Shopify-Access-Token': adminToken,
                },
              },
            );
            if (searchRes.ok) {
              const searchJson = await searchRes.json();
              const cust = searchJson?.customers?.[0];
              if (cust?.id) {
                await fetch(
                  `https://${shopDomain}/admin/api/2024-01/customers/${cust.id}.json`,
                  {
                    method: 'PUT',
                    headers: {
                      'Content-Type': 'application/json',
                      'X-Shopify-Access-Token': adminToken,
                    },
                    body: JSON.stringify({
                      customer: {
                        id: cust.id,
                        tags: `${cust.tags ? cust.tags + ', ' : ''}Email Marketing, Checkout Buyer`,
                        email_marketing_consent: {
                          state: acceptsMarketing
                            ? 'subscribed'
                            : 'unsubscribed',
                          opt_in_level: 'single_opt_in',
                          consent_updated_at: new Date().toISOString(),
                        },
                      },
                    }),
                  },
                ).catch(() => null);
              }
            }
          } catch {
            // non-blocking
          }
        }
      }

      result = await cart.updateBuyerIdentity({
        ...inputs.buyerIdentity,
      });
      break;
    }
    default:
      throw new Error(`${action} cart action is not defined`);
  }

  const cartId = result?.cart?.id;
  const headers = cartId ? cart.setCartId(result.cart.id) : new Headers();
  const {cart: cartResult, errors, warnings} = result;

  const redirectTo = formData.get('redirectTo') ?? null;
  if (typeof redirectTo === 'string') {
    status = 303;
    headers.set('Location', redirectTo);
  }

  return data(
    {
      cart: cartResult,
      errors,
      warnings,
      analytics: {
        cartId,
      },
    },
    {status, headers},
  );
}

/**
 * @param {Route.LoaderArgs}
 */
export async function loader({context}) {
  const {cart} = context;
  return await cart.get();
}

export default function Cart() {
  /** @type {LoaderReturnData} */
  const cart = useLoaderData();

  return (
    <div className="cart">
      <h1>Cart</h1>
      <CartMain layout="page" cart={cart} />
    </div>
  );
}

/** @typedef {import('react-router').HeadersFunction} HeadersFunction */
/** @typedef {import('./+types/cart').Route} Route */
/** @typedef {import('@shopify/hydrogen').CartQueryDataReturn} CartQueryDataReturn */
/** @typedef {ReturnType<typeof useLoaderData<typeof loader>>} LoaderReturnData */
/** @typedef {ReturnType<typeof useActionData<typeof action>>} ActionReturnData */
