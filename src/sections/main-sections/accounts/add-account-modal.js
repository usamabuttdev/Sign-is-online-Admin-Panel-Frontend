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
import { useAddNewAccountMutation } from "src/store/Reducer/accounts";
import { formatObservesDaylight } from "src/utils/observes-daylight";
import { useSelector } from "react-redux";
import { selectUser } from "src/store/slices/userSlice";

export default function AddAccountForm({ open, onClose }) {
  const { enqueueSnackbar } = useSnackbar();
  const currentUser = useSelector(selectUser);

  const [addNewAccount, { isLoading }] = useAddNewAccountMutation();

  const NewAccountSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    timezone_id: Yup.string().required("Timezone ID is required"),
    observes_daylight: Yup.boolean(),
  });

  const defaultValues = {
    title: "",
    timezone_id: "",
    observes_daylight: false,
  };

  const methods = useForm({
    resolver: yupResolver(NewAccountSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (!currentUser?.id) {
        enqueueSnackbar("Session missing user id. Please log in again.", { variant: "error" });
        return;
      }
      await addNewAccount({
        title: data.title,
        timezone_id: Number(data.timezone_id),
        observes_daylight: formatObservesDaylight(data.observes_daylight),
        created_by: currentUser.id,
      }).unwrap();
      enqueueSnackbar("Account created successfully!", { variant: "success" });
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
        <DialogTitle>Add Account</DialogTitle>

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
            loading={isSubmitting}
          >
            Add
          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
}

AddAccountForm.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
