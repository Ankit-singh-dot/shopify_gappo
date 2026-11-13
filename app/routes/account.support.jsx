import { useOutletContext } from 'react-router';
import { ContactAndWholesaleSection } from '~/components/StoryHelpSections';

export { action } from './contact';

/**
 * @type {Route.MetaFunction}
 */
export const meta = () => {
  return [{ title: 'Support & Inquiries | Gapoo Account' }];
};

/**
 * @param {Route.LoaderArgs}
 */
export async function loader({ context }) {
  await context.customerAccount.handleAuthStatus();
  return {};
}

export default function AccountSupportRoute() {
  const { customer } = useOutletContext();

  const fullName = customer
    ? `${customer.firstName || ''} ${customer.lastName || ''}`.trim()
    : '';
  const email = customer?.emailAddress?.emailAddress || '';

  return (
    <div className="account-support pt-4">
      <ContactAndWholesaleSection
        contactId="account-contact"
        wholesaleId="account-wholesale"
        actionUrl="/contact"
        defaultName={fullName}
        defaultEmail={email}
      />
    </div>
  );
}

