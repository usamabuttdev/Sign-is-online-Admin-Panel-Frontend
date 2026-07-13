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
import DevicesTableRow from "../devices-table-row";
import UserTableToolbar from "../user-table-toolbar";
import { Box } from "@mui/system";
import { paths } from "src/routes/paths";
import UserTableFiltersResult from "../user-table-filters-result";
import { useGetAllDevicesQuery } from "src/store/Reducer/devices";
import AddDeviceForm from "../add-device-modal";
import EditDeviceForm from "../edit-device-modal";

const TABLE_HEAD = [
  { id: "id", label: "ID", width: 60, align: "center" },
  { id: "device_id", label: "Device ID", width: 200 },
  { id: "location", label: "Location" },
  { id: "hardware_type", label: "Hardware Type" },
  { id: "firmware_version", label: "Firmware Version" },
  { id: "status", label: "Status" },
  { id: "last_heartbeat", label: "Last Heartbeat", align: "center" },
  { id: "created_at", label: "Created", align: "center" },
  { id: "action", label: "Action", width: 88 },
];

const defaultFilters = { search: "" };

export default function DevicesListView() {
  const table = useTable({ defaultRowsPerPage: 10 });
  const settings = useSettingsContext();
  const [filters, setFilters] = useState(defaultFilters);

  const quickAdd = useBoolean();
  const quickEdit = useBoolean();
  const [selectedDevice, setSelectedDevice] = useState(null);

  const { data, isLoading } = useGetAllDevicesQuery({
    pageno: table.page + 1,
    search: filters.search,
  });

  const devices = data?.data || [];
  const totalCount = data?.total || 0;

  const denseHeight = table.dense ? 52 : 72;
  const canReset = !isEqual(defaultFilters, filters);
  const notFound = !isLoading && devices.length === 0 && canReset;

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

  const handleEditDevice = useCallback((row) => {
    setSelectedDevice(row);
    quickEdit.onTrue();
  }, [quickEdit]);

  const handleCloseEdit = useCallback(() => {
    setSelectedDevice(null);
    quickEdit.onFalse();
  }, [quickEdit]);

  return (
    <Container maxWidth={settings.themeStretch ? false : "xl"}>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <CustomBreadcrumbs
          heading="Devices"
          links={[
            { name: "Dashboard", href: paths.dashboard.root },
            { name: "Devices", href: paths.dashboard.devices.root },
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
          Add Device
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
                rowCount={devices.length}
                numSelected={table.selected?.length}
              />

              <TableBody>
                {devices.map((row, index) => (
                  <DevicesTableRow
                    key={row.id || row._id || index}
                    row={row}
                    selected={table.selected.includes(row.id)}
                    index={index + 1}
                    counter={index + 1 + table.page * table.rowsPerPage}
                    onEdit={() => handleEditDevice(row)}
                  />
                ))}

                <TableEmptyRows
                  height={denseHeight}
                  emptyRows={emptyRows(table.page, table.rowsPerPage, devices.length)}
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

      <AddDeviceForm open={quickAdd.value} onClose={quickAdd.onFalse} />

      <EditDeviceForm
        row={selectedDevice}
        open={quickEdit.value}
        onClose={handleCloseEdit}
      />
    </Container>
  );
}