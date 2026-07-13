import isEqual from "lodash/isEqual";
import { useState, useCallback } from "react";
import Card from "@mui/material/Card";
import Table from "@mui/material/Table";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import Iconify from "src/components/iconify";
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
import ScriptsTableRow from "../scripts-table-row";
import UserTableToolbar from "../user-table-toolbar";
import { Box } from "@mui/system";
import { paths } from "src/routes/paths";
import { useRouter } from "src/routes/hooks";
import UserTableFiltersResult from "../user-table-filters-result";
import { useGetAllScriptsQuery } from "src/store/Reducer/scripts";

const TABLE_HEAD = [
  { id: "id", label: "ID", width: 60, align: "center" },
  { id: "title", label: "Title", width: 200 },
  { id: "run_frequency", label: "Run Frequency", align: "center" },
  { id: "last_started", label: "Last Started", align: "center" },
  { id: "created_at", label: "Created", align: "center" },
  { id: "status", label: "Status", align: "center" },
  { id: "last_checked", label: "Last Checked", align: "center" },
  { id: "action", label: "Action", width: 100, align: "center" },
];

const defaultFilters = { search: "" };

export default function ScriptsListView() {
  const table = useTable({ defaultRowsPerPage: 10 });
  const settings = useSettingsContext();
  const router = useRouter();
  const [filters, setFilters] = useState(defaultFilters);

  const { data, isLoading } = useGetAllScriptsQuery({
    pageno: table.page + 1,
    search: filters.search,
  });

  const scripts = data?.data || [];
  const totalCount = data?.total || 0;

  const denseHeight = table.dense ? 52 : 72;
  const canReset = !isEqual(defaultFilters, filters);
  const notFound = !isLoading && scripts.length === 0 && canReset;

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

  const handleEditScript = useCallback(
    (row) => {
      router.push(paths.dashboard.scripts.edit(row.id));
    },
    [router]
  );

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

        <Button
          component="a"
          href={`${paths.dashboard.scripts.root}/new`}
          variant="contained"
          startIcon={<Iconify icon="mingcute:add-line" />}
          sx={{ mb: { xs: 3, md: 5 } }}
        >
          Add Script
        </Button>
      </Box>

      <Card>
        <UserTableToolbar filters={filters} onFilters={handleFilters} />

        {canReset && (
          <UserTableFiltersResult
            filters={filters}
            onFilters={handleFilters}
            onResetFilters={handleResetFilters}
            results={totalCount}
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
                rowCount={scripts.length}
                numSelected={table.selected?.length}
              />

              <TableBody>
                {scripts.map((row, index) => (
                  <ScriptsTableRow
                    key={row.id || row._id || index}
                    row={row}
                    selected={table.selected.includes(row.id)}
                    index={index + 1}
                    counter={index + 1 + table.page * table.rowsPerPage}
                    onEdit={() => handleEditScript(row)}
                  />
                ))}

                <TableEmptyRows
                  height={denseHeight}
                  emptyRows={emptyRows(table.page, table.rowsPerPage, scripts.length)}
                />
                {notFound && <TableNoData notFound={notFound} />}
              </TableBody>
            </Table>
          </Scrollbar>
        </TableContainer>

        <TablePaginationCustom
          count={totalCount}
          page={table.page}
          rowsPerPage={table.rowsPerPage}
          onPageChange={table.onChangePage}
          onRowsPerPageChange={table.onChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}
