import { yupResolver } from "@hookform/resolvers/yup";
import PropTypes from "prop-types";
import { useEffect, useMemo } from "react";
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
import { useGetAllAccountsQuery } from "src/store/Reducer/accounts";
import { useGetAllLocationsQuery } from "src/store/Reducer/locations";
import { useGetAllProductQuery } from "src/store/Reducer/products";

export default function EditChargeForm({ row, open, onClose }) {
  const { enqueueSnackbar } = useSnackbar();
  const [updateCharge, { isLoading: isUpdating }] = useUpdateChargeMutation();

  const { data: accountsData } = useGetAllAccountsQuery({ pageno: 1, search: "" });
  const { data: locationsData } = useGetAllLocationsQuery({ pageno: 1, search: "" });
  const { data: productsData } = useGetAllProductQuery({ pageno: 1, search: "" });

  const accounts = accountsData?.data || [];
  const locations = locationsData?.data || [];
  const products = productsData?.data || [];

  const EditChargeSchema = Yup.object().shape({
    account_id: Yup.number().typeError("Account is required").required("Account is required"),
    location_id: Yup.number().typeError("Location is required").required("Location is required"),
    product_id: Yup.number().typeError("Product is required").required("Product is required"),
    product_price_id: Yup.number()
      .typeError("Product price ID is required")
      .required("Product price ID is required"),
    amount: Yup.number().typeError("Amount is required").required("Amount is required"),
    method: Yup.string(),
    status: Yup.string().oneOf(["A", "I"]),
  });

  const defaultValues = {
    account_id: "",
    location_id: "",
    product_id: "",
    product_price_id: "",
    amount: "",
    method: "credit_card",
    status: "A",
  };

  const methods = useForm({
    resolver: yupResolver(EditChargeSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    watch,
    formState: { dirtyFields },
  } = methods;

  const selectedAccountId = watch("account_id");

  const filteredLocations = useMemo(() => {
    if (!selectedAccountId) return locations;
    return locations.filter((loc) => String(loc.account_id) === String(selectedAccountId));
  }, [locations, selectedAccountId]);

  useEffect(() => {
    if (row) {
      reset({
        account_id: row?.account_id ?? "",
        location_id: row?.location_id ?? "",
        product_id: row?.product_id ?? "",
        product_price_id: row?.product_price_id ?? "",
        amount: row?.amount ?? "",
        method: row?.method || "credit_card",
        status: row?.status_code === "I" ? "I" : "A",
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
        data: {
          account_id: Number(data.account_id),
          location_id: Number(data.location_id),
          product_id: Number(data.product_id),
          product_price_id: Number(data.product_price_id),
          amount: Number(data.amount),
          method: data.method || null,
          status: data.status,
        },
      }).unwrap();
      enqueueSnackbar("Charge updated successfully!", { variant: "success" });
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
            <RHFSelect name="account_id" label="Account">
              {accounts.map((acc) => (
                <MenuItem key={acc.id} value={acc.id}>
                  {acc.id} — {acc.title}
                </MenuItem>
              ))}
            </RHFSelect>

            <RHFSelect name="location_id" label="Location">
              {filteredLocations.map((loc) => (
                <MenuItem key={loc.id} value={loc.id}>
                  {loc.id} — {loc.title || loc.city || "Location"}
                </MenuItem>
              ))}
            </RHFSelect>

            <RHFSelect name="product_id" label="Product">
              {products.map((pro) => (
                <MenuItem key={pro.id} value={pro.id}>
                  {pro.id} — {pro.title}
                </MenuItem>
              ))}
            </RHFSelect>

            <RHFTextField
              name="product_price_id"
              label="Product Price ID"
              type="number"
              helperText="Must be an existing PRODUCT_PRICE.PP_ID"
            />
            <RHFTextField name="amount" label="Amount" type="number" />
            <RHFSelect name="method" label="Method">
              <MenuItem value="credit_card">Credit Card</MenuItem>
              <MenuItem value="bank">Bank</MenuItem>
              <MenuItem value="check">Check</MenuItem>
              <MenuItem value="cash">Cash</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </RHFSelect>
            <RHFSelect name="status" label="Status">
              <MenuItem value="A">Active</MenuItem>
              <MenuItem value="I">Inactive</MenuItem>
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
