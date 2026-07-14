import React from "react";
import PropTypes from "prop-types";
import { TableRow, TableCell, IconButton, Tooltip } from "@mui/material";
import Iconify from "src/components/iconify";
import { Link } from "react-router-dom";
import { paths } from "src/routes/paths";
import { formatDate } from "src/utils/format-time";
import { fNumber } from "src/utils/format-number";
import Label from "src/components/label";

export default function MetricsTableRow({ row, selected, onEdit }) {
  const { id, title, current_value, goal, percent_of_goal, created_at, frequency, met_units } = row;
  const { display, full } = formatDate(created_at);

  const getPercentBgColor = (percent) => {
    if (percent >= 100) return "success";
    if (percent >= 80) return "default";
    if (percent >= 60) return "warning";
    return "error";
  };

  const formatWithUnits = (value, met_units) => {
    if (met_units === "$") return `$${fNumber(value)}`;
    if (met_units) return `${fNumber(value)}${met_units}`;
    return fNumber(value);
  };

  return (
    <TableRow hover selected={selected}>
      <TableCell align="center">{id}</TableCell>
      <TableCell>{title}</TableCell>
      <TableCell align="center">{frequency === "D" ? "This Month" : "Last Month"}</TableCell>
      <TableCell align="right">
        {formatWithUnits(current_value, met_units)}
      </TableCell>
      <TableCell align="right">
        {formatWithUnits(goal, met_units)}
      </TableCell>
      <TableCell align="center">
        <Label variant="soft" color={getPercentBgColor(percent_of_goal)}>
          {percent_of_goal}%
        </Label>
      </TableCell>

      <TableCell align="center">
        {display}
      </TableCell>

      <TableCell sx={{ whiteSpace: "nowrap", textAlign: "center" }}>
        <Link
          style={{ color: "inherit", textDecoration: "none" }}
          to={`${paths.dashboard.metrics.profile}/${id}`}
        >
          <Tooltip title="View Metric Profile">
            <IconButton color="inherit">
              <Iconify icon="solar:eye-bold" width={24} />
            </IconButton>
          </Tooltip>
        </Link>

        <Tooltip title="Edit" placement="top" arrow>
          <IconButton onClick={onEdit} aria-label="Edit metric">
            <Iconify icon="solar:pen-bold" />
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
  );
}

MetricsTableRow.propTypes = {
  row: PropTypes.object.isRequired,
  selected: PropTypes.bool,
  onEdit: PropTypes.func,
};
