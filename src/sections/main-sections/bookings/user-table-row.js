import React from 'react';
import PropTypes from 'prop-types';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Label from 'src/components/label';
import IconButton from '@mui/material/IconButton';
import Iconify from 'src/components/iconify';
import { ListItemText, Tooltip } from '@mui/material';
import { useBoolean } from 'src/hooks/use-boolean';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { paths } from 'src/routes/paths';
import { Link } from 'react-router-dom';

export default function UserTableRow({ row, selected, counter }) {
  const {
    sessionDataSnapshot: { creator, basicInfo, pricingAndDuration, sessionDetails },
  } = row;

  console.log('creator', creator);
  console.log('basicInfo', basicInfo);
  console.log('row', row);
  const confirm = useBoolean();

  const fullAddress = sessionDetails?.location?.fullAddress;

  // Check if the address length is greater than 50 characters

  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell>{counter}</TableCell>
        <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar alt={creator?.name} sx={{ mr: 2 }} src={creator?.profileIcon} />

          <ListItemText
            primary={creator?.name}
            secondary={creator?.email}
            primaryTypographyProps={{ typography: 'body2' }}
            secondaryTypographyProps={{
              component: 'span',
              color: 'text.disabled',
            }}
          />
        </TableCell>
        <TableCell
          sx={{ whiteSpace: 'nowrap' }}
          style={{
            maxWidth: '12rem',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          <Tooltip title={basicInfo?.title} placement="top-start">
            {basicInfo?.title}
          </Tooltip>
        </TableCell>
        {/* <TableCell sx={{whiteSpace:'nowrap'}}>{basicInfo?.specialization?.title}</TableCell>
        <TableCell sx={{whiteSpace:'nowrap'}}>{basicInfo?.trainingMode?.title}</TableCell> */}
        <TableCell
          sx={{ whiteSpace: 'nowrap' }}
        >{`${pricingAndDuration?.startDate} - ${pricingAndDuration?.endDate}`}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>
          {`${pricingAndDuration?.startTime} - ${pricingAndDuration?.endTime}`}{' '}
        </TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>
          {`${pricingAndDuration?.currencySymbol} ${pricingAndDuration?.price}`}{' '}
        </TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>
          <Label
            variant={'soft'}
            color={
              (row.status === 'completed' && 'success') ||
              (row.status === 'pending' && 'warning') ||
              'error'
            }
          >
            {row.status === 'completed' ? 'Completed' : 'Pending'}
          </Label>
        </TableCell>
        <TableCell align="center" sx={{ px: 1, whiteSpace: 'nowrap' }}>
          <Link
            to={`${paths.dashboard.bookings.profile}/${row._id}`}
            style={{ color: 'inherit', textDecoration: 'none' }}
          >
            <IconButton color="inherit">
              <Iconify icon="solar:eye-bold" width={24} />
            </IconButton>
          </Link>
        </TableCell>
      </TableRow>
      {/* <UserQuickEditForm currentUser={row} open={quickEdit.value} onClose={quickEdit.onFalse} /> */}

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
