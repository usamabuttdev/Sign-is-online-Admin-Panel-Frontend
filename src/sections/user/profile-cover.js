import PropTypes from 'prop-types';
// @mui
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import Iconify from 'src/components/iconify';
import { useBoolean } from 'src/hooks/use-boolean';
import * as Yup from 'yup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useUpdateUserMutation } from 'src/store/Reducer/users';
import { useSnackbar } from 'src/components/snackbar';


// ----------------------------------------------------------------------

export default function ProfileCover({ userId, item }) {

  const { fullName, phone, email } = item;
  const open = useBoolean();
  const [updateUser] = useUpdateUserMutation();
  const { enqueueSnackbar } = useSnackbar();

  const defaultValues = {
    fullname: item?.fullName || '',
    email: item?.email || '',
    phone: item?.phone || '',
  };

  const NewUserSchema = Yup.object().shape({
    fullname: Yup.string().required('Full Name is required'),
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    phone: Yup.string().required('Phone number is required'),
  });

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const {
    reset,
    formState: { isSubmitting },
    setValue
  } = methods;

  const onSubmit = async (data) => {
    try {
      const payload = {
        name: data.fullname,
        email: data.email,
        phone: data.phone,
      };
      await updateUser({ _id: userId, data: payload }).unwrap();
      enqueueSnackbar('Update success!');
      onClose();
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Update failed', { variant: 'error' });
    }
  }
  const onClose = () => {
    open.onFalse();
    reset(defaultValues);
  };

  useEffect(() => {
    setValue('fullname', item?.fullName || '', { shouldValidate: true });
    setValue('email', item?.email || '', { shouldValidate: true });
    setValue('phone', item?.phone || '', { shouldValidate: true });
  }, [item]);



  return (
    <Box sx={{ p: { md: 3, xs: 2 }, borderRadius: 2, boxShadow: 3, bgcolor: 'background.paper' }}>
      <Grid container spacing={3} direction={{ xs: 'column', md: 'row' }} >
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: "end" }}>
            <Tooltip title="Edit Profile" arrow placement="top">
              <IconButton color={'default'} onClick={open.onTrue} sx={{ mb: 1 }}>
                <Iconify icon="solar:pen-bold" />
              </IconButton>
            </Tooltip>
          </Box>
          <Stack spacing={1.5}>
            
            <Typography variant="body1" fontWeight={600}>
              {fullName}
            </Typography>

            <Stack direction="row" alignItems="center" spacing={1}>
              <Iconify icon="mdi:phone" width={24} sx={{ cursor: "pointer" }} />
              <Typography variant="body1" color="text.secondary">
                {phone || 'No phone number provided'}
              </Typography>
            </Stack>

            <Stack direction="row" alignItems="center" spacing={1}>
              <Iconify icon="mdi:email" width={24} sx={{ cursor: "pointer" }} />
              <Typography variant="body1" color="text.secondary">
                {email || 'No email provided'}
              </Typography>
            </Stack>
          </Stack>

          <Dialog
            fullWidth
            maxWidth={"sm"}
            open={open.value}
            onClose={onClose}
          >
            <FormProvider methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
              <DialogTitle> Edit User</DialogTitle>

              <DialogContent>
                <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(1,1fr)', rowGap: 2, }}>
                  <RHFTextField name="fullname" label="Full Name" />
                  <RHFTextField name="email" label="Email" />
                  <RHFTextField name="phone" label="Phone" />
                </Box>
              </DialogContent>

              <DialogActions>
                <Button variant="outlined" onClick={onClose}>
                  Cancel
                </Button>

                <LoadingButton type="submit" color="primary" variant="contained" loading={isSubmitting}>
                  Update
                </LoadingButton>
              </DialogActions>
            </FormProvider>
          </Dialog>

        </Grid>
      </Grid>
    </Box >
  );
}

ProfileCover.propTypes = {
  userId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  item: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    fullName: PropTypes.string,
    phone: PropTypes.string,
    email: PropTypes.string,
  }),
};
