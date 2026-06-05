// @mui
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
// routes
import { paths } from 'src/routes/paths';
// hooks
// _mock
// components
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { useSettingsContext } from 'src/components/settings';
//
import { useTable } from 'src/components/table';
import ProfileCover from '../profile-cover';
import AssociatedLocationTable from '../associated-location-table';

const userDetail = {
  fullName: 'John Doe',
  photoURL: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg',
  role: 'Administrator',
  coverUrl: '/static/mock-images/covers/cover_1.jpg',
  email: 'john.doe@example.com',
  phone: '+1 (555) 123-4567',
  associatedLocations : [
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
  ]
};


const headLabels = [
  { id: 'name', label: 'Location Name' },
  { id: 'account', label: 'Account' },
  { id: 'product', label: 'Product' },
  { id: 'active', label: 'Active' , align:"center" },
  { id: 'expiration', label: 'Expiration' },
  { id: 'address', label: 'Address' },
  { id: 'action' , label:'Action' , align:"center" }, // For actions column
];
// ----------------------------------------------------------------------

export default function UserProfileView() {

  const table = useTable();
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <CustomBreadcrumbs
        heading="Profile"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Users', href: paths.dashboard.users.root },
          { name: 'John Doe' }
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
      <AssociatedLocationTable userDetail={userDetail} table={table} headLabels={headLabels} />
    </Container>
  );
}
