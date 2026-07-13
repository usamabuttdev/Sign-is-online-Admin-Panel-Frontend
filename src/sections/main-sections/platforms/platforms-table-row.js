import React from "react";
import PropTypes from "prop-types";
import { TableRow, TableCell, Tooltip, IconButton } from "@mui/material";
import Label from "src/components/label";
import Iconify from "src/components/iconify";
import { formatDate } from "src/utils/format-time";
import { fNumber } from "src/utils/format-number";

export default function PlatformsTableRow({ row, selected, onEdit }) {
  const { id, title, available, connected_count, created_at } = row;
  const { display, full } = formatDate(created_at);

  return (
    <TableRow hover selected={selected}>
      <TableCell align="center">{id}</TableCell>
      <TableCell>{title}</TableCell>
      <TableCell align="center">
        <Label variant="soft" color={available === "Yes" ? "success" : "default"}>
          {available}
        </Label>
      </TableCell>
      <TableCell align="right">{fNumber(connected_count)}</TableCell>
      <TableCell align="center">
        <Tooltip title={full} arrow>
          {display}
        </Tooltip>
      </TableCell>

      <TableCell sx={{ px: 1, whiteSpace: "nowrap" }}>
        <Tooltip title="Edit" placement="top" arrow>
          <IconButton onClick={onEdit}>
            <Iconify icon="solar:pen-bold" />
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
  );
}

PlatformsTableRow.propTypes = {
  row: PropTypes.object.isRequired,
  selected: PropTypes.bool,
  onEdit: PropTypes.func,
};
