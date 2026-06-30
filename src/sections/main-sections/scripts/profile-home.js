import { Tooltip, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import PropTypes from 'prop-types';
import Label from 'src/components/label';
import { formatDate } from 'src/utils/format-time';
import ProfileCountsTable from './profile-counts-table';
import ProfileLogsTable from './profile-logs-table';
import Iconify from 'src/components/iconify';

export default function ScriptProfile({ script, logs, counts }) {
  const RUN_FREQUENCY_LABELS = {
    N: "Now",
    H: "Hourly",
    D: "Daily",
    W: "Weekly",
    M: "Monthly",
    A: "Annually",
  };
  const renderDetails = (
    <Card>
      <CardHeader
        title={script.title}
        titleTypographyProps={{ variant: 'h6', fontWeight: 600 }}
      />
      <Stack spacing={1.5} sx={{ p: 3 }}>
        {/* Run Frequency */}
        <Stack direction="row" spacing={1} alignItems="center">
          <Iconify icon="mdi:timer-outline" width={20} />
          <Typography variant="body2">
            Run Frequency: <strong>{RUN_FREQUENCY_LABELS[script.run_frequency]}</strong>
          </Typography>
        </Stack>
        {/* Status */}
        <Stack direction="row" spacing={1} alignItems="center">
          <Iconify icon="mdi:checkbox-marked-circle-outline" width={20} />
          <Typography variant="body2">
            Status: 
            <Label
              variant="soft"
              color={script.status === 'A' ? 'success' : 'error'}
              sx={{ ml: 1 }}
            >
              <strong>{script.status === 'A' ? 'Active' : 'Failed'}</strong>
            </Label>
          </Typography>
        </Stack>
        {/* Last Started */}
        <Stack direction="row" spacing={1} alignItems="center">
          <Iconify icon="mdi:play-circle-outline" width={20} />
          <Typography variant="body2">
            Last Started:{' '}
            <Tooltip title={script.last_started ? formatDate(script.last_started).full : ''} arrow>
              <Box component="span">
                {script.last_started ? formatDate(script.last_started).display : '-'}
              </Box>
            </Tooltip>
          </Typography>
        </Stack>
        {/* Last Checked */}
        <Stack direction="row" spacing={1} alignItems="center">
          <Iconify icon="mdi:check-circle-outline" width={20} />
          <Typography variant="body2">
            Last Checked:{' '}
            <Tooltip title={script.last_checked ? formatDate(script.last_checked).full : ''} arrow>
              <Box component="span">
                {script.last_checked ? formatDate(script.last_checked).display : '-'}
              </Box>
            </Tooltip>
          </Typography>
        </Stack>
        {/* Track Counts */}
        <Stack direction="row" spacing={1} alignItems="center">
          <Iconify icon="mdi:counter" width={20} />
          <Typography variant="body2">
            Track Counts: 
            <Label
              variant="soft"
              color={script.track_counts === 'Y' ? 'success' : 'error'}
              sx={{ ml: 1 }}
             >
              <strong>{script.track_counts === 'Y' ? 'Yes' : 'No'}</strong>
            </Label>
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );

  const renderLogsTable = <ProfileLogsTable logs={logs} />;
  const renderCountsTable = script.track_counts === 'Y' ? <ProfileCountsTable counts={counts} /> : null;

  return (
    <Grid container spacing={3}>
      <Grid xs={12}>
        <Stack spacing={3}>
          {renderDetails}
          {renderLogsTable}
          {renderCountsTable}
        </Stack>
      </Grid>
    </Grid>
  );
}

ScriptProfile.propTypes = {
  script: PropTypes.object.isRequired,
  logs: PropTypes.array.isRequired,
  counts: PropTypes.array.isRequired,
};
