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
//

// ----------------------------------------------------------------------

export default function ProfileHome({ info, posts }) {



 

  const renderAbout = (
    <Card>
      <CardHeader title="About" />

      <Stack spacing={2} sx={{ p: 3 }}>

        <Stack direction="row" spacing={2}>
          <Iconify icon="mingcute:location-fill" width={24} />

          <Box sx={{ typography: 'body2' }}>
            {`Live at `}
            <Link variant="subtitle2" color="inherit">
              {info.country}
            </Link>
          </Box>
        </Stack>

        <Stack direction="row" sx={{ typography: 'body2' }}>
          <Iconify icon="fluent:mail-24-filled" width={24} sx={{ mr: 2 }} />
          {info.email}
        </Stack>

        <Stack direction="row" spacing={2}>
          <Iconify icon="ic:round-business-center" width={24} />

          <Box sx={{ typography: 'body2' }}>
            Trainer {`at `}
            <Link variant="subtitle2" color="inherit">
                Verzish Gym
            </Link>
          </Box>
        </Stack>

        <Stack direction="row" sx={{ typography: 'body2' }}>
          <Iconify icon="bxs:user" width={24} sx={{ mr: 2 }} />
          Male
        </Stack>

        <Stack direction="row" sx={{ typography: 'body2' }}>
          <Iconify icon="material-symbols-light:schedule" width={24} sx={{ mr: 2 }} />
          25 years old
        </Stack>

        <Stack direction="row" sx={{ typography: 'body2' }}>
          <Iconify icon="material-symbols-light:schedule" width={24} sx={{ mr: 2 }} />
          5 years of experience
        </Stack>


        <Stack direction="row" sx={{ typography: 'body2' }}>
          <Iconify icon="ph:barbell-fill" width={24} sx={{ mr: 2 }} />
          Yoga , Zumba , Weight Training , Acrobatics
        </Stack>

        <Stack direction="row" sx={{ typography: 'body2' }}>
          <Iconify icon="wpf:online" width={24} sx={{ mr: 2 }} />
            Online , Home
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
