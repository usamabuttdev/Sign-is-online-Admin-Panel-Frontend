import { Helmet } from 'react-helmet-async';
import DevicesListView from 'src/sections/main-sections/signs/view/signs-list-view';
// sections

// ----------------------------------------------------------------------

export default function DevicesListPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Devices List Page</title>
      </Helmet>

      <DevicesListView />
    </>
  );
}
