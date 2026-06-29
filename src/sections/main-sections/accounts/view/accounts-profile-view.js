import Container from '@mui/material/Container';
import { paths } from 'src/routes/paths';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { useSettingsContext } from 'src/components/settings';
import { Stack } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useGetAccountByIdQuery } from 'src/store/Reducer/accounts';
import ProfileHome from '../profile-home';

export default function AccountsProfileView() {
  const settings = useSettingsContext();
  const { id } = useParams();

  const { data: apiResponse, isLoading } = useGetAccountByIdQuery(id);
  const infoAccounts = apiResponse?.data ?? null;

  if (isLoading) return null;

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <Stack direction="row" spacing={2}>
        <CustomBreadcrumbs
          heading="Profile"
          links={[
            { name: 'Dashboard', href: paths.dashboard.root },
            { name: 'Accounts', href: paths.dashboard.accounts.root },
            { name: infoAccounts?.title ?? 'Account'},
          ]}
          sx={{
            mb: { xs: 3, md: 5 },
          }}
        />
      </Stack>

      {infoAccounts && <ProfileHome info={infoAccounts} />}
    </Container>
  );
}
