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
import { useAddNewAccountMutation, useUpdateAccountMutation } from 'src/store/Reducer/accounts';
import { parseObservesDaylight, formatObservesDaylight } from 'src/utils/observes-daylight';
import { useSelector } from 'react-redux';
import { selectUser } from 'src/store/slices/userSlice';

export default function AccountNewEditForm({ currentUser }) {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const loggedInUser = useSelector(selectUser);
  const [addNewAccount] = useAddNewAccountMutation();
  const [updateAccount] = useUpdateAccountMutation();

  const NewAccountSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    timezone_id: Yup.string().required('Timezone ID is required'),
    observes_daylight: Yup.boolean(),
    status: Yup.string(),
  });

  const defaultValues = useMemo(
    () => ({
      title: currentUser?.title || '',
      timezone_id:
        currentUser?.timezone_id != null && currentUser?.timezone_id !== ''
          ? String(currentUser.timezone_id)
          : '',
      observes_daylight: parseObservesDaylight(currentUser?.observes_daylight),
      status: currentUser?.status || 'A',
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
      const submitData = {
        title: data.title,
        timezone_id: Number(data.timezone_id),
        observes_daylight: formatObservesDaylight(data.observes_daylight),
        status: data.status || 'A',
      };
      if (currentUser) {
        await updateAccount({ id: currentUser.id, data: submitData }).unwrap();
      } else {
        if (!loggedInUser?.id) {
          enqueueSnackbar('Session missing user id. Please log in again.', { variant: 'error' });
          return;
        }
        await addNewAccount({ ...submitData, created_by: loggedInUser.id }).unwrap();
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
              <RHFTextField name="timezone_id" label="Timezone ID" />
              <RHFSelect name="observes_daylight" label="Observes Daylight">
                <MenuItem value={true}>Yes</MenuItem>
                <MenuItem value={false}>No</MenuItem>
              </RHFSelect>
              <RHFSelect name="status" label="Status">
                <MenuItem value="A">Active</MenuItem>
                <MenuItem value="I">Inactive</MenuItem>
              </RHFSelect>
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
