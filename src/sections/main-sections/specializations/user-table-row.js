import React from 'react';
import PropTypes from 'prop-types';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Label from 'src/components/label';
import IconButton from '@mui/material/IconButton';
import Iconify from 'src/components/iconify';
import {  Tooltip } from '@mui/material';
import { useBoolean } from 'src/hooks/use-boolean';
import { ConfirmDialog } from 'src/components/custom-dialog';
import UserQuickEditForm from './user-quick-edit-form';
import { formatDateCreatedAt } from 'src/components/custom-date-range-picker';
import { useDeleteSpecializationMutation } from 'src/store/Reducer/specializations';
import { LoadingButton } from '@mui/lab';
import { enqueueSnackbar } from 'notistack';

export default function UserTableRow({ row, selected, counter }) {
  const { image, title, isActive ,createdAt} = row;
  const confirm = useBoolean();
  const quickEdit = useBoolean();
  const [deleteSpecialization, { isLoading }] = useDeleteSpecializationMutation();

  const handleDelete = async () => {  
    try {
      const response = await deleteSpecialization(row?._id);
      if (!response.error) {
        enqueueSnackbar(response?.data?.message || 'deleted successfully', { variant: 'success' });
        confirm.onFalse();
      }
    } catch (error) {
      console.error(error);
    }
  }


  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell>{counter}</TableCell>
        <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar alt={title} src={image} sx={{ mr: 2 }} />
         
        </TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{title}</TableCell>
        <TableCell>{formatDateCreatedAt(createdAt)}</TableCell>
        <TableCell>
          <Label variant="soft" color={isActive ? 'success' : 'warning'}>
            <Button variant="text">
              {isActive  ? 'Active' : 'Inactive'}
            </Button>
          </Label>
        </TableCell>
        <TableCell align="left" sx={{ px: 1, whiteSpace: 'nowrap' }}>
          <Tooltip title="Quick Edit" placement="top" arrow>
            <IconButton color={quickEdit.value ? 'inherit' : 'default'} onClick={quickEdit.onTrue}>
              <Iconify icon="solar:pen-bold" />
            </IconButton>
          </Tooltip>

          <IconButton color={'error'} onClick={confirm.onTrue}>
            <Iconify icon="solar:trash-bin-trash-bold" />
          </IconButton>
        </TableCell>
      </TableRow>
      <UserQuickEditForm currentUser={row} open={quickEdit.value} onClose={quickEdit.onFalse} />

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Delete"
        content="Are you sure want to delete?"
        action={
          <LoadingButton variant="contained" color="error" onClick={handleDelete} loading={isLoading} >
            Delete
          </LoadingButton>
        }
      />
    </>
  );
}

UserTableRow.propTypes = {
  onDeleteRow: PropTypes.func,
  onEditRow: PropTypes.func,
  onSelectRow: PropTypes.func,
  row: PropTypes.object,
  selected: PropTypes.bool,
};
