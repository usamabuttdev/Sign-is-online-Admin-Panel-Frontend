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
import FormProvider, { RHFTextField } from "src/components/hook-form";
import { useSnackbar } from "src/components/snackbar";
import { useAddNewTrainerMutation } from "src/store/Reducer/trainers";

export default function AddTrainerForm({ open, onClose }) {
  const { enqueueSnackbar } = useSnackbar();

  const [addNewTrainer, { isLoading }] = useAddNewTrainerMutation();

  const NewTrainerSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    specialization: Yup.string(),
    email: Yup.string(),
    phone: Yup.string(),
  });

  const defaultValues = {
    name: "",
    specialization: "",
    email: "",
    phone: "",
  };

  const methods = useForm({
    resolver: yupResolver(NewTrainerSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await addNewTrainer(data).unwrap();
      enqueueSnackbar("Trainer created successfully!", { variant: "success" });
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
        <DialogTitle>Add Trainer</DialogTitle>

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
            <RHFTextField name="name" label="Name" />
            <RHFTextField name="specialization" label="Specialization" />
            <RHFTextField name="email" label="Email" />
            <RHFTextField name="phone" label="Phone" />
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

AddTrainerForm.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
