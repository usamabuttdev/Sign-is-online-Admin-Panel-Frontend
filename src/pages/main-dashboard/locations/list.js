import { Helmet } from 'react-helmet-async';
import LocationsListView from 'src/sections/main-sections/locations/view/locations-list-view';
// sections

// ----------------------------------------------------------------------

export default function LocationListPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard:Location List Page</title>
      </Helmet>

      <LocationsListView />
    </>
  );
}
