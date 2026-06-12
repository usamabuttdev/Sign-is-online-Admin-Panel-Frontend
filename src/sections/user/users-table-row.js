import React from "react";
import PropTypes from "prop-types";
import { TableRow, TableCell, IconButton, Tooltip } from "@mui/material";
import Iconify from "src/components/iconify";
import { Link } from "react-router-dom";
import { paths } from "src/routes/paths";
import TableCellTooltip from "src/components/table/table-cell-tooltip";
import { formatDate } from "src/utils/format-time";

export default function UsersTableRow({ row, selected }) {
  const { id, name, email, role } = row;
  const { display, full } = formatDate(row.createdat);

  return (
    <TableRow hover selected={selected}>
      <TableCell align="center">{id}</TableCell>
      <TableCellTooltip>{name}</TableCellTooltip>
      <TableCellTooltip>{email}</TableCellTooltip>
      <TableCellTooltip align="center">{role}</TableCellTooltip>
      <TableCell key={row.id} align="center">
        <Tooltip title={full} arrow>
          <span>{display}</span>
        </Tooltip>
    </TableCell>

      {/* Action Column */}
      <TableCell sx={{  whiteSpace: "nowrap" , textAlign:"center" }}>
        {/* <Tooltip title="Quick Edit" placement="top" arrow>
          <IconButton >
            <Iconify icon="solar:pen-bold" />
          </IconButton>
      </Tooltip> */}
      <Tooltip title={'View User Profile'}>
        <Link style={{ color: "inherit", textDecoration: "none" }} to={`${paths.dashboard.users.profile}/${1}`}>
          <IconButton color="inherit">
            <Iconify icon="solar:eye-bold" width={24} />
          </IconButton>
        </Link>
      </Tooltip>
      </TableCell>
    </TableRow>
  );
}

UsersTableRow.propTypes = {
  row: PropTypes.object.isRequired,
  selected: PropTypes.bool,
};
