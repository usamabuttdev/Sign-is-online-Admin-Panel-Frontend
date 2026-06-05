import { Helmet } from 'react-helmet-async';
// sections
import DashboardFaqView from 'src/sections/main-sections/faq/view/faq-view';

// ----------------------------------------------------------------------

export default function FaqPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Common Questions</title>
      </Helmet>

      <DashboardFaqView />
    </>
  );
}
