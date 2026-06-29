import Container from '@mui/material/Container';
import { paths } from 'src/routes/paths';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import ProfileHome from '../profile-home';
import { Stack } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useGetChargeByIdQuery } from 'src/store/Reducer/charges';

export default function ChargesProfileView() {
  const settings = useSettingsContext();
  const { id } = useParams();
  const { data: apiData, isFetching } = useGetChargeByIdQuery(id);
  const info = apiData?.data || null;

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <Stack direction="row" spacing={2}>
        <CustomBreadcrumbs
          heading="Charges"
          links={[
            { name: 'Dashboard', href: paths.dashboard.root },
            { name: 'Charges', href: paths.dashboard.charges.root },
            { name: id || 'TK2383479' },
          ]}
          sx={{
            mb: { xs: 3, md: 5 },
          }}
        />
      </Stack>

      {isFetching ? <div>Loading...</div> : <ProfileHome info={info} />}
    </Container>
  );
}
