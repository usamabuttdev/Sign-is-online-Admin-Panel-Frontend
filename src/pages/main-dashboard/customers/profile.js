import { Helmet } from 'react-helmet-async';
import CustomerProfileView from 'src/sections/main-sections/customers/view/customer-profile-view';
// sections
// ----------------------------------------------------------------------

export default function CustomerProfilePage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Customer Profile</title>
      </Helmet>

      <CustomerProfileView/>

    </>
  );
}
