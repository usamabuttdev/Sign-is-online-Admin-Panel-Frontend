import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import CardHeader from '@mui/material/CardHeader';
// _mock
// utils
// components
import Iconify from 'src/components/iconify';
import { Tooltip } from '@mui/material';
import { formatDate } from 'src/utils/format-time';
//

// ----------------------------------------------------------------------

export default function ProfileHome({ info }) {

const {display , full} = formatDate(info.created_at);
 

function getLocalTime() {
  const utcNow = new Date();
  // Parse offset string (e.g., "-05:00" -> -300 minutes)
  let offsetMinutes = 0;
  if (info.tz_offset) {
    const match = info.tz_offset.match(/([+-]?)(\d{2}):(\d{2})/);
    if (match) {
      const sign = match[1] === "-" ? -1 : 1;
      const hours = parseInt(match[2], 10);
      const minutes = parseInt(match[3], 10);
      offsetMinutes = sign * (hours * 60 + minutes);
    }
  }
  const observesDaylight = info.acc_observes_daylight ?? false;
  // Apply offset + daylight saving adjustment
  const localNow = new Date(
    utcNow.getTime() + (offsetMinutes + (observesDaylight ? 60 : 0)) * 60000
  );
  return localNow.toLocaleString();
}

  const renderAbout = (
    <Card>
    <CardHeader title={info.title} />
  
    <Stack spacing={2} sx={{ p: 3 }}>
  
      {/* Locations */}
      <Stack direction="row" spacing={2}>
        <Iconify icon="mingcute:location-fill" width={24} />
        <Box sx={{ typography: 'body2' }}>
          Location:{" "}
          <Link variant="subtitle2" color="inherit">
            {info.locations}
          </Link>
        </Box>
      </Stack>
  
      <Stack direction="row" spacing={2}>
        <Iconify icon="bxs:checkbox" width={24} />
        <Box sx={{ typography: 'body2' }}>Total Signs: {info.signs}</Box>
      </Stack>
  
      {/* Total Users */}
      <Stack direction="row" spacing={2}>
        <Iconify icon="bxs:user" width={24} />
        <Box sx={{ typography: 'body2' }}>Total Users: {info.users}</Box>
      </Stack>
  
      {/* Total Charged */}
      <Stack direction="row" spacing={2}>
        <Iconify icon="fluent:money-16-filled" width={24} />
        <Box sx={{ typography: 'body2' }}>Total Charged: {info.total_charged}</Box>
      </Stack>
  
      {/* Created At */}
      <Stack direction="row" spacing={2}>
        <Iconify icon="material-symbols-light:schedule" width={24} />
        <Box sx={{ typography: 'body2' }}>
          Created:{"   "}	
          <Tooltip title={full} arrow>
            {display}
          </Tooltip>
        </Box>
      </Stack>

         {/* Created By */}
      <Stack direction="row" spacing={2}>
        <Iconify icon="mdi:account-circle" width={24} />
        <Box sx={{ typography: 'body2' }}>
          Created By: {info.created_by_name ?? "Hamza"}
        </Box>
      </Stack>

        {/* Time Zone */}
        <Stack direction="row" spacing={2}>
          <Iconify icon="mdi:earth" width={24} />
          <Box sx={{ typography: 'body2' }}>Time Zone: {info.tz_title ?? 'N/A'}</Box>
        </Stack>

        {/* Current Time */}
        <Stack direction="row" spacing={2}>
          <Iconify icon="mdi:clock-time-four-outline" width={24} />
          <Box sx={{ typography: 'body2' }}>
           Current Time: {getLocalTime()}
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
  posts: PropTypes.array,
};
