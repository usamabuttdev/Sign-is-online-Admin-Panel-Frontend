import PropTypes from 'prop-types';
import Container from '@mui/material/Container';
import { paths } from 'src/routes/paths';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { useGetLocationByIdQuery } from 'src/store/Reducer/locations';
import LocationNewEditForm from '../location-new-edit-form';

export default function LocationEditView({ id }) {
  const settings = useSettingsContext();
  const { data: currentUser } = useGetLocationByIdQuery(id);

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
            name: 'Locations',
            href: paths.dashboard.locations.root,
          },
          { name: currentUser?.title },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <LocationNewEditForm currentUser={currentUser} />
    </Container>
  );
}

LocationEditView.propTypes = {
  id: PropTypes.string,
};
