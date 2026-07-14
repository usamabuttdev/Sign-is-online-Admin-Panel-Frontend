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
import { useUpdateProductMutation } from "src/store/Reducer/products";

export default function EditProductForm({ row, open, onClose }) {
  const { enqueueSnackbar } = useSnackbar();
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();

  const EditProductSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    current_price: Yup.number(),
    current_price_ends: Yup.string(),
    next_price: Yup.number(),
    next_price_starts: Yup.string(),
  });

  const defaultValues = {
    title: "",
    current_price: "",
    current_price_ends: "",
    next_price: "",
    next_price_starts: "",
  };

  const methods = useForm({
    resolver: yupResolver(EditProductSchema),
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
        current_price: row?.current_price || "",
        current_price_ends: row?.current_price_ends || "",
        next_price: row?.next_price || "",
        next_price_starts: row?.next_price_starts || "",
      });
    }
  }, [row, reset]);

  const onSubmit = handleSubmit(async (data) => {
    if (Object.keys(dirtyFields).length === 0) {
      enqueueSnackbar("No changes detected!", { variant: "warning", autoHideDuration: 2000 });
      return;
    }

    try {
      await updateProduct({ id: row.id, data }).unwrap();
      enqueueSnackbar("Product updated successfully!", { variant: "success" });
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
        <DialogTitle>Edit Product</DialogTitle>

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
            <RHFTextField name="title" label="Product Title" />
            <RHFTextField name="current_price" label="Current Price" type="number" />
            <RHFTextField name="current_price_ends" label="Current Price Ends" />
            <RHFTextField name="next_price" label="Next Price" type="number" />
            <RHFTextField name="next_price_starts" label="Next Price Starts" />
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

EditProductForm.propTypes = {
  row: PropTypes.object,
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
