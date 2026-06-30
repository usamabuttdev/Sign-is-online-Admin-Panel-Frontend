import { TableCell, TableRow, Tooltip } from "@mui/material";
import PropTypes from "prop-types";
import { formatDate } from "src/utils/format-time";
import Label from "src/components/label";

export default function DevicesTableRow({ row, selected }) {
  const { id, device_id, location, hardware_type, firmware_version, status, last_heartbeat, created_at } = row;
  const { display: createdDisplay, full: createdFull } = created_at ? formatDate(created_at) : { display: "-", full: "" };
  const { display: heartbeatDisplay, full: heartbeatFull } = last_heartbeat ? formatDate(last_heartbeat) : { display: "-", full: "" };

  return (
    <TableRow hover selected={selected}>
      <TableCell align="center">{id}</TableCell>
      <TableCell>{device_id}</TableCell>
      <TableCell>{location || '-'}</TableCell>
      <TableCell align="center">{hardware_type}</TableCell>
      <TableCell align="center">{firmware_version || '-'}</TableCell>
      <TableCell align="center">
        <Label variant="soft" color={status === 'active' ? 'success' : status === 'inactive' ? 'warning' : 'error'}>
          {status}
        </Label>
      </TableCell>
      <TableCell align="center">
        <Tooltip title={heartbeatFull} arrow>{heartbeatDisplay}</Tooltip>
      </TableCell>
      <TableCell align="center">
        <Tooltip title={createdFull} arrow>{createdDisplay}</Tooltip>
      </TableCell>
      <TableCell align="center"> -- </TableCell>
    </TableRow>
  );
}

DevicesTableRow.propTypes = {
  row: PropTypes.object.isRequired,
  selected: PropTypes.bool,
};
