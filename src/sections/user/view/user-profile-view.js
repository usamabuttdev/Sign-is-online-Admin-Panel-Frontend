import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { paths } from 'src/routes/paths';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { useSettingsContext } from 'src/components/settings';
import { useTable } from 'src/components/table';
import ProfileCover from '../profile-cover';
import AssociatedLocationTable from '../associated-location-table';

const fallbackLocations = [
  {
    id: 1,
    location_name: 'Tech Hub San Francisco',
    address: '123 Tech Street, San Francisco, CA',
    product: 'Cloud Hosting Platform',
    loc_has_active_subscription: 'Y',
    expiration: '2025-12-31T23:59:59Z',
    account: "Account A"
  },
  {
    id: 2,
    location_name: 'Creative Loft New York',
    address: '456 Creative Ave, New York, NY',
    product: 'Creative Design Suite',
    loc_has_active_subscription: 'N',
    expiration: '2024-09-15T14:30:00Z',
    account: "Account B"
  },
  {
    id: 3,
    location_name: 'Health Center Los Angeles',
    address: '789 Health Blvd, Los Angeles, CA',
    product: 'Healthcare Management Pro',
    loc_has_active_subscription: 'Y',
    expiration: '2026-03-20T08:00:00Z',
    account: "Account C"
  },
  {
    id: 4,
    location_name: 'Finance Tower Chicago',
    address: '101 Finance Rd, Chicago, IL',
    product: 'FinTech Analytics Suite',
    loc_has_active_subscription: 'Y',
    expiration: '2025-07-01T10:15:00Z',
    account: "Account D"
  },
];

const headLabels = [
  { id: 'name', label: 'Location Name' },
  { id: 'account', label: 'Account' },
  { id: 'product', label: 'Product' },
  { id: 'active', label: 'Active' , align:"center" },
  { id: 'expiration', label: 'Expiration' },
  { id: 'address', label: 'Address' },
  { id: 'action' , label:'Action' , align:"center" },
];

export default function UserProfileView() {
  const { id } = useParams();
  const table = useTable();
  const settings = useSettingsContext();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetch(`/admin/user/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Not found');
        return res.json();
      })
      .then((data) => {
        if (data.success) setUser(data.data);
        setLoading(false);
      })
      .catch(() => {
        setUser(null);
        setLoading(false);
      });
  }, [id]);

  const profileData = {
    fullName: user?.name || 'User',
    photoURL: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg',
    role: user?.role || '—',
    coverUrl: '/static/mock-images/covers/cover_1.jpg',
    email: user?.email || '—',
    phone: user?.phone || '—',
    associatedLocations: fallbackLocations,
  };

  if (loading) {
    return (
      <Container maxWidth={settings.themeStretch ? false : 'xl'}>
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <CustomBreadcrumbs
        heading="Profile"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Users', href: paths.dashboard.users.root },
          { name: user?.name || 'User' }
        ]}
        sx={{
          mb: { xs: 3, md: 3 },
        }}
      />

      <Card sx={{ mb: 2 }}>
        <ProfileCover
          role={profileData.role}
          coverUrl={profileData.coverUrl}
          photoURL={profileData.photoURL}
          item={profileData}
        />
      </Card>
      <AssociatedLocationTable userDetail={profileData} table={table} headLabels={headLabels} />
    </Container>
  );
}
