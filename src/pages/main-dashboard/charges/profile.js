import { Helmet } from 'react-helmet-async';
import ChargesProfileView from 'src/sections/main-sections/charges/view/charges-profile-view';
// sections
// ----------------------------------------------------------------------

export default function ChargesProfilePage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Charges Profile</title>
      </Helmet>

      <ChargesProfileView />

    </>
  );
}
