import { Helmet } from 'react-helmet-async';
// sections
import SpecializationsListView from 'src/sections/main-sections/specializations/view/specializations-list-view';

// ----------------------------------------------------------------------

export default function SpecializationsPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Specializations</title>
      </Helmet>

      <SpecializationsListView />
    </>
  );
}
