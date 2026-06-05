import React from 'react';
import PropTypes from 'prop-types';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import { useBoolean } from 'src/hooks/use-boolean';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { Box } from '@mui/material';
import Label from 'src/components/label';

export default function UserTableRow({ row, selected, counter }) {
  const {
    sender: { name: senderName, account_number: senderAccountNumber },
    receiver: { name: receiverName, account_number: receiverAccountNumber },
    amount,
    date,
    status,
    transaction_id,
    transaction_type
  } = row;

  const confirm = useBoolean();

  return (
    <>
      <TableRow hover selected={selected}>

        <TableCell>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar alt={senderName} sx={{ mr: 2 }} />
            <ListItemText
              primary={senderName}
              secondary={senderAccountNumber}
              primaryTypographyProps={{ typography: 'body2' }}
              secondaryTypographyProps={{
                component: 'span',
                color: 'text.disabled',
              }}
            />
          </Box>

        </TableCell>

        <TableCell>
          {senderAccountNumber}
        
        </TableCell>


        <TableCell sx={{ whiteSpace: 'nowrap' }}>
          {date}
        </TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>
          {transaction_id}
        </TableCell>

        <TableCell  sx={{ whiteSpace: 'nowrap' }}>
          <Label
            variant="soft"
            color={
              (transaction_type === 'Credit Card' && 'success') ||
              (transaction_type === 'Google Pay' && 'info') ||
              (transaction_type === 'Apple Pay' && 'warning') ||
              'default'
            }
            sx={{ textTransform: 'capitalize' }}
          >
            {transaction_type}
          </Label>
        </TableCell>

        <TableCell>
          <Label
            variant="soft"
            color={
              (status === 'completed' && 'success') ||
              (status === 'pending' && 'warning') ||
              'default'
            }
            sx={{ textTransform: 'capitalize' }}
          >

            {status}
          </Label>
        </TableCell>
      </TableRow>

      {/* Confirm Delete Dialog */}
      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Delete"
        content="Are you sure want to delete?"
        action={
          <Button variant="contained" color="error" onClick={confirm.onFalse}>
            Delete
          </Button>
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
