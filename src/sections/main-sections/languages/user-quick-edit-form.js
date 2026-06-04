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
import { fData } from 'src/utils/format-number';
import { useUpdateLanguageMutation } from 'src/store/Reducer/languages';
import { useUploadNewFileMutation } from 'src/store/Reducer/file';

// ----------------------------------------------------------------------

export default function UserQuickEditForm({ currentUser, open, onClose }) {
  const { enqueueSnackbar } = useSnackbar();
  const NewUserSchema = Yup.object().shape({
    isActive: Yup.boolean().required('Status is required'),
    title: Yup.string().required('Title is required'),
    code: Yup.string().required('Code is required'),
    transliteration: Yup.string().required('Transliteration is required'),
    avatarUrl: Yup.mixed().required('Avatar is required')
  });

  const [updateLanguage ,{isLoading}]=useUpdateLanguageMutation();
  const [uploadFile , {isLoading: isUploading}] = useUploadNewFileMutation(); 

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
      if(typeof data?.avatarUrl === 'object'){
        const response = await uploadFile(data?.avatarUrl);
        if (!response?.error) {
          data.avatarUrl = response?.data?.fileUrl;
        } 
      }
      const payload = {
          title: data?.title,
          code: data?.code,
          transliteration: data?.transliteration,
          isActive: data?.isActive,
          flag:  data?.avatarUrl || '',
      };
      const response = await updateLanguage({ id: currentUser._id, updatedLanguage:payload });
     if(!response.error){
      enqueueSnackbar(response?.data?.message || 'updated successfully', { variant: 'success' });
     }
    onClose()
    } catch (error) {
      console.error(error);
    }
  });

  useEffect(() => {
    setValue('isActive', currentUser?.isActive || false);
    setValue('title', currentUser?.title);
    setValue('avatarUrl', currentUser?.flag || null); 
    setValue('code', currentUser?.code);
    setValue('transliteration', currentUser?.transliteration);  
  }, [currentUser]);


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
        <DialogTitle>Quick Update</DialogTitle>

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
                <RHFTextField name="code" label="Code" />
            </Grid>
            <Grid item xs={12} md={6}>
                <RHFTextField name="transliteration" label="Transliteration" />
            </Grid>
              <Grid item xs={12} md={6}>
                <RHFSelect name="isActive" label="Status">
                  <MenuItem value={true}>Active</MenuItem>
                  <MenuItem value={false}>Inactive</MenuItem>
                </RHFSelect>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>

        <DialogActions>
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>

          <LoadingButton type="submit" variant="contained" loading={isSubmitting || isLoading || isUploading}>
            Update
          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
}

UserQuickEditForm.propTypes = {
  currentRow: PropTypes.object,
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
