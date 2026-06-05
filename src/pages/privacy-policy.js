import { Helmet } from 'react-helmet-async';
// components
import PrivacyPolicyView from 'src/sections/main-sections/privacy-policy/view';


// ----------------------------------------------------------------------

export default function PrivacyPolicy() {
  return (
    <>
      <Helmet>
        <title> Privacy Policy</title>
      </Helmet>

      <PrivacyPolicyView />
    </>
  );
}
