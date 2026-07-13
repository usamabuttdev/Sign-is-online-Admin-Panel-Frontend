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
import { useAddNewSaleMutation } from "src/store/Reducer/sales";

export default function AddSaleForm({ open, onClose }) {
  const { enqueueSnackbar } = useSnackbar();

  const [addNewSale, { isLoading }] = useAddNewSaleMutation();

  const NewSaleSchema = Yup.object().shape({
    product_id: Yup.number().required("Product ID is required"),
    unit_price: Yup.number().required("Unit price is required"),
  });

  const defaultValues = {
    product_id: "",
    quantity: 1,
    unit_price: "",
    customer_id: "",
  };

  const methods = useForm({
    resolver: yupResolver(NewSaleSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await addNewSale({
        product_id: Number(data.product_id),
        quantity: Number(data.quantity),
        unit_price: Number(data.unit_price),
        customer_id: data.customer_id ? Number(data.customer_id) : undefined,
      }).unwrap();
      enqueueSnackbar("Sale created successfully!", { variant: "success" });
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
        <DialogTitle>Add Sale</DialogTitle>

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
            <RHFTextField name="product_id" label="Product ID" type="number" />
            <RHFTextField name="quantity" label="Quantity" type="number" />
            <RHFTextField name="unit_price" label="Unit Price" type="number" />
            <RHFTextField name="customer_id" label="Customer ID" type="number" />
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

AddSaleForm.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
