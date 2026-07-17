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
import MenuItem from "@mui/material/MenuItem";
import FormProvider, { RHFTextField, RHFSelect } from "src/components/hook-form";
import { useSnackbar } from "src/components/snackbar";
import { useAddNewPlatformMutation } from "src/store/Reducer/platforms";

export default function AddPlatformForm({ open, onClose }) {
  const { enqueueSnackbar } = useSnackbar();

  const [addNewPlatform, { isLoading }] = useAddNewPlatformMutation();

  const NewPlatformSchema = Yup.object().shape({
    title: Yup.string().max(40, "Max 40 characters").required("Title is required"),
    available: Yup.string().oneOf(["Y", "N"]).required("Available is required"),
  });

  const defaultValues = {
    title: "",
    available: "Y",
  };

  const methods = useForm({
    resolver: yupResolver(NewPlatformSchema),
    defaultValues,
  });

  const { reset, handleSubmit } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await addNewPlatform({
        title: data.title,
        available: data.available,
      }).unwrap();
      enqueueSnackbar("Platform created successfully!", { variant: "success" });
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
        <DialogTitle>Add Platform</DialogTitle>

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
            <RHFTextField name="title" label="Platform Title" />
            <RHFSelect name="available" label="Available">
              <MenuItem value="Y">Yes</MenuItem>
              <MenuItem value="N">No</MenuItem>
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
            loading={isLoading}
          >
            Add
          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
}

AddPlatformForm.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
