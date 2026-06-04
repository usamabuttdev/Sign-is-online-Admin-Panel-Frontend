import { Helmet } from 'react-helmet-async';
// sections
import BookingsListView from 'src/sections/main-sections/bookings/view/bookings-list-view';

// ----------------------------------------------------------------------

export default function BookingsPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Bookings</title>
      </Helmet>

      <BookingsListView />
    </>
  );
}
