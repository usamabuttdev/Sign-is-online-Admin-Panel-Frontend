import { Helmet } from 'react-helmet-async';
import AccountsListView from 'src/sections/main-sections/accounts/view/accounts-list-view';
// sections

// ----------------------------------------------------------------------

export default function AccountsListPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Accounts</title>
      </Helmet>

      <AccountsListView />
    </>
  );
}
