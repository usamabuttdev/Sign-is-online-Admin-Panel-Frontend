import PropTypes from 'prop-types';
// @mui
import { Card, CardHeader, Divider, Table, TableBody, TableCell, TableContainer, TableRow, Tooltip } from '@mui/material';
import Scrollbar from 'src/components/scrollbar';
import { TableHeadCustom, TableNoData, TablePaginationCustom, useTable } from 'src/components/table';
import { formatDate } from 'src/utils/format-time';

// ----------------------------------------------------------------------

export default function ProfileLogsTable() {
  const table = useTable();

  // Sample logs array defined inside the component
  const logs = [
    { process_time: '0', count: 5, server: 'Server 1', detail: 'Process completed successfully' },
    { process_time: '2', count: 3, server: 'Server 2', detail: 'Minor error occurred' },
    { process_time: '0', count: 8, server: 'Server 1', detail: 'Processed batch jobs' },
    { process_time: '1', count: 1, server: 'Server 3', detail: 'Scheduled task started' },
    { process_time: '1', count: 4, server: 'Server 2', detail: 'Completed manual process' },
  ];

  const tableLabels = [
    { id: 'id', label: 'ID', width: 30 },
    { id: 'process_time', label: 'Process Time' , align:"center"},
    { id: 'count', label: 'Count' , align:"center" },
    { id: 'server', label: 'Server' },
    { id: 'detail', label: 'Log Detail' },
    // { id: 'action', label: 'Action', width: 88 },
  ];

  const notFound = logs.length === 0;

  return (
    <Card>
      <CardHeader title="Last 10 Logs" sx={{ mb: 3 }} />

      <TableContainer sx={{ overflow: 'unset' }}>
        <Scrollbar>
          <Table sx={{ minWidth: 680 }}>
            <TableHeadCustom headLabel={tableLabels} />
            <TableBody>
              {logs.slice(table.page * table.rowsPerPage, (table.page + 1) * table.rowsPerPage).map((row, idx) => (
                <LogsTableRow key={idx} row={row} counter={idx + 1 + table.page * table.rowsPerPage} />
              ))}
              {notFound && <TableNoData notFound={notFound} />}
            </TableBody>
          </Table>
        </Scrollbar>
      </TableContainer>

      <Divider sx={{ borderStyle: 'dashed' }} />
      <TablePaginationCustom
        count={logs.length}
        page={table.page}
        rowsPerPage={table.rowsPerPage}
        onPageChange={table.onChangePage}
        onRowsPerPageChange={table.onChangeRowsPerPage}
      />
    </Card>
  );
}

// ----------------------------------------------------------------------

function LogsTableRow({ row, counter }) {
  return (
    <TableRow>
      <TableCell>{counter}</TableCell>
      <TableCell align='center'>
           {row?.process_time}
      </TableCell>
      <TableCell align="center">{row.count ?? '-'}</TableCell>
      <TableCell>{row.server || '-'}</TableCell>
      <TableCell>{row.detail || '-'}</TableCell>
    </TableRow>
  );
}

LogsTableRow.propTypes = {
  row: PropTypes.object,
  counter: PropTypes.number,
};
