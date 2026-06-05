// @mui
import Container from '@mui/material/Container';
// routes
import { paths } from 'src/routes/paths';
// hooks
// _mock
// components
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { useSettingsContext } from 'src/components/settings';
//
import { Stack } from '@mui/material';
import ProfileHome from '../profile-home';
// ----------------------------------------------------------------------
// Main script info
const script = {
  id: 3,
  title: "Analytics Script",
  run_frequency: "H",   // H = Hourly, D = Daily, W = Weekly, etc.
  last_started: "2025-08-21T12:00:00Z",
  created_at: "2025-08-10T10:30:00Z",
  status: "A",          // "A" = Active, other values = Failed
  last_checked: "2025-08-21T13:00:00Z",
  track_counts: "Y",    // "Y" = show counts table, "N" = hide counts table
};

// Last 10 Logs (SL table)
const logs = [
  {
    process_time: "2025-08-21T12:05:00Z",
    count: 120,
    server: "Server 1",
    detail: "Process completed successfully"
  },
  {
    process_time: "2025-08-21T11:05:00Z",
    count: 115,
    server: "Server 2",
    detail: "Minor warnings"
  },
  {
    process_time: "2025-08-21T10:05:00Z",
    count: 110,
    server: "Server 1",
    detail: "Process completed successfully"
  },
  {
    process_time: "2025-08-21T09:05:00Z",
    count: 105,
    server: "Server 3",
    detail: "Process failed"
  },
  {
    process_time: "2025-08-21T08:05:00Z",
    count: 100,
    server: "Server 2",
    detail: "Process completed successfully"
  },
  {
    process_time: "2025-08-21T07:05:00Z",
    count: 98,
    server: "Server 1",
    detail: "Minor warnings"
  },
  {
    process_time: "2025-08-21T06:05:00Z",
    count: 95,
    server: "Server 3",
    detail: "Process completed successfully"
  },
  {
    process_time: "2025-08-21T05:05:00Z",
    count: 90,
    server: "Server 1",
    detail: "Process completed successfully"
  },
  {
    process_time: "2025-08-21T04:05:00Z",
    count: 85,
    server: "Server 2",
    detail: "Minor warnings"
  },
  {
    process_time: "2025-08-21T03:05:00Z",
    count: 80,
    server: "Server 1",
    detail: "Process completed successfully"
  },
];

// Last 10 Counts (TRK table) – only if track_counts = "Y"
const counts = [
  { time: "2025-08-21T12:00:00Z", value: 50 },
  { time: "2025-08-21T11:00:00Z", value: 48 },
  { time: "2025-08-21T10:00:00Z", value: 47 },
  { time: "2025-08-21T09:00:00Z", value: 45 },
  { time: "2025-08-21T08:00:00Z", value: 44 },
  { time: "2025-08-21T07:00:00Z", value: 42 },
  { time: "2025-08-21T06:00:00Z", value: 41 },
  { time: "2025-08-21T05:00:00Z", value: 40 },
  { time: "2025-08-21T04:00:00Z", value: 38 },
  { time: "2025-08-21T03:00:00Z", value: 35 },
];

export { counts, logs, script };

export default function ScriptsProfileView() {
  const settings = useSettingsContext();
  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <Stack direction="row" spacing={2}>
      <CustomBreadcrumbs
        heading="Profile"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Scripts', href: paths.dashboard.scripts.root },
          { name: script.title },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      </Stack>
       <ProfileHome script={script} logs={logs} counts={counts} />
    </Container>
  );
}
