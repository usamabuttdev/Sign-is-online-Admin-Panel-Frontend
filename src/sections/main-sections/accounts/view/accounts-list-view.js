import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import Button from "@mui/material/Button";
import { Box } from "@mui/system";
import isEqual from "lodash/isEqual";
import { useCallback, useState } from "react";
import Iconify from "src/components/iconify";
import CustomBreadcrumbs from "src/components/custom-breadcrumbs";
import Scrollbar from "src/components/scrollbar";
import { useSettingsContext } from "src/components/settings";
import { useBoolean } from "src/hooks/use-boolean";
import {
  emptyRows,
  TableEmptyRows,
  TableHeadCustom,
  TableNoData,
  TablePaginationCustom,
  useTable,
} from "src/components/table";
import { paths } from "src/routes/paths";
import AccountTableRow from "../account-table-row";
import UserTableFiltersResult from '../user-table-filters-result';
import UserTableToolbar from "../user-table-toolbar";
import { useGetAllAccountsQuery } from "src/store/Reducer/accounts";
import AddAccountForm from "../add-account-modal";
import EditAccountForm from "../edit-account-modal";

const TABLE_HEAD = [
  { id: "id", label: "ID", width: 20, align: "center" },
  { id: "title", label: "Title", width: 200 },
  { id: "locations", label: "Locations" },
  { id: "signs", label: "Signs", align: "center" },
  { id: "users", label: "Users", align: "center" },
  { id: "total_charged", label: "Total Charged", align: "right" },
  { id: "created_at", label: "Date", align: "center" },
  { id: "action", label: "Action", width: 88, align: "center" },
];

const defaultFilters = {
  search: "",
};

export default function AccountsListView() {
  const table = useTable();
  const settings = useSettingsContext();
  const [filters, setFilters] = useState(defaultFilters);

  const quickAdd = useBoolean();
  const quickEdit = useBoolean();
  const [selectedAccount, setSelectedAccount] = useState(null);

  const { data, isLoading } = useGetAllAccountsQuery({
    pageno: table.page + 1,
    search: filters.search,
  });

  const accountsData = data?.data || [];
  const totalCount = data?.total || 0;

  const denseHeight = table.dense ? 52 : 72;
  const canReset = !isEqual(defaultFilters, filters);
  const notFound = !isLoading && accountsData.length === 0 && canReset;

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

  const handleEditAccount = useCallback((row) => {
    setSelectedAccount(row);
    quickEdit.onTrue();
  }, [quickEdit]);

  const handleCloseEdit = useCallback(() => {
    setSelectedAccount(null);
    quickEdit.onFalse();
  }, [quickEdit]);

  return (
    <Container maxWidth={settings.themeStretch ? false : "xl"}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <CustomBreadcrumbs
          heading="Accounts"
          links={[
            { name: "Dashboard", href: paths.dashboard.root },
            { name: "Accounts", href: paths.dashboard.accounts.root },
          ]}
          sx={{
            mb: { xs: 3, md: 5 },
          }}
        />
        <Button
          variant="contained"
          onClick={quickAdd.onTrue}
          startIcon={<Iconify icon="mingcute:add-line" />}
          sx={{ mb: { xs: 3, md: 5 } }}
        >
          Add Account
        </Button>
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

        <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
          <Scrollbar>
            <Table
              size={table.dense ? "small" : "medium"}
              sx={{ minWidth: 960 }}
            >
              <TableHeadCustom
                order={table.order}
                orderBy={table.orderBy}
                headLabel={TABLE_HEAD}
                rowCount={accountsData.length}
                numSelected={table.selected?.length}
              />

              <TableBody>
                {accountsData.map((row, index) => (
                  <AccountTableRow
                    key={row.id || row._id || index}
                    row={row}
                    selected={table.selected.includes(row.id)}
                    index={index + 1}
                    counter={index + 1 + table.page * table.rowsPerPage}
                    onEdit={() => handleEditAccount(row)}
                  />
                ))}

                <TableEmptyRows
                  height={denseHeight}
                  emptyRows={emptyRows(table.page, table.rowsPerPage, accountsData.length)}
                />
                {notFound && <TableNoData notFound={notFound} />}
              </TableBody>
            </Table>
          </Scrollbar>
        </TableContainer>

        <TablePaginationCustom
          count={totalCount || 1}
          page={table.page}
          rowsPerPage={table.rowsPerPage}
          onPageChange={table.onChangePage}
          onRowsPerPageChange={table.onChangeRowsPerPage}
        />
      </Card>

      <AddAccountForm open={quickAdd.value} onClose={quickAdd.onFalse} />

      <EditAccountForm
        row={selectedAccount}
        open={quickEdit.value}
        onClose={handleCloseEdit}
      />
    </Container>
  );
}
