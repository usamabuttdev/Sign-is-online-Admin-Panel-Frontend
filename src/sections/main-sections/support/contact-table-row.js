import React, { useState } from "react";
import PropTypes from "prop-types";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Iconify from 'src/components/iconify';
import IconButton from '@mui/material/IconButton';
import Button from "@mui/material/Button";
import Label from 'src/components/label';
import { useSnackbar } from 'src/components/snackbar';
import { ConfirmDialog } from "src/components/custom-dialog";
import { useBoolean } from "src/hooks/use-boolean";
import SendReplyForm from "./send-reply-modal";
import SuccessDialog from "src/components/custom-dialog/success-dialog";
import { useDeleteSupportQueryMutation } from "src/store/Reducer/adminSupport";

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
        <TableCell onClick={success.onTrue} sx={{ cursor: 'pointer' }}>
          {row?.message?.length > 20 ? `${row?.message.substring(0, 20)}...` : row?.message}
        </TableCell>

        <TableCell>
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

        <TableCell>
          <IconButton onClick={handleDialogOpen}>
            <Iconify icon="mdi:message-text-outline" width={22} />
          </IconButton>

          <IconButton
            color="error"
            onClick={() => openDeleteModal(row?._id)}
          >
            <Iconify icon="solar:trash-bin-trash-bold" />
          </IconButton>
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
