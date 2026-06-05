import { useState } from 'react';
import {
  Box, Button, Card, CardHeader, Divider, IconButton, Table, TableBody, TableCell,
  TableContainer, TableRow, Tooltip, Typography,
} from '@mui/material';
import { ConfirmDialog } from 'src/components/custom-dialog';
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import { TableHeadCustom, TablePaginationCustom, useTable } from 'src/components/table';
import { useBoolean } from 'src/hooks/use-boolean';
import TodayHourForm from './today-hour-form';

const headLabel = [
  { id: 'startTime', label: 'Open Time', minWidth: 120 },
  { id: 'endTime', label: 'Close Time', minWidth: 120 },
  { id: 'action', label: 'Action', align: 'center', width: 120 },
];

const initialSchedule = [
  { id: 1, day: 'Monday', startTime: '09:00AM', endTime: '05:00PM', status: 'Open' },
  { id: 2, day: 'Tuesday', startTime: '09:00AM', endTime: '05:00PM', status: 'Open' },
  { id: 3, day: 'Wednesday', startTime: '09:00AM', endTime: '05:00PM', status: 'Open' },
];

function ScheduleRow({ item, onEdit, onDelete }) {
  return (
    <TableRow hover>
      <TableCell>{item.startTime ? item.startTime : ' -- '}</TableCell>
      <TableCell>{item.endTime ? item.endTime : ' -- '}</TableCell>
      <TableCell align="center">
        <Tooltip title="Edit" placement="top" arrow>
          <IconButton color="default" onClick={() => onEdit(item)}>
            <Iconify icon="solar:pen-bold" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete" placement="top" arrow>
          <IconButton color="error" onClick={() => onDelete(item.id)}>
            <Iconify icon="solar:trash-bin-trash-bold" />
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
  );
}

export default function TodayHour() {
  const [schedule, setSchedule] = useState(initialSchedule);
  const [currentRow, setCurrentRow] = useState(null);
  const [deleteId, setDeleteId] = useState(null); // ✅ keep id to delete

  const openForm = useBoolean();
  const confirmDialog = useBoolean();
  const table = useTable();

  const handleAdd = () => {
    setCurrentRow(null);
    openForm.onTrue();
  };

  const handleEdit = (row) => {
    setCurrentRow(row);
    openForm.onTrue();
  };

  const askDelete = (id) => {
    setDeleteId(id);          // ✅ store id
    confirmDialog.onTrue();   // open confirm dialog
  };

  const handleDelete = (id) => {
    setSchedule((prev) => prev.filter((s) => s.id !== id));
    confirmDialog.onFalse();
    setDeleteId(null);
  };

  const handleSubmit = (data) => {
    if (currentRow) {
      setSchedule((prev) => prev.map((s) => (s.id === currentRow.id ? { ...s, ...data } : s)));
    } else {
      setSchedule((prev) => [...prev, { id: Date.now(), ...data }]);
    }
  };

  // ✅ paginate rows
  const start = table.page * table.rowsPerPage;
  const end = start + table.rowsPerPage;
  const pageRows = schedule.slice(start, end);

  return (
    <>
      <Card>
        <CardHeader
          title={
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
                <Iconify icon="solar:calendar-line-duotone" sx={{ mr: 1 }} />
                Today's Hours
              </Typography>

              <Button variant="contained" color="primary" onClick={handleAdd}>
                Add Hours
              </Button>
            </Box>
          }
        />

        <TableContainer sx={{ overflow: 'unset' }}>
          <Scrollbar>
            <Table sx={{ minWidth: 1100 }} size={table.dense ? 'small' : 'medium'}>
              <TableHeadCustom headLabel={headLabel} />
              <TableBody>
                {pageRows.map((day) => (
                  <ScheduleRow key={day.id} item={day} onEdit={handleEdit} onDelete={askDelete} />
                ))}
              </TableBody>
            </Table>
          </Scrollbar>
        </TableContainer>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <TablePaginationCustom
          count={schedule.length}
          page={table.page}
          rowsPerPage={table.rowsPerPage}
          onPageChange={table.onChangePage}
          onRowsPerPageChange={table.onChangeRowsPerPage}
        />
      </Card>

      <TodayHourForm
        open={openForm.value}
        onClose={() => {
          openForm.onFalse();
          setCurrentRow(null);
        }}
        onSubmit={handleSubmit}
        isEdit={!!currentRow}
        currentRow={currentRow}
      />

      <ConfirmDialog
        open={confirmDialog.value}
        onClose={() => {
          confirmDialog.onFalse();
          setDeleteId(null);
        }}
        action={
          <Button variant="contained" color="error" onClick={() => handleDelete(deleteId)}>
            Delete
          </Button>
        }
        title="Delete Working Hour"
        content="Are you sure you want to delete this working hour?"
      />
    </>
  );
}
