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
import FormProvider, { RHFTextField } from "src/components/hook-form";
import { useSnackbar } from "src/components/snackbar";
import { useUpdateTrainerMutation } from "src/store/Reducer/trainers";

export default function EditTrainerForm({ row, open, onClose }) {
  const { enqueueSnackbar } = useSnackbar();
  const [updateTrainer, { isLoading: isUpdating }] = useUpdateTrainerMutation();

  const EditTrainerSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
  });

  const defaultValues = {
    name: "",
    specialization: "",
    email: "",
    phone: "",
  };

  const methods = useForm({
    resolver: yupResolver(EditTrainerSchema),
    defaultValues,
  });

  const { reset, handleSubmit, formState: { dirtyFields } } = methods;

  useEffect(() => {
    if (row) {
      reset({
        name: row?.name || "",
        specialization: row?.specialization || "",
        email: row?.email || "",
        phone: row?.phone || "",
      });
    }
  }, [row, reset]);

  const onSubmit = handleSubmit(async (data) => {
    if (Object.keys(dirtyFields).length === 0) {
      enqueueSnackbar("No changes detected!", { variant: "warning", autoHideDuration: 2000 });
      return;
    }
    try {
      await updateTrainer({ id: row.id, data }).unwrap();
      enqueueSnackbar("Trainer updated successfully!", { variant: "success" });
      reset();
      onClose();
    } catch (error) {
      console.error("Unexpected Error:", error);
    }
  });

  return (
    <Dialog fullWidth maxWidth={false} open={open} onClose={onClose}
      PaperProps={{ sx: { maxWidth: 550 } }}>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <DialogTitle>Edit Trainer</DialogTitle>
        <DialogContent>
          <Box mt={1} rowGap={3} columnGap={2} display="grid"
            gridTemplateColumns={{ xs: "repeat(1, 1fr)", sm: "repeat(1, 1fr)" }}>
            <RHFTextField name="name" label="Name" />
            <RHFTextField name="specialization" label="Specialization" />
            <RHFTextField name="email" label="Email" />
            <RHFTextField name="phone" label="Phone" />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={onClose}>Close</Button>
          <LoadingButton type="submit" sx={{ px: 3 }} color="primary"
            variant="contained" loading={isUpdating}>Update</LoadingButton>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
}

EditTrainerForm.propTypes = { row: PropTypes.object, onClose: PropTypes.func, open: PropTypes.bool };
