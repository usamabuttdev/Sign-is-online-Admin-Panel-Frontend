import { IconButton, TableCell, TableRow, Tooltip } from "@mui/material";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Iconify from "src/components/iconify";
import { paths } from "src/routes/paths";
import { formatDate } from "src/utils/format-time";

export default function AccountTableRow({ row, selected }) {
  const { id, title, locations, signs, total_charged, created_at } = row;
  const { display, full } = formatDate(created_at);

  const formattedCharge = total_charged != null
    ? `$${Number(total_charged).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
    : '$0.00';

  return (
    <TableRow hover selected={selected}>
      <TableCell sx={{ whiteSpace: 'nowrap' }} align="center">{id}</TableCell>
      <TableCell sx={{ whiteSpace: 'nowrap' }}>{title}</TableCell>
      <TableCell sx={{ whiteSpace: 'nowrap' }}>{locations || 0}</TableCell>
      <TableCell sx={{ whiteSpace: 'nowrap', cursor: "pointer" }} align="center">
        <Tooltip title="View Signs">
          {signs}
        </Tooltip>
      </TableCell>
      <TableCell sx={{ whiteSpace: 'nowrap' }} align="right">{formattedCharge}</TableCell>
      <TableCell sx={{ whiteSpace: 'nowrap' }} align="center">
        <Tooltip title={full} arrow>
          {display}
        </Tooltip>
      </TableCell>

      <TableCell sx={{ whiteSpace: 'nowrap' }} align="center">
        <Link to={`${paths.dashboard.accounts.profile}/${id}`} style={{ color: 'inherit', textDecoration: 'none' }}>
          <Tooltip title={"View Account Profile"}>
            <IconButton color="inherit">
              <Iconify icon="solar:eye-bold" width={24} />
            </IconButton>
          </Tooltip>
        </Link>
      </TableCell>
    </TableRow>
  );
}

AccountTableRow.propTypes = {
  row: PropTypes.object.isRequired,
  selected: PropTypes.bool,
};
