import { Helmet } from 'react-helmet-async';
import ChargesListView from 'src/sections/main-sections/charges/view/charges-list-view';
// sections

// ----------------------------------------------------------------------

export default function ChargesListPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard:Charges List Page</title>
      </Helmet>

      <ChargesListView />
    </>
  );
}
