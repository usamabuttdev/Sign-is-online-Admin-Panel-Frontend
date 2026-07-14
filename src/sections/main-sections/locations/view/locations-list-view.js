import isEqual from "lodash/isEqual";
import { useState, useCallback } from "react";
import Card from "@mui/material/Card";
import Table from "@mui/material/Table";
import Container from "@mui/material/Container";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import Button from "@mui/material/Button";
import Iconify from "src/components/iconify";
import Scrollbar from "src/components/scrollbar";
import { useSettingsContext } from "src/components/settings";
import { useBoolean } from "src/hooks/use-boolean";
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
import { useGetAllLocationsQuery } from "src/store/Reducer/locations";
import AddLocationForm from "../add-location-modal";
import EditLocationForm from "../edit-location-modal";

const TABLE_HEAD = [
  { id: "id", label: "ID", width: 60, align: "center" },
  { id: "title", label: "Title" },
  { id: "account", label: "Account" },
  { id: "auth", label: "Auth", align: "center" },
  { id: "sign", label: "Sign", align: "center" },
  { id: "platforms", label: "Platforms", align: "center" },
  { id: "product", label: "Product" },
  { id: "sub", label: "Sub", align: "center" },
  { id: "location", label: "Location" },
  { id: "created_at", label: "Created", align: "center" },
  { id: "action", label: "Action", width: 88, align: "center" },
];

const defaultFilters = {
  search: "",
};

export default function LocationsListView() {
  const table = useTable();
  const settings = useSettingsContext();
  const [filters, setFilters] = useState(defaultFilters);

  const quickAdd = useBoolean();
  const quickEdit = useBoolean();
  const [selectedLocation, setSelectedLocation] = useState(null);

  const { data, isLoading } = useGetAllLocationsQuery({
    pageno: table.page + 1,
    search: filters.search,
  });

  const locationsData = data?.data || [];
  const totalCount = data?.total || 0;

  const denseHeight = table.dense ? 52 : 72;
  const canReset = !isEqual(defaultFilters, filters);
  const notFound = !isLoading && locationsData.length === 0 && canReset;

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

  const handleEditLocation = useCallback((row) => {
    setSelectedLocation(row);
    quickEdit.onTrue();
  }, [quickEdit]);

  const handleCloseEdit = useCallback(() => {
    setSelectedLocation(null);
    quickEdit.onFalse();
  }, [quickEdit]);

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
        <Button
          variant="contained"
          onClick={quickAdd.onTrue}
          startIcon={<Iconify icon="mingcute:add-line" />}
          sx={{ mb: { xs: 3, md: 5 } }}
        >
          Add Location
        </Button>
      </Box>

      <Card>
        <UserTableToolbar filters={filters} onFilters={handleFilters} roleOptions={[]} />

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
            <Table size={table.dense ? "small" : "medium"} sx={{ minWidth: 1200 }}>
              <TableHeadCustom
                order={table.order}
                orderBy={table.orderBy}
                headLabel={TABLE_HEAD}
                rowCount={locationsData.length}
                numSelected={table.selected?.length}
              />

              <TableBody>
                {locationsData.map((row, index) => (
                  <LocationsTableRow
                    key={row.id || row._id || index}
                    row={row}
                    selected={table.selected.includes(row.id)}
                    index={index + 1}
                    counter={index + 1 + table.page * table.rowsPerPage}
                    onEdit={() => handleEditLocation(row)}
                  />
                ))}

                <TableEmptyRows
                  height={denseHeight}
                  emptyRows={emptyRows(table.page, table.rowsPerPage, locationsData.length)}
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

      <AddLocationForm open={quickAdd.value} onClose={quickAdd.onFalse} />

      <EditLocationForm
        row={selectedLocation}
        open={quickEdit.value}
        onClose={handleCloseEdit}
      />
    </Container>
  );
}
