import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { formatDate } from 'src/utils/format-time';
import { Tooltip } from '@mui/material';

export default function HistoryTableRow({ row, selected, index ,counter }) {
  const {object, user, message , date} = row 
  const {full , display} = formatDate(date)
  return (
    <TableRow hover selected={selected}>
      <TableCell align="center">{counter}</TableCell>
      <TableCell>{object}</TableCell>
      <TableCell>{user}</TableCell>
      <TableCell>{message}</TableCell>
      <TableCell align="center">
        <Tooltip title={full} arrow>
            {display}
          </Tooltip>
      </TableCell>
      {/* <TableCell>{row.product}</TableCell>
      <TableCell >{row.quantity}</TableCell>
      <TableCell >${row.price.toFixed(2)}</TableCell>
      <TableCell >${row.total.toFixed(2)}</TableCell>
      <TableCell>{row.paymentMethod}</TableCell> */}
      {/* <TableCell>
        <Label color={row.status === 'Paid' ? 'success' : 'warning'}>
          {row.status}
        </Label>
      </TableCell> */}
    </TableRow>
  );
}
