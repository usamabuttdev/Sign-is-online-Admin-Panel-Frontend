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
import { useAddNewScriptMutation, useUpdateScriptMutation } from 'src/store/Reducer/scripts';

export default function ScriptNewEditForm({ currentUser }) {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [addNewScript] = useAddNewScriptMutation();
  const [updateScript] = useUpdateScriptMutation();

  const NewScriptSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    run_frequency: Yup.string(),
    status: Yup.string(),
    track_counts: Yup.string(),
    last_started: Yup.string(),
    last_checked: Yup.string(),
  });

  const defaultValues = useMemo(
    () => ({
      title: currentUser?.title || '',
      run_frequency: currentUser?.run_frequency || '',
      status: currentUser?.status || '',
      track_counts: currentUser?.track_counts || '',
      last_started: currentUser?.last_started || '',
      last_checked: currentUser?.last_checked || '',
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
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (currentUser) {
        await updateScript({ id: currentUser.id, data }).unwrap();
      } else {
        await addNewScript(data).unwrap();
      }
      reset();
      enqueueSnackbar(currentUser ? 'Update success!' : 'Create success!');
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
              <RHFSelect name="run_frequency" label="Run Frequency">
                <MenuItem value="H">Hourly</MenuItem>
                <MenuItem value="D">Daily</MenuItem>
                <MenuItem value="W">Weekly</MenuItem>
                <MenuItem value="M">Monthly</MenuItem>
              </RHFSelect>
              <RHFSelect name="status" label="Status">
                <MenuItem value="A">Active</MenuItem>
                <MenuItem value="F">Failed</MenuItem>
              </RHFSelect>
              <RHFSelect name="track_counts" label="Track Counts">
                <MenuItem value="Y">Yes</MenuItem>
                <MenuItem value="N">No</MenuItem>
              </RHFSelect>
              <RHFTextField name="last_started" label="Last Started" />
              <RHFTextField name="last_checked" label="Last Checked" />
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
