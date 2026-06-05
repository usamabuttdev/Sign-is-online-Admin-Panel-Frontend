import React from "react";
import PropTypes from "prop-types";
import { TableRow, TableCell, IconButton, Tooltip } from "@mui/material";
import Iconify from "src/components/iconify";
import { Link } from "react-router-dom";
import { paths } from "src/routes/paths";
import Label from "src/components/label";
import { formatDate } from "src/utils/format-time";
import { useRouter } from "src/routes/hooks";

export default function LocationsTableRow({ row, selected }) {
  const {
    id,
    title,
    account,
    authenticated,
    sign_exists,
    platforms_count,
    product,
    city,
    state,
    created_at,
    subscription
  } = row;
  const {display , full} = formatDate(created_at);
  const router= useRouter();

  return (
    <TableRow hover selected={selected}>
      <TableCell align="center">{id}</TableCell>
      <TableCell>{title}</TableCell>
      <TableCell onClick={()=> router.push(`${paths.dashboard.accounts.profile}/${id}`)} sx={{ cursor:"pointer" }}>
        <Tooltip title="View Account Profile" >
          {account}
        </Tooltip>
      </TableCell>
      <TableCell align="center">
        <Label variant="soft"  color={authenticated === "Yes" ? "success" :"default" }>
         {authenticated}
        </Label>
      </TableCell>
      <TableCell align="center">
        <Label variant="soft" color={sign_exists === "Yes" ? "success" :"default" }>
         {sign_exists}
        </Label>
      </TableCell>
      <TableCell align="center">{platforms_count}</TableCell>
      <TableCell>{product}</TableCell>
      <TableCell align="center">
        <Label variant="soft" color={subscription ? "success" :"default" }>
          {subscription ?  "Yes" : "No" }
        </Label>
      </TableCell>
      <TableCell>{`${city} , ${state}`}</TableCell>
      <TableCell align="center">
        <Tooltip title={full} arrow>
          {display}
        </Tooltip>
      </TableCell>
      {/* Action Column */}
      <TableCell sx={{  whiteSpace: "nowrap" , textAlign:"center" }}>
        {/* <Tooltip title="Quick Edit" placement="top" arrow>
          <IconButton>
            <Iconify icon="solar:pen-bold" />
          </IconButton>
        </Tooltip> */}
        <Link style={{ color: "inherit", textDecoration: "none" }} to={`${paths.dashboard.locations.profile}/${id}`}>
        <Tooltip title="View Location Profile">
          <IconButton color="inherit">
            <Iconify icon="solar:eye-bold" width={24} />
          </IconButton>
        </Tooltip>
        </Link>
      </TableCell>
    </TableRow>
  );
}

LocationsTableRow.propTypes = {
  row: PropTypes.object.isRequired,
  selected: PropTypes.bool,
};
