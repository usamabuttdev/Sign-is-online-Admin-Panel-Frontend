import PropTypes from 'prop-types';
// @mui
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, Button, Card, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, IconButton, MenuItem, Stack, Tooltip, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import avatarShape from 'src/assets/illustrations/avatar-shape';
import FormProvider, { RHFSelect, RHFTextField, RHFUploadAvatar } from 'src/components/hook-form';
import Iconify from 'src/components/iconify';
import Image from 'src/components/image';
import { useBoolean } from 'src/hooks/use-boolean';
import * as Yup from 'yup';
import { fData } from 'src/utils/format-number';
import { useCallback, useEffect } from 'react';


// ----------------------------------------------------------------------

export default function ProfileCover({ item }) {

  const defaultValues = {
    avatarUrl: item?.photoURL ||  "https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg",
    fullname: item?.fullName || '',
    email: item?.email || '',
    phone: item?.phone || '',
    businessAssociated: item?.businessAssociated || '',
  };
  const { fullName, phone, email } = item;
  const open = useBoolean();


  const NewUserSchema = Yup.object().shape({
    avatarUrl: Yup.string(),
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
      // Handle form submission logic here
      onClose();
      reset(defaultValues);
    } catch (error) {
      console.error(error);
    }
  }
  const onClose = () => {
    open.onFalse();
    reset(defaultValues);
  };

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setValue('avatarUrl', newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );


  useEffect(() => {
    setValue('picture', item?.fullName || '', { shouldValidate: true });
  }, [item]);



  return (
    <Box sx={{ p: { md: 3, xs: 2 }, borderRadius: 2, boxShadow: 3, bgcolor: 'background.paper' }}>
      <Grid container spacing={3} direction={{ xs: 'column', md: 'row' }} >
        <Grid item xs={12} md={4}>
          <Card>
            {/* <Image
              src={"https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg"}
              alt={fullName}
              sx={{
                width: '100%',
                height: 280,
                borderRadius: 2,
                objectFit: 'cover',
                objectPosition: 'top'
              }}
            /> */}
              <Box
                sx={{
                  width: '100%',
                  height: 275,
                  borderRadius: 2,
                  backgroundImage: `url(https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg)`,
                  backgroundSize: 'contain',        // shows whole image, no crop
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'top center', // always keep top (head) visible
                  bgcolor: 'black',                 // optional: background behind image
                }}
              />
          </Card>
        </Grid>
        <Grid item xs={12} md={8}>
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
                <RHFUploadAvatar
                name="avatarUrl"
                maxSize={3145728}
                onDrop={handleDrop}
                helperText={
                  <Typography
                    variant="caption"
                    sx={{
                      mt: 3,
                      mx: 'auto',
                      display: 'block',
                      textAlign: 'center',
                      color: 'text.disabled',
                    }}
                  >
                    Allowed *.jpeg, *.jpg, *.png, *.gif
                    <br /> max size of {fData(3145728)}
                  </Typography>
                }
              />
                  <RHFTextField name="fullname" label="Full Name" />
                  <RHFTextField name="email" label="Email" />
                  <RHFTextField name="phone" label="Phone" />
                  {/* <RHFSelect name="businessAssociated" label="Business Associated"  >
                    <MenuItem value="">Select Business Assocaited </MenuItem>
                    <Divider sx={{ borderStyle: 'dashed' }} />
                    {[
                      { id: 'b1', name: 'Glowingify' },
                      { id: 'b2', name: 'Timezzi' },
                      { id: 'b3', name: 'Flaunte' },
                    ].map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.name}
                    </MenuItem>
                    ))}
                  </RHFSelect> */}
             
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
  item: PropTypes.shape({
    avatarUrl: PropTypes.string,
    fullName: PropTypes.string,
    phone: PropTypes.string,
    email: PropTypes.string,
  }),
};
