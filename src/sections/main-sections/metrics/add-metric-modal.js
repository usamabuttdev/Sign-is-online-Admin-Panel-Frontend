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
import { useAddNewMetricMutation } from "src/store/Reducer/metrics";

export default function AddMetricForm({ open, onClose }) {
  const { enqueueSnackbar } = useSnackbar();

  const [addNewMetric, { isLoading }] = useAddNewMetricMutation();

  const NewMetricSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
  });

  const defaultValues = {
    title: "",
    description: "",
    query: "",
    frequency: "",
    goal: "",
    units: "",
    direction: "",
  };

  const methods = useForm({
    resolver: yupResolver(NewMetricSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await addNewMetric(data).unwrap();
      enqueueSnackbar("Metric created successfully!", { variant: "success" });
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
        <DialogTitle>Add Metric</DialogTitle>

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
            <RHFTextField name="title" label="Metric Title" />

            <RHFTextField name="description" label="Description" />

            <RHFTextField name="query" label="Query" />

            <RHFSelect name="frequency" label="Run Frequency">
              <MenuItem value="D">Daily</MenuItem>
              <MenuItem value="W">Weekly</MenuItem>
              <MenuItem value="M">Monthly</MenuItem>
              <MenuItem value="Q">Quarterly</MenuItem>
            </RHFSelect>

            <RHFTextField name="goal" label="Goal" type="number" />

            <RHFTextField name="units" label="Units" />

            <RHFSelect name="direction" label="Direction">
              <MenuItem value="up">Up</MenuItem>
              <MenuItem value="down">Down</MenuItem>
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

AddMetricForm.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
