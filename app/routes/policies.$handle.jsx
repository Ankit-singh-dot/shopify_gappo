import {Link, useLoaderData} from 'react-router';

/**
 * @type {Route.MetaFunction}
 */
export const meta = ({data}) => {
  return [{title: `Hydrogen | ${data?.policy.title ?? ''}`}];
};

/**
 * @param {Route.LoaderArgs}
 */
export async function loader({params, context}) {
  if (!params.handle) {
    throw new Response('No handle was passed in', {status: 404});
  }

  const policyName = params.handle.replace(/-([a-z])/g, (_, m1) =>
    m1.toUpperCase(),
  );

  const data = await context.storefront.query(POLICY_CONTENT_QUERY, {
    variables: {
      privacyPolicy: false,
      shippingPolicy: false,
      termsOfService: false,
      refundPolicy: false,
      [policyName]: true,
      language: context.storefront.i18n?.language,
    },
  });

  let policy = data.shop?.[policyName];

  if (params.handle === 'refund-policy') {
    policy = {
      id: policy?.id || 'refund-policy',
      title: 'Return & Refund Policy',
      handle: 'refund-policy',
      url: policy?.url || '/policies/refund-policy',
      body: `
        <div class="space-y-6">
          <div class="p-5 rounded-2xl bg-[#faecc9]/70 border border-[#e5cf9d] text-sm text-[#8b5311] leading-relaxed">
            <strong>🌿 Consumable Wellness &amp; Food Safety Notice:</strong> Gapoo Honey Sticks are 100% natural, consumable food items (pure unpasteurized multifloral honey cold-infused with wild garden mint). In accordance with food safety regulations and hygiene standards, edible consumable items cannot be returned or restocked once delivered.
          </div>

          <h2>Consumable Products &amp; Return Policy</h2>
          <p>To preserve the absolute purity, sterility, and safety of every single batch delivered to our community, <strong>we do not accept physical returns or exchanges for delivered honey sticks</strong>. Because our sticks are consumed directly, maintaining an unbroken, sterile chain of custody from our apiary packaging facility to your doorstep is essential.</p>

          <h2>Our 100% Quality &amp; Transit Guarantee</h2>
          <p>While consumable food products are non-returnable, <strong>your trust, safety, and satisfaction are our top priority</strong>. If your delivery encounters any of the following:</p>
          <ul>
            <li><strong>Transit Damage:</strong> Crushed outer boxes, punctured sticks, or leaking honey seals during courier transit.</li>
            <li><strong>Quality Discrepancies:</strong> Any verified manufacturing defect or seal imperfection.</li>
            <li><strong>Incorrect Order:</strong> Receiving a different pack tier or quantity than what was ordered.</li>
          </ul>
          <p>Please reach out to our dedicated care team within <strong>48 hours of delivery</strong> at <a href="mailto:support@gapoo.in" class="text-[#c87a1e] font-semibold underline">support@gapoo.in</a> with your Order ID and clear photos of the damaged items and outer box. Upon review, we will promptly dispatch a <strong>free replacement box at zero extra cost</strong> or issue a <strong>full refund</strong> back to your original payment method.</p>

          <h2>Subscribe &amp; Save (Recurring Subscriptions)</h2>
          <p>If you enjoy Gapoo through our Subscribe &amp; Save program, you maintain complete freedom. You may pause, skip, or cancel your upcoming scheduled deliveries at any time before the renewal date with zero cancellation fees. Once an individual subscription order has been dispatched from our facility, it cannot be recalled or returned due to consumable food regulations.</p>

          <h2>Order Cancellations Prior to Dispatch</h2>
          <p>If you placed an order by mistake or wish to modify your details, you may cancel free of charge prior to fulfillment dispatch by emailing <a href="mailto:support@gapoo.in" class="text-[#c87a1e] font-semibold underline">support@gapoo.in</a>. Once handoff to our courier partners has occurred, parcels in transit cannot be recalled.</p>
        </div>
      `,
    };
  } else if (params.handle === 'shipping-policy') {
    policy = {
      id: policy?.id || 'shipping-policy',
      title: 'Shipping & Delivery Policy',
      handle: 'shipping-policy',
      url: policy?.url || '/policies/shipping-policy',
      body: `
        <div class="space-y-6">
          <div class="p-5 rounded-2xl bg-[#faecc9]/70 border border-[#e5cf9d] text-sm text-[#8b5311] leading-relaxed">
            <strong>📦 Clean Hive Fulfillment:</strong> Every box of Gapoo Honey Sticks is freshly packed in sterile, food-safe conditions and dispatched directly across India.
          </div>

          <h2>Dispatch &amp; Order Processing</h2>
          <p>All orders placed on Gapoo are processed and handed over to our verified express courier partners within <strong>24 to 48 business hours</strong> (excluding Sundays and national holidays). You will receive automated SMS and email updates containing live tracking links the moment your parcel leaves our fulfillment hub.</p>

          <h2>Transparent Shipping Tiers</h2>
          <ul>
            <li><strong>Starter 1-Pack (10 Sticks · ₹189):</strong> Standard courier shipping of ₹70 anywhere in India.</li>
            <li><strong>Daily Ritual 3-Pack (30 Sticks · ₹399):</strong> <strong>FREE Standard Shipping</strong> across India.</li>
            <li><strong>Best Value 6-Pack (60 Sticks · ₹699):</strong> <strong>FREE Priority Shipping</strong> across India.</li>
            <li><strong>Bulk Consignments &amp; Wholesale:</strong> Custom freight delivery with dedicated logistics tracking. Shipping fees may be waived or subsidized for wholesale partner consignments.</li>
          </ul>

          <h2>Estimated Delivery Times</h2>
          <ul>
            <li><strong>Metro Cities (Delhi NCR, Mumbai, Bengaluru, Hyderabad, Chennai, Kolkata):</strong> 3 to 5 business days.</li>
            <li><strong>Tier-2 &amp; Regional Hubs:</strong> 4 to 7 business days.</li>
          </ul>

          <h2>Consumable Item Return Policy Reminder</h2>
          <p>As Gapoo Honey Sticks are unpasteurized, edible food products, <strong>delivered parcels cannot be returned</strong> for health, hygiene, and public safety reasons. However, if your order is damaged, leaking, or crushed in transit, please contact <a href="mailto:support@gapoo.in" class="text-[#c87a1e] font-semibold underline">support@gapoo.in</a> within 48 hours for an immediate free replacement.</p>
        </div>
      `,
    };
  }

  if (!policy) {
    throw new Response('Could not find the policy', {status: 404});
  }

  return {policy};
}

