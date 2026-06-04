import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import MenuItem from '@mui/material/MenuItem';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
// _mock
// components
import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFSelect, RHFTextField, RHFUploadAvatar } from 'src/components/hook-form';
import { Grid, Typography } from '@mui/material';
import { useUploadNewFileMutation } from 'src/store/Reducer/file';
import { useAddTrainingModeMutation } from 'src/store/Reducer/training-modes';
import { fData } from 'src/utils/format-number';
import { ta } from 'date-fns/locale';

// ----------------------------------------------------------------------

export default function UserNewEditForm({ open, onClose }) {
  const { enqueueSnackbar } = useSnackbar();
  const [addNewTrainingMode, { isLoading }] = useAddTrainingModeMutation();
  const [uploadFile, { isLoading: isUploading }] = useUploadNewFileMutation();
  const NewUserSchema = Yup.object().shape({
    isActive: Yup.boolean().required('Status is required'),
    title: Yup.string().required('Title is required'),
    avatarUrl: Yup.mixed().required('Avatar is required'),
  });

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
  });

  const {
    reset,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await uploadFile(data?.avatarUrl);
      if (!response?.error) {
        const newTraining = {
          title: data?.title,
          isActive: data?.isActive,
          image: response?.data?.fileUrl,
          tag: data?.tag,
          description: data?.description,
        };
        const response_training = await addNewTrainingMode(newTraining);
        if (!response_training?.error) {
          enqueueSnackbar(response_training?.data?.message || 'created successfully', {
            variant: 'success',
          });
          onClose();
          reset();
        }
      }
    } catch (error) {
      console.error(error);
    }
  });

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
    setValue('isActive', true);
    setValue('title', '');
    setValue('avatarUrl', null);
    setValue('tag', '');
    setValue('description', '');
  }, []);

  return (
    <Dialog
      fullWidth
      maxWidth={false}
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { maxWidth: 720 },
      }}
    >
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <DialogTitle>Add Trainig Modes</DialogTitle>

        <DialogContent>
          <Box
            rowGap={3}
            columnGap={2}
            display="grid"
            sx={{ marginTop: '.5rem' }}
            gridTemplateColumns={{
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(1, 1fr)',
            }}
          >
            <Box>
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
            </Box>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <RHFTextField name="title" label="Title" />
              </Grid>
              <Grid item xs={12} md={6}>
                <RHFSelect name="tag" label="Tag">
                  <MenuItem value={'default'}>Default</MenuItem>
                  <MenuItem value={'1-on-1'}>1 on 1</MenuItem>
                  <MenuItem value={'online'}>Online</MenuItem>
                </RHFSelect>
              </Grid>

              <Grid item xs={12} md={6}>
                <RHFSelect name="isActive" label="Status">
                  <MenuItem value={true}>Active</MenuItem>
                  <MenuItem value={false}>Inactive</MenuItem>
                </RHFSelect>
              </Grid>

              <Grid item xs={12} md={6}>
                <RHFTextField name="description" label="Description" />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>

        <DialogActions>
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>

          <LoadingButton
            type="submit"
            variant="contained"
            loading={isSubmitting || isLoading || isUploading}
          >
            Save
          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
}

UserNewEditForm.propTypes = {
  currentRow: PropTypes.object,
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
