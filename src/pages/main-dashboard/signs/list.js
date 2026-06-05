import { Helmet } from 'react-helmet-async';
import SignsListView from 'src/sections/main-sections/signs/view/signs-list-view';
// sections

// ----------------------------------------------------------------------

export default function SignsListPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard:Signs List Page</title>
      </Helmet>

      <SignsListView />
    </>
  );
}
