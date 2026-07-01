import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import CardHeader from '@mui/material/CardHeader';
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function ProfileHome({ location }) {
  if (!location) {
    return (
      <Card>
        <CardHeader title="Location Details" />
        <Box sx={{ p: 3, typography: 'body2' }}>No location data available.</Box>
      </Card>
    );
  }

  const renderLocation = (
    <Card>
      <CardHeader title="Location Details" />

      <Stack spacing={2} sx={{ p: 3 }}>
        <Stack direction="row" spacing={2}>
          <Iconify icon="mdi:format-title" width={24} />
          <Box sx={{ typography: 'body2' }}>{location.title}</Box>
        </Stack>

        <Stack direction="row" spacing={2}>
          <Iconify icon="mdi:account" width={24} />
          <Box sx={{ typography: 'body2' }}>{location.account}</Box>
        </Stack>

        <Stack direction="row" spacing={2}>
          <Iconify icon="mdi:shield-check" width={24} />
          <Box sx={{ typography: 'body2' }}>
            {location.authenticated === 'Yes' ? 'Authenticated' : 'Not Authenticated'}
          </Box>
        </Stack>

        <Stack direction="row" spacing={2}>
          <Iconify icon="mdi:map-marker" width={24} />
          <Box sx={{ typography: 'body2' }}>
            {location.city}, {location.state}
          </Box>
        </Stack>

        <Stack direction="row" spacing={2}>
          <Iconify icon="mdi:calendar" width={24} />
          <Box sx={{ typography: 'body2' }}>{location.created_at}</Box>
        </Stack>
      </Stack>
    </Card>
  );

  return (
    <Grid container spacing={3}>
      <Grid xs={12}>
        <Stack spacing={3}>{renderLocation}</Stack>
      </Grid>
    </Grid>
  );
}
