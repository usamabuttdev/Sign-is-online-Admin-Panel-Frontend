import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { enqueueSnackbar } from 'notistack';
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
import { MenuItem, TextField, Tooltip } from '@mui/material';
import { useSnackbar } from 'src/components/snackbar';
import { toast } from 'react-toastify';
import { useUpdateUserStatusMutation } from 'src/store/Reducer/users';
import { useBoolean } from 'src/hooks/use-boolean';
import { User } from '@auth0/auth0-react';
import UserQuickEditForm from './user-quick-edit-form';

export default function UserTableRow({ row, selected, counter }) {
  const { enqueueSnackbar } = useSnackbar();
  const { name, profileIcon, email, phoneNumber, accountState, age, experience, gender , _id} = row;


  const quickEdit = useBoolean(); 
  const handleNavigate = (name, email, profileIcon) => {
    console.log('Details', name, email, profileIcon);
    localStorage.setItem('selectedUser', JSON.stringify({ name, email, profileIcon }));
  };

  const [currentStatus, setCurrentStatus] = useState(accountState?.status);

  const [updateStatus, { isLoading }] = useUpdateUserStatusMutation();

  const handleChangeStatus = useCallback(
    (event) => {
      const selectedStatus = event.target.value;

      const backendStatus = selectedStatus === 'pending' ? 'submitted' : selectedStatus;

      setCurrentStatus(selectedStatus);

      handleSubmit(backendStatus);
    },
    [row._id]
  );

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
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{phoneNumber}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{gender}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{age}</TableCell>
        <TableCell>
          <Label variant="soft" color={accountState?.status === 'active' ? 'success' : 'warning'}>
            <Button variant="text">
              {accountState?.status === 'active' ? 'Active' : 'Inactive'}
            </Button>
          </Label>
        </TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>
        <Tooltip title="Quick Edit" placement="top" arrow>
            <IconButton color={quickEdit.value ? 'inherit' : 'default'} onClick={quickEdit.onTrue}>
              <Iconify icon="solar:pen-bold" />
            </IconButton>
          </Tooltip>
          <Link
            to={`${paths.dashboard.customers.profile}/${_id}`}
            style={{ color: 'inherit', textDecoration: 'none' }}
          >
            <IconButton color="inherit">
              <Iconify icon="solar:eye-bold" width={24} />
            </IconButton>
          </Link>
        </TableCell>

        <UserQuickEditForm currentUser={row} open={quickEdit.value} onClose={quickEdit.onFalse} />

      

  

        {/* <TableCell>
          <TextField
            fullWidth
            select
            size="small"
            value={currentStatus}
            onChange={handleChangeStatus}
            sx={{ maxWidth: 130, textTransform: "capitalize" }}
          >
            {["active", "inactive"].map((option) => (
              <MenuItem sx={{ textTransform: "capitalize" }} key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </TableCell> */}
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
