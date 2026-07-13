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
import PlatformsTableRow from "../platforms-table-row";
import UserTableToolbar from "../user-table-toolbar";
import { Box } from "@mui/system";
import { paths } from "src/routes/paths";
import UserTableFiltersResult from "../user-table-filters-result";
import { useGetAllPlatformsQuery } from "src/store/Reducer/platforms";
import AddPlatformForm from "../add-platform-modal";
import EditPlatformForm from "../edit-platform-modal";

const TABLE_HEAD = [
  { id: "id", label: "ID", width: 60, align: "center" },
  { id: "title", label: "Title", width: 200 },
  { id: "available", label: "Available", align: "center" },
  { id: "locations", label: "Locations", align: "right" },
  { id: "created_at", label: "Created", align: "center" },
  { id: "action", label: "Action", width: 88 },
];

const defaultFilters = { search: "" };

export default function PlatformsListView() {
  const table = useTable({ defaultRowsPerPage: 10 });
  const settings = useSettingsContext();
  const [filters, setFilters] = useState(defaultFilters);

  const quickAdd = useBoolean();
  const quickEdit = useBoolean();
  const [selectedPlatform, setSelectedPlatform] = useState(null);

  const { data, isLoading } = useGetAllPlatformsQuery({
    pageno: table.page + 1,
    search: filters.search,
  });

  const platforms = data?.data || [];
  const totalCount = data?.total || 0;

  const denseHeight = table.dense ? 52 : 72;
  const canReset = !isEqual(defaultFilters, filters);
  const notFound = !isLoading && platforms.length === 0 && canReset;

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

  const handleEditPlatform = useCallback((row) => {
    setSelectedPlatform(row);
    quickEdit.onTrue();
  }, [quickEdit]);

  const handleCloseEdit = useCallback(() => {
    setSelectedPlatform(null);
    quickEdit.onFalse();
  }, [quickEdit]);

  return (
    <Container maxWidth={settings.themeStretch ? false : "xl"}>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <CustomBreadcrumbs
          heading="Platforms"
          links={[
            { name: "Dashboard", href: paths.dashboard.root },
            { name: "Platforms", href: paths.dashboard.platforms.root },
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
          Add Platform
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
                rowCount={platforms.length}
                numSelected={table.selected?.length}
              />

              <TableBody>
                {platforms.map((row, index) => (
                  <PlatformsTableRow
                    key={row.id || row._id || index}
                    row={row}
                    selected={table.selected.includes(row.id)}
                    index={index + 1}
                    counter={index + 1 + table.page * table.rowsPerPage}
                    onEdit={() => handleEditPlatform(row)}
                  />
                ))}

                <TableEmptyRows
                  height={denseHeight}
                  emptyRows={emptyRows(table.page, table.rowsPerPage, platforms.length)}
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

      <AddPlatformForm open={quickAdd.value} onClose={quickAdd.onFalse} />

      <EditPlatformForm
        row={selectedPlatform}
        open={quickEdit.value}
        onClose={handleCloseEdit}
      />
    </Container>
  );
}
