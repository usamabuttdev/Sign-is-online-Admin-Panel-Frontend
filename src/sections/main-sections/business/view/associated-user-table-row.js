import PropTypes from 'prop-types';
import {
  Avatar,
  IconButton,
  TableCell,
  TableRow,
  Tooltip
} from '@mui/material';
import Iconify from 'src/components/iconify';
import Label from 'src/components/label';
import { useRouter } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';
import TableCellTooltip from 'src/components/table/table-cell-tooltip';

export default function AssociatedUserTableRow({
  row,
  onEditRow,
  handleStatusChange,
  handleDeactivate,
}) {
  const { picture, name, phoneNo, email, role, status } = row;
  const router = useRouter();

  return (
    <>
      <TableRow hover>
        <TableCell sx={{ textAlign:"center" , display:"flex" , justifyContent:"center" }}>
          <Avatar src={picture} alt={name} >
            {name.charAt(0)}
          </Avatar>
        </TableCell>
        <TableCellTooltip>{name}</TableCellTooltip>
        <TableCellTooltip>{email}</TableCellTooltip>
        <TableCellTooltip>{phoneNo}</TableCellTooltip>
        <TableCell sx={{ textTransform: 'capitalize' }}>{role}</TableCell>
        <TableCell align="center">
          <Label
            sx={{ cursor: 'pointer' }}
            color={
              (status === 'active' && 'success') ||
              (status === 'inactive' && 'warning') ||
              'default'
            }
            onClick={handleStatusChange}
          >
            {status}
          </Label>
        </TableCell>

        <TableCell align="right" sx={{ whiteSpace: 'nowrap' }}>
          <Tooltip title="View User Profile" placement="top" arrow>
            <IconButton color={'default'} onClick={() => router.push(`${paths.dashboard.users.profile}/${row.id}`)}>
              <Iconify icon="solar:eye-bold" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit" placement="top" arrow>
            <IconButton color="default" onClick={onEditRow}>
              <Iconify icon="solar:pen-bold" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Deactivate" placement="top" arrow>
            <IconButton color="error" onClick={handleDeactivate}>
              <Iconify icon="nrk:close-active" />
            </IconButton>
          </Tooltip>
        </TableCell>
      </TableRow>
    </>
  );
}

AssociatedUserTableRow.propTypes = {
  row: PropTypes.shape({
    picture: PropTypes.string,
    name: PropTypes.string,
    phoneNo: PropTypes.string,
    email: PropTypes.string,
    role: PropTypes.oneOf(['owner', 'default', 'editor']),
    status: PropTypes.oneOf(['active', 'inactive']),
  }),
  onEditRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
  handleStatusChange: PropTypes.func,
};
