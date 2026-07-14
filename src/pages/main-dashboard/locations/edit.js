import { Helmet } from 'react-helmet-async';
import { useParams } from 'src/routes/hooks';
import LocationEditView from 'src/sections/main-sections/locations/view/location-edit-view';

export default function LocationEditPage() {
  const params = useParams();
  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Dashboard: Edit Location</title>
      </Helmet>

      <LocationEditView id={`${id}`} />
    </>
  );
}
