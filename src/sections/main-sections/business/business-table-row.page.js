import PropTypes from 'prop-types';
// @mui
import IconButton from '@mui/material/IconButton';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Tooltip from '@mui/material/Tooltip';
// hooks
// components
import Iconify from 'src/components/iconify';
import Label from 'src/components/label';
import { useRouter } from 'src/routes/hooks';
import { fDate } from 'src/utils/format-time';
//

// ----------------------------------------------------------------------

export default function BusinessTableRow({ row, selected, onEditRow, onDeleteRow, handleStatusChange }) {
    const { name, location, id, owner, associatedusers, createdAt, status } = row;

    const router = useRouter();

    return (
        <>
            <TableRow hover selected={selected} sx={{ cursor: "pointer" }} onClick={() => router.push(`/dashboard/business/${id}`)}>
                <TableCell >{id.slice(0, 20)} </TableCell>
                <TableCell sx={{ whiteSpace: 'nowrap' }}>{name}</TableCell>
                <TableCell >{location}</TableCell>
                <TableCell sx={{ whiteSpace: 'nowrap' }}>{name}</TableCell>
                <TableCell sx={{ whiteSpace: 'nowrap' }}>{fDate(createdAt)}</TableCell>
                <TableCell align='center' sx={{ whiteSpace: 'nowrap' }}>5</TableCell>
                <TableCell sx={{ whiteSpace: 'nowrap' }}>
                    <Label sx={{ cursor: "pointer" }} color={(status === 'active' && 'success') || (status === 'inactive' && 'warning') || 'default'} onClick={handleStatusChange}>
                        {status}
                    </Label>
                </TableCell>
                <TableCell >
                    <Tooltip title="Sign" placement="top" arrow>
                        <IconButton color={'default'} onClick={(e) => { e.stopPropagation(); router.push(`/dashboard/business/sign`) }}>
                            <Iconify icon="basil:at-sign-outline" />
                        </IconButton>
                    </Tooltip>

                </TableCell>
                <TableCell align="right" sx={{ px: 1, whiteSpace: 'nowrap' }}>
                    <Tooltip title="Detail" placement="top" arrow>
                        <IconButton color={'default'} onClick={() => router.push(`/dashboard/business/${id}`)}>
                            <Iconify icon="mdi:eye" />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Quick Edit" placement="top" arrow>
                        <IconButton color={'default'} onClick={(e) => { e.stopPropagation(); onEditRow(); }}>
                            <Iconify icon="solar:pen-bold" />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete" placement="top" arrow>
                        <IconButton color={'error'} onClick={(e) => { e.stopPropagation(); onDeleteRow(); }}>
                            <Iconify icon="solar:trash-bin-trash-bold" />
                        </IconButton>
                    </Tooltip>
                </TableCell>
            </TableRow>
        </>
    );
}

BusinessTableRow.propTypes = {
    onDeleteRow: PropTypes.func,
    onEditRow: PropTypes.func,
    onSelectRow: PropTypes.func,
    row: PropTypes.object,
    selected: PropTypes.bool,
};
