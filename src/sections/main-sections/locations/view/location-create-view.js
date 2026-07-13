import Container from '@mui/material/Container';
import { paths } from 'src/routes/paths';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import LocationNewEditForm from '../location-new-edit-form';

export default function LocationCreateView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Create a new location"
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'Locations',
            href: paths.dashboard.locations.root,
          },
          { name: 'New location' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <LocationNewEditForm />
    </Container>
  );
}
