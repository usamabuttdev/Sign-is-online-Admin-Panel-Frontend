import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Label from 'src/components/label';

const SalesTableRow = ({ row, selected }) => {
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
            </TableRow>
        </>
    )
}

export default SalesTableRow