import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
// components
import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import { useLocales } from 'src/locales';
import { useAddNewFaqMutation } from 'src/store/Reducer/faqs';

// ----------------------------------------------------------------------

export default function AddFaqForm({ currentUser, open, onClose }) {
  const { enqueueSnackbar } = useSnackbar();

  const [addFaq, { isLoading }] = useAddNewFaqMutation();

  const NewCategorySchema = Yup.object().shape({
    question: Yup.string().required('Question is required'),
    answer: Yup.string().required('Answer is required'),
  });

  const defaultValues = {
    question: '',
    answer: '',
  }

  const methods = useForm({
    resolver: yupResolver(NewCategorySchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;


  // HANDLE SUBMIT
  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await addFaq(data);
      // console.log('response = ', response);

      // Handle errors from the backend
      if (response.error) {
        const errorMessage = response.error?.data?.message || 'An unexpected error occurred.';
        enqueueSnackbar(errorMessage, { variant: 'error', autoHideDuration: 2000 });
        return;
      }

      // Handle success
      if (response.data?.message) {
        enqueueSnackbar(response.data.message, { variant: 'success', autoHideDuration: 2000 });
      } else {
        enqueueSnackbar('Faq added successfully!', { variant: 'success', autoHideDuration: 2000 });
      }

      // Reset the form
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
        <DialogTitle>Add Faq</DialogTitle>

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

          </Box>
        </DialogContent>

        <DialogActions>
          <Button variant="outlined" onClick={onClose}>
            Close
          </Button>

          <LoadingButton type="submit" sx={{ px: 3 }} color="primary" variant="contained" loading={isLoading}>
            Add
          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </Dialog >
  );
}

AddFaqForm.propTypes = {
  currentUser: PropTypes.object,
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
