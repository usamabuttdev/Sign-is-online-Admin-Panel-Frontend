import { TableCell, TableRow } from "@mui/material";
import PropTypes from "prop-types";
import { formatDate } from "src/utils/format-time";

export default function ProductsTableRow({ row, selected }) {
  const { id, title, subscription_length, status, created_at } = row;
  const { display } = created_at ? formatDate(created_at) : { display: '' };

  return (
    <TableRow hover selected={selected}>
      <TableCell align="center">{id}</TableCell>
      <TableCell>{title}</TableCell>
      <TableCell align="center">{subscription_length}</TableCell>
      <TableCell align="center">{status}</TableCell>
      <TableCell align="center">{display}</TableCell>
    </TableRow>
  );
}

ProductsTableRow.propTypes = {
  row: PropTypes.object.isRequired,
  selected: PropTypes.bool,
};
