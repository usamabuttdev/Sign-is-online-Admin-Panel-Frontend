import isEqual from 'lodash/isEqual';
import { useState, useCallback} from 'react';
import { useTheme, alpha } from '@mui/material/styles';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import { _roles } from 'src/_mock';
import Label from 'src/components/label';
import Scrollbar from 'src/components/scrollbar';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import {
  useTable,
  emptyRows,
  TableHeadCustom,
  TablePaginationCustom,
  TableEmptyRows,
  TableNoData,
} from 'src/components/table';
import UserTableRow from '../user-table-row';
import UserTableToolbar from '../user-table-toolbar';
import { Box } from '@mui/system';
import { paths } from 'src/routes/paths';
import { LoadingScreen } from 'src/components/loading-screen';
import UserTableFiltersResult from '../user-table-filters-result';

const TABLE_HEAD = [
  { id: 'id', label: 'ID', width: 20 },
  { id: 'name', label: 'Name', width: 200 },
  { id: 'phoneNumber', label: 'Mobile' },
  { id: 'gender', label: 'Gender' },
  { id: 'age', label: 'Age' },
  { id: 'status', label: 'Status' },
  { id: 'action', label: 'Action', width: 88 },
];

const defaultFilters = {
  name: '',
  email: '',
  status: 'all',
};

const userList = [
  {
    accountState: {
      status: 'active',
    },
    _id: '67e2415363848db728b98814',
    profileIcon: 'https://borrowappbucket.s3.us-east-1.amazonaws.com/noimage.png',
    name: 'Hammad Rasheed',
    email: 'hammadrasheed000@gmail.com',
    phoneNumber: '+923008875461',
    gender: 'Male',
    age: 25,
    experience: '3 years',
    verified: 'pending',
  },
  {
    accountState: {
      status: 'active',
    },
    _id: '67e0fb7b63848db728b98634',
    profileIcon: 'https://borrowappbucket.s3.us-east-1.amazonaws.com/noimage.png',
    name: 'Ahmed Saleem',
    email: 'ahmedsaleemdar12@gmail.com',
    phoneNumber: '+923064666084',
    gender: 'Male',
    age: 21,
    experience: '1 years',
    verified: 'approved',
  },
  {
    accountState: {
      status: 'inactive',
    },
    _id: '67c06f3b4ed2b87cd0c350c2',
    profileIcon:
      'https://borrowappbucket.s3.us-east-1.amazonaws.com/54be4663-f58f-4994-8d3f-933b9d46745a.jpg',
    name: 'Saim',
    email: 'saim@gmail.com',
    phoneNumber: '+14324234234',
    gender: 'Male',
    age: 22,
    experience: '2 years',
    verified: 'rejected',
  },
];

export default function CustomersListView() {
  const table = useTable();
  const theme = useTheme();

  const settings = useSettingsContext();

  const [filters, setFilters] = useState(defaultFilters);

  let total_length = userList?.length;
  const TABS = [
    {
      value: 'all',
      label: 'All',
      color: 'default',
      count: 0,
    },
    {
      value: 'active',
      label: 'Active',
      color: 'success',
      count: 0,
    },
    {
      value: 'inactive',
      label: 'Inactive',
      color: 'warning',
      count: 0,
    },
  ];

  const denseHeight = table.dense ? 52 : 72;
  const canReset = !isEqual(defaultFilters, filters);

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

  const handleFilterStatus = useCallback(
    (event, newValue) => {
      handleFilters('status', newValue);
    },
    [handleFilters]
  );

  const handleResetFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);

  let count = (table.page - 1) * table.rowsPerPage;
  const notFound = (!total_length && canReset) || !total_length;

  let isLoading = false;

  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <Container maxWidth={settings.themeStretch ? false : 'lg'}>
          {/* HEADER */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <CustomBreadcrumbs
              heading="Customers"
              links={[
                { name: 'Dashboard', href: paths.dashboard.root },
                { name: 'Customers', href: paths.dashboard.customers },
              ]}
              sx={{
                mb: { xs: 3, md: 5 },
              }}
            />
          </Box>

          <Card>
            {/* TABS */}
            <Tabs
              value={filters.status}
              onChange={handleFilterStatus}
              sx={{
                px: 2.5,
                pt: 0.5,
                pb: 1,
                boxShadow: `inset 0 -2px 0 0 ${alpha(theme.palette.grey[500], 0.08)}`,
              }}
            >
              {TABS?.map((tab) => (
                <Tab
                  key={tab.value}
                  value={tab.value}
                  label={tab.label}
                  iconPosition="end"
                  icon={
                    <Label
                      variant={
                        ((tab.value === 'all' || tab.value === filters.status) && 'filled') ||
                        'soft'
                      }
                      color={tab.color}
                    >
                      {tab.count}
                    </Label>
                  }
                />
              ))}
            </Tabs>

            <UserTableToolbar filters={filters} onFilters={handleFilters} roleOptions={_roles} />

            {canReset && (
              <UserTableFiltersResult
                filters={filters}
                onFilters={(name, value) => setFilters((prev) => ({ ...prev, [name]: value }))}
                onResetFilters={handleResetFilters}
                results={total_length}
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
                    rowCount={total_length}
                    numSelected={table.selected?.length}
                  />

                  <TableBody>
                    {userList?.map(
                      (row, index) => (
                        (count = count + 1),
                        (
                          <UserTableRow
                            key={row.id || row._id || index}
                            row={row}
                            selected={table.selected.includes(row.id)}
                            index={index + 1}
                            counter={index + 1 + table.page * table.rowsPerPage}
                          />
                        )
                      )
                    )}

                    <TableEmptyRows
                      height={denseHeight}
                      emptyRows={emptyRows(table.page, table.rowsPerPage, total_length)}
                    />
                      {notFound &&  <TableNoData notFound={notFound} />}
                  </TableBody>
                </Table>
              </Scrollbar>
            </TableContainer>

            <TablePaginationCustom
              count={total_length || 1}
              page={table.page}
              rowsPerPage={table.rowsPerPage}
              onPageChange={table.onChangePage}
              onRowsPerPageChange={table.onChangeRowsPerPage}
            />
          </Card>
        </Container>
      )}
    </>
  );
}
