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
import { useUpdateMetricMutation } from "src/store/Reducer/metrics";

function mapDirection(value) {
  if (value === "H" || value === "L") return value;
  const raw = String(value || "").trim().toLowerCase();
  if (raw === "up" || raw === "higher") return "H";
  if (raw === "down" || raw === "lower") return "L";
  return "H";
}

export default function EditMetricForm({ row, open, onClose }) {
  const { enqueueSnackbar } = useSnackbar();

  const [updateMetric, { isLoading: isUpdating }] = useUpdateMetricMutation();

  const EditMetricSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    description: Yup.string(),
    query: Yup.string(),
    frequency: Yup.string().required("Run frequency is required"),
    goal: Yup.number().typeError("Goal must be a number").required("Goal is required"),
    units: Yup.string().max(10, "Units max 10 characters"),
    direction: Yup.string().oneOf(["H", "L"]).required("Direction is required"),
    status: Yup.string(),
  });

  const defaultValues = {
    title: "",
    description: "",
    query: "",
    frequency: "W",
    goal: "",
    units: "",
    direction: "H",
    status: "A",
  };

  const methods = useForm({
    resolver: yupResolver(EditMetricSchema),
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
        description: row?.description || "",
        query: row?.query || "",
        frequency: row?.frequency || "W",
        goal: row?.goal ?? "",
        units: row?.units ?? row?.met_units ?? "",
        direction: mapDirection(row?.direction),
        status: row?.status === "I" ? "I" : "A",
      });
    }
  }, [row, reset]);

  const onSubmit = handleSubmit(async (data) => {
    if (Object.keys(dirtyFields).length === 0) {
      enqueueSnackbar("No changes detected!", { variant: "warning", autoHideDuration: 2000 });
      return;
    }

    try {
      await updateMetric({
        id: row.id,
        data: {
          title: data.title,
          description: data.description || null,
          query: data.query || null,
          frequency: data.frequency,
          goal: Number(data.goal),
          units: data.units || null,
          direction: data.direction,
          status: data.status,
        },
      }).unwrap();
      enqueueSnackbar("Metric updated successfully!", { variant: "success" });
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
        <DialogTitle>Edit Metric</DialogTitle>

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
              <MenuItem value="Y">Yearly</MenuItem>
            </RHFSelect>

            <RHFTextField name="goal" label="Goal" type="number" />

            <RHFTextField name="units" label="Units" />

            <RHFSelect name="direction" label="Direction">
              <MenuItem value="H">Up</MenuItem>
              <MenuItem value="L">Down</MenuItem>
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

EditMetricForm.propTypes = {
  row: PropTypes.object,
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
