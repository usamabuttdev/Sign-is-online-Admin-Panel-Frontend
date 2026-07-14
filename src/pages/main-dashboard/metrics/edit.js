import { Helmet } from 'react-helmet-async';
import { useParams } from 'src/routes/hooks';
import MetricEditView from 'src/sections/main-sections/metrics/view/metric-edit-view';

export default function MetricEditPage() {
  const params = useParams();
  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Dashboard: Edit Metric</title>
      </Helmet>

      <MetricEditView id={`${id}`} />
    </>
  );
}
