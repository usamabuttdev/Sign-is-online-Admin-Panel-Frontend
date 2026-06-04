import { Helmet } from 'react-helmet-async';
import TrainerProfileView from 'src/sections/main-sections/trainers/view/trainer-profile-view';
// sections
// ----------------------------------------------------------------------

export default function TrainerProfilePage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Trainer Profile</title>
      </Helmet>

      <TrainerProfileView />
    </>
  );
}
