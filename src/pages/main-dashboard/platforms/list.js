import { Helmet } from 'react-helmet-async';
import PlatformsListView from 'src/sections/main-sections/platforms/view/platforms-list-view';
// sections

// ----------------------------------------------------------------------

export default function PlatformsListPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard:Platforms List Page</title>
      </Helmet>

      <PlatformsListView />
    </>
  );
}
