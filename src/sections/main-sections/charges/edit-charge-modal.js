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
import FormProvider, { RHFTextField, RHFSelect } from "src/components/hook-form";
import { useSnackbar } from "src/components/snackbar";
import { useUpdateChargeMutation } from "src/store/Reducer/charges";

export default function EditChargeForm({ row, open, onClose }) {
  const { enqueueSnackbar } = useSnackbar();
  const [updateCharge, { isLoading: isUpdating }] = useUpdateChargeMutation();

  const EditChargeSchema = Yup.object().shape({
    account_id: Yup.number(),
    amount: Yup.number().required("Amount is required"),
    method: Yup.string(),
    description: Yup.string(),
    status: Yup.string(),
  });

  const defaultValues = {
    account_id: "",
    amount: "",
    method: "",
    description: "",
    status: "",
  };

  const methods = useForm({
    resolver: yupResolver(EditChargeSchema),
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
        account_id: row?.account_id || "",
        amount: row?.amount || "",
        method: row?.method || "",
        description: row?.description || "",
        status: row?.status || "",
      });
    }
  }, [row, reset]);

  const onSubmit = handleSubmit(async (data) => {
    if (Object.keys(dirtyFields).length === 0) {
      enqueueSnackbar("No changes detected!", { variant: "warning", autoHideDuration: 2000 });
      return;
    }

    try {
      await updateCharge({
        id: row.id,
        data: { ...data, amount: Number(data.amount), account_id: Number(data.account_id) },
      }).unwrap();
      enqueueSnackbar("Charge updated successfully!", { variant: "success" });
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
        <DialogTitle>Edit Charge</DialogTitle>

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
            <RHFTextField name="account_id" label="Account ID" type="number" />
            <RHFTextField name="amount" label="Amount" type="number" />
            <RHFTextField name="method" label="Method" />
            <RHFTextField name="description" label="Description" />
            <RHFSelect name="status" label="Status">
              <MenuItem value="Attempted">Attempted</MenuItem>
              <MenuItem value="Successful">Successful</MenuItem>
              <MenuItem value="Refunded">Refunded</MenuItem>
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

EditChargeForm.propTypes = {
  row: PropTypes.object,
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
