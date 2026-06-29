import Container from '@mui/material/Container';
import { paths } from 'src/routes/paths';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import ProfileHome from '../profile-home';
import { Stack } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useGetLocationByIdQuery } from 'src/store/Reducer/locations';

export default function LocationsProfileView() {
  const settings = useSettingsContext();
  const { id } = useParams();
  const { data: apiData, isFetching } = useGetLocationByIdQuery(id);
  const location = apiData?.data || null;

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <Stack direction="row" spacing={2}>
        <CustomBreadcrumbs
          heading="Locations"
          links={[
            { name: 'Dashboard', href: paths.dashboard.root },
            { name: 'Locations', href: paths.dashboard.locations.root },
            { name: location?.title || id || '' },
          ]}
          sx={{ mb: { xs: 3, md: 5 } }}
        />
      </Stack>

      {isFetching ? <div>Loading...</div> : <ProfileHome location={location} />}
    </Container>
  );
}
