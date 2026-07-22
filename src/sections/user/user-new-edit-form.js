import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useMemo, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import Label from 'src/components/label';
import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import { useDeleteUserMutation } from 'src/store/Reducer/users';
import { useSelector } from 'react-redux';
import { selectUser } from 'src/store/slices/userSlice';

/**
 * Users MSSQL columns that exist:
 * USR_ID, FullName, Email, Phone, Role, PasswordHash, IsActive, CreatedAt,
 * (+ UserID guid default, USR_ADVISORY_COUNCIL)
 * Address/company/avatar/email-verified are NOT stored — removed from this form.
 */
export default function UserNewEditForm({ currentUser, onSubmit: handleSubmitProp }) {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const loggedInUser = useSelector(selectUser);
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);

  const NewUserSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    phoneNumber: Yup.string().nullable(),
    role: Yup.string().required('Role is required'),
    address: Yup.string(),
    country: Yup.string(),
    company: Yup.string(),
    state: Yup.string(),
    city: Yup.string(),
    zipCode: Yup.string(),
    avatarUrl: Yup.mixed().nullable(),
    status: Yup.string().oneOf(['active', 'banned']),
    isVerified: Yup.boolean(),
  });

  const isActiveValue = currentUser?.isactive ?? currentUser?.IsActive ?? currentUser?.isActive;
  const defaultStatus =
    isActiveValue === false || isActiveValue === 0 || isActiveValue === 'false'
      ? 'banned'
      : 'active';

  const defaultValues = useMemo(
    () => ({
      name: currentUser?.name || currentUser?.FullName || '',
      email: currentUser?.email || currentUser?.Email || '',
      phoneNumber: currentUser?.phoneNumber || currentUser?.phone || currentUser?.Phone || '',
      role: currentUser?.role || currentUser?.Role || 'user',
      status: currentUser?.status || defaultStatus,
    }),
    [currentUser, defaultStatus]
  );

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    handleSubmit: hookHandleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  const buildApiPayload = (data) => ({
    name: data.name,
    email: data.email,
    phone: data.phoneNumber || null,
    phoneNumber: data.phoneNumber || null,
    role: data.role || 'user',
    isActive: data.status !== 'banned',
  });

  const onSubmit = hookHandleSubmit(async (data) => {
    try {
      let updatedData = null;
      if (handleSubmitProp) {
        const result = await handleSubmitProp(buildApiPayload(data));
        updatedData = result?.data;
      }
      if (currentUser && updatedData) {
        reset({
          name: updatedData.name || updatedData.FullName || '',
          email: updatedData.email || updatedData.Email || '',
          phoneNumber: updatedData.phoneNumber || updatedData.phone || updatedData.Phone || '',
          role: updatedData.role || updatedData.Role || 'user',
          status: updatedData.isactive || updatedData.isActive ? 'active' : 'banned',
        });
      } else if (!currentUser) {
        reset();
      }
      enqueueSnackbar(currentUser ? 'Update success!' : 'Create success!');
      if (!currentUser) {
        router.push(paths.dashboard.users.root);
      }
    } catch (error) {
      console.error(error);
      enqueueSnackbar(error?.data?.message || 'An error occurred', { variant: 'error' });
    }
  });

  const handleSoftDelete = async () => {
    try {
      await deleteUser(currentUser.id).unwrap();
      enqueueSnackbar('User soft-deleted', { variant: 'success' });
      setConfirmDeleteOpen(false);
      router.push(paths.dashboard.users.root);
    } catch (error) {
      enqueueSnackbar(error?.data?.message || 'Failed to delete user', { variant: 'error' });
    }
  };

  const canDelete =
    currentUser?.id != null &&
    loggedInUser?.id != null &&
    String(loggedInUser.id) !== String(currentUser.id);

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        <Grid xs={12} md={4}>
          <Card sx={{ pt: 5, pb: 5, px: 3 }}>
            {currentUser && (
              <Label
                color={values.status === 'banned' ? 'error' : 'success'}
                sx={{ position: 'absolute', top: 24, right: 24 }}
              >
                {values.status === 'banned' ? 'banned' : 'active'}
              </Label>
            )}

            {/* <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
              Users store name, email, phone, role, and active status only. Address, company, and
              avatar fields are not in the database.
            </Typography> */}

            {currentUser && (
              <FormControlLabel
                labelPlacement="start"
                control={
                  <Controller
                    name="status"
                    control={control}
                    render={({ field }) => (
                      <Switch
                        {...field}
                        checked={field.value === 'banned'}
                        onChange={(event) =>
                          field.onChange(event.target.checked ? 'banned' : 'active')
                        }
                      />
                    )}
                  />
                }
                label={
                  <>
                    <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                      Banned
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      Soft-disable account
                    </Typography>
                  </>
                }
                sx={{ mx: 0, mb: 3, width: 1, justifyContent: 'space-between' }}
              />
            )}

            {currentUser && canDelete && (
              <Stack justifyContent="center" alignItems="center" sx={{ mt: 3 }}>
                <Button variant="soft" color="error" onClick={() => setConfirmDeleteOpen(true)}>
                  Delete User
                </Button>
              </Stack>
            )}
          </Card>
        </Grid>

        <Grid xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
              }}
            >
              <RHFTextField name="name" label="Full Name" />
              <RHFTextField name="email" label="Email Address" />
              <RHFTextField name="phoneNumber" label="Phone Number" />
              <RHFTextField name="role" label="Role" />
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!currentUser ? 'Create User' : 'Save Changes'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>

      <Dialog open={confirmDeleteOpen} onClose={() => setConfirmDeleteOpen(false)}>
        <DialogTitle>Delete user?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Soft-delete &quot;{values.name || values.email}&quot;? They will be hidden from the
            active list.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDeleteOpen(false)}>Cancel</Button>
          <LoadingButton
            color="error"
            variant="contained"
            loading={isDeleting}
            onClick={handleSoftDelete}
          >
            Delete
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </FormProvider>
  );
}

UserNewEditForm.propTypes = {
  currentUser: PropTypes.object,
  onSubmit: PropTypes.func,
};
