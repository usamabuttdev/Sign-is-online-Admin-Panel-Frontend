import PropTypes from 'prop-types';
import Container from '@mui/material/Container';
import { paths } from 'src/routes/paths';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { useGetAccountByIdQuery } from 'src/store/Reducer/accounts';
import AccountNewEditForm from '../account-new-edit-form';

export default function AccountEditView({ id }) {
  const settings = useSettingsContext();
  const { data: currentUser } = useGetAccountByIdQuery(id);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Edit"
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'Accounts',
            href: paths.dashboard.accounts.root,
          },
          { name: currentUser?.title },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <AccountNewEditForm currentUser={currentUser} />
    </Container>
  );
}

AccountEditView.propTypes = {
  id: PropTypes.string,
};
