import { TableCell, TableRow, Tooltip, IconButton } from "@mui/material";
import PropTypes from "prop-types";
import Iconify from "src/components/iconify";
import { fNumber } from "src/utils/format-number";
import { formatDate } from "src/utils/format-time";

export default function ApiTableRow({ row, selected, onEdit }) {
  const { id, title, calls_24h, calls_1h, queued_count, created_at } = row;
  const {display , full} = formatDate(created_at);

  return (
    <TableRow hover selected={selected}>
      <TableCell align="center">{id}</TableCell>
      <TableCell>{title}</TableCell>
      <TableCell align="right">{fNumber(calls_24h)}</TableCell>
      <TableCell align="right">{fNumber(calls_1h)}</TableCell>
      <TableCell align="right">{fNumber(queued_count)}</TableCell>
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

ApiTableRow.propTypes = {
  row: PropTypes.object.isRequired,
  selected: PropTypes.bool,
  onEdit: PropTypes.func,
};
