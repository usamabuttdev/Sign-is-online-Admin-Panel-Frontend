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
import { useUpdateSaleMutation } from "src/store/Reducer/sales";

export default function EditSaleForm({ row, open, onClose }) {
  const { enqueueSnackbar } = useSnackbar();

  const [updateSale, { isLoading: isUpdating }] = useUpdateSaleMutation();

  const EditSaleSchema = Yup.object().shape({
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
    resolver: yupResolver(EditSaleSchema),
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
        product_id: row?.product_id || "",
        quantity: row?.quantity || 1,
        unit_price: row?.unit_price || "",
        customer_id: row?.customer_id || "",
      });
    }
  }, [row, reset]);

  const onSubmit = handleSubmit(async (data) => {
    if (Object.keys(dirtyFields).length === 0) {
      enqueueSnackbar("No changes detected!", { variant: "warning", autoHideDuration: 2000 });
      return;
    }

    try {
      await updateSale({
        id: row.id,
        data: {
          product_id: Number(data.product_id),
          quantity: Number(data.quantity),
          unit_price: Number(data.unit_price),
          customer_id: data.customer_id ? Number(data.customer_id) : undefined,
        },
      }).unwrap();
      enqueueSnackbar("Sale updated successfully!", { variant: "success" });
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
        <DialogTitle>Edit Sale</DialogTitle>

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
            loading={isUpdating}
          >
            Update
          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
}

EditSaleForm.propTypes = {
  row: PropTypes.object,
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
