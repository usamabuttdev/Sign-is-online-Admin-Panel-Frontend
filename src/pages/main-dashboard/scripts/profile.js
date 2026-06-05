import { Helmet } from 'react-helmet-async';
import ScriptsProfileView from 'src/sections/main-sections/scripts/view/scripts-profile-view';
// sections
// ----------------------------------------------------------------------

export default function ScriptsProfilePage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Scripts Profile</title>
      </Helmet>

      <ScriptsProfileView/>


    </>
  );
}
