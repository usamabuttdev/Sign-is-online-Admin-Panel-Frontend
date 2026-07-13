import { yupResolver } from "@hookform/resolvers/yup";
import PropTypes from "prop-types";
import { useEffect } from "react";
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
import { useUpdateScriptMutation } from "src/store/Reducer/scripts";

export default function EditScriptForm({ row, open, onClose }) {
  const { enqueueSnackbar } = useSnackbar();

  const [updateScript, { isLoading: isUpdating }] = useUpdateScriptMutation();

  const EditScriptSchema = Yup.object().shape({
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
    resolver: yupResolver(EditScriptSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting, dirtyFields },
  } = methods;

  useEffect(() => {
    if (row) {
      reset({
        title: row?.title || "",
        description: row?.description || "",
        run_frequency: row?.run_frequency || "",
        server_name: row?.server_name || "",
        email_address: row?.email_address || "",
        check_frequency: row?.check_frequency || "",
        check_range: row?.check_range || "",
        track_counts: row?.track_counts === "Y" || false,
      });
    }
  }, [row, reset]);

  const onSubmit = handleSubmit(async (data) => {
    if (Object.keys(dirtyFields).length === 0) {
      enqueueSnackbar("No changes detected!", { variant: "warning", autoHideDuration: 2000 });
      return;
    }

    try {
      await updateScript({ id: row.id, data }).unwrap();
      enqueueSnackbar("Script updated successfully!", { variant: "success" });
      reset();
      onClose();
    } catch (error) {
      console.error("Unexpected Error:", error);
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
        <DialogTitle>Edit Script</DialogTitle>

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
            loading={isUpdating}
          >
            Update
          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
}

EditScriptForm.propTypes = {
  row: PropTypes.object,
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
