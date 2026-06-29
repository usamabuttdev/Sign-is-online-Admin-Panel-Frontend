import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import CardHeader from '@mui/material/CardHeader';
import Iconify from 'src/components/iconify';
import { Tooltip } from '@mui/material';
import { formatDate } from 'src/utils/format-time';

export default function ProfileHome({ info }) {
  const { display, full } = formatDate(info.created_at);

  const formattedCharge = info.total_charged != null
    ? `$${Number(info.total_charged).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
    : '$0.00';

  const tzOffsetStr = (() => {
    if (info.tz_offset == null) return '+00:00';
    const abs = Math.abs(Number(info.tz_offset));
    const hours = Math.floor(abs);
    const minutes = Math.round((abs - hours) * 60);
    const sign = Number(info.tz_offset) >= 0 ? '+' : '-';
    return `${sign}${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
  })();

  const observesDaylight = info.observes_daylight === 1 || info.observes_daylight === true;

  function getLocalTime() {
    const utcNow = new Date();
    let offsetMinutes = 0;
    if (info.tz_offset != null) {
      offsetMinutes = Number(info.tz_offset) * 60;
    }
    const localNow = new Date(
      utcNow.getTime() + (offsetMinutes + (observesDaylight ? 60 : 0)) * 60000
    );
    return localNow.toLocaleString();
  }

  const renderAbout = (
    <Card>
      <CardHeader title={info.title} />

      <Stack spacing={2} sx={{ p: 3 }}>
        <Stack direction="row" spacing={2}>
          <Iconify icon="mingcute:location-fill" width={24} />
          <Box sx={{ typography: 'body2' }}>
            Location:{' '}
            <Link variant="subtitle2" color="inherit">
              {info.locations || 'N/A'}
            </Link>
          </Box>
        </Stack>

        <Stack direction="row" spacing={2}>
          <Iconify icon="bxs:checkbox" width={24} />
          <Box sx={{ typography: 'body2' }}>Total Signs: {info.signs ?? 0}</Box>
        </Stack>

        <Stack direction="row" spacing={2}>
          <Iconify icon="fluent:money-16-filled" width={24} />
          <Box sx={{ typography: 'body2' }}>Total Charged: {formattedCharge}</Box>
        </Stack>

        <Stack direction="row" spacing={2}>
          <Iconify icon="material-symbols-light:schedule" width={24} />
          <Box sx={{ typography: 'body2' }}>
            Created:{'   '}
            <Tooltip title={full} arrow>
              {display}
            </Tooltip>
          </Box>
        </Stack>

        <Stack direction="row" spacing={2}>
          <Iconify icon="mdi:account-circle" width={24} />
          <Box sx={{ typography: 'body2' }}>
            Created By: {info.created_by_name || 'N/A'}
          </Box>
        </Stack>

        <Stack direction="row" spacing={2}>
          <Iconify icon="mdi:earth" width={24} />
          <Box sx={{ typography: 'body2' }}>
            Time Zone: {info.tz_title || 'N/A'} ({tzOffsetStr})
          </Box>
        </Stack>

        <Stack direction="row" spacing={2}>
          <Iconify icon="mdi:clock-time-four-outline" width={24} />
          <Box sx={{ typography: 'body2' }}>
            Current Time: {getLocalTime()}
          </Box>
        </Stack>

        <Stack direction="row" spacing={2}>
          <Iconify icon="mdi:theme-light-dark" width={24} />
          <Box sx={{ typography: 'body2' }}>
            Observes Daylight Saving: {observesDaylight ? 'Yes' : 'No'}
          </Box>
        </Stack>
      </Stack>
    </Card>
  );

  return (
    <Grid container spacing={3}>
      <Grid xs={12} md={12}>
        <Stack spacing={3}>
          {renderAbout}
        </Stack>
      </Grid>
    </Grid>
  );
}

ProfileHome.propTypes = {
  info: PropTypes.object,
};
