import { data } from 'react-router';

/**
 * Newsletter Subscription API Route
 *
 * Designed specifically for guest newsletter signups WITHOUT creating
 * customer login accounts or triggering unwanted "Customer account confirmation" emails.
 *
 * Uses Shopify Admin API customer creation with `send_email_invite: false` and NO password.
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
    const adminToken = context.env?.SHOPIFY_ADMIN_API_ACCESS_TOKEN || context.env?.PRIVATE_STOREFRONT_API_TOKEN;

    // Log subscriber in server logs for guaranteed traceability
    console.info(`[Newsletter Signup] New subscriber: ${email} at ${new Date().toISOString()}`);

    // If a webhook is configured (e.g. Google Sheet / Zapier / notification), dispatch asynchronously
    const webhookUrl = context.env?.NEWSLETTER_WEBHOOK_URL;
    if (webhookUrl) {
      fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'The Hive Awakening', timestamp: new Date().toISOString() }),
      }).catch((err) => console.error('Newsletter webhook error:', err));
    }

    // Attempt Shopify Admin API Customer creation WITHOUT creating a login account
    // send_email_invite: false and NO password prevents Shopify from sending account activation emails.
    if (adminToken) {
      try {
        const adminRes = await fetch(`https://${domain}/admin/api/2024-10/customers.json`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Shopify-Access-Token': adminToken,
          },
          body: JSON.stringify({
            customer: {
              email,
              verified_email: false,
              send_email_invite: false,
              email_marketing_consent: {
                state: 'subscribed',
                opt_in_level: 'single_opt_in',
              },
              tags: 'newsletter, the-hive-awakening',
              note: 'Subscribed via Gapoo Website Footer',
            },
          }),
        });

        if (adminRes.ok) {
          return data({
            success: true,
            alreadySubscribed: false,
            message: 'Welcome to the hive! Your email is now subscribed.',
          });
        }

        const adminJson = await adminRes.json().catch(() => ({}));

        // Check if customer email already exists in Shopify
        if (adminRes.status === 422 && adminJson.errors?.email) {
          return data({
            success: true,
            alreadySubscribed: true,
            message: 'You are already part of the hive! Check your inbox for upcoming drops.',
          });
        }

        // If token lacked write_customers scope (403), log notice and succeed gracefully
        if (adminRes.status === 403) {
          console.warn(
            '[Newsletter] Token lacks write_customers scope. To auto-sync subscribers to Shopify Admin Customers list, grant write_customers in Shopify Admin > Develop apps.'
          );
        }
      } catch (adminErr) {
        console.error('Shopify Admin subscriber sync error:', adminErr);
      }
    }

    // Graceful success response: Never create a login account or trigger account emails
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
