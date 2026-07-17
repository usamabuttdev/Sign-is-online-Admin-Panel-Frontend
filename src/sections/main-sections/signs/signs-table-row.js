import { TableCell, TableRow, Tooltip, IconButton } from "@mui/material";
import PropTypes from "prop-types";
import { formatDate } from "src/utils/format-time";
import Label from "src/components/label";
import Iconify from "src/components/iconify";
import SoftDeleteButton from "src/components/soft-delete-button";
import { useDeleteDeviceMutation } from "src/store/Reducer/devices";
import { paths } from "src/routes/paths";
import { useRouter } from "src/routes/hooks";

export default function SignsTableRow({ row, selected, onEdit }) {
  const {
    id,
    device_id,
    location,
    hardware_type,
    firmware_version,
    status,
    last_heartbeat,
    created_at,
  } = row;
  const { display: createdDisplay, full: createdFull } = created_at
    ? formatDate(created_at)
    : { display: "-", full: "" };
  const { display: heartbeatDisplay, full: heartbeatFull } = last_heartbeat
    ? formatDate(last_heartbeat)
    : { display: "-", full: "" };
  const [deleteDevice] = useDeleteDeviceMutation();
  const router = useRouter();

  return (
    <TableRow hover selected={selected}>
      <TableCell align="center">{id}</TableCell>
      <TableCell>{device_id}</TableCell>
      <TableCell>{location || "-"}</TableCell>
      <TableCell align="center">{hardware_type}</TableCell>
      <TableCell align="center">{firmware_version || "-"}</TableCell>
      <TableCell align="center">
        <Label
          variant="soft"
          color={status === "active" ? "success" : status === "inactive" ? "warning" : "error"}
        >
          {status}
        </Label>
      </TableCell>
      <TableCell align="center">
        <Tooltip title={heartbeatFull} arrow>
          {heartbeatDisplay}
        </Tooltip>
      </TableCell>
      <TableCell align="center">
        <Tooltip title={createdFull} arrow>
          {createdDisplay}
        </Tooltip>
      </TableCell>
      <TableCell align="center" sx={{ whiteSpace: "nowrap" }}>
        {onEdit && (
          <Tooltip title="Edit" placement="top" arrow>
            <IconButton onClick={onEdit} aria-label="Edit sign">
              <Iconify icon="solar:pen-bold" />
            </IconButton>
          </Tooltip>
        )}
        <Tooltip title="View" placement="top" arrow>
          <IconButton
            onClick={() => router.push(`${paths.dashboard.signs.profile}/${id}`)}
            aria-label="View sign"
          >
            <Iconify icon="solar:eye-bold" />
          </IconButton>
        </Tooltip>
        <SoftDeleteButton
          deleteMutation={deleteDevice}
          id={id}
          label={device_id}
          entityName="sign"
        />
      </TableCell>
    </TableRow>
  );
}

SignsTableRow.propTypes = {
  row: PropTypes.object.isRequired,
  selected: PropTypes.bool,
  onEdit: PropTypes.func,
};
