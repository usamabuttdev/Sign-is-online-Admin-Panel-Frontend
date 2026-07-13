import React from "react";
import PropTypes from "prop-types";
import { TableRow, TableCell, Tooltip, IconButton } from "@mui/material";
import Iconify from "src/components/iconify";
import { useRouter } from "src/routes/hooks";
import { paths } from "src/routes/paths";
import { formatDate } from "src/utils/format-time";

export default function DevicesTableRow({ row, selected, onEdit }) {
  const { id, device_id, location, location_id, hardware_type, firmware_version, status, last_heartbeat, created_at } = row;
  const lastHb = formatDate(last_heartbeat);
  const created = formatDate(created_at);
  const router = useRouter();

  return (
    <TableRow hover selected={selected}>
      <TableCell align="center">{id}</TableCell>
      <TableCell>{device_id}</TableCell>
      <TableCell
        sx={{ cursor: "pointer" }}
        onClick={() => router.push(`${paths.dashboard.locations.profile}/${location_id}`)}
      >
        <Tooltip title={"View Location Profile"} arrow>
          <span>{location}</span>
        </Tooltip>
      </TableCell>
      <TableCell>{hardware_type}</TableCell>
      <TableCell>{firmware_version}</TableCell>
      <TableCell>{status}</TableCell>
      <TableCell align="center">
        <Tooltip title={lastHb.full} arrow>
          {lastHb.display}
        </Tooltip>
      </TableCell>
      <TableCell align="center">
        <Tooltip title={created.full} arrow>
          {created.display}
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

DevicesTableRow.propTypes = {
  row: PropTypes.object.isRequired,
  selected: PropTypes.bool,
  onEdit: PropTypes.func,
};
