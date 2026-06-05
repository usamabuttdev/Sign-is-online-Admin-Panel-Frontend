import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Tooltip,
} from '@mui/material';
import { ConfirmDialog } from 'src/components/custom-dialog';
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import { TableHeadCustom, TablePaginationCustom, useTable } from 'src/components/table';
import { useBoolean } from 'src/hooks/use-boolean';
import RegularHourForm from './regular-hour-form';

// ----------------------------------------------------------------------

const headLabel = [
  { id: 'day', label: 'Day', minWidth: 100 },
  { id: 'startTime', label: 'Open Time', minWidth: 120 },
  { id: 'endTime', label: 'Close Time', minWidth: 120 },
  { id: 'action', label: 'Action', align: 'center', width: 120 }
];

const initialSchedule = [
  { id: 1, day: 'Monday', startTime: '09:00AM', endTime: '05:00PM', status: 'Open' },
  { id: 2, day: 'Tuesday', startTime: '09:00AM', endTime: '05:00PM', status: 'Open' },
  { id: 3, day: 'Wednesday', startTime: '09:00AM', endTime: '05:00PM', status: 'Open' },
  { id: 4, day: 'Thursday', startTime: '09:00AM', endTime: '05:00PM', status: 'Open' },
  { id: 5, day: 'Friday', startTime: '09:00AM', endTime: '05:00PM', status: 'Open' },
  { id: 6, day: 'Saturday', startTime: '10:00AM', endTime: '02:00PM', status: 'Open' },
  { id: 7, day: 'Sunday', startTime: '12:00AM', endTime: '12:00AM', status: 'Closed' },
];

function ScheduleRow({ item, onEdit, onDelete }) {
  return (
    <TableRow hover>
      <TableCell>{item.day}</TableCell>
      <TableCell>{item.startTime ? item.startTime : "--" }</TableCell>
      <TableCell>{item.endTime ? item.endTime : "--" }</TableCell>
      <TableCell align="center">
        <Tooltip title="Edit" placement="top" arrow>
          <IconButton onClick={() => onEdit(item)}>
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

export default function RegularHour() {
  const [schedule, setSchedule] = useState(initialSchedule);
  const [currentRow, setCurrentRow] = useState(null);

  const openForm = useBoolean();
  const confirmDialog = useBoolean();
  const table = useTable({ defaultRowsPerPage: 10 });

  const handleAdd = () => {
    setCurrentRow(null);
    openForm.onTrue();
  };

  const handleEdit = (row) => {
    setCurrentRow(row);
    openForm.onTrue();
  };

  const handleDelete = (id) => {
    setSchedule((prev) => prev.filter((s) => s.id !== id));
    confirmDialog.onFalse();
  };

  const handleSubmit = (data) => {
    if (currentRow) {
      setSchedule((prev) =>
        prev.map((s) => (s.id === currentRow.id ? { ...s, ...data } : s))
      );
    } else {
      setSchedule((prev) => [...prev, { id: Date.now(), ...data }]);
    }
  };

  return (
    <Box>
      <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
        <CardHeader
          title={
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Iconify icon="mdi:clock-time-eight-outline" sx={{ mr: 1 }} />
              Regular Weekly Hours
            </Box>
          }
          action={
            <Button variant="contained" color="primary" onClick={handleAdd}>
              Add Regular Hours
            </Button>
          }
          sx={{ mb: 2 }}
        />

        {/* Table */}
        <TableContainer sx={{ overflow: 'unset' }}>
          <Scrollbar>
            <Table sx={{ minWidth: 900 }} size={table.dense ? 'small' : 'medium'}>
              <TableHeadCustom headLabel={headLabel} />
              <TableBody>
                {schedule.map((row) => (
                  <ScheduleRow
                    key={row.id}
                    item={row}
                    onEdit={handleEdit}
                    onDelete={(id) => {
                        setCurrentRow(schedule.find((s) => s.id === id));
                        confirmDialog.onTrue();
                     }}
                  />
                ))}
              </TableBody>
            </Table>
          </Scrollbar>
        </TableContainer>

        <Divider sx={{ borderStyle: 'dashed' }} />

        {/* Pagination */}
          <TablePaginationCustom
            count={schedule.length}
            page={table.page}
            // rowsPerPageOptions={[5, 10, 25]}
            rowsPerPage={table.rowsPerPage}
            onPageChange={table.onChangePage}
            // onRowsPerPageChange={table.onChangeRowsPerPage}
            // dense={table.dense}
            // onChangeDense={table.onChangeDense}
          />
      </Card>

      {/* Add/Edit Form */}
      <RegularHourForm
        open={openForm.value}
        onClose={openForm.onFalse}
        onSubmit={handleSubmit}
        isEdit={!!currentRow}
        currentRow={currentRow}
      />

      {/* Delete Confirmation */}
      <ConfirmDialog
        open={confirmDialog.value}
        onClose={confirmDialog.onFalse}
        title="Delete Regular Hour"
        content="Are you sure you want to delete this regular hour?"
        action={
          <Button variant="contained" color="error" onClick={() => handleDelete(currentRow?.id)}>
            Delete
          </Button>
        }
      />
    </Box>
  );
}
