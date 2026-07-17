import React, { useState, useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import { TableRow, TableCell, IconButton, Tooltip, ClickAwayListener } from "@mui/material";
import Iconify from "src/components/iconify";
import SoftDeleteButton from "src/components/soft-delete-button";
import { Link } from "react-router-dom";
import { paths } from "src/routes/paths";
import TableCellTooltip from "src/components/table/table-cell-tooltip";
import { formatDate } from "src/utils/format-time";
import { useDeleteUserMutation } from "src/store/Reducer/users";
import { useSelector } from "react-redux";
import { selectUser } from "src/store/slices/userSlice";

export default function UsersTableRow({ row, selected }) {
  const { id, name, email, phone, role } = row;
  const { display, full } = formatDate(row.createdat);
  const [dateTooltipOpen, setDateTooltipOpen] = useState(false);
  const [deleteUser] = useDeleteUserMutation();
  const currentUser = useSelector(selectUser);

  const isCurrentUser = useMemo(() => {
    if (!currentUser) return false;
    if (currentUser.id != null && id != null && String(currentUser.id) === String(id)) {
      return true;
    }
    if (currentUser.email && email) {
      return String(currentUser.email).toLowerCase() === String(email).toLowerCase();
    }
    return false;
  }, [currentUser, id, email]);

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
      <TableCellTooltip>{phone || "—"}</TableCellTooltip>
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

      <TableCell sx={{ whiteSpace: "nowrap", textAlign: "center" }}>
        <Tooltip title="Edit" placement="top" arrow>
          <Link
            style={{ color: "inherit", textDecoration: "none" }}
            to={`${paths.adminDashboard.user.edit(id)}`}
          >
            <IconButton color="inherit">
              <Iconify icon="solar:pen-bold" />
            </IconButton>
          </Link>
        </Tooltip>
        <Tooltip title="View User Profile">
          <Link
            style={{ color: "inherit", textDecoration: "none" }}
            to={`${paths.dashboard.users.profile}/${id}`}
          >
            <IconButton color="inherit">
              <Iconify icon="solar:eye-bold" width={24} />
            </IconButton>
          </Link>
        </Tooltip>
        <SoftDeleteButton
          deleteMutation={deleteUser}
          id={id}
          label={name || email}
          entityName="user"
          hidden={isCurrentUser}
        />
      </TableCell>
    </TableRow>
  );
}

UsersTableRow.propTypes = {
  row: PropTypes.object.isRequired,
  selected: PropTypes.bool,
};
