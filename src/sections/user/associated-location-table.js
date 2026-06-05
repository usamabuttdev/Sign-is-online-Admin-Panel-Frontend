import { Box, Card, CardHeader, Divider, Table, TableBody, TableContainer } from '@mui/material';
import Scrollbar from 'src/components/scrollbar';
import TableHeadCustom from 'src/components/table/table-head-custom';
import TablePaginationCustom from 'src/components/table/table-pagination-custom';
import AssociatedLocationTableRow from './assocated-location-table-row';

const AssociatedLocationTable = ({ userDetail, table, headLabels }) => {
  return (
    <Card>
      {/* Header */}
      <CardHeader
        title={
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            Associated Locations
          </Box>
        }
        sx={{ mb: 3 }}
      />

      {/* Table */}
      <TableContainer sx={{ overflow: 'unset' }}>
        <Scrollbar>
          <Table sx={{ minWidth: 1100 }} size={table.dense ? 'small' : 'medium'}>
            <TableHeadCustom headLabel={headLabels} />
            <TableBody>
              {userDetail?.associatedLocations?.map((location, index) => (
                <AssociatedLocationTableRow key={index} location={location} />
              ))}
            </TableBody>
          </Table>
        </Scrollbar>
      </TableContainer>

      {/* Divider */}
      <Divider sx={{ borderStyle: 'dashed' }} />

      {/* Pagination */}
        <TablePaginationCustom
          count={userDetail?.associatedLocations?.length}
          page={table.page}
          dense={table.dense}
          // rowsPerPageOptions={[5, 10, 25]}
          rowsPerPage={table.rowsPerPage}
          onPageChange={table.onChangePage}
          onRowsPerPageChange={table.onChangeRowsPerPage}
          // onChangeDense={table.onChangeDense}
        />
    </Card>
  );
};

export default AssociatedLocationTable;
