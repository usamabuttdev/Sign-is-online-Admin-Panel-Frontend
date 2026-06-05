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
import UserTableToolbar from '../../transactions/user-table-toolbar';
import SalesTableRow from '../sales-table-row';
import { useLocation, useNavigate } from 'react-router-dom';
import UserTableFiltersResult from 'src/sections/user/user-table-filters-result';

const TABLE_HEAD = [
  { id: 'saleId', label: 'Sale ID' },
  { id: 'dateOfSale', label: 'Date of Sale' },
  { id: 'customerName', label: 'Customer Name' },
  { id: 'productSold', label: 'Product / Item Sold' },
  { id: 'quantity', label: 'Quantity' },
  { id: 'pricePerUnit', label: 'Price per Unit' },
  { id: 'totalAmount', label: 'Total Amount' },
  { id: 'paymentMethod', label: 'Payment Method' },
  { id: 'status', label: 'Status' },
];

const defaultFilters = {
  name: '',
  email: '',
  status: 'all',
};

const salesList = [
  {
    id: 1,
    saleId: 'S-1001',
    dateOfSale: '2025-08-09',
    customerName: 'John Doe',
    productSold: 'Wireless Mouse',
    quantity: 2,
    pricePerUnit: '$25.00',
    totalAmount: '$50.00',
    paymentMethod: 'Credit Card',
    status: 'paid',
  },
  {
    id: 2,
    saleId: 'S-1002',
    dateOfSale: '2025-08-08',
    customerName: 'Jane Smith',
    productSold: 'Laptop Stand',
    quantity: 1,
    pricePerUnit: '$40.00',
    totalAmount: '$40.00',
    paymentMethod: 'PayPal',
    status: 'pending',
  },
  {
    id: 3,
    saleId: 'S-1003',
    dateOfSale: '2025-08-07',
    customerName: 'Alice Johnson',
    productSold: 'Bluetooth Speaker',
    quantity: 3,
    pricePerUnit: '$30.00',
    totalAmount: '$90.00',
    paymentMethod: 'Credit Card',
    status: 'refunded',
  },
  {
    id: 4,
    saleId: 'S-1004',
    dateOfSale: '2025-08-06',
    customerName: 'Bob Brown',
    productSold: 'USB-C Hub',
    quantity: 1,
    pricePerUnit: '$25.00',
    totalAmount: '$25.00',
    paymentMethod: 'Debit Card',
    status: 'pending',
  }, {
    id: 5,
    saleId: 'S-1005',
    dateOfSale: '2025-08-05',
    customerName: 'Charlie Davis',
    productSold: 'HDMI Cable',
    quantity: 5,
    pricePerUnit: '$10.00',
    totalAmount: '$50.00',
    paymentMethod: 'Credit Card',
    status: 'paid',
  }
];



export default function TransactionsListView() {


  const table = useTable();
  const theme = useTheme();
  const settings = useSettingsContext();
  const { state } = useLocation();
  const navigate = useNavigate();

  const [filters, setFilters] = useState(defaultFilters);

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
      count: salesList.length,
    },
    {
      value: 'paid',
      label: 'Paid',
      color: 'success',
      count: salesList.filter((sale) => sale.status === 'paid').length,
    },
    {
      value: 'pending',
      label: 'Pending',
      color: 'warning',
      count: salesList.filter((sale) => sale.status === 'pending').length,
    },
    {
      value: 'refunded',
      label: 'Refunded',
      color: 'error',
      count: salesList.filter((sale) => sale.status === 'refunded').length,
    }
  ];

  let total_length = salesList?.length;

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
              heading="Sales"
              links={[
                { name: 'Dashboard', href: paths.dashboard.root },
                { name: 'Sales', href: paths.dashboard.sales.root },
              ]}
              sx={{ mb: 3 }}
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
                    {salesList?.map(
                      (row, index) => (
                        (count = count + 1),
                        (
                          <SalesTableRow
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
