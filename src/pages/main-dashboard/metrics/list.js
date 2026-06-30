import { Helmet } from 'react-helmet-async';
import MetricsListView from 'src/sections/main-sections/metrics/view/metrics-list-view';
// sections

// ----------------------------------------------------------------------

export default function MatricsListPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard:Matrics List Page</title>
      </Helmet>

      <MetricsListView />
    </>
  );
}
