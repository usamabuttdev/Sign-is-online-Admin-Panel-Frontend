import { yupResolver } from "@hookform/resolvers/yup";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormProvider, { RHFTextField, RHFCheckbox } from "src/components/hook-form";
import { useSnackbar } from "src/components/snackbar";
import { useAddNewScriptMutation } from "src/store/Reducer/scripts";

export default function AddScriptForm({ open, onClose }) {
  const { enqueueSnackbar } = useSnackbar();

  const [addNewScript, { isLoading }] = useAddNewScriptMutation();

  const NewScriptSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
  });

  const defaultValues = {
    title: "",
    description: "",
    run_frequency: "",
    server_name: "",
    email_address: "",
    check_frequency: "",
    check_range: "",
    track_counts: false,
  };

  const methods = useForm({
    resolver: yupResolver(NewScriptSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await addNewScript(data).unwrap();
      enqueueSnackbar("Script created successfully!", { variant: "success" });
      reset();
      onClose();
    } catch (error) {
      console.error("Unexpected Error:", error);
      enqueueSnackbar(error?.data?.message || 'An error occurred', { variant: 'error' });
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
        <DialogTitle>Add Script</DialogTitle>

        <DialogContent>
          <Box
            mt={1}
            rowGap={3}
            columnGap={2}
            display="grid"
            gridTemplateColumns={{
              xs: "repeat(1, 1fr)",
              sm: "repeat(1, 1fr)",
            }}
          >
            <RHFTextField name="title" label="Script Title" />
            <RHFTextField name="description" label="Description" />
            <RHFTextField name="run_frequency" label="Run Frequency" />
            <RHFTextField name="server_name" label="Server Name" />
            <RHFTextField name="email_address" label="Email Address" />
            <RHFTextField name="check_frequency" label="Check Frequency" />
            <RHFTextField name="check_range" label="Check Range" />
            <RHFCheckbox name="track_counts" label="Track Counts" />
          </Box>
        </DialogContent>

        <DialogActions>
          <Button variant="outlined" onClick={onClose}>
            Close
          </Button>

          <LoadingButton
            type="submit"
            sx={{ px: 3 }}
            color="primary"
            variant="contained"
            loading={isLoading}
          >
            Add
          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
}

AddScriptForm.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
