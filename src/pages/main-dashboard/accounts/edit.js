import { Helmet } from 'react-helmet-async';
import { useParams } from 'src/routes/hooks';
import AccountEditView from 'src/sections/main-sections/accounts/view/account-edit-view';

export default function AccountEditPage() {
  const params = useParams();
  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Dashboard: Edit Account</title>
      </Helmet>

      <AccountEditView id={`${id}`} />
    </>
  );
}
