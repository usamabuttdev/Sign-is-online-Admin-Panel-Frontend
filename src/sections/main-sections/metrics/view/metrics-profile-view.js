// @mui
import Container from '@mui/material/Container';
import { Stack } from '@mui/material';
// routes
import { paths } from 'src/routes/paths';
// hooks
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
//
import ProfileHome from '../profile-home';

// ----------------------------------------------------------------------

export default function MetricsProfileView() {
  const settings = useSettingsContext();
  

  // Example metric data
  let data = {
    id: 101,
    title: "Monthly Active Users",
    query: "SELECT COUNT(*) FROM users WHERE active = 1",
    current_value: 1520,
    goal: 2000,
    percent_of_goal: "76%",
    created_at: "2025-08-01T00:00:00Z",
    met_units: "$",
  };

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <Stack direction="row" spacing={2}>
        <CustomBreadcrumbs
          heading="Metrics"
          links={[
            { name: 'Dashboard', href: paths.dashboard.root },
            { name: 'Metrics', href: paths.dashboard.metrics.root },
            { name: data.title },
          ]}
          sx={{
            mb: { xs: 3, md: 5 },
          }}
        />
      </Stack>

      <ProfileHome metric={data} />
    </Container>
  );
}
