import isEqual from "lodash/isEqual";
import { useState, useCallback } from "react";
import Card from "@mui/material/Card";
import Table from "@mui/material/Table";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import { _roles } from "src/_mock";
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
import SignsTableRow from "../signs-table-row";
import UserTableToolbar from "../user-table-toolbar";
import { Box } from "@mui/system";
import { paths } from "src/routes/paths";
import UserTableFiltersResult from "../user-table-filters-result";
import { useGetAllDevicesQuery } from "src/store/Reducer/devices";
import AddDeviceForm from "src/sections/main-sections/devices/add-device-modal";
import EditDeviceForm from "src/sections/main-sections/devices/edit-device-modal";

const TABLE_HEAD = [
  { id: "id", label: "ID", width: 60, align: "center" },
  { id: "device_id", label: "Device ID", width: 160 },
  { id: "location", label: "Location" },
  { id: "hardware_type", label: "Hardware", align: "center" },
  { id: "firmware_version", label: "Firmware", align: "center" },
  { id: "status", label: "Status", align: "center" },
  { id: "last_heartbeat", label: "Last Heartbeat", align: "center" },
  { id: "created_at", label: "Created", align: "center" },
  { id: "action", label: "Action", width: 120, align: "center" },
];

const defaultFilters = { search: "" };

export default function SignsListView() {
  const table = useTable({ defaultRowsPerPage: 10 });
  const settings = useSettingsContext();
  const [filters, setFilters] = useState(defaultFilters);
  const quickAdd = useBoolean();
  const quickEdit = useBoolean();
  const [selectedDevice, setSelectedDevice] = useState(null);

  const { data: apiResponse, isLoading } = useGetAllDevicesQuery({
    pageno: table.page + 1,
    search: filters.search,
  });

  const TABLE_DATA = apiResponse?.data || [];
  const totalCount = apiResponse?.total || 0;

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

  const handleEdit = useCallback(
    (row) => {
      setSelectedDevice(row);
      quickEdit.onTrue();
    },
    [quickEdit]
  );

  const handleCloseEdit = useCallback(() => {
    setSelectedDevice(null);
    quickEdit.onFalse();
  }, [quickEdit]);

  return (
    <Container maxWidth={settings.themeStretch ? false : "xl"}>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <CustomBreadcrumbs
          heading="Signs"
          links={[
            { name: "Dashboard", href: paths.dashboard.root },
            { name: "Signs", href: paths.dashboard.signs.root },
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
          Add Sign
        </Button>
      </Box>

      <Card>
        <UserTableToolbar filters={filters} onFilters={handleFilters} roleOptions={_roles} />

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
            <Table size={table.dense ? "small" : "medium"} sx={{ minWidth: 1100 }}>
              <TableHeadCustom
                order={table.order}
                orderBy={table.orderBy}
                headLabel={TABLE_HEAD}
                rowCount={filteredData.length}
                numSelected={table.selected?.length}
              />

              <TableBody>
                {filteredData.map((row, index) => (
                  <SignsTableRow
                    key={row.id || row._id || index}
                    row={row}
                    selected={table.selected.includes(row.id)}
                    onEdit={() => handleEdit(row)}
                  />
                ))}

                <TableEmptyRows
                  height={denseHeight}
                  emptyRows={emptyRows(table.page, table.rowsPerPage, filteredData.length)}
                />
                {!isLoading && notFound && <TableNoData notFound={notFound} />}
              </TableBody>
            </Table>
          </Scrollbar>
        </TableContainer>

        <TablePaginationCustom
          count={totalCount || 0}
          page={table.page}
          rowsPerPage={table.rowsPerPage}
          onPageChange={table.onChangePage}
          onRowsPerPageChange={table.onChangeRowsPerPage}
          loading={isLoading}
        />
      </Card>

      <AddDeviceForm open={quickAdd.value} onClose={quickAdd.onFalse} />
      <EditDeviceForm row={selectedDevice} open={quickEdit.value} onClose={handleCloseEdit} />
    </Container>
  );
}

function applyFilter(tableData, search) {
  if (!search) return tableData;
  return tableData.filter((row) =>
    Object.values(row).some((value) => String(value).toLowerCase().includes(search.toLowerCase()))
  );
}
