import PropTypes from 'prop-types';
// @mui
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
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
import { TableHeadCustom, useTable } from 'src/components/table';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import { paths } from 'src/routes/paths';

// ----------------------------------------------------------------------

export default function BookingDetails({ title, subheader, tableLabels, tableData, router ,...other }) {
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} sx={{ mb: 3 }} />

      <TableContainer sx={{ overflow: 'unset' }}>
        <Scrollbar>
          <Table sx={{ minWidth: 960 }}>
            <TableHeadCustom headLabel={tableLabels} />

            <TableBody>
              {tableData.map((row, index) => (
                <BookingDetailsRow key={row.id} row={row} tableData={tableData} index={index} />
              ))}
            </TableBody>
          </Table>
        </Scrollbar>
      </TableContainer>

      <Divider sx={{ borderStyle: 'dashed' }} />
      
      <Box sx={{ p: 2, textAlign: 'right' }}>
        <Button
          size="small"
          color="inherit"
          endIcon={<Iconify icon="eva:arrow-ios-forward-fill" width={18} sx={{ ml: -0.5 }} />}
          onClick={() => router.push(paths.dashboard.bookings.root) }
        >
          View All
        </Button>
      </Box>
    </Card>
  );
}

BookingDetails.propTypes = {
  subheader: PropTypes.string,
  tableData: PropTypes.array,
  tableLabels: PropTypes.array,
  title: PropTypes.string,
};

// ----------------------------------------------------------------------

function BookingDetailsRow({ row , index}) {
  const theme = useTheme();

  const table = useTable();

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
        {/* <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar
            variant="rounded"
            alt={row?.destination?.name}
            src={row?.destination?.coverUrl}
            sx={{ mr: 2, width: 48, height: 48 }}
          />
          {row?.destination?.name}
        </TableCell>

        <TableCell>
          <ListItemText
            primary={row?.customer?.name}
            secondary={row?.customer?.phoneNumber}
            primaryTypographyProps={{ typography: 'body2', noWrap: true }}
            secondaryTypographyProps={{
              mt: 0.5,
              component: 'span',
              typography: 'caption',
            }}
          />
        </TableCell>

        <TableCell>
          <ListItemText
            primary={'Hello'}
            secondary={'world'}
            primaryTypographyProps={{ typography: 'body2', noWrap: true }}
            secondaryTypographyProps={{
              mt: 0.5,
              component: 'span',
              typography: 'caption',
            }}
          />
        </TableCell>

        <TableCell>
          <ListItemText
            primary={'Hello world'}
            secondary={'Hello world'}
            primaryTypographyProps={{ typography: 'body2', noWrap: true }}
            secondaryTypographyProps={{
              mt: 0.5,
              component: 'span',
              typography: 'caption',
            }}
          />
        </TableCell> */}

        <TableCell>{index + 1}</TableCell>
        <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar alt={row?.trainer_name} sx={{ mr: 2 }} />

          <ListItemText
            primary={row?.trainer_name}
            // secondary={email}
            primaryTypographyProps={{ typography: 'body2' }}
            secondaryTypographyProps={{
              component: 'span',
              color: 'text.disabled',
            }}
          />
        </TableCell>
        {/* <TableCell sx={{whiteSpace:'nowrap'}}>{row?.customer_name}</TableCell> */}
        {/* <TableCell sx={{ whiteSpace: 'nowrap' }}>{row?.booking_type}</TableCell> */}
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{row?.date}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{row?.slot_time}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{row?.price} </TableCell>
        {/* <TableCell sx={{ whiteSpace: 'nowrap' }}> {row?.location}</TableCell> */}

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

        {/* <TableCell align="right" sx={{ pr: 1 }}>
          <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell> */}
      </TableRow>

      {/* <TablePaginationCustom
        count={tableData.length}
        page={table.page}
        rowsPerPage={table.rowsPerPage}
        onPageChange={table.onChangePage}
        onRowsPerPageChange={table.onChangeRowsPerPage}
        //
        dense={table.dense}
        onChangeDense={table.onChangeDense}
      /> */}

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
}

BookingDetailsRow.propTypes = {
  row: PropTypes.object,
};
