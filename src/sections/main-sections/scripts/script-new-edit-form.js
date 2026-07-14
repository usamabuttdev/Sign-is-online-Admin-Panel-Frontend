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
    description: Yup.string(),
    server_name: Yup.string(),
    email_address: Yup.string().email('Invalid email address'),
    check_frequency: Yup.string(),
    check_range: Yup.string(),
    status: Yup.string(),
  });

  const defaultValues = useMemo(
    () => ({
      title: currentUser?.title || '',
      description: currentUser?.description || '',
      server_name: currentUser?.server_name || '',
      email_address: currentUser?.email_address || '',
      check_frequency: currentUser?.check_frequency || '',
      check_range: currentUser?.check_range || '',
      status: currentUser?.status || 'A',
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

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (currentUser) {
        if (Object.keys(dirtyFields).length === 0) {
          enqueueSnackbar('No changes detected!', { variant: 'warning' });
          return;
        }
        await updateScript({ id: currentUser.id, data }).unwrap();
        enqueueSnackbar('Script updated successfully!');
      } else {
        const submitData = {
          title: data.title,
          description: data.description || null,
          server_name: data.server_name || null,
          email_address: data.email_address || null,
          check_frequency: data.check_frequency || null,
          check_range: data.check_range || null,
          status: data.status || 'A',
        };
        await addNewScript(submitData).unwrap();
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
              <RHFTextField name="server_name" label="Server Name" />
              <RHFTextField name="email_address" label="Email Address" type="email" />
              <RHFSelect name="check_frequency" label="Check Frequency">
                <MenuItem value="">None</MenuItem>
                <MenuItem value="H">Hourly</MenuItem>
                <MenuItem value="D">Daily</MenuItem>
                <MenuItem value="W">Weekly</MenuItem>
                <MenuItem value="M">Monthly</MenuItem>
              </RHFSelect>
              <RHFSelect name="check_range" label="Check Range">
                <MenuItem value="">None</MenuItem>
                <MenuItem value="1H">1 Hour</MenuItem>
                <MenuItem value="24H">24 Hours</MenuItem>
                <MenuItem value="7D">7 Days</MenuItem>
                <MenuItem value="30D">30 Days</MenuItem>
              </RHFSelect>
              <RHFSelect name="status" label="Status">
                <MenuItem value="A">Active</MenuItem>
                <MenuItem value="F">Failed</MenuItem>
              </RHFSelect>
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
