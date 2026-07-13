import React from "react";
import PropTypes from "prop-types";
import { TableRow, TableCell, Tooltip, IconButton } from "@mui/material";
import Iconify from "src/components/iconify";
import { fNumber } from "src/utils/format-number";
import { formatDate } from "src/utils/format-time";
import { useRouter } from "src/routes/hooks";
import { paths } from "src/routes/paths";

export default function ProductsTableRow({ row, selected, onEdit }) {
  const { id, title, current_price, current_price_ends, next_price, next_price_starts, locations } = row;
  const { display, full } = formatDate(current_price_ends);
  const { display: nextDisplay, full: nextFull } = formatDate(next_price_starts);
  const router = useRouter();

  return (
    <TableRow hover selected={selected}>
      <TableCell align="center">{id}</TableCell>
      <TableCell>{title}</TableCell>
      <TableCell align="right">{current_price}</TableCell>
      <TableCell align="center">
        <Tooltip title={full} arrow>
          {display}
        </Tooltip>
      </TableCell>
      <TableCell align="right">
        {next_price}
      </TableCell>
      <TableCell align="center">
        <Tooltip title={nextFull} arrow>
          {nextDisplay}
        </Tooltip>
      </TableCell>
      <TableCell align="right">{fNumber(locations)}</TableCell>

      <TableCell sx={{ px: 1, whiteSpace: "nowrap" }}>
        <Tooltip title="Edit" placement="top" arrow>
          <IconButton onClick={onEdit}>
            <Iconify icon="solar:pen-bold" />
          </IconButton>
        </Tooltip>

        <Tooltip title="View" placement="top" arrow>
          <IconButton onClick={() => router.push(`${paths.dashboard.products.profile}/${id}`)}>
            <Iconify icon="solar:eye-bold" />
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
  );
}

ProductsTableRow.propTypes = {
  row: PropTypes.object.isRequired,
  selected: PropTypes.bool,
  onEdit: PropTypes.func,
};
