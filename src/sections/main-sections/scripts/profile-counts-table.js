import PropTypes from 'prop-types';
// @mui
import { Card, CardHeader, Divider, Table, TableBody, TableCell, TableContainer, TableRow, Tooltip } from '@mui/material';
import Scrollbar from 'src/components/scrollbar';
import { TableHeadCustom, TableNoData, TablePaginationCustom, useTable } from 'src/components/table';
import { formatDate } from 'src/utils/format-time';

export default function ProfileCountsTable({ counts = [] }) {
  const table = useTable();

  const tableLabels = [
    { id: 'id', label: 'ID', width: 30 },
    { id: 'time', label: 'Count Time', align:"center"},
    { id: 'value', label: 'Count Value', align:"center" },
  ];

  const notFound = counts.length === 0;

  const pagedCounts = counts.slice(
    table.page * table.rowsPerPage,
    (table.page + 1) * table.rowsPerPage
  );

  return (
    <Card>
      <CardHeader title="Last 10 Counts" sx={{ mb: 3 }} />
      <TableContainer sx={{ overflow: 'unset' }}>
        <Scrollbar>
          <Table sx={{ minWidth: 480 }}>
            <TableHeadCustom headLabel={tableLabels} />
            <TableBody>
              {pagedCounts.map((row, idx) => (
                <CountsTableRow
                  key={idx}
                  row={row}
                  counter={idx + 1 + table.page * table.rowsPerPage}
                />
              ))}
              {notFound && <TableNoData notFound={notFound} />}
            </TableBody>
          </Table>
        </Scrollbar>
      </TableContainer>
      <Divider sx={{ borderStyle: 'dashed' }} />
      <TablePaginationCustom
        count={counts.length || 1}
        page={table.page}
        rowsPerPage={table.rowsPerPage}
        onPageChange={table.onChangePage}
        onRowsPerPageChange={table.onChangeRowsPerPage}
      />
    </Card>
  );
}

function CountsTableRow({ row, counter }) {
  return (
    <TableRow>
      <TableCell>{counter}</TableCell>
      <TableCell align='center'>
        <Tooltip title={row.time ? formatDate(row.time).full : ''} arrow>
          {row.time ? formatDate(row.time).display : '-'}
        </Tooltip>
      </TableCell>
      <TableCell align='center'>{row.value ?? '-'}</TableCell>
    </TableRow>
  );
}

CountsTableRow.propTypes = {
  row: PropTypes.object,
  counter: PropTypes.number,
};

ProfileCountsTable.propTypes = {
  counts: PropTypes.array,
};
