import { Helmet } from 'react-helmet-async';
import MetricsProfileView from 'src/sections/main-sections/metrics/view/metrics-profile-view';
// sections
// ----------------------------------------------------------------------

export default function MatricsProfilePage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Matrics Profile</title>
      </Helmet>

      <MetricsProfileView />

    </>
  );
}
