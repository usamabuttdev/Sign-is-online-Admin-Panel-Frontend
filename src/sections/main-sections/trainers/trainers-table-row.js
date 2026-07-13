import { TableCell, TableRow, Tooltip, IconButton } from "@mui/material";
import PropTypes from "prop-types";
import Iconify from "src/components/iconify";
import { formatDate } from "src/utils/format-time";

export default function TrainersTableRow({ row, selected, onEdit }) {
  const { id, name, specialization, email, phone, created_at } = row;
  const { display, full } = formatDate(created_at);

  return (
    <TableRow hover selected={selected}>
      <TableCell align="center">{id}</TableCell>
      <TableCell>{name}</TableCell>
      <TableCell>{specialization}</TableCell>
      <TableCell>{email}</TableCell>
      <TableCell>{phone}</TableCell>
      <TableCell align="center">
        <Tooltip title={full} arrow>{display}</Tooltip>
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

TrainersTableRow.propTypes = {
  row: PropTypes.object.isRequired,
  selected: PropTypes.bool,
  onEdit: PropTypes.func,
};
