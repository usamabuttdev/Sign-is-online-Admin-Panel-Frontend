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
import MenuItem from '@mui/material/MenuItem';
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFTextField, RHFSelect } from 'src/components/hook-form';
import { useAddNewLocationMutation, useUpdateLocationMutation } from 'src/store/Reducer/locations';

export default function LocationNewEditForm({ currentUser }) {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [addNewLocation] = useAddNewLocationMutation();
  const [updateLocation] = useUpdateLocationMutation();

  const NewLocationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    account_id: Yup.string().required('Account ID is required'),
    city: Yup.string(),
    state: Yup.string(),
    product_id: Yup.string(),
    authenticated: Yup.string(),
    has_active_subscription: Yup.string(),
  });

  const defaultValues = useMemo(
    () => ({
      title: currentUser?.title || '',
      account_id: currentUser?.account_id || '',
      city: currentUser?.city || '',
      state: currentUser?.state || '',
      product_id: currentUser?.product_id || '',
      authenticated: currentUser?.authenticated || '',
      has_active_subscription: currentUser?.has_active_subscription || '',
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
    formState: { isSubmitting, dirtyFields },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (currentUser) {
        if (Object.keys(dirtyFields).length === 0) {
          enqueueSnackbar('No changes detected!', { variant: 'warning' });
          return;
        }
        await updateLocation({ id: currentUser.id, data }).unwrap();
        enqueueSnackbar('Location updated successfully!');
      } else {
        const submitData = {
          ...data,
          account_id: Number(data.account_id),
          product_id: data.product_id ? Number(data.product_id) : undefined,
          authenticated: data.authenticated === 'Yes' ? true : data.authenticated === 'No' ? false : undefined,
          has_active_subscription: data.has_active_subscription === 'Yes' ? true : data.has_active_subscription === 'No' ? false : undefined,
        };
        await addNewLocation(submitData).unwrap();
        enqueueSnackbar('Location created successfully!');
      }
      reset();
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
              <RHFTextField name="account_id" label="Account ID" type="number" />
              <RHFTextField name="city" label="City" />
              <RHFTextField name="state" label="State" />
              <RHFTextField name="product_id" label="Product ID" type="number" />

              <RHFSelect name="authenticated" label="Authenticated">
                <MenuItem value="">None</MenuItem>
                <MenuItem value="Yes">Yes</MenuItem>
                <MenuItem value="No">No</MenuItem>
              </RHFSelect>

              <RHFSelect name="has_active_subscription" label="Active Subscription">
                <MenuItem value="">None</MenuItem>
                <MenuItem value="Yes">Yes</MenuItem>
                <MenuItem value="No">No</MenuItem>
              </RHFSelect>
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
