import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
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
import { useGetAllusersListQuery, useUpdateUserMutation } from 'src/store/Reducer/users';
//
import UserNewEditForm from '../user-new-edit-form';

// ----------------------------------------------------------------------

export default function UserEditView({ id }) {
  const settings = useSettingsContext();
  const [currentUser, setCurrentUser] = useState(null);
  const [updateUser] = useUpdateUserMutation();
  const { data, isLoading, isError } = useGetAllusersListQuery({ page: 1, limit: 1000, keyword: '' });

  useEffect(() => {
    if (data?.data) {
      const user = data.data.find((u) => u.id === id || u._id === id);
      if (user) setCurrentUser(user);
    }
  }, [data, id]);

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
      await updateUser({ _id: id, data }).unwrap();
      return { success: true };
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
            name: 'User',
            href: paths.dashboard.user.root,
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
