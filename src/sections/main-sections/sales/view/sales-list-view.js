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
  TableNoData,
  useTable,
} from 'src/components/table';
import { paths } from 'src/routes/paths';
import Button from "@mui/material/Button";
import Iconify from "src/components/iconify";
import { useBoolean } from "src/hooks/use-boolean";
import UserTableToolbar from '../../transactions/user-table-toolbar';
import SalesTableRow from '../sales-table-row';
import { useLocation, useNavigate } from 'react-router-dom';
import UserTableFiltersResult from 'src/sections/user/user-table-filters-result';
import { useGetAllSalesQuery } from "src/store/Reducer/sales";
import AddSaleForm from "../add-sale-modal";
import EditSaleForm from "../edit-sale-modal";

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
  { id: 'action', label: 'Action', width: 88 },
];

const defaultFilters = {
  name: '',
  email: '',
  status: 'all',
};

export default function TransactionsListView() {
  const table = useTable();
  const theme = useTheme();
  const settings = useSettingsContext();
  const { state } = useLocation();
  const navigate = useNavigate();

  const [filters, setFilters] = useState(defaultFilters);

  const quickAdd = useBoolean();
  const quickEdit = useBoolean();
  const [selectedSale, setSelectedSale] = useState(null);

  const { data, isLoading } = useGetAllSalesQuery();

  const sales = data?.data || data || [];
  const totalCount = sales?.length || 0;

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
      count: totalCount,
    },
    {
      value: 'paid',
      label: 'Paid',
      color: 'success',
      count: sales.filter((sale) => sale.status === 'paid').length,
    },
    {
      value: 'pending',
      label: 'Pending',
      color: 'warning',
      count: sales.filter((sale) => sale.status === 'pending').length,
    },
    {
      value: 'refunded',
      label: 'Refunded',
      color: 'error',
      count: sales.filter((sale) => sale.status === 'refunded').length,
    }
  ];

  const denseHeight = table.dense ? 52 : 72;
  const canReset = !isEqual(defaultFilters, filters);
  const notFound = !isLoading && sales.length === 0 && canReset;

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

  const handleEditSale = useCallback((row) => {
    setSelectedSale(row);
    quickEdit.onTrue();
  }, [quickEdit]);

  const handleCloseEdit = useCallback(() => {
    setSelectedSale(null);
    quickEdit.onFalse();
  }, [quickEdit]);

  let count = (table.page - 1) * table.rowsPerPage;

  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <Container maxWidth={settings.themeStretch ? false : 'lg'}>
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

            <Button
              variant="contained"
              color="primary"
              onClick={quickAdd.onTrue}
              startIcon={<Iconify icon="mingcute:add-line" />}
              sx={{ mb: 3 }}
            >
              Add Sale
            </Button>
          </Box>

          <Card>
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
                    rowCount={totalCount}
                    numSelected={table.selected?.length}
                  />

                  <TableBody>
                    {sales?.map(
                      (row, index) => (
                        (count = count + 1),
                        (
                          <SalesTableRow
                            key={row.id || row._id || index}
                            row={row}
                            selected={table.selected.includes(row.id)}
                            index={index + 1}
                            counter={index + 1 + table.page * table.rowsPerPage}
                            onEdit={() => handleEditSale(row)}
                          />
                        )
                      )
                    )}

                    <TableEmptyRows
                      height={denseHeight}
                      emptyRows={emptyRows(table.page, table.rowsPerPage, totalCount)}
                    />
                    {notFound && <TableNoData notFound={notFound} />}
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
              onChangeDense={table.onChangeDense}
              onRowsPerPageChange={table.onChangeRowsPerPage}
            />
          </Card>

          <AddSaleForm open={quickAdd.value} onClose={quickAdd.onFalse} />

          <EditSaleForm
            row={selectedSale}
            open={quickEdit.value}
            onClose={handleCloseEdit}
          />
        </Container>
      )}
    </>
  );
}
