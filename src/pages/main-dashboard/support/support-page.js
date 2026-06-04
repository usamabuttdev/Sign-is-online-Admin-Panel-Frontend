import { Helmet } from 'react-helmet-async';
// sections
import ContactListView from 'src/sections/main-sections/support/contact-list-view';

// ----------------------------------------------------------------------

export default function SupportPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Contact Support</title>
      </Helmet>

      <ContactListView />
    </>
  );
}
