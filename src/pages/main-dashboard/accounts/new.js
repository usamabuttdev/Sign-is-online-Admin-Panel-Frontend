import { Helmet } from 'react-helmet-async';
import AccountCreateView from 'src/sections/main-sections/accounts/view/account-create-view';

export default function AccountCreatePage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Create Account</title>
      </Helmet>

      <AccountCreateView />
    </>
  );
}
