import React, { useState, useCallback } from 'react';
import isEqual from 'lodash/isEqual';
import { useTheme, alpha } from '@mui/material/styles';
import {
  useTable,
  emptyRows,
  TableNoData,
  TableHeadCustom,
  TablePaginationCustom,
  TableEmptyRows,
} from 'src/components/table';
import { useSettingsContext } from 'src/components/settings';
import {
  Box,
  Card,
  Container,
  Table,
  TableBody,
  Tab,
  TableContainer,
  Tabs,
} from '@mui/material';
import Label from 'src/components/label';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import Scrollbar from 'src/components/scrollbar';
import { paths } from 'src/routes/paths';
import { LoadingScreen } from 'src/components/loading-screen';
import UserTableToolbar from './contact-toolbar';
import UserTableFiltersResult from './contact-result';
import UserTableRow from './contact-table-row';
import { useGetAllSupportQueriesQuery } from 'src/store/Reducer/adminSupport';
import { gridColumnLookupSelector } from '@mui/x-data-grid';

const TABLE_HEAD = [
  { id: 'id', label: 'ID', width: 100 },
  { id: 'name', label: 'Name', width: 150 },
  { id: 'email', label: 'Email', width: 150 },
  { id: 'message', label: 'Message', width: 180 },
  { id: 'status', label: 'Status', width: 180 },
  { id: 'action', label: 'Action', width: 180 },
];

const defaultFilters = {
  name: '',
  email: '',
  status: 'all',
};

export default function ContactListView() {


  const table = useTable();
  const theme = useTheme();

  const settings = useSettingsContext();

  const [filters, setFilters] = useState(defaultFilters);
  const isLoading = false;
  // const {
  //   data ,
  //   isLoading
  // } = useGetAllSupportQueriesQuery({
  //   pageno: table.page,
  //   keyword: filters.name,
  //   limit: 10,
  //   ...(filters.status !== 'all' && { status: filters.status }),
  // });

  const TABS = [
    {
      value: 'all',
      label: 'All',
      color: 'default',
      count: data?.requestsCount?.totalDocs,
    },
    {
      value: 'pending',
      label: 'Pending',
      color: 'error',
      count: data?.requestsCount?.totalPending,
    },
    {
      value: 'responded',
      label: 'Responded',
      color: 'warning',
      count: data?.requestsCount?.totalResponded,
    },
    {
      value: 'resolved',
      label: 'Resolved',
      color: 'success',
      count: data?.requestsCount?.totalResolved,
    },
    {
      value: 'closed',
      label: 'Closed',
      color: 'info',
      count: data?.requestsCount?.totalClosed,
    },
  ];

  const total_length = data?.total_length;

  const denseHeight = table.dense ? 52 : 72;
  const canReset = !isEqual(defaultFilters, filters);
  const notFound = (!total_length && canReset) || !total_length;

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

  const handleFilterStatus = useCallback((event, newValue) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      status: newValue, // Update status in state
    }));
  }, []);

  const handleResetFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);

  let count = (table.page - 1) * table.rowsPerPage;



  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <Container maxWidth={settings.themeStretch ? false : 'lg'}>
          <Box>
            <CustomBreadcrumbs
              heading="Contact Support"
              links={[
                { name: 'Dashboard', href: paths.dashboard.root },
                { name: 'Contact Support', href: paths.dashboard.contactSupport },
              ]}
              sx={{
                mb: { xs: 3, md: 5 },
              }}
            />
          </Box>

          <Card>
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
              {TABS.map((tab) => (
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

            <UserTableToolbar
              filters={filters}
              onFilters={handleFilters}
            />

            {canReset && (
              <UserTableFiltersResult
                filters={filters}
                onFilters={handleFilters}
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
                    {!notFound ? (
                      data?.data?.map(
                        (row, index) => (
                          (count = count + 1),
                          (
                            <UserTableRow
                              key={row.id || row._id || index}
                              row={row}
                              selected={table.selected.includes(row.id)}
                              index={index + 1}
                              counter={index + 1 + table.page * table.rowsPerPage}
                              statusOptions={['pending', 'responded', 'resolved', 'closed']}
                            />
                          )
                        )
                      )
                    ) : (
                      <TableNoData notFound={notFound} />
                    )}

                    <TableEmptyRows
                      height={denseHeight}
                      emptyRows={emptyRows(table.page, table.rowsPerPage, total_length)}
                    />
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


const data = {
  requestsCount: {
    totalDocs: 5,
    totalPending: 2,
    totalResponded: 1,
    totalResolved: 1,
    totalClosed: 1,
     },
    data: [
      {
        id: 1,
        name: 'John Doe',
        email: 'john.doe@example.com',
        message: 'I need help with my account.',
        status: 'pending',
        createdAt: '2023-10-01T12:00:00Z',
      },
      {
        id: 2,
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        message: 'I have a question about my order.',
        status: 'responded',
        createdAt: '2023-10-02T12:00:00Z',
      },
      {
        id: 3,
        name: 'Alice Johnson',
        email: 'alice.johnson@example.com',
        message: 'I need assistance with my billing.',
        status: 'resolved',
        createdAt: '2023-10-03T12:00:00Z',
      },
      {
        id: 4,
        name: 'Bob Brown',
        email: 'bob.brown@example.com',
        message: 'I want to cancel my subscription.',
        status: 'closed',
        createdAt: '2023-10-04T12:00:00Z',
      }, {
        id: 5,
        name: 'Charlie Green',
        email: 'charlie.green@example.com',
        message: 'I need help with my account.',
        status: 'pending',
        createdAt: '2023-10-05T12:00:00Z',
      }
    ],
  total_length: 5,
}