import isEqual from "lodash/isEqual";
import { useState, useCallback } from "react";
import { useTheme } from "@mui/material/styles";
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
import UserTableRow from "../api-table-row";
import UserTableToolbar from "../user-table-toolbar";
import { Box } from "@mui/system";
import { paths } from "src/routes/paths";
import UserTableFiltersResult from "../user-table-filters-result";

const TABLE_HEAD = [
  { id: "id", label: "ID", width: 60 , align:"center" },
  { id: "title", label: "Title", width: 200 },
  { id: "calls_24h", label: "Calls (24h)" ,align:"right" },
  { id: "calls_1h", label: "Calls (1h)" ,align:"right" },
  { id: "queued_count", label: "Queued" ,align:"right" },
  { id: "created_at", label: "Created" , align:"center"},
  // { id: "action", label: "Action", width: 88 },
];

const defaultFilters = {
  search: "",
  documentStatus: "",
};

const TABLE_DATA = [
  {
    id: 1,
    title: "Weather API",
    calls_24h: 8200,  
    calls_1h: 1200,   
    queued_count: 10,
    created_at: "2025-08-01T00:00:00.000Z",
    action: "View",
  },
  {
    id: 2,
    title: "Maps API",
    calls_24h: 5000,
    calls_1h: 100,
    queued_count: 0,
    created_at: "2025-08-05T00:00:00.000Z",
    action: "Edit",
  },
  {
    id: 3,
    title: "Payments API",
    calls_24h: 3100,
    calls_1h: 300,
    queued_count: 25,
    created_at: "2025-08-10T00:00:00.000Z",
    action: "Delete",
  },
  {
    id: 4,
    title: "Notifications API",
    calls_24h: 2200,
    calls_1h: 190,
    queued_count: 5,
    created_at: "2025-08-15T00:00:00.000Z",
    action: "View",
  },
  {
    id: 5,
    title: "Analytics API",
    calls_24h: 4200,
    calls_1h: 320,
    queued_count: 12,
    created_at: "2025-08-20T00:00:00.000Z",
    action: "Edit",
  },
];



export default function APIsListView() {
  const table = useTable();

  const settings = useSettingsContext();

  const [filters, setFilters] = useState(defaultFilters);
  const filteredData = applyFilter(TABLE_DATA, filters.search);


  const denseHeight = table.dense ? 52 : 72;
  const canReset = !isEqual(defaultFilters, filters);
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
            heading="APIs"
            links={[
              { name: "Dashboard", href: paths.dashboard.root },
              { name: "APIs", href: paths.dashboard.apis.root },
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
            sx={{ position: "relative", overflow: "unset"}}
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
                  rowCount={TABLE_DATA.length}
                  numSelected={table.selected?.length}
                />

                <TableBody>
                  {filteredData?.map((row, index) => (
                    (
                      <UserTableRow
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
                      filteredData.length
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
    </>
  );
}

function applyFilter (tableData, search) {
  if (!search) return tableData;

  return tableData.filter((row) =>
    Object.values(row).some((value) =>
      String(value).toLowerCase().includes(search.toLowerCase())
    )
  );
};
