import { useState } from 'react';
// @mui
import Container from '@mui/material/Container';
// routes
import { paths } from 'src/routes/paths';
// hooks
// _mock
import { _userAbout, _userFeeds} from 'src/_mock';
// components
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
//
import ProfileHome from '../profile-home';
import { Stack } from '@mui/material';
import { useGetBookingByIdQuery } from 'src/store/Reducer/bookings';
import { useParams } from 'react-router-dom';
import { LoadingScreen } from 'src/components/loading-screen';


// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function BookingProfileView() {
  const settings = useSettingsContext();
  const { id } = useParams();
  const {data , isLoading }= useGetBookingByIdQuery(id);


  if(isLoading) return <LoadingScreen />;
  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <Stack direction="row" spacing={2}>
      <CustomBreadcrumbs
        heading="Bookings"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Bookings', href: paths.dashboard.bookings.root },
          { name: 'John Doe' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      </Stack>

     <ProfileHome info={data?.data} posts={_userFeeds} />

    </Container>
  );
}
