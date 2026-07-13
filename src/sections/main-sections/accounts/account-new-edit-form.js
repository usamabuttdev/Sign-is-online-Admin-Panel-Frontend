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
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import { useAddNewAccountMutation, useUpdateAccountMutation } from 'src/store/Reducer/accounts';

export default function AccountNewEditForm({ currentUser }) {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [addNewAccount] = useAddNewAccountMutation();
  const [updateAccount] = useUpdateAccountMutation();

  const NewAccountSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    locations: Yup.string(),
    signs: Yup.number(),
    users: Yup.number(),
    total_charged: Yup.number(),
  });

  const defaultValues = useMemo(
    () => ({
      title: currentUser?.title || '',
      locations: currentUser?.locations || '',
      signs: currentUser?.signs || '',
      users: currentUser?.users || '',
      total_charged: currentUser?.total_charged || '',
    }),
    [currentUser]
  );

  const methods = useForm({
    resolver: yupResolver(NewAccountSchema),
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
        await updateAccount({ id: currentUser.id, data }).unwrap();
      } else {
        await addNewAccount(data).unwrap();
      }
      reset();
      enqueueSnackbar(currentUser ? 'Update success!' : 'Create success!');
      router.push(paths.dashboard.accounts.root);
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
              <RHFTextField name="locations" label="Locations" />
              <RHFTextField name="signs" label="Signs" type="number" />
              <RHFTextField name="users" label="Users" type="number" />
              <RHFTextField name="total_charged" label="Total Charged" type="number" />
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!currentUser ? 'Create Account' : 'Save Changes'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

AccountNewEditForm.propTypes = {
  currentUser: PropTypes.object,
};
