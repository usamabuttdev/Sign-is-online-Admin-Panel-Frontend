import { Helmet } from 'react-helmet-async';
import AccountsProfileView from 'src/sections/main-sections/accounts/view/accounts-profile-view';
// sections
// ----------------------------------------------------------------------

export default function AccountsProfilePage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Accounts Profile</title>
      </Helmet>

      <AccountsProfileView/>
    </>
  );
}
