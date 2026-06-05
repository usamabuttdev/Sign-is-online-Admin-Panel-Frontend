// @mui
import Container from '@mui/material/Container';
// routes
import { paths } from 'src/routes/paths';
// hooks
// _mock
// components
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
//
import ProfileHome from '../profile-home';
import { Stack } from '@mui/material';



// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function LocationsProfileView() {
  const settings = useSettingsContext();
  let data = {
    id: 1,
    title: "Location A",
    account: "Account 1",
    authenticated: "Yes",
    sign_exists: "Yes",
    platforms_count: 3,
    product: "Product X",
    city: "New York",
    state: "NY",
    created_at: "2025-08-01",
    action: "View",
  }

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <Stack direction="row" spacing={2}>
      <CustomBreadcrumbs
        heading="Locations"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Locations', href: paths.dashboard.locations.root },
          { name: 'John Doe' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      </Stack>

     <ProfileHome location={data}  />

    </Container>
  );
}
