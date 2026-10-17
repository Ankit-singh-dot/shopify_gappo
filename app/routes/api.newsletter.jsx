import { data } from 'react-router';

/**
 * Newsletter Subscription API Route
 * Connects directly to Shopify Storefront API using private token to create
 * a new Customer in Shopify Admin with `acceptsMarketing: true`.
 *
 * @param {Route.ActionArgs} args
 */
export async function action({ request, context }) {
  if (request.method !== 'POST') {
    return data({ error: 'Method not allowed' }, { status: 405 });
  }

  try {
    const formData = await request.formData();
    const email = String(formData.get('email') || '').trim();

    if (!email || !email.includes('@') || !email.includes('.')) {
      return data({ error: 'Please enter a valid email address.' }, { status: 400 });
    }

    const domain = context.env?.PUBLIC_STORE_DOMAIN || 'ckgcyu-in.myshopify.com';
    const privateToken = context.env?.PRIVATE_STOREFRONT_API_TOKEN;
    const publicToken = context.env?.PUBLIC_STOREFRONT_API_TOKEN;

    const mutation = `
      mutation customerCreate($input: CustomerCreateInput!) {
        customerCreate(input: $input) {
          customer {
            id
            email
            acceptsMarketing
          }
          customerUserErrors {
            code
            field
            message
          }
        }
      }
    `;

    // Secure auto-generated password for newsletter subscriber record
    const subscriberPassword = `GapooHive!${Date.now()}#Nectar`;

    const response = await fetch(`https://${domain}/api/2024-10/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(privateToken ? { 'Shopify-Storefront-Private-Token': privateToken } : {}),
        ...(!privateToken && publicToken ? { 'X-Shopify-Storefront-Access-Token': publicToken } : {}),
      },
      body: JSON.stringify({
        query: mutation,
        variables: {
          input: {
            email,
            password: subscriberPassword,
            acceptsMarketing: true,
          },
        },
      }),
    });

    const result = await response.json();
    const userErrors = result.data?.customerCreate?.customerUserErrors || [];

    if (userErrors.length > 0) {
      const isTaken = userErrors.some((err) => err.code === 'TAKEN' || err.message?.toLowerCase().includes('taken'));
      if (isTaken) {
        return data({
          success: true,
          alreadySubscribed: true,
          message: 'You are already part of the hive! Check your inbox for upcoming drops.',
        });
      }
      return data({ error: userErrors[0].message || 'Unable to join the hive. Please try again.' }, { status: 400 });
    }

    return data({
      success: true,
      alreadySubscribed: false,
      message: 'Welcome to the hive! Your email is now subscribed.',
    });
  } catch (err) {
    console.error('Newsletter subscription error:', err);
    return data({ error: 'An unexpected error occurred. Please try again later.' }, { status: 500 });
  }
}
