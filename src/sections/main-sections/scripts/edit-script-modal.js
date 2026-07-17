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
import MenuItem from "@mui/material/MenuItem";
import FormProvider, { RHFTextField, RHFCheckbox, RHFSelect } from "src/components/hook-form";
import { useSnackbar } from "src/components/snackbar";
import { useUpdateScriptMutation } from "src/store/Reducer/scripts";

export default function EditScriptForm({ row, open, onClose }) {
  const { enqueueSnackbar } = useSnackbar();

  const [updateScript, { isLoading: isUpdating }] = useUpdateScriptMutation();

  const EditScriptSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    description: Yup.string(),
    run_frequency: Yup.string(),
    server_name: Yup.string(),
    email_address: Yup.string().email("Invalid email").nullable(),
    check_frequency: Yup.number().typeError("Must be a number").nullable(),
    check_range: Yup.number().typeError("Must be a number").nullable(),
    track_counts: Yup.boolean(),
    status: Yup.string().oneOf(["A", "I"]),
  });

  const defaultValues = {
    title: "",
    description: "",
    run_frequency: "D",
    server_name: "",
    email_address: "",
    check_frequency: "",
    check_range: "",
    track_counts: false,
    status: "A",
  };

  const methods = useForm({
    resolver: yupResolver(EditScriptSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { dirtyFields },
  } = methods;

  useEffect(() => {
    if (row) {
      reset({
        title: row?.title || "",
        description: row?.description || "",
        run_frequency: row?.run_frequency || "D",
        server_name: row?.server_name || "",
        email_address: row?.email_address || "",
        check_frequency: row?.check_frequency ?? "",
        check_range: row?.check_range ?? "",
        track_counts: row?.track_counts === "Y" || row?.track_counts === "1",
        status: row?.status === "I" ? "I" : "A",
      });
    }
  }, [row, reset]);

  const onSubmit = handleSubmit(async (data) => {
    if (Object.keys(dirtyFields).length === 0) {
      enqueueSnackbar("No changes detected!", { variant: "warning", autoHideDuration: 2000 });
      return;
    }

    try {
      await updateScript({
        id: row.id,
        data: {
          title: data.title,
          description: data.description || null,
          run_frequency: data.run_frequency || null,
          server_name: data.server_name || null,
          email_address: data.email_address || null,
          check_frequency:
            data.check_frequency === "" || data.check_frequency == null
              ? null
              : Number(data.check_frequency),
          check_range:
            data.check_range === "" || data.check_range == null ? null : Number(data.check_range),
          track_counts: data.track_counts ? "Y" : "N",
          status: data.status,
        },
      }).unwrap();
      enqueueSnackbar("Script updated successfully!", { variant: "success" });
      reset();
      onClose();
    } catch (error) {
      console.error("Unexpected Error:", error);
      enqueueSnackbar(error?.data?.message || "An error occurred", { variant: "error" });
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
            <RHFSelect name="run_frequency" label="Run Frequency">
              <MenuItem value="D">Daily</MenuItem>
              <MenuItem value="W">Weekly</MenuItem>
              <MenuItem value="M">Monthly</MenuItem>
              <MenuItem value="H">Hourly</MenuItem>
              <MenuItem value="N">Continuous</MenuItem>
              <MenuItem value="Q">Quarterly</MenuItem>
              <MenuItem value="Y">Yearly</MenuItem>
            </RHFSelect>
            <RHFTextField name="server_name" label="Server Name" />
            <RHFTextField name="email_address" label="Email Address" />
            <RHFTextField name="check_frequency" label="Check Frequency (minutes)" type="number" />
            <RHFTextField name="check_range" label="Check Range (minutes)" type="number" />
            <RHFCheckbox name="track_counts" label="Track Counts" />
            <RHFSelect name="status" label="Status">
              <MenuItem value="A">Active</MenuItem>
              <MenuItem value="I">Inactive</MenuItem>
            </RHFSelect>
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
