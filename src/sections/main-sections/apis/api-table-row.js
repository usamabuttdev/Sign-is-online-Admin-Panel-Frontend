import { TableCell, TableRow, Tooltip } from "@mui/material";
import PropTypes from "prop-types";
import { fNumber } from "src/utils/format-number";
import { formatDate } from "src/utils/format-time";

export default function ApiTableRow({ row, selected }) {
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

ApiTableRow.propTypes = {
  row: PropTypes.object.isRequired,
  selected: PropTypes.bool,
};
