import { yupResolver } from '@hookform/resolvers/yup';
import PropTypes from 'prop-types';
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
import { useAddNewFaqMutation } from 'src/store/Reducer/faqs';
import { MenuItem } from '@mui/material';

// ----------------------------------------------------------------------

export default function AddFaqForm({ open, onClose }) {
  const { enqueueSnackbar } = useSnackbar();

  const [addFaq, { isLoading }] = useAddNewFaqMutation();

  const NewCategorySchema = Yup.object().shape({
    question: Yup.string().required('Question is required'),
    answer: Yup.string().required('Answer is required'),
  });

  const defaultValues = {
    question: '',
    answer: '',
    public: true,
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
      const payload = {
        question: data.question,
        answer: data.answer,
        isActive: data.public !== undefined ? data.public : true,
      }
      await addFaq(payload).unwrap();
      enqueueSnackbar('FAQ added successfully', { variant: 'success' });
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
        <DialogTitle>Add Common Question</DialogTitle>

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
