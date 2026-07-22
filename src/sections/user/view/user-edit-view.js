import PropTypes from 'prop-types';
// @mui
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
// routes
import { paths } from 'src/routes/paths';
// components
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
// api
import { useGetUserByIdQuery, useUpdateUserMutation } from 'src/store/Reducer/users';
//
import UserNewEditForm from '../user-new-edit-form';

// ----------------------------------------------------------------------

export default function UserEditView({ id }) {
  const settings = useSettingsContext();
  const [updateUser] = useUpdateUserMutation();
  const { data: currentUser, isLoading } = useGetUserByIdQuery({ id });

  if (isLoading || !currentUser) {
    return (
      <Container maxWidth={settings.themeStretch ? false : 'lg'}>
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  const handleSubmit = async (data) => {
    try {
      const payload = {
        name: data.name,
        email: data.email,
        phone: data.phoneNumber,
        role: data.role,
        isActive: data.status === 'banned' ? 0 : (data.isVerified === false ? 0 : 1),
      };
      const result = await updateUser({ _id: id, data: payload }).unwrap();
      return { success: true, data: result?.data };
    } catch (error) {
      console.error('Update user error:', error);
      throw error;
    }
  };

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Edit"
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'Users',
            href: paths.dashboard.users.root,
          },
          { name: currentUser?.name || currentUser?.FullName },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <UserNewEditForm currentUser={currentUser} onSubmit={handleSubmit} />
    </Container>
  );
}

UserEditView.propTypes = {
  id: PropTypes.string,
};
