import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import CardHeader from '@mui/material/CardHeader';
import Iconify from 'src/components/iconify';

export default function ProfileHome({ info }) {

  console.log(info ,'info')


  const renderAbout = (
    <Card sx={{ p: 3 }}>
      <CardHeader title="Booking Details" sx={{ pb: 2 }} />

      <Grid container spacing={3}>
        {/* Trainer Name */}
        <Grid item xs={12} sm={6}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Iconify icon="material-symbols:person" width={24} />
            <Box sx={{ typography: 'body2', fontWeight: 'bold' }}>
              Trainer Name: <span style={{ fontWeight: 'normal' }}>{info?.sessionDataSnapshot?.creator?.name || 'N/A'}</span>
            </Box>
          </Stack>
        </Grid>

        {/* Location */}
        <Grid item xs={12} sm={6} >
          <Stack direction="row" spacing={2} alignItems="center">
            <Iconify icon="mingcute:location-fill" width={24} />
            <Box sx={{ typography: 'body2', fontWeight: 'bold' }}>
              Location:
              <span style={{ fontWeight: 'normal' }}>
                <Link variant="subtitle2" color="inherit">
                  {info?.sessionDataSnapshot?.sessionDetails?.location?.fullAddress || 'Not available'}
                </Link>
              </span>
            </Box>
          </Stack>
        </Grid>

        {/* Status */}
        <Grid item xs={12}  sm={6}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Iconify icon="material-symbols:check-circle-outline" width={24} />
            <Box sx={{ typography: 'body2', fontWeight: 'bold' }}>
              Status:
              <span
                style={{
                  fontWeight: 'normal',
                  color: info?.status === 'active' ? 'green' : 'orange',
                  padding: '5px',
                }}
              >
                {info?.status === 'active' ? 'Active' : 'Pending'}
              </span>
            </Box>
          </Stack>
        </Grid>

        {/* Price */}
        <Grid item xs={12} sm={6}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Iconify icon="material-symbols:attach-money" width={24} />
            <Box sx={{ typography: 'body2', fontWeight: 'bold' }}>
              Price: <span style={{ fontWeight: 'normal' }}>
                {info?.sessionDataSnapshot?.pricingAndDuration?.currencySymbol}{info?.sessionDataSnapshot?.pricingAndDuration?.price || 'N/A'}
              </span>
            </Box>
          </Stack>
        </Grid>

        {/* Date */}
        <Grid item xs={12} sm={6} >
          <Stack direction="row" spacing={2} alignItems="center">
            <Iconify icon="material-symbols:calendar-month" width={24} />
            <Box sx={{ typography: 'body2', fontWeight: 'bold' }}>
              Date: <span style={{ fontWeight: 'normal' }}>
                {info?.sessionDataSnapshot?.pricingAndDuration?.startDate || 'N/A'} - {info?.sessionDataSnapshot?.pricingAndDuration?.endDate || 'N/A'}
              </span>
            </Box>
          </Stack>
        </Grid>

        {/* Specialization */}
        <Grid item xs={12} sm={6}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Iconify icon="ph:barbell-fill" width={24} />
            <Box sx={{ typography: 'body2', fontWeight: 'bold' }}>
              Specialization: <span style={{ fontWeight: 'normal' }}>
                {info?.sessionDataSnapshot?.basicInfo?.specialization?.title || 'N/A'}
              </span>
            </Box>
          </Stack>
        </Grid>

        {/* Training Mode */}
        <Grid item xs={12} sm={6}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Iconify icon="material-symbols:fitness-center" width={24} />
            <Box sx={{ typography: 'body2', fontWeight: 'bold' }}>
              Training Mode: <span style={{ fontWeight: 'normal' }}>
                {info?.sessionDataSnapshot?.basicInfo?.trainingMode?.title || 'N/A'}
              </span>
            </Box>
          </Stack>
        </Grid>

        {/* Gender Preference */}
        <Grid item xs={12} sm={6}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Iconify icon="material-symbols:transgender" width={24} />
            <Box sx={{ typography: 'body2', fontWeight: 'bold' }}>
              Gender Preference: <span style={{ fontWeight: 'normal' }}>
                {info?.sessionDataSnapshot?.basicInfo?.genderPreference || 'N/A'}
              </span>
            </Box>
          </Stack>
        </Grid>

        {/* Max Distance */}
        <Grid item xs={12} sm={6}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Iconify icon="material-symbols:expand" width={24} />
            <Box sx={{ typography: 'body2', fontWeight: 'bold' }}>
              Max Distance: <span style={{ fontWeight: 'normal' }}>
                {info?.sessionDataSnapshot?.basicInfo?.maxDistance || '0'} km
              </span>
            </Box>
          </Stack>
        </Grid>

        {/* Skill Level */}
        <Grid item xs={12} sm={6} >
          <Stack direction="row" spacing={2} alignItems="center">
            <Iconify icon="material-symbols:school" width={24} />
            <Box sx={{ typography: 'body2', fontWeight: 'bold' }}>
              Skill Level: <span style={{ fontWeight: 'normal' }}>{info?.sessionDataSnapshot?.sessionDetails?.skillLevel || 'N/A'}</span>
            </Box>
          </Stack>
        </Grid>

        {/* Equipment */}
        <Grid item xs={12} sm={6}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Iconify icon="material-symbols:sports-martial-arts" width={24} />
            <Box sx={{ typography: 'body2', fontWeight: 'bold' }}>
              Equipment: <span style={{ fontWeight: 'normal' }}>
                {info?.sessionDataSnapshot?.sessionDetails?.equipment || 'N/A'}
              </span>
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </Card>
  );

  return (
    <Grid container spacing={3}>
      <Grid xs={12} md={12}>
        <Stack spacing={3}>{renderAbout}</Stack>
      </Grid>
    </Grid>
  );
}

ProfileHome.propTypes = {
  info: PropTypes.object,
  posts: PropTypes.array,
};
