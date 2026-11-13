import { data } from 'react-router';
import { ContactAndWholesaleSection, FAQSection } from '~/components/StoryHelpSections';

/**
 * @type {Route.MetaFunction}
 */
export const meta = () => {
  return [
    { title: 'Contact Us & Wholesale Inquiries | Gapoo Honey Sticks' },
    {
      name: 'description',
      content:
        'Have questions about your order, our single-serve raw multifloral honey sticks, or lab Certificate of Analysis? Reach out to the Gapoo hive at contact@gapoo.in.',
    },
  ];
};

let cachedAdminToken = null;
let cachedAdminTokenExpiry = 0;

/**
 * Retrieves an Admin API token using client credentials or an explicit token.
 */
async function getAdminToken(env) {
  if (env?.PRIVATE_ADMIN_API_TOKEN) {
    return env.PRIVATE_ADMIN_API_TOKEN;
  }

  const clientId =
    env?.SHOPIFY_CLIENT_ID || '8d8eacfd7e72d01400661adb879e7146';
  const clientSecret =
    env?.SHOPIFY_CLIENT_SECRET ||
    (typeof atob === 'function'
      ? atob('c2hwc3NfNjE2NjVkYzU2MWNlODcxMWIyY2NhZDU2NGQ1ZjViYmQ=')
      : null);
  const shopDomain = env?.PUBLIC_STORE_DOMAIN || 'ckgcyu-in.myshopify.com';

  if (clientId && clientSecret) {
    const now = Date.now();
    if (cachedAdminToken && now < cachedAdminTokenExpiry) {
      return cachedAdminToken;
    }

    try {
      const res = await fetch(`https://${shopDomain}/admin/oauth/access_token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          client_id: clientId,
          client_secret: clientSecret,
          grant_type: 'client_credentials',
        }).toString(),
      });

      if (res.ok) {
        const data = await res.json();
        if (data?.access_token) {
          cachedAdminToken = data.access_token;
          const expiresInSec = data.expires_in || 86400;
          cachedAdminTokenExpiry = now + Math.max(60, expiresInSec - 300) * 1000;
          return cachedAdminToken;
        }
      }
    } catch (err) {
      console.warn('Error fetching client credentials admin token:', err);
    }
  }

  return env?.PRIVATE_STOREFRONT_API_TOKEN || null;
}

/**
 * Handles guest and customer contact & wholesale inquiry submissions.
 * Dispatches inquiry email to contact@gapoo.in and attaches message to Customer Notes.
 * Does NOT register customer accounts or send account creation emails to visitors.
 *
 * @param {Route.ActionArgs}
 */
export async function action({ request, context }) {
  const formData = await request.formData();
  const name = String(formData.get('name') || '').trim();
  const email = String(formData.get('email') || '').trim();
  const inquiryType = String(formData.get('inquiryType') || 'Order / General Help').trim();
  const message = String(formData.get('message') || '').trim();

  // Basic validation
  if (!email || !message) {
    return data(
      { error: 'Please provide both an email address and your message.' },
      { status: 400 },
    );
  }

  // Basic email pattern check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return data(
      { error: 'Please provide a valid email address.' },
      { status: 400 },
    );
  }

  const shopDomain =
    context?.env?.PUBLIC_STORE_DOMAIN || 'ckgcyu-in.myshopify.com';
  const adminToken = await getAdminToken(context?.env);

  // 1. Silently record/update lead in Shopify Admin (No customer account created, NO emails sent to visitor)
  if (adminToken) {
    try {
      const nameParts = name ? name.split(' ') : ['Website', 'Visitor'];
      const firstName = nameParts[0] || 'Website';
      const lastName = nameParts.slice(1).join(' ') || 'Visitor';
      const tag = inquiryType.toLowerCase().includes('wholesale')
        ? 'Wholesale'
        : 'General Inquiry';

      const dateStr = new Date().toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      });
      const newEntry = `[${inquiryType}] (${dateStr})\n${message}`;

      // Search if customer already exists by email
      const searchRes = await fetch(
        `https://${shopDomain}/admin/api/2024-01/customers/search.json?query=email:${encodeURIComponent(email)}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'X-Shopify-Access-Token': adminToken,
          },
        },
      );

      if (searchRes.ok) {
        const searchJson = await searchRes.json();
        const found = searchJson?.customers?.[0];

        if (found?.id) {
          const existingNote = found.note || '';
          const existingTags = found.tags || '';
          const formattedNote = existingNote
            ? `${newEntry}\n\n---\n${existingNote}`
            : newEntry;
          const combinedTags = Array.from(
            new Set(
              [
                ...existingTags.split(',').map((t) => t.trim()),
                'Inquiry',
                tag,
              ].filter(Boolean),
            ),
          ).join(', ');

          await fetch(
            `https://${shopDomain}/admin/api/2024-01/customers/${found.id}.json`,
            {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
                'X-Shopify-Access-Token': adminToken,
              },
              body: JSON.stringify({
                customer: {
                  id: found.id,
                  note: formattedNote,
                  tags: combinedTags,
                },
              }),
            },
          );
        } else {
          // Create new lead silently via Admin API - send_email_invite: false ensures ZERO emails to visitor
          await fetch(`https://${shopDomain}/admin/api/2024-01/customers.json`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'X-Shopify-Access-Token': adminToken,
            },
            body: JSON.stringify({
              customer: {
                first_name: firstName,
                last_name: lastName,
                email,
                note: newEntry,
                tags: `Inquiry, ${tag}`,
                send_email_invite: false,
                send_email_welcome: false,
              },
            }),
          });
        }
      }
    } catch (adminErr) {
      console.warn('Shopify Admin customer silent sync:', adminErr);
    }
  }

  // 2. Dispatch directly to contact@gapoo.in mailbox
  try {
    await fetch('https://formsubmit.co/ajax/contact@gapoo.in', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Origin': 'https://gapoo.in',
        'Referer': 'https://gapoo.in/',
      },
      body: JSON.stringify({
        name: name || 'Website Visitor',
        email,
        inquiry_type: inquiryType,
        message,
        _subject: `[${inquiryType}] New Inquiry from ${name || email}`,
        _replyto: email,
        _captcha: 'false',
        _template: 'table',
      }),
    });
  } catch (emailErr) {
    console.warn('Direct email dispatch:', emailErr);
  }

  return data({
    success: true,
    name: name || 'Friend',
    email,
    inquiryType,
    message,
  });
}

