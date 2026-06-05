import React from 'react';
import {
  Box,
  Button,
  Card,
  IconButton,
  Tooltip,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Divider
} from '@mui/material';
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import { TableHeadCustom, TablePaginationCustom, useTable } from 'src/components/table';
import { useBoolean } from 'src/hooks/use-boolean';
import { ConfirmDialog } from 'src/components/custom-dialog';
import HolidayHourForm from './holiday-hour-form';
import { formatDate } from 'src/utils/format-time';
import Label from 'src/components/label';

const headLabel = [
  { id: 'title', label: 'Holiday', width: 300, minWidth: 200 },
  { id: 'date', label: 'Date' ,align:'center' },
  { id: 'status', label: 'Status', minWidth: 120 , align:'center'} ,  
  { id: 'startTime', label: 'Open Time', minWidth: 120 },
  { id: 'endTime', label: 'Close Time', minWidth: 120 },
  { id: 'actions', label: 'Action', align: 'center', width: 120},
];

const mockHolidayList = [
  {
    id: 1,
    title: 'Christmas',
    date: '2025-12-25T00:00:00.000Z',
    startHour: '09',
    startMinute: '00',
    startAmPm: 'AM',
    endHour: '05',
    endMinute: '00',
    endAmPm: 'PM',
    status : 'open'
  },
  {
    id: 2,
    title: 'New Year',
    date: '2026-01-01T00:00:00.000Z',
    startHour: '09',
    startMinute: '00',
    startAmPm: 'AM',
    endHour: '05',
    endMinute: '00',
    endAmPm: 'PM',
    status : 'closed' 
  },
];

function HolidayRow({ item, onEdit, onDelete }) {
  const {display } = formatDate(item.date)
  return (
    <TableRow hover>
      <TableCell>{item.title}</TableCell>
      <TableCell align='center'>
        <Tooltip arrow>
          <span>{display}</span>
        </Tooltip>
      </TableCell>
      <TableCell align="center"> 
        <Label color={item.status === "open" ? "success" : "warning"} sx={{ textTransform:"capitalize" }}>
          {item.status}
        </Label>
      </TableCell>
      <TableCell>{item.startHour && item.startMinute && item.startAmPm ? `${item.startHour}:${item.startMinute} ${item.startAmPm}` : ' -- '}</TableCell>
      <TableCell>{item.endHour && item.endMinute && item.endAmPm ? `${item.endHour}:${item.endMinute} ${item.endAmPm}` : ' -- '}</TableCell>
      <TableCell align="center">
        <Tooltip title="Edit" arrow placement="top">
          <IconButton color="default" onClick={() => onEdit(item.id)}>
            <Iconify icon="solar:pen-bold" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete" arrow placement="top">
          <IconButton color="error" onClick={() => onDelete(item.id)}>
            <Iconify icon="solar:trash-bin-trash-bold" />
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
  );
}

export default function HolidayHour() {
  const open = useBoolean();
  const edit = useBoolean();
  const confirmDialog = useBoolean();
  const table = useTable();

  const [holidayList, setHolidayList] = React.useState(mockHolidayList);
  const [selectId, setSelectId] = React.useState(null);

  const onSave = (data) => {
    if (edit.value && selectId) {
      setHolidayList((prev) =>
        prev.map((item) => (item.id === selectId ? { ...item, ...data } : item))
      );
    } else {
      setHolidayList((prev) => [...prev, { id: Date.now(), ...data }]);
    }
    edit.onFalse();
  };

  const onEditRow = (id) => {
    setSelectId(id);
    edit.onTrue();
    open.onTrue();
  };

  const onDeleteRow = (id) => {
    setSelectId(id);
    confirmDialog.onTrue();
  };

  const onDelete = () => {
    setHolidayList((prev) => prev.filter((row) => row.id !== selectId));
    confirmDialog.onFalse();
  };
  const selectedItem = holidayList.find((row) => row.id === selectId);

  return (
    <>
      <Card>
        <Box
          sx={{
            width: 1,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: { md: 'center' },
            flexDirection: { xs: 'column', md: 'row' },
            p: 2,
          }}
        >
          <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
            <Iconify icon="ph:calendar-x" sx={{ mr: 1 }} />
            Holiday Hours
          </Typography>

          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setSelectId(null);
              edit.onFalse();
              open.onTrue();
            }}
            sx={{ mt: { xs: 1, md: 0 } }}
          >
            Add Holiday Hours
          </Button>
        </Box>

        {/* Table */}
        <TableContainer>
          <Scrollbar>
            <Table size={table.dense ? 'small' : 'medium'}>
              <TableHeadCustom headLabel={headLabel} />
              <TableBody>
                {holidayList.map((holiday) => (
                  <HolidayRow
                    key={holiday.id}
                    item={holiday}
                    onEdit={onEditRow}
                    onDelete={onDeleteRow}
                  />
                ))}
              </TableBody>
            </Table>
          </Scrollbar>
        </TableContainer>
        <Divider sx={{ borderStyle: 'dashed' }} />

        {/* Pagination */}
        <TablePaginationCustom
          dense={table.dense}
          count={holidayList.length}
          page={table.page}
          // rowsPerPageOptions={[5, 10, 25]}
          rowsPerPage={table.rowsPerPage}
          onPageChange={table.onChangePage}
          onRowsPerPageChange={table.onChangeRowsPerPage}
          // onChangeDense={table.onChangeDense}
        />
      </Card>

      {/* Form Dialog */}
      <HolidayHourForm
        open={open.value}
        onClose={open.onFalse}
        edit={edit.value}
        selectedItem={selectedItem}
        onSave={onSave}
      />

      {/* Delete Confirmation */}
      <ConfirmDialog
        open={confirmDialog.value}
        onClose={confirmDialog.onFalse}
        action={
          <Button color="error" variant="contained" onClick={onDelete}>
            Delete
          </Button>
        }
        title="Delete Holiday"
        content="Are you sure you want to delete this holiday?"
      />
    </>
  );
}
