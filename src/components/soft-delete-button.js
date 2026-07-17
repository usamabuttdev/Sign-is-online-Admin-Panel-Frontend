import { useState } from 'react';
import PropTypes from 'prop-types';
import {
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import Iconify from 'src/components/iconify';
import { useSnackbar } from 'src/components/snackbar';

/**
 * Soft-delete confirm button — never hard-deletes.
 */
export default function SoftDeleteButton({
  deleteMutation,
  id,
  label,
  entityName = 'item',
  disabled = false,
  hidden = false,
}) {
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  if (hidden) {
    return null;
  }

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      const result = deleteMutation(id);
      if (result?.unwrap) {
        await result.unwrap();
      } else {
        await result;
      }
      enqueueSnackbar(`${entityName} deleted`, { variant: 'success' });
      setOpen(false);
    } catch (err) {
      enqueueSnackbar(err?.data?.message || `Failed to delete ${entityName}`, { variant: 'error' });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <Tooltip
        title={disabled ? `Cannot delete your own ${entityName}` : 'Delete'}
        placement="top"
        arrow
      >
        <span>
          <IconButton
            color="error"
            onClick={() => setOpen(true)}
            disabled={disabled}
            aria-label={`Delete ${entityName}`}
          >
            <Iconify icon="solar:trash-bin-trash-bold" />
          </IconButton>
        </span>
      </Tooltip>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Delete {entityName}?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Soft-delete{label ? ` "${label}"` : ''}? It will be hidden from the active list.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <LoadingButton color="error" variant="contained" loading={isDeleting} onClick={handleDelete}>
            Delete
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
}

SoftDeleteButton.propTypes = {
  deleteMutation: PropTypes.func.isRequired,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  label: PropTypes.string,
  entityName: PropTypes.string,
  disabled: PropTypes.bool,
  hidden: PropTypes.bool,
};
