import { Helmet } from 'react-helmet-async';
import DevicesListView from 'src/sections/main-sections/devices/view/devices-list-view';

export default function DevicesListPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard:Devices List Page</title>
      </Helmet>

      <DevicesListView />
    </>
  );
}
