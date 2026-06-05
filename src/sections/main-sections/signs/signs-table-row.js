import { TableCell, TableRow, Tooltip } from "@mui/material";
import PropTypes from "prop-types";
import { useRouter } from "src/routes/hooks";
import { paths } from "src/routes/paths";
import { formatDate } from "src/utils/format-time";

export default function SignsTableRow({ row, selected }) {
  const { id, account, locations, created_at } = row;
  const {display , full} = formatDate(created_at);
  const router = useRouter();

  return (
    <TableRow hover selected={selected}>
      <TableCell align="center">{id}</TableCell>
      <TableCell
          onClick={() => router.push(`${paths.dashboard.accounts.profile}/${id}`)}
          sx={{ cursor: "pointer" }}
        >
          <Tooltip title={"View Account Profile"} arrow>
            <span>{account}</span>
          </Tooltip>
        </TableCell>

        <TableCell
          sx={{ cursor: "pointer" }}
          onClick={() => router.push(`${paths.dashboard.locations.profile}/1`)}
        >
          <Tooltip title={"View Location Profile"} arrow>
            <span>{locations}</span>
          </Tooltip>
        </TableCell>
      <TableCell align="center">
        <Tooltip title={full} arrow>
         {display}
        </Tooltip>
      </TableCell>
      <TableCell align="center"> -- </TableCell>
    </TableRow>
  );
}

SignsTableRow.propTypes = {
  row: PropTypes.object.isRequired,
  selected: PropTypes.bool,
};
