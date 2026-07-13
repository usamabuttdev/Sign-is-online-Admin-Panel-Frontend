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
import { useBoolean } from "src/hooks/use-boolean";
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
import { useGetAllApisQuery } from "src/store/Reducer/apis";
import AddApiForm from "../add-api-modal";
import EditApiForm from "../edit-api-modal";

const TABLE_HEAD = [
  { id: "id", label: "ID", width: 60, align: "center" },
  { id: "title", label: "Title", width: 200 },
  { id: "calls_24h", label: "Calls (24h)", align: "right" },
  { id: "calls_1h", label: "Calls (1h)", align: "right" },
  { id: "queued_count", label: "Queued", align: "right" },
  { id: "created_at", label: "Created", align: "center" },
  { id: "action", label: "Action", width: 88 },
];

const defaultFilters = { search: "" };

export default function APIsListView() {
  const table = useTable({ defaultRowsPerPage: 10 });
  const settings = useSettingsContext();
  const [filters, setFilters] = useState(defaultFilters);

  const quickAdd = useBoolean();
  const quickEdit = useBoolean();
  const [selectedApi, setSelectedApi] = useState(null);

  const { data, isLoading } = useGetAllApisQuery({
    pageno: table.page + 1,
    search: filters.search,
  });

  const apis = data?.data || [];
  const totalCount = data?.total || 0;

  const denseHeight = table.dense ? 52 : 72;
  const canReset = !isEqual(defaultFilters, filters);
  const notFound = !isLoading && apis.length === 0 && canReset;

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

  const handleEditApi = useCallback((row) => {
    setSelectedApi(row);
    quickEdit.onTrue();
  }, [quickEdit]);

  const handleCloseEdit = useCallback(() => {
    setSelectedApi(null);
    quickEdit.onFalse();
  }, [quickEdit]);

  return (
    <Container maxWidth={settings.themeStretch ? false : "xl"}>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <CustomBreadcrumbs
          heading="APIs"
          links={[
            { name: "Dashboard", href: paths.dashboard.root },
            { name: "APIs", href: paths.dashboard.apis.root },
          ]}
          sx={{ mb: { xs: 3, md: 5 } }}
        />

        <Button
          variant="contained"
          color="primary"
          onClick={quickAdd.onTrue}
          startIcon={<Iconify icon="mingcute:add-line" />}
          sx={{ mb: { xs: 3, md: 5 } }}
        >
          Add API
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

        <TableContainer sx={{ position: "relative", overflow: "unset" }}>
          <Scrollbar>
            <Table size={table.dense ? "small" : "medium"} sx={{ minWidth: 960 }}>
              <TableHeadCustom
                order={table.order}
                orderBy={table.orderBy}
                headLabel={TABLE_HEAD}
                rowCount={apis.length}
                numSelected={table.selected?.length}
              />

              <TableBody>
                {apis.map((row, index) => (
                  <UserTableRow
                    key={row.id || row._id || index}
                    row={row}
                    selected={table.selected.includes(row.id)}
                    index={index + 1}
                    counter={index + 1 + table.page * table.rowsPerPage}
                    onEdit={() => handleEditApi(row)}
                  />
                ))}

                <TableEmptyRows
                  height={denseHeight}
                  emptyRows={emptyRows(table.page, table.rowsPerPage, apis.length)}
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

      <AddApiForm open={quickAdd.value} onClose={quickAdd.onFalse} />

      <EditApiForm
        row={selectedApi}
        open={quickEdit.value}
        onClose={handleCloseEdit}
      />
    </Container>
  );
}