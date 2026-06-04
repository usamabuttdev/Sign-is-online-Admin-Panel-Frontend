import { Helmet } from 'react-helmet-async';
// sections
import DashboardAboutUsView from 'src/sections/main-sections/aboutUs/view/about-view';

// ----------------------------------------------------------------------

export default function AboutUsPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: About Us</title>
      </Helmet>

      <DashboardAboutUsView />
    </>
  );
}
