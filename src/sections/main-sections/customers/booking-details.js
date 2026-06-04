import PropTypes from 'prop-types';
// @mui
import { useTheme } from '@mui/material/styles';
import Table from '@mui/material/Table';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import CardHeader from '@mui/material/CardHeader';
import Card from '@mui/material/Card';
import ListItemText from '@mui/material/ListItemText';
import TableContainer from '@mui/material/TableContainer';
// components
import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import { TableHeadCustom, TablePaginationCustom, useTable } from 'src/components/table';
import CustomPopover, { usePopover } from 'src/components/custom-popover';

// ----------------------------------------------------------------------

const BookingDetails = ({ title, subheader, tableLabels, tableData, ...other }) => {
  const table = useTable()
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} sx={{ mb: 3 }} />

      <TableContainer sx={{ overflow: 'unset' }}>
        <Scrollbar>
          <Table sx={{ minWidth: 960 }}>
            <TableHeadCustom headLabel={tableLabels} />

            <TableBody>
              {tableData.map((row, index) => (
                <BookingDetailsRow key={row.id} row={row} index={index} />
              ))}
            </TableBody>
          </Table>
        </Scrollbar>
      </TableContainer>

      <TablePaginationCustom
        count={tableData.length}
        page={table.page}
        rowsPerPage={table.rowsPerPage}
        onPageChange={table.onChangePage}
        onRowsPerPageChange={table.onChangeRowsPerPage}
      />

      <Divider sx={{ borderStyle: 'dashed' }} />
    </Card>
  );
};

BookingDetails.propTypes = {
  subheader: PropTypes.string,
  tableData: PropTypes.array,
  tableLabels: PropTypes.array,
  title: PropTypes.string,
};

// ----------------------------------------------------------------------

const BookingDetailsRow = ({ row, index }) => {
  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';
  const popover = usePopover();

  const handleDownload = () => {
    popover.onClose();
    console.info('DOWNLOAD', row.id);
  };

  const handlePrint = () => {
    popover.onClose();
    console.info('PRINT', row.id);
  };

  const handleShare = () => {
    popover.onClose();
    console.info('SHARE', row.id);
  };

  const handleDelete = () => {
    popover.onClose();
    console.info('DELETE', row.id);
  };

  return (
    <>
      <TableRow>
        <TableCell>{index + 1}</TableCell>
        <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar alt={row?.trainer_name} sx={{ mr: 2 }} />
          <ListItemText
            primary={row?.trainer_name}
            primaryTypographyProps={{ typography: 'body2' }}
            secondaryTypographyProps={{
              component: 'span',
              color: 'text.disabled',
            }}
          />
        </TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{row?.booking_type}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{row?.date}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{row?.slot_time}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{row?.price} </TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{row?.location}</TableCell>

        <TableCell>
          <Label
            variant={isLight ? 'soft' : 'filled'}
            color={
              (row.status === 'active' && 'success') ||
              (row.status === 'inactive' && 'warning') ||
              'error'
            }
          >
            {row.status === 'active' ? 'Completed' : 'Pending'}
          </Label>
        </TableCell>
      </TableRow>

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="right-top"
        sx={{ width: 160 }}
      >
        <MenuItem onClick={handleDownload}>
          <Iconify icon="eva:cloud-download-fill" />
          Download
        </MenuItem>

        <MenuItem onClick={handlePrint}>
          <Iconify icon="solar:printer-minimalistic-bold" />
          Print
        </MenuItem>

        <MenuItem onClick={handleShare}>
          <Iconify icon="solar:share-bold" />
          Share
        </MenuItem>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
          <Iconify icon="solar:trash-bin-trash-bold" />
          Delete
        </MenuItem>
      </CustomPopover>
    </>
  );
};

BookingDetailsRow.propTypes = {
  row: PropTypes.object,
};

export default BookingDetails;
