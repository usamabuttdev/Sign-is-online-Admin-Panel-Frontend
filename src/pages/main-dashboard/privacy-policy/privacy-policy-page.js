import { Helmet } from 'react-helmet-async';
// sections
import DashboardPrivacyView from 'src/sections/main-sections/privacy/view/privacy-view';

// ----------------------------------------------------------------------

export default function PrivacyPolicyPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Privacy Policy</title>
      </Helmet>

      <DashboardPrivacyView />
    </>
  );
}
