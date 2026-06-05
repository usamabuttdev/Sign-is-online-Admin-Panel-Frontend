import { Helmet } from 'react-helmet-async';
import LocationsProfileView from 'src/sections/main-sections/locations/view/locations-profile-view';
// sections
// ----------------------------------------------------------------------

export default function LocationProfilePage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Location Profile</title>
      </Helmet>

      <LocationsProfileView />

    </>
  );
}
