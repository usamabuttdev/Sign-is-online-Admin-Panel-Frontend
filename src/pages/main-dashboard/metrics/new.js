import { Helmet } from 'react-helmet-async';
import MetricCreateView from 'src/sections/main-sections/metrics/view/metric-create-view';

export default function MetricCreatePage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Create Metric</title>
      </Helmet>

      <MetricCreateView />
    </>
  );
}
