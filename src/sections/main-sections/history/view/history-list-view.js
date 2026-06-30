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
import { useGetAllHistoryQuery } from 'src/store/Reducer/history';
import UserTableFiltersResult from '../../transactions/user-table-filters-result';
import UserTableToolbar from '../../transactions/user-table-toolbar';
import HistoryTableRow from '../history-table-row';

const TABLE_HEAD = [
  { id: 'id', label: 'ID', width: 80, align: 'center' },
  { id: 'object', label: 'Object' },
  { id: 'message', label: 'Message' },
  { id: 'date', label: 'Date', align: 'center' },
];

const defaultFilters = { search: '' };

export default function HistoryListView() {
  const table = useTable();
  const settings = useSettingsContext();
  const [filters, setFilters] = useState(defaultFilters);

  const { data: apiResponse, isLoading } = useGetAllHistoryQuery({
    pageno: table.page + 1,
    search: filters.search,
  });

  const TABLE_DATA = apiResponse?.data || [];
  const totalCount = apiResponse?.total || 0;

  const denseHeight = table.dense ? 52 : 72;
  const canReset = !isEqual(defaultFilters, filters);
  const filteredData = applyFilter(TABLE_DATA, filters.search);
  const notFound = !filteredData.length && canReset;

  const handleFilters = useCallback(
    (name, value) => {
      table.onResetPage();
      setFilters((prevState) => ({ ...prevState, [name]: value }));
    },
    [table]
  );

  const handleResetFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);

  return (
    <>
      {isLoading && !TABLE_DATA.length ? (
        <LoadingScreen />
      ) : (
        <Container maxWidth={settings.themeStretch ? false : 'xl'}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
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
            <UserTableToolbar filters={filters} onFilters={handleFilters} roleOptions={[]} />
            {canReset && (
              <UserTableFiltersResult
                filters={filters}
                onFilters={handleFilters}
                onResetFilters={handleResetFilters}
                results={totalCount}
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
                        key={row.id || row.saleId}
                        row={row}
                        selected={table.selected.includes(row.saleId)}
                        index={index + 1}
                        counter={table.page * table.rowsPerPage + index + 1}
                      />
                    ))}
                    <TableEmptyRows
                      height={denseHeight}
                      emptyRows={emptyRows(table.page, table.rowsPerPage, filteredData.length)}
                    />
                    {!isLoading && notFound && <TableNoData notFound={notFound} />}
                  </TableBody>
                </Table>
              </Scrollbar>
            </TableContainer>
            <TablePaginationCustom
              count={totalCount || 1}
              page={table.page}
              dense={table.dense}
              rowsPerPage={table.rowsPerPage}
              onPageChange={table.onChangePage}
              onRowsPerPageChange={table.onChangeRowsPerPage}
              loading={isLoading}
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
