import PropTypes from 'prop-types';
// @mui
import { Card, CardHeader, Divider, Table, TableBody, TableCell, TableContainer, TableRow, Tooltip } from '@mui/material';
import Scrollbar from 'src/components/scrollbar';
import { TableHeadCustom, TableNoData, TablePaginationCustom, useTable } from 'src/components/table';
import { formatDate } from 'src/utils/format-time';

export default function ProfileLogsTable({ logs = [] }) {
  const table = useTable();

  const tableLabels = [
    { id: 'id', label: 'ID', width: 30 },
    { id: 'process_time', label: 'Process Time', align:"center"},
    { id: 'count', label: 'Count', align:"center" },
    { id: 'server', label: 'Server' },
    { id: 'detail', label: 'Log Detail' },
  ];

  const notFound = logs.length === 0;

  const pagedLogs = logs.slice(
    table.page * table.rowsPerPage,
    (table.page + 1) * table.rowsPerPage
  );

  return (
    <Card>
      <CardHeader title="Last 10 Logs" sx={{ mb: 3 }} />
      <TableContainer sx={{ overflow: 'unset' }}>
        <Scrollbar>
          <Table sx={{ minWidth: 680 }}>
            <TableHeadCustom headLabel={tableLabels} />
            <TableBody>
              {pagedLogs.map((row, idx) => (
                <LogsTableRow
                  key={row.log_id || idx}
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
        count={logs.length || 1}
        page={table.page}
        rowsPerPage={table.rowsPerPage}
        onPageChange={table.onChangePage}
        onRowsPerPageChange={table.onChangeRowsPerPage}
      />
    </Card>
  );
}

function LogsTableRow({ row, counter }) {
  const processTimeDisplay = row.process_time != null ? `${row.process_time}s` : '-';
  return (
    <TableRow>
      <TableCell>{counter}</TableCell>
      <TableCell align='center'>
        {processTimeDisplay}
      </TableCell>
      <TableCell align="center">{row.process_count ?? row.count ?? '-'}</TableCell>
      <TableCell>{row.server || '-'}</TableCell>
      <TableCell>{row.log_detail || row.detail || '-'}</TableCell>
    </TableRow>
  );
}

LogsTableRow.propTypes = {
  row: PropTypes.object,
  counter: PropTypes.number,
};

ProfileLogsTable.propTypes = {
  logs: PropTypes.array,
};
