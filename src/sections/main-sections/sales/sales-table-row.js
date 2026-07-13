import React from "react";
import PropTypes from "prop-types";
import { TableRow, TableCell, Tooltip, IconButton } from "@mui/material";
import Label from "src/components/label";
import Iconify from "src/components/iconify";

const SalesTableRow = ({ row, selected, onEdit }) => {
    return (
        <>
            <TableRow hover selected={selected}>
                <TableCell>{row.saleId}</TableCell>
                <TableCell>{row.dateOfSale}</TableCell>
                <TableCell>{row.customerName}</TableCell>
                <TableCell>{row.productSold}</TableCell>
                <TableCell>{row.quantity}</TableCell>
                <TableCell>{row.pricePerUnit}</TableCell>
                <TableCell>{row.totalAmount}</TableCell>
                <TableCell>{row.paymentMethod}</TableCell>
                <TableCell>
                    <Label
                        color={
                            row.status === 'paid'
                                ? 'success'
                                : row.status === 'pending'
                                    ? 'warning'
                                    : 'error'
                        }
                    >
                        {row.status}
                    </Label>
                </TableCell>

                <TableCell sx={{ px: 1, whiteSpace: "nowrap" }}>
                    <Tooltip title="Edit" placement="top" arrow>
                        <IconButton onClick={onEdit}>
                            <Iconify icon="solar:pen-bold" />
                        </IconButton>
                    </Tooltip>
                </TableCell>
            </TableRow>
        </>
    )
}

SalesTableRow.propTypes = {
    row: PropTypes.object,
    selected: PropTypes.bool,
    onEdit: PropTypes.func,
};

export default SalesTableRow
