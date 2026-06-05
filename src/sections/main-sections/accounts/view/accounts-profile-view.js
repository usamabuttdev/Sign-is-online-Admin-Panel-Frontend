// @mui
import Container from '@mui/material/Container';
// routes
import { paths } from 'src/routes/paths';
import { _userAbout, _userFeeds } from 'src/_mock';
// components
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { useSettingsContext } from 'src/components/settings';
//
import {  Stack } from '@mui/material';
import ProfileHome from '../profile-home';

// ----------------------------------------------------------------------

export default function AccountsProfileView() {
  const settings = useSettingsContext();
  const infoAccounts = {
      id: 1,
      title: "Account A",
      locations: "New York, LA",
      signs: 15,
      users: 120,
      total_charged: "$1,500",
      created_at: "2025-08-03T00:00:00.000Z",
      action: "View",
      created_by_name: "John Doe",
      tz_title: "Eastern Standard Time",  
      tz_offset: "-05:00",                
      acc_observes_daylight: true,      
  }
  
  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <Stack direction="row" spacing={2}>
      <CustomBreadcrumbs
        heading="Profile"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Accounts', href: paths.dashboard.accounts.root },
          { name:  infoAccounts.title},
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      </Stack>

      <ProfileHome info={infoAccounts}  />
    </Container>
  );
}
