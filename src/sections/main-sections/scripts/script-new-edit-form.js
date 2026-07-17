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
import FormProvider, { RHFTextField, RHFSelect, RHFCheckbox } from 'src/components/hook-form';
import { useAddNewScriptMutation, useUpdateScriptMutation } from 'src/store/Reducer/scripts';

export default function ScriptNewEditForm({ currentUser }) {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [addNewScript] = useAddNewScriptMutation();
  const [updateScript] = useUpdateScriptMutation();

  const NewScriptSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    description: Yup.string(),
    run_frequency: Yup.string(),
    server_name: Yup.string(),
    email_address: Yup.string().email('Invalid email address').nullable(),
    check_frequency: Yup.number().typeError('Must be a number').nullable(),
    check_range: Yup.number().typeError('Must be a number').nullable(),
    track_counts: Yup.boolean(),
    status: Yup.string().oneOf(['A', 'I']),
  });

  const defaultValues = useMemo(
    () => ({
      title: currentUser?.title || '',
      description: currentUser?.description || '',
      run_frequency: currentUser?.run_frequency || 'D',
      server_name: currentUser?.server_name || '',
      email_address: currentUser?.email_address || '',
      check_frequency: currentUser?.check_frequency ?? '',
      check_range: currentUser?.check_range ?? '',
      track_counts: currentUser?.track_counts === 'Y' || currentUser?.track_counts === '1',
      status: currentUser?.status === 'I' ? 'I' : 'A',
    }),
    [currentUser]
  );

  const methods = useForm({
    resolver: yupResolver(NewScriptSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting, dirtyFields },
  } = methods;

  const buildPayload = (data) => ({
    title: data.title,
    description: data.description || null,
    run_frequency: data.run_frequency || null,
    server_name: data.server_name || null,
    email_address: data.email_address || null,
    check_frequency:
      data.check_frequency === '' || data.check_frequency == null ? null : Number(data.check_frequency),
    check_range: data.check_range === '' || data.check_range == null ? null : Number(data.check_range),
    track_counts: data.track_counts ? 'Y' : 'N',
    status: data.status || 'A',
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (currentUser) {
        if (Object.keys(dirtyFields).length === 0) {
          enqueueSnackbar('No changes detected!', { variant: 'warning' });
          return;
        }
        await updateScript({ id: currentUser.id, data: buildPayload(data) }).unwrap();
        enqueueSnackbar('Script updated successfully!');
      } else {
        await addNewScript(buildPayload(data)).unwrap();
        enqueueSnackbar('Script created successfully!');
      }
      reset();
      router.push(paths.dashboard.scripts.root);
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
              <RHFTextField name="description" label="Description" multiline rows={3} />
              <RHFSelect name="run_frequency" label="Run Frequency">
                <MenuItem value="D">Daily</MenuItem>
                <MenuItem value="W">Weekly</MenuItem>
                <MenuItem value="M">Monthly</MenuItem>
                <MenuItem value="H">Hourly</MenuItem>
                <MenuItem value="N">Continuous</MenuItem>
                <MenuItem value="Q">Quarterly</MenuItem>
                <MenuItem value="Y">Yearly</MenuItem>
              </RHFSelect>
              <RHFTextField name="server_name" label="Server Name" />
              <RHFTextField name="email_address" label="Email Address" type="email" />
              <RHFTextField name="check_frequency" label="Check Frequency (minutes)" type="number" />
              <RHFTextField name="check_range" label="Check Range (minutes)" type="number" />
              <RHFCheckbox name="track_counts" label="Track Counts" />
              {currentUser ? (
                <RHFSelect name="status" label="Status">
                  <MenuItem value="A">Active</MenuItem>
                  <MenuItem value="I">Inactive</MenuItem>
                </RHFSelect>
              ) : null}
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!currentUser ? 'Create Script' : 'Save Changes'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

ScriptNewEditForm.propTypes = {
  currentUser: PropTypes.object,
};
