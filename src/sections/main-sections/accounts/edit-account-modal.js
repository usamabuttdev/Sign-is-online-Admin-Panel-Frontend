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
import { useUpdateAccountMutation } from "src/store/Reducer/accounts";
import { parseObservesDaylight, formatObservesDaylight } from "src/utils/observes-daylight";

export default function EditAccountForm({ row, open, onClose }) {
  const { enqueueSnackbar } = useSnackbar();

  const [updateAccount, { isLoading: isUpdating }] = useUpdateAccountMutation();

  const EditAccountSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    timezone_id: Yup.string(),
    observes_daylight: Yup.boolean(),
    status: Yup.string(),
  });

  const defaultValues = {
    title: "",
    timezone_id: "",
    observes_daylight: false,
    status: "A",
  };

  const methods = useForm({
    resolver: yupResolver(EditAccountSchema),
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
          title: row?.title || "",
          timezone_id: row?.tz_title || "",
          observes_daylight: parseObservesDaylight(row?.observes_daylight),
          status: row?.status === "A" ? "A" : "I",
        });
    }
  }, [row, reset]);

  const onSubmit = handleSubmit(async (data) => {
    if (Object.keys(dirtyFields).length === 0) {
      enqueueSnackbar("No changes detected!", { variant: "warning", autoHideDuration: 2000 });
      return;
    }

    try {
      await updateAccount({
        id: row.id,
        data: {
          title: data.title,
          timezone_id: data.timezone_id || null,
          observes_daylight: formatObservesDaylight(data.observes_daylight),
          status: data.status,
        },
      }).unwrap();
      enqueueSnackbar("Account updated successfully!", { variant: "success" });
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
        <DialogTitle>Edit Account</DialogTitle>

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
            <RHFTextField name="title" label="Account Title" />

            <RHFTextField name="timezone_id" label="Timezone ID" />

            <RHFSelect name="observes_daylight" label="Observes Daylight">
              <MenuItem value={true}>Yes</MenuItem>
              <MenuItem value={false}>No</MenuItem>
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

EditAccountForm.propTypes = {
  row: PropTypes.object,
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
