import React from 'react';
import PropTypes from 'prop-types';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import Label from 'src/components/label';
import IconButton from '@mui/material/IconButton';
import Iconify from 'src/components/iconify';
import { Link } from 'react-router-dom';
import { paths } from 'src/routes/paths';
import { Tooltip } from '@mui/material';
import { useBoolean } from 'src/hooks/use-boolean';
import UserQuickEditForm from './user-quick-edit-form';
import DocumentView from './document-view';

export default function UserTableRow({ row, selected, counter }) {
  const { name, profileIcon, email, phoneNumber, accountState, age, experience, gender ,_id ,verificationStatus} = row;

  const quickEdit = useBoolean(); 
  const documentView = useBoolean();

  const verified = verificationStatus?.documents ;



  const handleSubmit = async (status) => {
    // const payload = {
    //   status,
    // };
    // try {
    //   const response = await updateStatus({ _id: row._id, data: payload });
    //   // console.log("Response:", response?.data);
    //   if (response.error) {
    //     const errorMessage = response.error?.data?.message || "An unexpected error occurred.";
    //     toast.error(errorMessage);
    //     return;
    //   }
    //   if (response.data?.message) {
    //     enqueueSnackbar(response.data.message, { variant: "success" });
    //   } else {
    //     enqueueSnackbar("Updated successfully!", { variant: "success" });
    //   }
    // } catch (error) {
    //   const errorMessage = error?.response?.data?.message || error.message || "An error occurred.";
    //   toast.error(errorMessage);
    //   console.error("Unexpected Error:", error);
    // }
  };

  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell>{counter}</TableCell>
        <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar alt={name} src={profileIcon} sx={{ mr: 2 }} />
          <ListItemText
            primary={name}
            secondary={email}
            primaryTypographyProps={{ typography: 'body2' }}
            secondaryTypographyProps={{
              component: 'span',
              color: 'text.disabled',
            }}
          />
        </TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{phoneNumber ||'Not Added'}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{gender }</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{age }</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{`${experience} years`}</TableCell>
        <TableCell sx={{  whiteSpace: 'nowrap' }}>
          <Tooltip title="Document View" placement="top" arrow>
            <IconButton color={documentView.value ? 'inherit' : 'default'} onClick={documentView.onTrue}>
              <Iconify icon="mdi:file-eye-outline" />
            </IconButton>
          </Tooltip>
          </TableCell>  
        <TableCell>
          <Label
            variant="soft"
            color={
              verified === 'submitted' || verified === 'verified'
                ? 'success'
                : verified === 'pending'
                ? 'warning'
                : verified === 'rejected'
                ? 'error'
                : 'default'
            }
          >
            <Button variant="text">
              {verified?.charAt(0)?.toUpperCase() + verified?.slice(1)}
            </Button>
          </Label>
        </TableCell>
        <TableCell>
          <Label variant="soft" color={accountState?.status === 'active' ? 'success' : 'warning'}>
            <Button variant="text">
              {accountState?.status === 'active' ? 'Active' : 'Suspended'}
            </Button>
          </Label>
        </TableCell>

     

        <TableCell sx={{ px: 1, whiteSpace: 'nowrap' }}>
        <Tooltip title="Quick Edit" placement="top" arrow>
            <IconButton color={quickEdit.value ? 'inherit' : 'default'} onClick={quickEdit.onTrue}>
              <Iconify icon="solar:pen-bold" />
            </IconButton>
          </Tooltip>
          <Link
            to={`${paths.dashboard.trainer.profile}/${_id}`}
            style={{ color: 'inherit', textDecoration: 'none' }}
          >
            <IconButton color="inherit">
              <Iconify icon="solar:eye-bold" width={24} />
            </IconButton>
          </Link>
        </TableCell>

        <UserQuickEditForm currentUser={row} open={quickEdit.value} onClose={quickEdit.onFalse} />
        <DocumentView  open={documentView.value} onClose={documentView.onFalse}   />

      
      </TableRow>
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
