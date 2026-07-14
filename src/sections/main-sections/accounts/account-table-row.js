import { IconButton, TableCell, TableRow, Tooltip } from "@mui/material";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Iconify from "src/components/iconify";
import { useRouter } from "src/routes/hooks";
import { paths } from "src/routes/paths";
import { formatDate } from "src/utils/format-time";

export default function AccountTableRow({ row, selected, onEdit }) {
  const { id, title, locations, signs, users, total_charged, created_at } = row;
  const { display, full } = formatDate(created_at);
  const router = useRouter();

  return (
    <TableRow hover selected={selected}>
      <TableCell sx={{ whiteSpace: "nowrap" }} align="center">
        {id}
      </TableCell>
      <TableCell sx={{ whiteSpace: "nowrap" }}>{title}</TableCell>
      <TableCell sx={{ whiteSpace: "nowrap" }}>{locations}</TableCell>
      <TableCell
        sx={{ whiteSpace: "nowrap", cursor: "pointer" }}
        align="center"
        onClick={() => router.push(paths.dashboard.signs.root)}
      >
        <Tooltip title="View Signs">{signs}</Tooltip>
      </TableCell>
      <TableCell
        sx={{ whiteSpace: "nowrap", cursor: "pointer" }}
        align="center"
        onClick={() => router.push(paths.dashboard.users.root)}
      >
        <Tooltip title="View Users">{users}</Tooltip>
      </TableCell>
      <TableCell sx={{ whiteSpace: "nowrap" }} align="right">
        {total_charged}
      </TableCell>
      <TableCell sx={{ whiteSpace: "nowrap" }} align="center">
        <Tooltip title={full} arrow>
          {display}
        </Tooltip>
      </TableCell>

      <TableCell sx={{ whiteSpace: "nowrap" }} align="center">
        <Tooltip title="Edit" placement="top" arrow>
          <IconButton onClick={onEdit} aria-label="Edit account">
            <Iconify icon="solar:pen-bold" />
          </IconButton>
        </Tooltip>

        <Link
          to={`${paths.dashboard.accounts.profile}/${id}`}
          style={{ color: "inherit", textDecoration: "none" }}
        >
          <Tooltip title="View Account Profile">
            <IconButton color="inherit">
              <Iconify icon="solar:eye-bold" width={24} />
            </IconButton>
          </Tooltip>
        </Link>
      </TableCell>
    </TableRow>
  );
}

AccountTableRow.propTypes = {
  row: PropTypes.object.isRequired,
  selected: PropTypes.bool,
  onEdit: PropTypes.func,
};