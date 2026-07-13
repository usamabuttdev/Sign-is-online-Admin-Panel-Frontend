import PropTypes from 'prop-types';
import Container from '@mui/material/Container';
import { paths } from 'src/routes/paths';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { useGetMetricByIdQuery } from 'src/store/Reducer/metrics';
import MetricNewEditForm from '../metric-new-edit-form';

export default function MetricEditView({ id }) {
  const settings = useSettingsContext();
  const { data: currentUser } = useGetMetricByIdQuery(id);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Edit"
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'Metrics',
            href: paths.dashboard.metrics.root,
          },
          { name: currentUser?.title },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <MetricNewEditForm currentUser={currentUser} />
    </Container>
  );
}

MetricEditView.propTypes = {
  id: PropTypes.string,
};
