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
import { useUpdateApiMutation } from "src/store/Reducer/apis";

export default function EditApiForm({ row, open, onClose }) {
  const { enqueueSnackbar } = useSnackbar();

  const [updateApi, { isLoading: isUpdating }] = useUpdateApiMutation();

  const EditApiSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
  });

  const defaultValues = {
    title: "",
    description: "",
  };

  const methods = useForm({
    resolver: yupResolver(EditApiSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
  } = methods;

  useEffect(() => {
    if (row) {
      reset({
        title: row?.title || "",
        description: row?.description || "",
      });
    }
  }, [row, reset]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      await updateApi({ id: row.id, data }).unwrap();
      enqueueSnackbar("API updated successfully!", { variant: "success" });
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
        <DialogTitle>Edit API</DialogTitle>

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
            <RHFTextField name="title" label="API Title" />

            <RHFTextField name="description" label="Description" multiline rows={3} />
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

EditApiForm.propTypes = {
  row: PropTypes.object,
  onClose: PropTypes.func,
  open: PropTypes.bool,
};