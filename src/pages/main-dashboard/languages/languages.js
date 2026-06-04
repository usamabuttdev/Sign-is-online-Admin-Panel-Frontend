import { Helmet } from 'react-helmet-async';
// sections
import LanguagesListView from 'src/sections/main-sections/languages/view/languages-list-view';

// ----------------------------------------------------------------------

export default function LanguagesPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Languages</title>
      </Helmet>

      <LanguagesListView />
    </>
  );
}
