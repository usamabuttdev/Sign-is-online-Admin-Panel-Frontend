import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import { Box } from "@mui/system";
import isEqual from "lodash/isEqual";
import { useCallback, useState } from "react";
import { _roles } from "src/_mock";
import CustomBreadcrumbs from "src/components/custom-breadcrumbs";
import Scrollbar from "src/components/scrollbar";
import { useSettingsContext } from "src/components/settings";
import {
  emptyRows,
  TableEmptyRows,
  TableHeadCustom,
  TableNoData,
  TablePaginationCustom,
  useTable,
} from "src/components/table";
import { paths } from "src/routes/paths";
import ChargesTableRow from "../charges-table-row";
import UserTableFiltersResult from "../user-table-filters-result";
import UserTableToolbar from "../user-table-toolbar";

const TABLE_HEAD = [
  { id: "id", label: "ID", width: 60 , align:"center" },
  { id: "account", label: "Account", width: 200 },
  { id: "amount", label: "Amount" , align:"right" },
  { id: "method", label: "Method" },
  { id: "created_at", label: "Date Charged" , align:"center" },
  { id: "status" , label:"Status" ,align:"center"},
  { id: "action", label: "Action", width: 88 , align:"center"},
];

const defaultFilters = {
  search: "",
  documentStatus: "",
};

const TABLE_DATA = [
  {
    id: 1,
    account: "Account A",
    amount: "$120.00",
    method: "Credit Card",
    created_at: "2025-08-01T00:00:00Z",
    action: "View",
    status: "Attempted",
  },
  {
    id: 2,
    account: "Account B",
    amount: "$75.50",
    method: "PayPal",
    created_at: "2025-08-05T00:00:00Z",
    action: "Edit",
    status: "Successful",
  },
  {
    id: 3,
    account: "Account C",
    amount: "$300.00",
    method: "Bank Transfer",
    created_at: "2025-08-10T00:00:00Z",
    action: "Delete",
    status: "Successful",
  },
  {
    id: 4,
    account: "Account D",
    amount: "$95.25",
    method: "Credit Card",
    created_at: "2025-08-15T00:00:00Z",
    action: "View",
    status: "Refunded",
  },
  {
    id: 5,
    account: "Account E",
    amount: "$200.75",
    method: "Stripe",
    created_at: "2025-08-20T00:00:00Z",
    action: "Edit",
    status: "Attempted",
  },
];



export default function ChargesListView() {
  const table = useTable();
  const settings = useSettingsContext();
  const [filters, setFilters] = useState(defaultFilters);

  const denseHeight = table.dense ? 52 : 72;
  const canReset = !isEqual(defaultFilters, filters);
  const filteredData = applyFilter(TABLE_DATA, filters.search);
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
          heading="Charges"
          links={[
            { name: "Dashboard", href: paths.dashboard.root },
            { name: "Charges", href: paths.dashboard.charges.root },
          ]}
          sx={{
            mb: { xs: 3, md: 5 },
          }}
        />
      </Box>

      <Card>
        <UserTableToolbar
          filters={filters}
          onFilters={handleFilters}
          roleOptions={_roles}
        />

        {canReset && (
          <UserTableFiltersResult
            filters={filters}
            onFilters={handleFilters}
            onResetFilters={handleResetFilters}
            results={TABLE_DATA.length}
            sx={{ p: 2.5, pt: 0 }}
          />
        )}

        <TableContainer
          sx={{ position: "relative", overflow: "unset" }}
        >
          <Scrollbar>
            <Table
              size={table.dense ? "small" : "medium"}
              sx={{ minWidth: 960 }}
            >
              <TableHeadCustom
                order={table.order}
                orderBy={table.orderBy}
                headLabel={TABLE_HEAD}
                rowCount={filteredData.length}
                numSelected={table.selected?.length}
              />

              <TableBody>
                {filteredData.map((row, index) => (
                  (
                    <ChargesTableRow
                      key={row.id || row._id || index}
                      row={row}
                      selected={table.selected.includes(row.id)}
                      index={index + 1}
                      counter={index + 1 + table.page * table.rowsPerPage}
                    />
                  )
                ))}

                <TableEmptyRows
                  height={denseHeight}
                  emptyRows={emptyRows(
                    table.page,
                    table.rowsPerPage,
                    TABLE_DATA.length
                  )}
                />
                {notFound && <TableNoData notFound={notFound} />}
              </TableBody>
            </Table>
          </Scrollbar>
        </TableContainer>

        <TablePaginationCustom
          count={filteredData.length || 1}
          page={table.page}
          rowsPerPage={table.rowsPerPage}
          onPageChange={table.onChangePage}
          onRowsPerPageChange={table.onChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}


function applyFilter  (tableData, search) {
  if (!search) return tableData;

  return tableData.filter((row) =>
    Object.values(row).some((value) =>
      String(value).toLowerCase().includes(search.toLowerCase())
    )
  );
};