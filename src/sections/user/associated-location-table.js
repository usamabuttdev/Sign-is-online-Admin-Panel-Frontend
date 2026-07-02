import { Box, Card, CardHeader, Divider, Table, TableBody, TableContainer } from '@mui/material';
import Scrollbar from 'src/components/scrollbar';
import TableHeadCustom from 'src/components/table/table-head-custom';
import TablePaginationCustom from 'src/components/table/table-pagination-custom';
import AssociatedLocationTableRow from './assocated-location-table-row';

const AssociatedLocationTable = ({ locations, table, headLabels }) => {
  return (
    <Card>
      <CardHeader
        title={
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            Associated Locations
          </Box>
        }
        sx={{ mb: 3 }}
      />

      <TableContainer sx={{ overflow: 'unset' }}>
        <Scrollbar>
          <Table sx={{ minWidth: 650 }} size={table.dense ? 'small' : 'medium'}>
            <TableHeadCustom headLabel={headLabels} />
            <TableBody>
              {locations?.map((location, index) => (
                <AssociatedLocationTableRow key={location.id || index} location={location} />
              ))}
            </TableBody>
          </Table>
        </Scrollbar>
      </TableContainer>

      <Divider sx={{ borderStyle: 'dashed' }} />

      <TablePaginationCustom
        count={locations?.length || 0}
        page={table.page}
        dense={table.dense}
        rowsPerPage={table.rowsPerPage}
        onPageChange={table.onChangePage}
        onRowsPerPageChange={table.onChangeRowsPerPage}
      />
    </Card>
  );
};

export default AssociatedLocationTable;
