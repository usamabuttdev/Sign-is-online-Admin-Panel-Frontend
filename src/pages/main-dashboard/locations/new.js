import { Helmet } from 'react-helmet-async';
import LocationCreateView from 'src/sections/main-sections/locations/view/location-create-view';

export default function LocationCreatePage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Create Location</title>
      </Helmet>

      <LocationCreateView />
    </>
  );
}
