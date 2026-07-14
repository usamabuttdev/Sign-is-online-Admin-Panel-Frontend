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
import { useAddNewLocationMutation } from "src/store/Reducer/locations";

export default function AddLocationForm({ open, onClose }) {
  const { enqueueSnackbar } = useSnackbar();

  const [addNewLocation, { isLoading }] = useAddNewLocationMutation();

  const NewLocationSchema = Yup.object().shape({
    account_id: Yup.number().required("Account ID is required"),
    title: Yup.string().required("Title is required"),
  });

  const defaultValues = {
    account_id: "",
    title: "",
    city: "",
    state: "",
    product_id: "",
    authenticated: "",
    has_active_subscription: "",
  };

  const methods = useForm({
    resolver: yupResolver(NewLocationSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await addNewLocation({ ...data, account_id: Number(data.account_id), product_id: data.product_id ? Number(data.product_id) : undefined }).unwrap();
      enqueueSnackbar("Location created successfully!", { variant: "success" });
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
        <DialogTitle>Add Location</DialogTitle>

        <DialogContent>
          <Box
            mt={1}
            rowGap={3}
            columnGap={2}
            display="grid"
            gridTemplateColumns={{
              xs: "repeat(1, 1fr)",
              sm: "repeat(2, 1fr)",
            }}
          >
            <RHFTextField name="account_id" label="Account ID" type="number" />
            <RHFTextField name="title" label="Location Title" />
            <RHFTextField name="city" label="City" />
            <RHFTextField name="state" label="State" />
            <RHFTextField name="product_id" label="Product ID" type="number" />

            <RHFSelect name="authenticated" label="Authenticated">
              <MenuItem value="">None</MenuItem>
              <MenuItem value="Yes">Yes</MenuItem>
              <MenuItem value="No">No</MenuItem>
            </RHFSelect>

            <RHFSelect name="has_active_subscription" label="Active Subscription">
              <MenuItem value="">None</MenuItem>
              <MenuItem value="Yes">Yes</MenuItem>
              <MenuItem value="No">No</MenuItem>
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

AddLocationForm.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
