import { yupResolver } from '@hookform/resolvers/yup';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

// components
import FormProvider, { RHFSelect, RHFTextField } from 'src/components/hook-form';
import { useSnackbar } from 'src/components/snackbar';
import { useUpdateFaqMutation } from 'src/store/Reducer/faqs';
import { MenuItem } from '@mui/material';

// ----------------------------------------------------------------------

export default function EditFaqForm({ row, open, onClose }) {
  const { enqueueSnackbar } = useSnackbar();

  const [UpdateFaq, { isLoading: isUpdating }] = useUpdateFaqMutation();

  const NewFeatureSchema = Yup.object().shape({
    question: Yup.string().required('Question is required'),
    answer: Yup.string().required('Answer is required'),
  });

  const defaultValues = {
    question: '',
    answer: '',
    public: true,
  }

  const methods = useForm({
    resolver: yupResolver(NewFeatureSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    if (row) {
      reset({
        question: row?.question || '',
        answer: row?.answer || '',
        public: row?.isactive !== undefined ? row.isactive : true,
      });
    }
  }, [row, reset]);

  // HANDLE SUBMIT
  const onSubmit = handleSubmit(async (data) => {
    try {
      const payload = {
        question: data.question,
        answer: data.answer,
        isActive: data.public !== undefined ? data.public : true,
      }
      await UpdateFaq({ _id: row.id, data: payload }).unwrap();
      enqueueSnackbar('FAQ updated successfully', { variant: 'success' });
      reset();
      onClose();
    } catch (error) {
      const errorMessage = error?.response?.data?.message || error.message || 'An error occurred.';
      enqueueSnackbar(errorMessage, { variant: 'error', autoHideDuration: 2000 });
      console.error('Unexpected Error:', error);
    }
  });

  return (
    <Dialog
      fullWidth
      maxWidth={false}
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { maxWidth: 550 },
      }}
    >
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <DialogTitle>Edit Common Question</DialogTitle>

        <DialogContent>
          <Box
            mt={1}
            rowGap={3}
            columnGap={2}
            display="grid"
            gridTemplateColumns={{
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(1, 1fr)',
            }}
          >
            <RHFTextField name="question" label="Enter question" />

            <RHFTextField
              name="answer"
              label="Enter message"
              rows={3}
              multiline
            />

          <RHFSelect name="public" label="Public">
              <MenuItem value={true}>Yes (Public)</MenuItem>
              <MenuItem value={false}>No (Private)</MenuItem>
           </RHFSelect>

          </Box>
        </DialogContent>

        <DialogActions>
          <Button variant="outlined" onClick={onClose}>
            Close
          </Button>

          <LoadingButton type="submit" sx={{ px: 3 }} color="primary" variant="contained" loading={isUpdating}>
            Update
          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
}

EditFaqForm.propTypes = {
  row: PropTypes.object,
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
