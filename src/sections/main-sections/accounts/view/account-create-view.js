import Container from '@mui/material/Container';
import { paths } from 'src/routes/paths';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import AccountNewEditForm from '../account-new-edit-form';

export default function AccountCreateView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Create a new account"
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'Accounts',
            href: paths.dashboard.accounts.root,
          },
          { name: 'New account' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <AccountNewEditForm />
    </Container>
  );
}
