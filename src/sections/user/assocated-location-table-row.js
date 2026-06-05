import { TableRow, TableCell, Tooltip, IconButton } from '@mui/material';
import { ConfirmDialog } from 'src/components/custom-dialog';
import TableCellTooltip from 'src/components/table/table-cell-tooltip';
import Iconify from 'src/components/iconify';
import { useBoolean } from 'src/hooks/use-boolean';
import { useRouter } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';
import { formatDate } from 'src/utils/format-time';
import Label from 'src/components/label';

const AssociatedLocationTableRow = ({ location }) => {
  const { id, address, product, loc_has_active_subscription, expiration , location_name , account } = location;
  const router = useRouter();
  const open = useBoolean();

  const { display, full } = formatDate(expiration);
  const handleAddressClick = (e) => {
    e.stopPropagation();
    if (address?.length > 50) open.onTrue();
  };

  const handleViewClick = (e) => {
    e.stopPropagation();
    router.push(`${paths.dashboard.locations.profile}/${1}`);
  };

  return (
    <TableRow hover>
      <TableCellTooltip>{location_name}</TableCellTooltip>
      <TableCell sx={{cursor:"pointer"}} onClick={()=>router.push( `${paths.dashboard.accounts.profile}/${id}`)}>
        <Tooltip title={`View Account Profile`} arrow>
          {account}
        </Tooltip>
        </TableCell>
      <TableCellTooltip>{product}</TableCellTooltip>
      <TableCell align="center">
        {loc_has_active_subscription === 'Y' ? (
          <Label  color="success">
            Yes
          </Label>
        ) : (
          <Label  color="default" >No</Label>
        )}
      </TableCell>
      <TableCell key={location.id}>
        <Tooltip title={full} arrow>
          <span>{display}</span>
        </Tooltip>
       </TableCell>

      <TableCellTooltip sx={{ cursor: address.length > 50 ? "pointer" : "default" }} onClick={handleAddressClick}>
        {address?.length > 50 ? `${address.slice(0, 50)}...` : address}
      </TableCellTooltip>
    

      <TableCell align="center">
        <Tooltip title="View Location Profile" arrow>
          <IconButton onClick={handleViewClick}>
            <Iconify icon="solar:eye-bold" />
          </IconButton>
        </Tooltip>
      </TableCell>

      <ConfirmDialog
        open={open.value}
        onClose={open.onFalse}
        title="Address Details"
        content={address}
      />
    </TableRow>
  );
};

export default AssociatedLocationTableRow;
