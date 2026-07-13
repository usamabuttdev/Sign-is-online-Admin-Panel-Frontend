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
import HistoryTableRow from '../history-table-row';
import { useGetAllHistoryQuery } from 'src/store/Reducer/history';

const TABLE_HEAD = [
  { id: 'id', label: 'ID', width: 80, align: 'center' },
  { id: 'object', label: 'Object' },
  { id: 'user', label: 'User' },
  { id: 'message', label: 'Message' },
  { id: 'date', label: 'Date', align: 'center' },
];

const defaultFilters = {
  search: '',
};

export default function HistoryListView() {
  const table = useTable({ defaultRowsPerPage: 10 });
  const settings = useSettingsContext();
  const [filters, setFilters] = useState(defaultFilters);

  const { data, isLoading } = useGetAllHistoryQuery({
    pageno: table.page + 1,
    search: filters.search,
  });

  const historyList = data?.data || [];
  const totalCount = data?.total || 0;

  const denseHeight = table.dense ? 52 : 72;
  const canReset = !isEqual(defaultFilters, filters);
  const notFound = !isLoading && historyList.length === 0 && canReset;

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

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
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
          roleOptions={[]}
        />

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
                rowCount={historyList.length}
                numSelected={table.selected?.length}
              />

              <TableBody>
                {historyList.map((row, index) => (
                  <HistoryTableRow
                    key={row.id || row._id || index}
                    row={row}
                    selected={table.selected.includes(row.id)}
                    index={index + 1}
                    counter={table.page * table.rowsPerPage + index + 1}
                  />
                ))}

                <TableEmptyRows
                  height={denseHeight}
                  emptyRows={emptyRows(table.page, table.rowsPerPage, historyList.length)}
                />
                {notFound && <TableNoData notFound={notFound} />}
              </TableBody>
            </Table>
          </Scrollbar>
        </TableContainer>

        <TablePaginationCustom
          count={totalCount}
          page={table.page}
          rowsPerPage={table.rowsPerPage}
          onPageChange={table.onChangePage}
          onRowsPerPageChange={table.onChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}