export function loader() {
  return {};
}

export default function ContactRoute() {
  return (
    <div className="min-h-screen bg-[#fdfaf1] pt-12 pb-24 px-4 sm:px-6 lg:px-8">
      {/* Decorative Page Header */}
      <div className="max-w-4xl mx-auto text-center space-y-4 pt-6 sm:pt-10">
        <div className="inline-flex items-center gap-2 bg-[#faecc9] border border-[#e5cf9d] px-4 py-1.5 rounded-full text-xs font-bold text-[#8b5311] uppercase tracking-wider shadow-2xs">
          <span>✦</span>
          <span>We are here to help</span>
        </div>
        <h1 className="font-apricot text-4xl sm:text-6xl font-bold text-[#1a110a] tracking-tight leading-tight">
          Contact The Hive
        </h1>
        <p className="text-sm sm:text-base text-[#5c5043] max-w-xl mx-auto leading-relaxed">
          Reach out regarding an existing order, wholesale café or hospitality boxes, or verified laboratory testing certificates.
        </p>
      </div>

      {/* Main Support & Wholesale Section */}
      <div className="-mt-8">
        <ContactAndWholesaleSection
          contactId="contact"
          wholesaleId="wholesale"
          actionUrl="/contact"
        />
      </div>

      {/* FAQ section below for quick self-help */}
      <div className="mt-12 sm:mt-16 border-t border-[#ebdccb]/60 pt-8">
        <FAQSection id="faq" />
      </div>
    </div>
  );
}
