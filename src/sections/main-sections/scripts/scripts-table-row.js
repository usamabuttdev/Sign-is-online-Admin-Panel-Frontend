import React from "react";
import PropTypes from "prop-types";
import { TableRow, TableCell, Tooltip, IconButton } from "@mui/material";
import { formatDate } from "src/utils/format-time";
import Iconify from "src/components/iconify";
import { useRouter } from "src/routes/hooks";
import { paths } from "src/routes/paths";
import Label from "src/components/label";

// Helper: decide background color for last_started
const getLastStartedBg = (run_frequency, last_started) => {
  if (!last_started) return "transparent";
  const last = new Date(last_started);
  if (isNaN(last.getTime())) return "transparent";
  const diffHours = (new Date() - last) / (1000 * 60 * 60);
  return {
    N: diffHours * 60 < 1 ? "error" : "success", // N = Never
    H: diffHours < 1 ? "error" : "success",
    D: diffHours < 24 ? "error" : "success",
    W: diffHours < 169 ? "error" : "success",
    M: diffHours < 745 ? "error" : "success",
    A: diffHours < 8761 ? "error" : "success",
  }[run_frequency] || "success";
};

export default function ScriptsTableRow({ row, selected }) {
  const {
    id,
    title,
    run_frequency,
    last_started,
    created_at,
    status,      
    last_checked,   
  } = row;

  const { display, full } = created_at ? formatDate(created_at) : { display: "-", full: "" };
  const { display: last_started_display, full: last_started_full } = last_started ? formatDate(last_started) : { display: "-", full: "" };
  const { display: last_checked_display, full: last_checked_full } = last_checked ? formatDate(last_checked) : { display: "-", full: "" };

  const lastStartedBg = getLastStartedBg(run_frequency, last_started);
  const router = useRouter();

  const RUN_FREQUENCY_LABELS = {
    N: "Now",
    H: "Hourly",
    D: "Daily",
    W: "Weekly",
    M: "Monthly",
    A: "Annually",
  };

  return (
    <TableRow hover selected={selected}>
      <TableCell align="center">{id}</TableCell>
      <TableCell>{title}</TableCell>
      <TableCell align="center">{RUN_FREQUENCY_LABELS[run_frequency]}</TableCell>

      {/* Last Started */}
      <TableCell align="center">
        <Tooltip title={last_started_full} arrow>
          <Label color={lastStartedBg} variant="soft">
             {last_started_display}
          </Label>
        </Tooltip>
      </TableCell>

      {/* Created */}
      <TableCell align="center">
        <Tooltip title={full} arrow>{display}</Tooltip>
      </TableCell>

      {/* Status */}
      <TableCell align="center">
        <Label variant="soft" color={status === "A" ? "success" : "error"} >
          {status === "A" ? "Active" : "Failed"}
        </Label>
      </TableCell>

      {/* Last Checked */}
      <TableCell align="center">
        <Tooltip title={last_checked_full} arrow>{last_checked_display}</Tooltip>
      </TableCell>

      {/* Actions */}
      <TableCell sx={{ whiteSpace: "nowrap"  }} align="center">
        <Tooltip title="View Script Profile" arrow>
          <IconButton onClick={() => router.push(`${paths.dashboard.scripts.profile}/${id}`)}>
            <Iconify icon="solar:eye-bold" width={24} />
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
  );
}

ScriptsTableRow.propTypes = {
  row: PropTypes.object.isRequired,
  selected: PropTypes.bool,
};
