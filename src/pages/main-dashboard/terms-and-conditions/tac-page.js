import { Helmet } from 'react-helmet-async';
import DashboardTacView from 'src/sections/main-sections/terms-and-conditions/view/tac-view';
// sections

// ----------------------------------------------------------------------

export default function   TacPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Terms and  conditions</title>
      </Helmet>

      <DashboardTacView />
    </>
  );
}
