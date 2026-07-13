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
import { useAddNewChargeMutation } from "src/store/Reducer/charges";

export default function AddChargeForm({ open, onClose }) {
  const { enqueueSnackbar } = useSnackbar();
  const [addNewCharge, { isLoading }] = useAddNewChargeMutation();

  const NewChargeSchema = Yup.object().shape({
    account_id: Yup.number().required("Account ID is required"),
    amount: Yup.number().required("Amount is required"),
    method: Yup.string(),
    description: Yup.string(),
  });

  const defaultValues = {
    account_id: "",
    amount: "",
    method: "",
    description: "",
  };

  const methods = useForm({
    resolver: yupResolver(NewChargeSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await addNewCharge({
        ...data,
        account_id: Number(data.account_id),
        amount: Number(data.amount),
      }).unwrap();
      enqueueSnackbar("Charge created successfully!", { variant: "success" });
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
        <DialogTitle>Add Charge</DialogTitle>

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

AddChargeForm.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
