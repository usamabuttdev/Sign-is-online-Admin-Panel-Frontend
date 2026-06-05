import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import { Box } from '@mui/system';
import isEqual from 'lodash/isEqual';
import { useCallback, useState } from 'react';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { LoadingScreen } from 'src/components/loading-screen';
import Scrollbar from 'src/components/scrollbar';
import { useSettingsContext } from 'src/components/settings';
import {
  emptyRows,
  TableEmptyRows,
  TableHeadCustom,
  TableNoData,
  TablePaginationCustom,
  useTable,
} from 'src/components/table';
import { paths } from 'src/routes/paths';
import UserTableFiltersResult from '../../transactions/user-table-filters-result';
import UserTableToolbar from '../../transactions/user-table-toolbar';
import HistoryTableRow from '../history-table-row'; // new component for history rows

// Updated Table Head for History Page
const TABLE_HEAD = [
  { id: 'id', label: 'ID', width: 80  , align:"center"},
  { id: 'object', label: 'Object' },
  { id: 'message', label: 'Message' },
  { id: 'date', label: 'Date' , align:"center"}
];

const defaultFilters = {
  search: '',
};

// Mock History Data
const historyList = [
  {
    object: "iPhone 15", // from product.title
    message: "Price changed",
    date: "2025-08-21T09:18:44.000Z",
  },
  {
    object: "Order #12345", // from order.title
    message: "Order shipped",
    date: "2025-08-22T16:10:00.000Z",
  },
];

const TABS = [
  {
    value: 'all',
    label: 'All',
    color: 'default',
    count: historyList.length,
  },
  {
    value: 'paid',
    label: 'Paid',
    count: historyList.filter((transaction) => transaction.status === 'Paid').length,
  },
  {
    value: 'pending',
    label: 'Pending',
    count: historyList.filter((transaction) => transaction.status === 'Pending').length,
  }
];


export default function HistoryListView() {

  const table = useTable();
  const settings = useSettingsContext();
  const [filters, setFilters] = useState(defaultFilters);

  const denseHeight = table.dense ? 52 : 72;
  const filteredData = applyFilter(historyList, filters.search);
  const canReset = !isEqual(defaultFilters, filters);
  const notFound = !filteredData.length && canReset;


  const handleFilters = useCallback(
    (name, value) => {
      table.onResetPage();
      setFilters((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    },
    [table]
  );

  const handleResetFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);

  const isLoading = false;

  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <Container maxWidth={settings.themeStretch ? false : 'xl'}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <CustomBreadcrumbs
              heading="History"
              links={[
                { name: 'Dashboard', href: paths.dashboard.root },
                { name: 'History', href: paths.dashboard.history.root },
              ]}
              sx={{ mb: 3 }}
            />
          </Box>

          <Card>
            <UserTableToolbar
              filters={filters}
              onFilters={handleFilters}
              roleOptions={[]} // not needed for history
            />

            {canReset && (
              <UserTableFiltersResult
                filters={filters}
                onFilters={handleFilters}
                onResetFilters={handleResetFilters}
                results={filteredData.length}
                sx={{ p: 2.5, pt: 0 }}
              />
            )}

            <TableContainer sx={{ position: 'relative', overflow: 'unset', zIndex: 100 }}>
              <Scrollbar>
                <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 960 }}>
                  <TableHeadCustom
                    order={table.order}
                    orderBy={table.orderBy}
                    headLabel={TABLE_HEAD}
                    rowCount={filteredData.length}
                    numSelected={table.selected?.length}
                  />

                  <TableBody>
                    {filteredData.map((row, index) => (
                      <HistoryTableRow
                        key={row.saleId}
                        row={row}
                        selected={table.selected.includes(row.saleId)}
                        index={index + 1}
                        counter={table.page * table.rowsPerPage + index + 1} // Adjusted counter calculation
                      />
                    ))}

                    <TableEmptyRows
                      height={denseHeight}
                      emptyRows={emptyRows(table.page, table.rowsPerPage, filteredData.length)}
                    />
                           {notFound && <TableNoData notFound={notFound} />}
                  </TableBody>
                </Table>
              </Scrollbar>
            </TableContainer>

            <TablePaginationCustom
              count={filteredData.length || 1}
              page={table.page}
              // rowsPerPageOptions={[5, 10, 25]}
              dense={table.dense}
              rowsPerPage={table.rowsPerPage}
              onPageChange={table.onChangePage}
              // onChangeDense={table.onChangeDense}
              // onRowsPerPageChange={table.onChangeRowsPerPage}
            />
          </Card>
        </Container>
      )}
    </>
  );
}

function applyFilter(tableData, search) {
  if (!search) return tableData;

  return tableData.filter((row) =>
    Object.values(row).some((value) =>
      String(value).toLowerCase().includes(search.toLowerCase())
    )
  );
}