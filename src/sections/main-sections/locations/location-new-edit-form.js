import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import LoadingButton from '@mui/lab/LoadingButton';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFTextField, RHFSwitch } from 'src/components/hook-form';
import { useAddNewLocationMutation, useUpdateLocationMutation } from 'src/store/Reducer/locations';

export default function LocationNewEditForm({ currentUser }) {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [addNewLocation] = useAddNewLocationMutation();
  const [updateLocation] = useUpdateLocationMutation();

  const NewLocationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    account_id: Yup.string(),
    auth: Yup.string(),
    sign_exists: Yup.boolean(),
    platforms_count: Yup.number(),
    product: Yup.string(),
    location: Yup.string(),
    subscription: Yup.boolean(),
  });

  const defaultValues = useMemo(
    () => ({
      title: currentUser?.title || '',
      account_id: currentUser?.account_id || '',
      auth: currentUser?.auth || '',
      sign_exists: currentUser?.sign_exists || false,
      platforms_count: currentUser?.platforms_count || '',
      product: currentUser?.product || '',
      location: currentUser?.location || '',
      subscription: currentUser?.subscription || false,
    }),
    [currentUser]
  );

  const methods = useForm({
    resolver: yupResolver(NewLocationSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (currentUser) {
        await updateLocation({ id: currentUser.id, data }).unwrap();
      } else {
        await addNewLocation(data).unwrap();
      }
      reset();
      enqueueSnackbar(currentUser ? 'Update success!' : 'Create success!');
      router.push(paths.dashboard.locations.root);
    } catch (error) {
      console.error(error);
      enqueueSnackbar(error?.data?.message || 'An error occurred', { variant: 'error' });
    }
  });

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        <Grid xs={12}>
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
              <RHFTextField name="title" label="Title" />
              <RHFTextField name="account_id" label="Account ID" />
              <RHFTextField name="auth" label="Auth" />
              <RHFTextField name="platforms_count" label="Platforms Count" type="number" />
              <RHFTextField name="product" label="Product" />
              <RHFTextField name="location" label="Location (City, State)" />
              <RHFSwitch name="sign_exists" label="Sign Exists" />
              <RHFSwitch name="subscription" label="Subscription" />
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!currentUser ? 'Create Location' : 'Save Changes'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

LocationNewEditForm.propTypes = {
  currentUser: PropTypes.object,
};