export default function Policy() {
  /** @type {LoaderReturnData} */
  const {policy} = useLoaderData();

  return (
    <div className="min-h-screen bg-[#fdfaf1] text-[#1a110a] font-montserrat pt-28 pb-20 sm:pt-36 sm:pb-28">
      <div className="max-w-3xl mx-auto px-6 sm:px-8">
        {/* Breadcrumb / Back Link */}
        <div className="mb-8">
          <Link
            to="/policies"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8b5311] hover:text-[#c87a1e] transition-colors"
          >
            <span>←</span>
            <span>All Policies</span>
          </Link>
        </div>

        {/* Header */}
        <div className="border-b border-[#ebdccb] pb-8 mb-10">
          <div className="inline-flex items-center gap-2 bg-[#faecc9] border border-[#e5cf9d] px-3.5 py-1 rounded-full text-[11px] font-bold text-[#8b5311] uppercase tracking-wider mb-4">
            <span>📜</span>
            <span>Official Policy</span>
          </div>
          <h1 className="font-apricot text-4xl sm:text-5xl font-bold text-[#1a110a] tracking-tight">
            {policy.title}
          </h1>
        </div>

        {/* Content Body */}
        <div
          className="policy-content space-y-6 text-[#4a3e32] leading-relaxed text-base sm:text-lg font-normal [&_h2]:font-apricot [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-[#1a110a] [&_h2]:mt-8 [&_h2]:mb-3 [&_p]:mb-4 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-2"
          dangerouslySetInnerHTML={{__html: policy.body}}
        />
      </div>
    </div>
  );
}

// NOTE: https://shopify.dev/docs/api/storefront/latest/objects/Shop
const POLICY_CONTENT_QUERY = `#graphql
  fragment Policy on ShopPolicy {
    body
    handle
    id
    title
    url
  }
  query Policy(
    $country: CountryCode
    $language: LanguageCode
    $privacyPolicy: Boolean!
    $refundPolicy: Boolean!
    $shippingPolicy: Boolean!
    $termsOfService: Boolean!
  ) @inContext(language: $language, country: $country) {
    shop {
      privacyPolicy @include(if: $privacyPolicy) {
        ...Policy
      }
      shippingPolicy @include(if: $shippingPolicy) {
        ...Policy
      }
      termsOfService @include(if: $termsOfService) {
        ...Policy
      }
      refundPolicy @include(if: $refundPolicy) {
        ...Policy
      }
    }
  }
`;

/**
 * @typedef {keyof Pick<
 *   Shop,
 *   'privacyPolicy' | 'shippingPolicy' | 'termsOfService' | 'refundPolicy'
 * >} SelectedPolicies
 */

/** @typedef {import('./+types/policies.$handle').Route} Route */
/** @typedef {import('@shopify/hydrogen/storefront-api-types').Shop} Shop */
/** @typedef {ReturnType<typeof useLoaderData<typeof loader>>} LoaderReturnData */
