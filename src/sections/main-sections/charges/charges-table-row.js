import React from "react";
import PropTypes from "prop-types";
import { TableRow, TableCell, IconButton, Tooltip, Button } from "@mui/material";
import Iconify from "src/components/iconify";
import { Link } from "react-router-dom";
import { paths } from "src/routes/paths";
import Label from "src/components/label";
import { formatDate } from "src/utils/format-time";
import { ConfirmDialog } from "src/components/custom-dialog";
import { useBoolean } from "src/hooks/use-boolean";
import { useRouter } from "src/routes/hooks";

export default function ChargesTableRow({ row, selected }) {
  const { id, account_id, account, amount, method, created_at , status} = row;
  const formattedAmount = amount != null
    ? `$${Number(amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
    : '$0.00';
  const {full , display} = formatDate(created_at)
  const confirm = useBoolean();
  const router = useRouter();

  const COLORS = {
    Attempted:"warning",
    Successful:"success",
    Refunded:"info"
  }

  return (
    <>
    <TableRow hover selected={selected}>
      <TableCell align="center">{id}</TableCell>
      <TableCell onClick={()=> router.push(`${paths.dashboard.accounts.profile}/${account_id || id}`)} sx={{ cursor:"pointer" }}>
        <Tooltip title="View Account Profile">
          {account}
        </Tooltip>
        </TableCell>
        <TableCell align="right">{formattedAmount}</TableCell>
      <TableCell>{method}</TableCell>
      <TableCell align="center">
        <Tooltip title={full}>
         {display}
       </Tooltip>
      </TableCell>
      <TableCell align="center">
        <Label variant="soft" color={COLORS[status]}>
            {status}
        </Label>
      </TableCell>

      <TableCell sx={{ whiteSpace: "nowrap", textAlign: "center" }}>
        <Tooltip title="Refund this charge" placement="top" arrow onClick={confirm.onTrue}>
          <span>
            <IconButton
              sx={{ visibility: status === "Successful" ? "visible" : "hidden" }}
            >
              <Iconify icon="mingcute:card-refund-fill" />
            </IconButton>
          </span>
        </Tooltip>

        <Tooltip title="View Charge Profile" placement="top" arrow 
            onClick={() =>router.push(`${paths?.dashboard?.charges?.profile}/${id}`, { state: { charge: row } })}
            style={{ color: "inherit", textDecoration: "none" }}
        >
          <IconButton color="inherit"  onClick={() =>
            router.push(`${paths?.dashboard?.charges?.profile}/${id}`, { state: { charge: row } })
          }>
            <Iconify icon="solar:eye-bold" width={24} />
          </IconButton>
        </Tooltip>
      </TableCell>
     </TableRow>
      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Refund Charge"
        content="Are you sure to refund the charge?"
        action={
          <Button variant="contained"  onClick={confirm.onFalse}>
            Refund
          </Button>
        }
      />
    </>
  );
}

ChargesTableRow.propTypes = {
  row: PropTypes.object.isRequired,
  selected: PropTypes.bool,
};
