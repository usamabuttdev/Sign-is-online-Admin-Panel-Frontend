import { Helmet } from 'react-helmet-async';
import ScriptsListView from 'src/sections/main-sections/scripts/view/scripts-list-view';
// sections

// ----------------------------------------------------------------------

export default function ScriptsListPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard:Scripts List Page</title>
      </Helmet>

      <ScriptsListView />
    </>
  );
}
