import { Tooltip } from "@mui/material";
import Button from "@mui/material/Button";
import IconButton from '@mui/material/IconButton';
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import PropTypes from "prop-types";
import { useState } from "react";
import { ConfirmDialog } from "src/components/custom-dialog";
import SuccessDialog from "src/components/custom-dialog/success-dialog";
import Iconify from 'src/components/iconify';
import Label from 'src/components/label';
import { useSnackbar } from 'src/components/snackbar';
import { useBoolean } from "src/hooks/use-boolean";
import { useDeleteSupportQueryMutation } from "src/store/Reducer/adminSupport";
import SendReplyForm from "./send-reply-modal";

export default function UserTableRow({ row, selected, counter, statusOptions }) {
  const { enqueueSnackbar } = useSnackbar();

  const quickOpen = useBoolean();
  const success = useBoolean();
  const confirm = useBoolean();

  const { name, email, status } = row;

  const [selectedDeleteQuery, setSelectedDeleteQuery] = useState(null);

  const [deleteQuery, { isLoading: isDeleting }] = useDeleteSupportQueryMutation();

  const openDeleteModal = (id) => {
    setSelectedDeleteQuery(id)
    confirm.onTrue()
  }

  const handleDialogOpen = () => {
    quickOpen.onTrue();
  };

  const handleDelete = async (_id) => {
    try {
      const response = await deleteQuery(_id).unwrap();
      // Handle success
      if (!response?.error) {
        return enqueueSnackbar(response?.message || 'Deleted Successfully !', { variant: 'success', autoHideDuration: 2000 });
      }
    } catch (error) {
      console.error('Error deleting menu item:', error);
    }
  };

  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell>{counter}</TableCell>
        <TableCell>{name}</TableCell>
        <TableCell >{email}</TableCell>
        <TableCell onClick={() => row.message.length > 40 && success.onTrue()} sx={{ cursor: 'pointer' }}>
          {row?.message?.length > 40 ? `${row?.message.substring(0, 40)}...` : row?.message}
        </TableCell>

        <TableCell align="center">
          <Label
            variant="soft"
            color={
              status === "pending"
                ? "error"
                : status === "responded"
                  ? "warning"
                  : status === "resolved"
                    ? "success"
                    : status === "closed"
                      ? "info"
                      : "error"
            }
          >
            {status}
          </Label>
        </TableCell>

        <TableCell align="right">
          <Tooltip title="Reply" placement="top" arrow>
            <IconButton onClick={handleDialogOpen}>
              <Iconify icon="mdi:message-text-outline" width={22} />
            </IconButton>
          </Tooltip>

          <Tooltip title="Delete" placement="top" arrow>
            <IconButton
              color="error"
              onClick={() => openDeleteModal(row?._id)}
            >
              <Iconify icon="solar:trash-bin-trash-bold" />
            </IconButton>
          </Tooltip>
        </TableCell>
      </TableRow>

      <SuccessDialog
        open={success.value}
        onClose={success.onFalse}
        title="Message"
        content={row?.message}
        showButton={false}
      />

      {/* REPLY MODAL */}
      <SendReplyForm row={row} statusOptions={statusOptions} open={quickOpen.value} onClose={quickOpen.onFalse} />

      {/* CONFIRM DIALOG */}
      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Confirm Action"
        content="Are you sure you want to delete?"
        action={
          <Button
            variant="contained"
            color="error"
            loading={isDeleting}
            onClick={() => {
              handleDelete(selectedDeleteQuery);
              confirm.onFalse();
            }}
          >
            Delete
          </Button>
        }
      />
    </>
  );
}

UserTableRow.propTypes = {
  row: PropTypes.object.isRequired,
  selected: PropTypes.bool.isRequired,
  counter: PropTypes.number
};
