import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import { TableRow, TableCell, IconButton, Tooltip, ClickAwayListener } from "@mui/material";
import Iconify from "src/components/iconify";
import { Link } from "react-router-dom";
import { paths } from "src/routes/paths";
import TableCellTooltip from "src/components/table/table-cell-tooltip";
import { formatDate } from "src/utils/format-time";

export default function UsersTableRow({ row, selected }) {
  const { id, name, email, phone, role } = row;
  const { display, full } = formatDate(row.createdat);
  const [dateTooltipOpen, setDateTooltipOpen] = useState(false);

  const handleDateClick = useCallback(() => {
    setDateTooltipOpen((prev) => !prev);
  }, []);

  const handleDateTooltipClose = useCallback(() => {
    setDateTooltipOpen(false);
  }, []);

  return (
    <TableRow hover selected={selected}>
      <TableCellTooltip>{id}</TableCellTooltip>
      <TableCellTooltip>{name}</TableCellTooltip>
      <TableCellTooltip>—</TableCellTooltip>
      <TableCellTooltip>{email}</TableCellTooltip>
      <TableCellTooltip>{phone || '—'}</TableCellTooltip>
      <TableCellTooltip align="center">{role}</TableCellTooltip>
      <TableCell key={row.id} align="center">
        <ClickAwayListener onClickAway={handleDateTooltipClose}>
          <Tooltip
            title={full}
            arrow
            open={dateTooltipOpen}
            onClose={handleDateTooltipClose}
            disableHoverListener
            disableFocusListener
            disableTouchListener
          >
            <span onClick={handleDateClick} style={{ cursor: "pointer" }}>
              {display}
            </span>
          </Tooltip>
        </ClickAwayListener>
    </TableCell>

      {/* Action Column */}
      <TableCell sx={{  whiteSpace: "nowrap" , textAlign:"center" }}>
        <Tooltip title="Edit" placement="top" arrow>
          <Link style={{ color: "inherit", textDecoration: "none" }} to={`${paths.adminDashboard.user.edit(id)}`}>
            <IconButton color="inherit">
              <Iconify icon="solar:pen-bold" />
            </IconButton>
          </Link>
        </Tooltip>
      <Tooltip title={'View User Profile'}>
        <Link style={{ color: "inherit", textDecoration: "none" }} to={`${paths.dashboard.users.profile}/${id}`}>
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
