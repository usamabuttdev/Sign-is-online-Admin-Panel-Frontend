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
import { useAddNewDeviceMutation } from "src/store/Reducer/devices";

export default function AddDeviceForm({ open, onClose }) {
  const { enqueueSnackbar } = useSnackbar();

  const [addNewDevice, { isLoading }] = useAddNewDeviceMutation();

  const NewDeviceSchema = Yup.object().shape({
    device_id: Yup.string().required("Device ID is required"),
  });

  const defaultValues = {
    device_id: "",
    location_id: "",
    hardware_type: "",
    firmware_version: "",
    status: "active",
  };

  const methods = useForm({
    resolver: yupResolver(NewDeviceSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await addNewDevice(data).unwrap();
      enqueueSnackbar("Device created successfully!", { variant: "success" });
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
        <DialogTitle>Add Device</DialogTitle>

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
            <RHFTextField name="device_id" label="Device ID" />
            <RHFTextField name="location_id" label="Location ID" />
            <RHFTextField name="hardware_type" label="Hardware Type" />
            <RHFTextField name="firmware_version" label="Firmware Version" />
            <RHFSelect name="status" label="Status">
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="inactive">Inactive</MenuItem>
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

AddDeviceForm.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};