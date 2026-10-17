import {useLoaderData, Link} from 'react-router';

/**
 * @param {Route.LoaderArgs}
 */
export async function loader({context}) {
  const data = await context.storefront.query(POLICIES_QUERY);

  const shopPolicies = data.shop;
  const policies = [
    shopPolicies?.privacyPolicy,
    shopPolicies?.shippingPolicy,
    shopPolicies?.termsOfService,
    shopPolicies?.refundPolicy,
    shopPolicies?.subscriptionPolicy,
  ].filter((policy) => policy != null);

  if (!policies.length) {
    throw new Response('No policies found', {status: 404});
  }

  return {policies};
}

export default function Policies() {
  /** @type {LoaderReturnData} */
  const {policies} = useLoaderData();

  return (
    <div className="min-h-screen bg-[#fdfaf1] text-[#1a110a] font-montserrat pt-28 pb-20 sm:pt-36 sm:pb-28">
      <div className="max-w-4xl mx-auto px-6 sm:px-8">
        <div className="text-center max-w-xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 bg-[#faecc9] border border-[#e5cf9d] px-3.5 py-1 rounded-full text-[11px] font-bold text-[#8b5311] uppercase tracking-wider mb-4">
            <span>📜</span>
            <span>Legal &amp; Trust Standards</span>
          </div>
          <h1 className="font-apricot text-4xl sm:text-5xl font-bold text-[#1a110a] tracking-tight">
            Store Policies
          </h1>
          <p className="mt-3 text-sm sm:text-base text-[#5c5043] leading-relaxed">
            Transparent commitments to consumable safety, sterile packaging, and straightforward hive-to-door delivery.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {policies.map((policy) => (
            <Link
              key={policy.id}
              to={`/policies/${policy.handle}`}
              className="group p-6 sm:p-8 rounded-3xl bg-white/90 border border-[#ebdccb] hover:border-[#c87a1e] hover:shadow-lg transition-all duration-300 flex flex-col justify-between no-underline"
            >
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#8b5311] block mb-2 font-mono">
                  Official Standard
                </span>
                <h2 className="font-apricot text-2xl font-bold text-[#1a110a] group-hover:text-[#c87a1e] transition-colors leading-snug">
                  {policy.title}
                </h2>
              </div>
              <div className="pt-6 flex items-center gap-2 text-xs font-bold text-[#c87a1e]">
                <span>Read Full Policy</span>
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

const POLICIES_QUERY = `#graphql
  fragment PolicyItem on ShopPolicy {
    id
    title
    handle
  }
  query Policies ($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    shop {
      privacyPolicy {
        ...PolicyItem
      }
      shippingPolicy {
        ...PolicyItem
      }
      termsOfService {
        ...PolicyItem
      }
      refundPolicy {
        ...PolicyItem
      }
      subscriptionPolicy {
        id
        title
        handle
      }
    }
  }
`;

/** @typedef {import('./+types/policies._index').Route} Route */
/** @typedef {import('storefrontapi.generated').PoliciesQuery} PoliciesQuery */
/** @typedef {import('storefrontapi.generated').PolicyItemFragment} PolicyItemFragment */
/** @typedef {ReturnType<typeof useLoaderData<typeof loader>>} LoaderReturnData */
