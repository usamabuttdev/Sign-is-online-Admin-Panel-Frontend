import { TableCell, TableRow, Tooltip } from "@mui/material";
import PropTypes from "prop-types";
import { fNumber } from "src/utils/format-number";
import { formatDate } from "src/utils/format-time";

export default function ProductsTableRow({ row, selected }) {
  const { id, title, current_price, current_price_ends, next_price, next_price_starts , locations } = row;
  const { display, full } =formatDate( current_price_ends);
  const { display: nextDisplay, full: nextFull } =formatDate(next_price_starts);

  return (
    <TableRow hover selected={selected}>
      <TableCell align="center">{id}</TableCell>
      <TableCell >{title}</TableCell>
      <TableCell align="right">{current_price}</TableCell>
      <TableCell align="center">
         {display}
      </TableCell>
      <TableCell align="right">
        {next_price}
      </TableCell>
      <TableCell align="center">
         {nextDisplay}
        </TableCell>
      <TableCell align="right">{fNumber(locations)}</TableCell>
      <TableCell align="center">--</TableCell>

      {/* Action Column */}
      {/* <TableCell sx={{ px: 1, whiteSpace: "nowrap" }}>
        <Tooltip title="Quick Edit" placement="top" arrow>
          <IconButton>
            <Iconify icon="solar:pen-bold" />
          </IconButton>
        </Tooltip>
        <Link style={{ color: "inherit", textDecoration: "none" }} to={`${paths.dashboard.products.profile}/${id}`}>
          <IconButton color="inherit">
            <Iconify icon="solar:eye-bold" width={24} />
          </IconButton>
        </Link>
      </TableCell> */}
    </TableRow>
  );
}

ProductsTableRow.propTypes = {
  row: PropTypes.object.isRequired,
  selected: PropTypes.bool,
};
