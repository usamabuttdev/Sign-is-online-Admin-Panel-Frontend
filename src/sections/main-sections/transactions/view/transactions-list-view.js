import { Tab, Tabs, useTheme } from '@mui/material';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import { alpha, Box } from '@mui/system';
import isEqual from 'lodash/isEqual';
import { useCallback, useEffect, useState } from 'react';
import { _roles } from 'src/_mock';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import Label from 'src/components/label';
import { LoadingScreen } from 'src/components/loading-screen';
import Scrollbar from 'src/components/scrollbar';
import { useSettingsContext } from 'src/components/settings';
import {
  emptyRows,
  TableEmptyRows,
  TableHeadCustom,
  TablePaginationCustom,
  useTable,
} from 'src/components/table';
import { paths } from 'src/routes/paths';
import UserTableFiltersResult from '../user-table-filters-result';
import UserTableRow from '../user-table-row';
import UserTableToolbar from '../user-table-toolbar';
import { useLocation, useNavigate } from 'react-router-dom';

const TABLE_HEAD = [
  { id: 'sender', label: 'Sender' },
  { id: 'cardNo', label: 'Card No' },
  { id: 'expiryDate', label: 'Expiry Date' },
  { id: 'cvc', label: 'CVC' },
  { id: 'transactionType', label: 'Transaction Type' },
  { id: 'status', label: 'Status' },
];

const defaultFilters = {
  name: '',
  status: 'all',
};

const transactionsList = [
  {
    id: 1,
    sender: {
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      account_number: '1234567890',
    },
    receiver: {
      name: 'Alice Smith',
      email: 'alicesmith@gmail.com',
      account_number: '9876543210',
    },
    amount: '$ 100',
    transaction_id: 'TX123456789',
    transaction_type: 'Credit Card',
    date: '2022-10-10',
    status: 'completed',
  },
  {
    id: 2,
    sender: {
      name: 'Sophia Johnson',
      email: 'sophiajohnson@yahoo.com',
      account_number: '2345678901',
    },
    receiver: {
      name: 'Robert Brown',
      email: 'robertbrown@gmail.com',
      account_number: '8765432109',
    },
    transaction_id: 'TX123456781',
    amount: '$ 150',
    date: '2022-11-15',
    status: 'pending',
    transaction_type: 'Google Pay',
  },
  {
    id: 3,
    sender: {
      name: 'Michael Williams',
      email: 'michaelwilliams@outlook.com',
      account_number: '3456789012',
    },
    receiver: {
      name: 'David Miller',
      email: 'davidmiller@icloud.com',
      account_number: '7654321098',
    },
    transaction_id: 'TX123456782',
    amount: '$ 200',
    date: '2022-12-01',
    status: 'completed',
    transaction_type: 'Apple Pay',
  },
  {
    id: 4,
    sender: {
      name: 'Emily Davis',
      email: 'emilydavis@gmail.com',
      account_number: '4567890123',
    },
    receiver: {
      name: 'James Wilson',
      email: 'jameswilson@aol.com',
      account_number: '6543210987',
    },
    transaction_id: 'TX123456784',

    amount: '$ 250',
    date: '2023-01-20',
    status: 'pending',
    transaction_type: 'Credit Card',
  },
  {
    id: 5,
    sender: {
      name: 'William Lee',
      email: 'williamlee@hotmail.com',
      account_number: '5678901234',
    },
    receiver: {
      name: 'Olivia Taylor',
      email: 'oliviataylor@gmail.com',
      account_number: '5432109876',
    },
    transaction_id: 'TX123456784',
    amount: '$ 50',
    date: '2023-02-25',
    status: 'completed',
    transaction_type: 'Credit Card',
  }
];


export default function TransactionsListView() {


  const table = useTable();
  const theme = useTheme();
  const settings = useSettingsContext();

  const [filters, setFilters] = useState(defaultFilters);

  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (state && state.type) {
      handleFilters('status', state.type);
      navigate(window.location.pathname);
    }
  }, [state, navigate]);

  const TABS = [
    {
      value: 'all',
      label: 'All',
      color: 'default',
      count: transactionsList.length,
    },
    {
      value: 'completed',
      label: 'Completed',
      color: 'success',
      count: transactionsList.filter((transaction) => transaction.status === 'completed').length,
    },
    {
      value: 'pending',
      label: 'Pending',
      color: 'warning',
      count: transactionsList.filter((transaction) => transaction.status === 'pending').length,
    },
  ];

  let total_length = transactionsList?.length;

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
  const handleFilterStatus = useCallback((event, newValue) => {
    handleFilters('status', newValue);
  }, []);

  const handleResetFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);

  let count = (table.page - 1) * table.rowsPerPage;

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
              heading="Transactions"
              links={[
                { name: 'Dashboard', href: paths.dashboard.root },
                { name: 'Transactions', href: paths.dashboard.transactions.root },
              ]}
              sx={{ mb: 3}}
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
                boxShadow: `inset 0 -2px 0 0 ${alpha(
                  theme.palette.grey[500],
                  0.08
                )}`,
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
                        ((tab.value === "all" || tab.value === filters.status) &&
                          "filled") ||
                        "soft"
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
                    {transactionsList?.map(
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
                  </TableBody>
                </Table>
              </Scrollbar>
            </TableContainer>

            <TablePaginationCustom
              count={total_length || 1}
              page={table.page}
              dense={table.dense}
              rowsPerPage={table.rowsPerPage}
              onPageChange={table.onChangePage}
              onChangeDense={table.onChangeDense}
              onRowsPerPageChange={table.onChangeRowsPerPage}
            />
          </Card>
        </Container>
      )}
    </>
  );
}
