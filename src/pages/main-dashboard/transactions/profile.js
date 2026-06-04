import { Helmet } from 'react-helmet-async';
import BookingProfileView from 'src/sections/main-sections/bookings/view/booking-profile-view';
// sections
// ----------------------------------------------------------------------

export default function BookingProfilePage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Booking Profile</title>
      </Helmet>

      <BookingProfileView />

    </>
  );
}
