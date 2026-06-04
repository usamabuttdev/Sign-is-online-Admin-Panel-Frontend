import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import { visuallyHidden } from '@mui/utils';
import { Card, CircularProgress, ListItemText, Pagination } from '@mui/material';
import { useSettingsContext } from "src/components/settings";
import { TableNoData } from 'src/components/table';


const headCells = [
    {
        id: 'name',
        numeric: true,
        disablePadding: false,
        label: 'Name',
    },
    {
        id: 'subject',
        numeric: true,
        disablePadding: false,
        label: 'Subject',
    },
    {
        id: 'message',
        numeric: true,
        disablePadding: false,
        label: 'Message',
    },
];

function EnhancedTableHead(props) {
    const { order, orderBy, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={'left'}
                        padding={'10px'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

export default function ContactForm({ totalContacts, status, handleChangePage, page }) {

    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('calories');


    const handleRequestSort = (property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };
    const settings = useSettingsContext();


    const notFound = !totalContacts?.data?.length


    return (
        <Box>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '20px 0' }}>
                </Box>
                <Card>
                    <TableContainer>
                        <Table
                            sx={{ minWidth: 750 }}
                            aria-labelledby="tableTitle"
                        >
                            <EnhancedTableHead
                                order={order}
                                orderBy={orderBy}
                                onRequestSort={handleRequestSort}
                                rowCount={totalContacts?.data?.length}
                            />
                            {status === 'pending' ?
                                (
                                    <TableRow>
                                        <TableCell colSpan={12} sx={{ textAlign: 'center', height: "28rem" }}>
                                            <CircularProgress />
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    <TableBody>
                                        {totalContacts?.data?.length > 0 ? totalContacts?.data?.map((row, idx) => (
                                            <TableRow
                                                hover
                                                role="checkbox"
                                                tabIndex={-1}
                                                key={row._id}
                                                sx={{ cursor: 'pointer' }}
                                            >
                                                <TableCell
                                                    component="th"
                                                    scope="row"
                                                    padding="10px"
                                                >
                                                    {idx + 1}
                                                </TableCell>
                                                <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
                                                    <ListItemText
                                                        secondary={row.name}
                                                        primary={row.email}
                                                        primaryTypographyProps={{ typography: 'body2' }}
                                                        secondaryTypographyProps={{
                                                            component: 'span',
                                                            color: 'text.disabled',
                                                        }}
                                                    />
                                                </TableCell>
                                                <TableCell>{row.subject}</TableCell>
                                                <TableCell>{row.message}</TableCell>
                                            </TableRow>
                                        )) : (
                                            <TableNoData notFound={notFound} />
                                        )}
                                    </TableBody>
                                )}
                        </Table>
                    </TableContainer>
                    <Box display={'flex'} justifyContent={'center'} mt={'10px'} mb={'10px'}>
                        <Pagination count={totalContacts?.total_pages} page={page} onChange={handleChangePage} />
                    </Box>
                </Card>
            </Paper>
        </Box>
    );
}