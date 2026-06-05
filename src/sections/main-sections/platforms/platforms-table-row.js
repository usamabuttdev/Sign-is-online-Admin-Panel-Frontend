import React from "react";
import PropTypes from "prop-types";
import { TableRow, TableCell, Tooltip, } from "@mui/material";
import Label from "src/components/label";
import { formatDate } from "src/utils/format-time";
import { fNumber } from "src/utils/format-number";

export default function PlatformsTableRow({ row, selected }) {
  const { id, title, available, connected_count, created_at } = row;
  const {display, full} =formatDate(created_at);

  return (
    <TableRow hover selected={selected}>
      <TableCell align="center">{id}</TableCell>
      <TableCell>{title}</TableCell>
      <TableCell align="center">
        <Label variant="soft" color={available === "Yes" ? "success" :"default"}>
          {available}
        </Label>
      </TableCell>
      <TableCell align="right">{fNumber(connected_count)}</TableCell>
      <TableCell align="center">
        <Tooltip title={full} arrow>
          {display}
        </Tooltip>
      </TableCell>

      {/* Action Column */}
      {/* <TableCell sx={{ px: 1, whiteSpace: "nowrap" }}>
        <Tooltip title="Quick Edit" placement="top" arrow>
          <IconButton>
            <Iconify icon="solar:pen-bold" />
          </IconButton>
        </Tooltip>
        <Link style={{ color: "inherit", textDecoration: "none" }}>
          <IconButton color="inherit">
            <Iconify icon="solar:eye-bold" width={24} />
          </IconButton>
        </Link>
      </TableCell> */}
    </TableRow>
  );
}

PlatformsTableRow.propTypes = {
  row: PropTypes.object.isRequired,
  selected: PropTypes.bool,
};
