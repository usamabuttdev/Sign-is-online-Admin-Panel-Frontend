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
import AccountTableRow from "../account-table-row";
import UserTableFiltersResult from '../user-table-filters-result';
import UserTableToolbar from "../user-table-toolbar";

const TABLE_HEAD = [
  { id: "id", label: "ID", width: 20  , align: "center" },
  { id: "title", label: "Title", width: 200 },
  { id: "locations", label: "Locations"},
  { id: "signs", label: "Signs" , align:"center" },
  { id: "users", label: "Users" , align:"center" },
  { id: "total_charged", label: "Total Charged", align:"right" },
  { id: "created_at", label: "Date" , align:"center" },
  { id: "action", label: "Action", width: 88 , align:"center" },
];

const defaultFilters = {
  search: "",
};

const TABLE_DATA = [
  {
    id: 1,
    title: "Account A",
    locations: "New York, LA",
    signs: 15,
    users: 120,
    total_charged: "$1,500",
    created_at: "2025-08-03T00:00:00.000Z",
    action: "View",
  },
  {
    id: 2,
    title: "Account  B",
    locations: "Chicago",
    signs: 8,
    users: 75,
    total_charged: "$800",
    created_at: "2025-08-15T00:00:00.000Z",
    action: "Edit",
  },
  {
    id: 3,
    title: "Account C",
    locations: "San Francisco, Seattle",
    signs: 22,
    users: 200,
    total_charged: "$3,200",
    created_at: "2025-08-07T00:00:00.000Z",
    action: "Delete",
  },
  {
    id: 4,
    title: "Account D",
    locations: "Miami",
    signs: 12,
    users: 95,
    total_charged: "$1,100",
    created_at: "2025-08-08T00:00:00.000Z",
    action: "View",
  },
  {
    id: 5,
    title: "Account E",
    locations: "Dallas, Houston",
    signs: 18,
    users: 150,
    total_charged: "$2,000",
    created_at: "2025-08-12T00:00:00.000Z",
    action: "Edit",
  },
];



export default function AccountsListView() {
  const table = useTable();

  const settings = useSettingsContext();

  const [filters, setFilters] = useState(defaultFilters);
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

  const handleResetFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);

  const filteredData = applyFilter(TABLE_DATA, filters);
  const notFound = (!filteredData.length && canReset);




  return (
    <>
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
                      rowCount={TABLE_DATA.length}
                      numSelected={table.selected?.length}
                    />

                    <TableBody>
                      {(
                        filteredData.map((row, index) => (
                          (
                            <AccountTableRow
                              key={row.id || row._id || index}
                              row={row}
                              selected={table.selected.includes(row.id)}
                              index={index + 1}
                              counter={index + 1 + table.page * table.rowsPerPage}
                            />
                          )
                        ))
                      )}

                      <TableEmptyRows
                        height={denseHeight}
                        emptyRows={emptyRows(table.page, table.rowsPerPage, filteredData.length)}
                      />
                      {notFound &&  <TableNoData notFound={notFound} />}
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
    </>
  );
}


const applyFilter = (data, filters) => {
  const { search } = filters;

  if (search) {
    return data.filter((row) =>
      Object.values(row).some((value) =>
        String(value).toLowerCase().includes(search.toLowerCase())
      )
    );
  }

  return data;
};