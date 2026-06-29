import { Helmet } from 'react-helmet-async';
import ChargesProfileView from 'src/sections/main-sections/charges/view/charges-profile-view';
import ErrorBoundary from 'src/components/error-boundary';

export default function ChargesProfilePage() {
  return (
    <>
      <Helmet>
        <title> Dashboard:Charges Profile Page</title>
      </Helmet>
      <ErrorBoundary>
        <ChargesProfileView />
      </ErrorBoundary>
    </>
  );
}
