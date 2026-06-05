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
import LocationsTableRow from "../locations-table-row";
import UserTableToolbar from "../user-table-toolbar";
import { Box } from "@mui/system";
import { paths } from "src/routes/paths";
import UserTableFiltersResult from "../user-table-filters-result";

const TABLE_HEAD = [
  { id: "id", label: "ID", width: 60 , align:"center" },
  { id: "title", label: "Title" },
  { id: "account", label: "Account" },
  { id: "auth", label: "Auth"  , align:"center"},
  { id: "sign", label: "Sign" , align:"center" },
  { id: "platforms", label: "Platforms" ,align:"center"},
  { id: "product", label: "Product" },
  { id: "sub", label: "Sub", align: "center" },
  { id: "location", label: "Location" },
  { id: "created_at", label: "Created" , align:"center" },
  { id: "action", label: "Action", width: 88 , align:"center"},
];

const defaultFilters = {
  search: "",
};

const TABLE_DATA = [
  {
    id: 1,
    title: "Location A",
    account: "Account A",
    authenticated: "Yes",
    sign_exists: "Yes",
    platforms_count: 3,
    product: "Product X",
    city: "New York",
    state: "NY",
    created_at: "2025-08-01T10:30:00Z", // ISO format
    action: "View",
    subscription:true
  },
  {
    id: 2,
    title: "Location B",
    account: "Account B",
    authenticated: "No",
    sign_exists: "No",
    platforms_count: 1,
    product: "Product Y",
    city: "Chicago",
    state: "IL",
    created_at: "2025-08-05T14:15:00Z",
    action: "Edit",
    subscription:false
  },
  {
    id: 3,
    title: "Location C",
    account: "Account C",
    authenticated: "Yes",
    sign_exists: "Yes",
    platforms_count: 2,
    product: "Product Z",
    city: "San Francisco",
    state: "CA",
    created_at: "2025-08-10T09:00:00Z",
    action: "Delete",
    subscription:true
  },
];



export default function LocationsListView() {
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
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <CustomBreadcrumbs
          heading="Locations"
          links={[
            { name: "Dashboard", href: paths.dashboard.root },
            { name: "Locations", href: paths.dashboard.locations.root },
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
            results={filteredData.length}
            sx={{ p: 2.5, pt: 0 }}
          />
        )}

        <TableContainer sx={{ position: "relative", overflow: "unset", zIndex: 100 }}>
          <Scrollbar>
            <Table size={table.dense ? "small" : "medium"} sx={{ minWidth: 1200 }}>
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
                    <LocationsTableRow
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
                  emptyRows={emptyRows(table.page, table.rowsPerPage, filteredData.length)}
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


function applyFilter(tableData, search) {
  if (!search) return tableData;

  return tableData.filter((row) =>
    Object.values(row).some((value) =>
      String(value).toLowerCase().includes(search.toLowerCase())
    )
  );
}