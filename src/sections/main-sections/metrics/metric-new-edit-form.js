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
    description: Yup.string(),
    frequency: Yup.string().required('Run frequency is required'),
    query: Yup.string(),
    goal: Yup.number().typeError('Goal must be a number').required('Goal is required'),
    units: Yup.string().max(10, 'Units max 10 characters'),
    direction: Yup.string().oneOf(['H', 'L']).required('Direction is required'),
  });

  const defaultValues = useMemo(
    () => ({
      title: currentUser?.title || '',
      description: currentUser?.description || '',
      frequency: currentUser?.frequency || 'W',
      query: currentUser?.query || '',
      goal: currentUser?.goal ?? '',
      units: currentUser?.units ?? currentUser?.met_units ?? '',
      direction:
        currentUser?.direction === 'L' || currentUser?.direction === 'down'
          ? 'L'
          : 'H',
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
    formState: { isSubmitting, dirtyFields },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (currentUser) {
        if (Object.keys(dirtyFields).length === 0) {
          enqueueSnackbar('No changes detected!', { variant: 'warning' });
          return;
        }
        await updateMetric({
          id: currentUser.id,
          data: {
            title: data.title,
            description: data.description || null,
            frequency: data.frequency,
            query: data.query || null,
            goal: Number(data.goal),
            units: data.units || null,
            direction: data.direction,
          },
        }).unwrap();
        enqueueSnackbar('Metric updated successfully!');
      } else {
        await addNewMetric({
          title: data.title,
          description: data.description || null,
          frequency: data.frequency,
          query: data.query || null,
          goal: Number(data.goal),
          units: data.units || null,
          direction: data.direction,
        }).unwrap();
        enqueueSnackbar('Metric created successfully!');
      }
      reset();
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
                <MenuItem value="Q">Quarterly</MenuItem>
                <MenuItem value="Y">Yearly</MenuItem>
              </RHFSelect>
              <RHFTextField name="description" label="Description" />
              <RHFTextField name="query" label="Query" multiline rows={3} />
              <RHFTextField name="goal" label="Goal" type="number" />
              <RHFTextField name="units" label="Units" />
              <RHFSelect name="direction" label="Direction">
                <MenuItem value="H">Up</MenuItem>
                <MenuItem value="L">Down</MenuItem>
              </RHFSelect>
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
