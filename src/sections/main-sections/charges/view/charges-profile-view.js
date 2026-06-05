// @mui
import Container from '@mui/material/Container';
// routes
import { paths } from 'src/routes/paths';
// hooks
// _mock
// components
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
//
import ProfileHome from '../profile-home';
import {  Stack } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';



// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function ChargesProfileView() {
  const settings = useSettingsContext();
  const {state} = useLocation()
  const data = state?.charge || {}
  const location = useLocation();
  const [info, setInfo] = useState(null);

  useEffect(() => {
    if (location.state?.charge) {
      setInfo(location?.state?.charge); // keep it in state
    }
  }, [location?.state?.charge]);


  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <Stack direction="row" spacing={2}>
      <CustomBreadcrumbs
        heading="Charges"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Charges', href: paths.dashboard.charges.root },
          { name: 'TK2383479' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      </Stack>

     <ProfileHome info={info}  />

    </Container>
  );
}
