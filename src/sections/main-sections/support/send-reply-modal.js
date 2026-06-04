import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
// components
import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import {  MenuItem, TextField, Typography } from '@mui/material';
import { useReplyContactUsQueryMutation } from 'src/store/Reducer/contact';
import {  useState } from 'react';
import { Box } from '@mui/system';
import { useUpdateSupportQueryStatusMutation } from 'src/store/Reducer/adminSupport';

// ----------------------------------------------------------------------

export default function SendReplyForm({ row, statusOptions, open, onClose }) {
  const { enqueueSnackbar } = useSnackbar();

  const [currentStatus, setCurrentStatus] = useState(row.status);

  const [sendReply, { isLoading }] = useReplyContactUsQueryMutation();
  const [updateStatus, { isLoading: isUpdating }] = useUpdateSupportQueryStatusMutation();

  const MessageSchema = Yup.object().shape({
    body: Yup.string().required('Message is required'),
  });

  const defaultValues = {
    body: '',
  }

  const methods = useForm({
    resolver: yupResolver(MessageSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = methods;


  // HANDLE SUBMIT
  const onSubmit = handleSubmit(async (data) => {
    const { body } = data;

    const payload = {
      title: "Befit App",
      emails: [row?.email],
      subject: "Befit Reply",
      body: body,
      config: {
        fromEmail: "support@befit.com",
        isHtml: false
      }
    };

    try {
      const response = await sendReply(payload);

      if (response.error) {
        const errorMessage = response.error?.data?.message || 'An unexpected error occurred.';
        enqueueSnackbar(errorMessage, { variant: 'error', autoHideDuration: 2000 });
        return;
      }

      // Handle success
      if (response.data?.message) {
        enqueueSnackbar(response.data.message, { variant: 'success', autoHideDuration: 2000 });
      } else {
        enqueueSnackbar('Reply sent successfully!', { variant: 'success', autoHideDuration: 2000 });
      }

      // STATUS UPDATE
      const statusPayload = { status: currentStatus };

      const statusResponse = await updateStatus({ _id: row?._id, data: statusPayload });
      // if (statusResponse?.error) {
      //   const errorMessage = statusResponse.error?.data?.message || "Failed to update status.";
      //   enqueueSnackbar(errorMessage, { variant: "error", autoHideDuration: 2000 });
      //   return;
      // }

      // enqueueSnackbar(statusResponse.data?.message || 'Status updated successfully!',
      //   { variant: 'success', autoHideDuration: 2000 }
      // );

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
      maxWidth="sm"
      open={open}
      onClose={onClose}
    >
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: "space-between", alignItems: "center" }}>
            <Typography variant="h5" noWrap>Reply</Typography>

            <TextField
              fullWidth
              select
              size="small"
              value={currentStatus}
              onChange={(event) => setCurrentStatus(event.target.value)}
              sx={{ maxWidth: 130, textTransform: "capitalize" }}
            >
              {statusOptions?.map((option) => (
                <MenuItem
                  sx={{ textTransform: "capitalize" }}
                  key={option}
                  value={option}
                >
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        </DialogTitle>


        <DialogContent>
          <RHFTextField
            fullWidth
            name="body"
            multiline
            minRows={4}
            placeholder="Message"
            variant="outlined"
          />
        </DialogContent>

        <DialogActions>
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>

          <LoadingButton type="submit" sx={{ px: 3 }} color="primary" variant="contained" loading={isLoading || isUpdating}>
            Send
          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </Dialog >
  );
}

SendReplyForm.propTypes = {
  currentUser: PropTypes.object,
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
