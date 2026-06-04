import PropTypes from 'prop-types';
// @mui
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Tooltip from '@mui/material/Tooltip';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
// components
import { ConfirmDialog } from 'src/components/custom-dialog';
import Iconify from 'src/components/iconify';
import Label from 'src/components/label';
import { fDate } from 'src/utils/format-time';
import { useRouter } from 'src/routes/hooks';
//

// ----------------------------------------------------------------------

export default function BusinessTableRow({ row, selected, onEditRow, onSelectRow, onDeleteRow, handleStatueChage }) {
    const { name, location, id, owner, associatedusers, createdAt, status } = row;

    const router = useRouter();
    const confirm = useBoolean();

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
                    <Label sx={{ cursor: "pointer" }} color={(status === 'active' && 'success') || (status === 'inactive' && 'warning') || 'default'} onClick={handleStatueChage}>
                        {status}
                    </Label>
                </TableCell>
                <TableCell >
                    <Tooltip title="Sign" placement="top" arrow>
                        <IconButton color={'default'} onClick={(e) => { e.stopPropagation(); router.push(`/dashboard/business/sign`) }}>
                            <Iconify icon="uim:sign-out" />
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
                        <IconButton color={'default'} onClick={onEditRow}>
                            <Iconify icon="solar:pen-bold" />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete" placement="top" arrow>
                        <IconButton color={'error'} onClick={confirm.onTrue}>
                            <Iconify icon="solar:trash-bin-trash-bold" />
                        </IconButton>
                    </Tooltip>
                </TableCell>
            </TableRow>
            <ConfirmDialog
                open={confirm.value}
                onClose={confirm.onFalse}
                title="Delete Business"
                content="Are you sure want to delete?"
                action={
                    <Button variant="contained" color="error" onClick={onDeleteRow}>
                        Delete
                    </Button>
                }
            />
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
