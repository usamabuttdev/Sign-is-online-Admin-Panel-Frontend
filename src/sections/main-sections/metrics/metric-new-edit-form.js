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
import { useAddNewMetricMutation, useUpdateMetricMutation } from 'src/store/Reducer/metrics';

export default function MetricNewEditForm({ currentUser }) {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [addNewMetric] = useAddNewMetricMutation();
  const [updateMetric] = useUpdateMetricMutation();

  const NewMetricSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    frequency: Yup.string(),
    query: Yup.string(),
    current_value: Yup.number(),
    goal: Yup.number(),
    met_units: Yup.string(),
  });

  const defaultValues = useMemo(
    () => ({
      title: currentUser?.title || '',
      frequency: currentUser?.frequency || '',
      query: currentUser?.query || '',
      current_value: currentUser?.current_value || '',
      goal: currentUser?.goal || '',
      met_units: currentUser?.met_units || '',
    }),
    [currentUser]
  );

  const methods = useForm({
    resolver: yupResolver(NewMetricSchema),
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
        await updateMetric({ id: currentUser.id, data }).unwrap();
      } else {
        await addNewMetric(data).unwrap();
      }
      reset();
      enqueueSnackbar(currentUser ? 'Update success!' : 'Create success!');
      router.push(paths.dashboard.metrics.root);
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
              <RHFSelect name="frequency" label="Frequency">
                <MenuItem value="D">Daily</MenuItem>
                <MenuItem value="W">Weekly</MenuItem>
                <MenuItem value="M">Monthly</MenuItem>
                <MenuItem value="Y">Yearly</MenuItem>
              </RHFSelect>
              <RHFTextField name="query" label="Query" />
              <RHFTextField name="current_value" label="Current Value" type="number" />
              <RHFTextField name="goal" label="Goal" type="number" />
              <RHFTextField name="met_units" label="Met Units" />
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!currentUser ? 'Create Metric' : 'Save Changes'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

MetricNewEditForm.propTypes = {
  currentUser: PropTypes.object,
};
