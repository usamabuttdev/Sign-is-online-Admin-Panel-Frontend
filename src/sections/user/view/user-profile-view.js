import { useState, useEffect } from 'react';
// @mui
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
// routes
import { paths } from 'src/routes/paths';
import { useParams } from 'src/routes/hooks';
// hooks
// _mock
// components
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { useSettingsContext } from 'src/components/settings';
//
import { useTable } from 'src/components/table';
import ProfileCover from '../profile-cover';
import AssociatedLocationTable from '../associated-location-table';
import axiosInstance from 'src/utils/axios';

const headLabels = [
  { id: 'title', label: 'Location' },
  { id: 'added', label: 'Added' },
];

export default function UserProfileView() {
  const { id } = useParams();
  const table = useTable();
  const settings = useSettingsContext();

  const [user, setUser] = useState(null);
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError(null);

    Promise.all([
      axiosInstance.get(`/api/admin/user/profile/${id}`),
      axiosInstance.get(`/api/admin/user/${id}/locations`),
    ])
      .then(([userRes, locRes]) => {
        setUser(userRes.data.data);
        setLocations(locRes.data.data);
      })
      .catch((err) => {
        setError(err?.message || 'Failed to load user data');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <Container maxWidth={settings.themeStretch ? false : 'xl'}>
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth={settings.themeStretch ? false : 'xl'}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  if (!user) {
    return (
      <Container maxWidth={settings.themeStretch ? false : 'xl'}>
        <Alert severity="warning">User not found</Alert>
      </Container>
    );
  }

  const userDetail = {
    fullName: user.name,
    email: user.email,
    phone: user.phone,
    role: user.role,
    associatedLocations: locations,
  };

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <CustomBreadcrumbs
        heading="Profile"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Users', href: paths.dashboard.users.root },
          { name: user.name }
        ]}
        sx={{
          mb: { xs: 3, md: 3 },
        }}
      />

      <Card sx={{ mb: 2 }}>
        <ProfileCover
          role={userDetail.role}
          coverUrl={userDetail.coverUrl}
          photoURL={userDetail.photoURL}
          item={userDetail}
        />
      </Card>

      <AssociatedLocationTable locations={locations} table={table} headLabels={headLabels} />
    </Container>
  );
}
