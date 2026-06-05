import { Helmet } from 'react-helmet-async';
import APIsListView from 'src/sections/main-sections/apis/view/apis-list-view';
// sections

// ----------------------------------------------------------------------

export default function APIsListPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: API's List Page</title>
      </Helmet>

      <APIsListView />
    </>
  );
}
