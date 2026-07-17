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
import { useAddNewProductMutation } from "src/store/Reducer/products";

const SUBSCRIPTION_OPTIONS = ["Monthly", "Quarterly", "Yearly", "One-time", "Lifetime"];

export default function AddProductForm({ open, onClose }) {
  const { enqueueSnackbar } = useSnackbar();
  const [addNewProduct, { isLoading }] = useAddNewProductMutation();

  const NewProductSchema = Yup.object().shape({
    title: Yup.string().max(40, "Max 40 characters").required("Title is required"),
    subscription_length: Yup.string().required("Subscription length is required"),
    current_price: Yup.number().typeError("Must be a number").nullable(),
    current_price_ends: Yup.string(),
    next_price: Yup.number().typeError("Must be a number").nullable(),
    next_price_starts: Yup.string().when("next_price", {
      is: (v) => v !== undefined && v !== null && v !== "",
      then: (schema) => schema.required("Next price start date is required"),
      otherwise: (schema) => schema,
    }),
  });

  const defaultValues = {
    title: "",
    subscription_length: "Monthly",
    current_price: "",
    current_price_ends: "",
    next_price: "",
    next_price_starts: "",
  };

  const methods = useForm({
    resolver: yupResolver(NewProductSchema),
    defaultValues,
  });

  const { reset, handleSubmit } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await addNewProduct({
        title: data.title,
        subscription_length: data.subscription_length,
        current_price: data.current_price === "" || data.current_price == null ? null : Number(data.current_price),
        current_price_ends: data.current_price_ends || null,
        next_price: data.next_price === "" || data.next_price == null ? null : Number(data.next_price),
        next_price_starts: data.next_price_starts || null,
      }).unwrap();
      enqueueSnackbar("Product created successfully!", { variant: "success" });
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
        <DialogTitle>Add Product</DialogTitle>

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
            <RHFSelect name="subscription_length" label="Subscription Length">
              {SUBSCRIPTION_OPTIONS.map((opt) => (
                <MenuItem key={opt} value={opt}>
                  {opt}
                </MenuItem>
              ))}
            </RHFSelect>
            <RHFTextField name="current_price" label="Current Price" type="number" />
            <RHFTextField name="current_price_ends" label="Current Price Ends" type="date" InputLabelProps={{ shrink: true }} />
            <RHFTextField name="next_price" label="Next Price" type="number" />
            <RHFTextField name="next_price_starts" label="Next Price Starts" type="date" InputLabelProps={{ shrink: true }} />
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

AddProductForm.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
