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
import ScriptsTableRow from "../scripts-table-row";
import UserTableFiltersResult from "../user-table-filters-result";
import UserTableToolbar from "../user-table-toolbar";

const TABLE_HEAD = [
  { id: "id", label: "ID", width: 60 , align:"center" },
  { id: "title", label: "Title", width: 200 },
  { id: "run_frequency", label: "Run Frequency" , align:"center" },
  { id: "last_started", label: "Last Started"  , align:"center"},
  { id: "created_at", label: "Created", align: "center" },
  { id: "status", label: "Status", align: "center" },
  { id: "last_checked", label: "Last Checked" , align: "center" },
  { id: "action", label: "Action", width: 100, align: "center" },
];

const defaultFilters = { search: "" };

const TABLE_DATA = [
  {
    id: 1,
    title: "Backup Script",
    run_frequency: "D", // D = Daily
    last_started: "2025-08-21T02:00:00Z",
    created_at: "2025-08-01T10:30:00Z",
    status: "A", // Active
    last_checked: "2025-08-21T05:00:00Z",
    track_counts: "Y"
  },
  {
    id: 2,
    title: "Cleanup Script",
    run_frequency: "W", // W = Weekly
    last_started: "2025-08-20T03:30:00Z",
    created_at: "2025-08-05T10:30:00Z",
    status: "F", // Failed
    last_checked: "2025-08-20T10:00:00Z",
    track_counts: "N"
  },
  {
    id: 3,
    title: "Analytics Script",
    run_frequency: "H", // H = Hourly
    last_started: "2025-08-21T12:00:00Z",
    created_at: "2025-08-10T10:30:00Z",
    status: "A",
    last_checked: "2025-08-21T13:00:00Z",
    track_counts: "Y"
  },
];



export default function ScriptsListView() {
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
      setFilters((prevState) => ({ ...prevState, [name]: value }));
    },
    [table]
  );

  const handleResetFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);

  let count = (table.page - 1) * table.rowsPerPage;

  return (
    <Container maxWidth={settings.themeStretch ? false : "xl"}>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <CustomBreadcrumbs
          heading="Scripts"
          links={[
            { name: "Dashboard", href: paths.dashboard.root },
            { name: "Scripts", href: paths.dashboard.scripts.root },
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
            <Table size={table.dense ? "small" : "medium"} sx={{ minWidth: 960 }}>
              <TableHeadCustom
                order={table.order}
                orderBy={table.orderBy}
                headLabel={TABLE_HEAD}
                rowCount={filteredData.length}
                numSelected={table.selected?.length}
              />

              <TableBody>
                {filteredData.map((row, index) => (
                  (count = count + 1),
                  (
                    <ScriptsTableRow
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