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
import FormProvider, { RHFSelect } from 'src/components/hook-form';
import { Grid } from '@mui/material';

// ----------------------------------------------------------------------

export default function UserQuickEditForm({ currentUser, open, onClose }) {
  const { enqueueSnackbar } = useSnackbar();
  const NewUserSchema = Yup.object().shape({});





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
    } catch (error) {
      console.error(error);
    }
  });

  useEffect(() => {
    setValue('verified', currentUser?.verified || '');
    setValue('status', currentUser?.accountState?.status || '');
  }, [currentUser]);


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
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <RHFSelect name="verified" label="Verified">
                  <MenuItem value={'pending'}>Pending</MenuItem>
                  <MenuItem value={'approved'}>Approved</MenuItem>
                  <MenuItem value={'rejected'}>Rejected</MenuItem>
                </RHFSelect>
              </Grid>
              <Grid item xs={12} md={6}>
                <RHFSelect name="status" label="Status">
                  <MenuItem value={'active'}>Active</MenuItem>
                  <MenuItem value={'inactive'}>Inactive</MenuItem>
                </RHFSelect>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>

        <DialogActions>
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>

          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
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
