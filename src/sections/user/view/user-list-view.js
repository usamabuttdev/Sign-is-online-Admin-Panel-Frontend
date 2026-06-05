import isEqual from "lodash/isEqual";
import { useState, useCallback } from "react";
import Card from "@mui/material/Card";
import Table from "@mui/material/Table";
import Container from "@mui/material/Container";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import { _roles } from "src/_mock";
import Scrollbar from "src/components/scrollbar";
import { useSettingsContext } from "src/components/settings";
import CustomBreadcrumbs from "src/components/custom-breadcrumbs";
import {
  useTable,
  emptyRows,
  TableHeadCustom,
  TablePaginationCustom,
  TableEmptyRows,
  TableNoData,
} from "src/components/table";
import UsersTableRow from "../users-table-row";
import UserTableToolbar from "../user-table-toolbar";
import { Box } from "@mui/system";
import { paths } from "src/routes/paths";
import UserTableFiltersResult from "../user-table-filters-result";

const TABLE_HEAD = [
  { id: "id", label: "ID", width: 60 , align:"center" },
  { id: "name", label: "Name" },
  { id: "account", label: "Account" },
  { id: "phone", label: "Phone" },
  { id: "email", label: "Email" },
  { id: "role", label: "Role" , align:"center" },
  { id: "created_at", label: "Date" , align:"center" },
  { id: "action", label: "Action", width: 88 , align:"center"},
];

const defaultFilters = { keyword: "", };


const TABLE_DATA = [
  {
    id: 1,
    account: "Account A",
    name: "John Doe",
    phone: "123-456-7890",
    email: "john@example.com",
    role: "Owner",
    created_at: "2025-08-01T10:15:00Z"
  },
  {
    id: 2,
    account: "Account B",
    name: "Jane Smith",
    phone: "987-654-3210",
    email: "jane@example.com",
    role: "Editor",
    created_at: "2025-08-10T14:45:00Z"
  },
  {
    id: 3,
    account: "Account C",
    name: "Mike Johnson",
    phone: "555-123-4567",
    email: "mike@example.com",
    role: "Owner",
    created_at: "2025-08-23T08:30:00Z"
  },
];

export default function UsersListView() {
  const table = useTable();
  const settings = useSettingsContext();
  const [filters, setFilters] = useState(defaultFilters);

  const denseHeight = table.dense ? 52 : 72;
  const canReset = !isEqual(defaultFilters, filters);


  const dataFiltered = applyFilter(TABLE_DATA, filters.keyword);
  const notFound = !dataFiltered.length && canReset;


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
    <Container maxWidth={settings.themeStretch ? false : "xl"} >
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <CustomBreadcrumbs
          heading="Users"
          links={[
            { name: "Dashboard", href: paths.dashboard.root },
            { name: "Users", href: paths.dashboard.users.root },
          ]}
          sx={{ mb: { xs: 3, md: 5 } }}
        />
      </Box>

      <Card>
        <UserTableToolbar filters={filters} onFilters={handleFilters} roleOptions={_roles} />

        {canReset && (
          <UserTableFiltersResult
            filters={filters}
            onFilters={handleFilters}
            onResetFilters={handleResetFilters}
            results={dataFiltered.length}
            sx={{ p: 2.5, pt: 0 }}
          />
        )}

        <TableContainer sx={{ position: "relative", overflow: "unset"}}>
          <Scrollbar>
            <Table size={table.dense ? "small" : "medium"} sx={{ minWidth: 960 }}>
              <TableHeadCustom
                order={table.order}
                orderBy={table.orderBy}
                headLabel={TABLE_HEAD}
                rowCount={TABLE_DATA.length}
                numSelected={table.selected?.length}
              />

              <TableBody>
              {dataFiltered.map((row, index) => (
                <UsersTableRow
                  key={row.id || row._id || index}
                  row={row}
                  selected={table.selected.includes(row.id)}
                  index={index + 1}
                  counter={index + 1 + table.page * table.rowsPerPage}
                />
                ))}
                <TableEmptyRows
                  height={denseHeight}
                  emptyRows={emptyRows(table.page, table.rowsPerPage, dataFiltered.length)}
                />
                {notFound && <TableNoData notFound={notFound} />}
              </TableBody>
            </Table>
          </Scrollbar>
        </TableContainer>

        <TablePaginationCustom
          count={dataFiltered.length || 1}
          page={table.page}
          rowsPerPage={table.rowsPerPage}
          onPageChange={table.onChangePage}
          onRowsPerPageChange={table.onChangeRowsPerPage}
        />
      </Card>
    </Container>
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