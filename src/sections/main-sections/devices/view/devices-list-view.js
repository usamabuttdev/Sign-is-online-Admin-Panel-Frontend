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
import DevicesTableRow from "../devices-table-row";
import UserTableToolbar from "../../signs/user-table-toolbar";
import { Box } from "@mui/system";
import { paths } from "src/routes/paths";
import UserTableFiltersResult from "../../signs/user-table-filters-result";

const TABLE_HEAD = [
  { id: "id", label: "ID", width: 60, align: "center" },
  { id: "device_id", label: "Device ID", width: 200 },
  { id: "location", label: "Location" },
  { id: "hardware_type", label: "Hardware Type" },
  { id: "firmware_version", label: "Firmware Version" },
  { id: "status", label: "Status" },
  { id: "last_heartbeat", label: "Last Heartbeat", align: "center" },
  { id: "created_at", label: "Created", align: "center" },
];

const defaultFilters = { search: "" };

const TABLE_DATA = [
  {
    id: 1,
    device_id: "TAB-001",
    location: "New York",
    location_id: 1,
    hardware_type: "Tablet",
    firmware_version: "v2.1.0",
    status: "active",
    last_heartbeat: "2025-08-01T10:30:00Z",
    created_at: "2025-08-01T10:30:00Z",
  },
  {
    id: 2,
    device_id: "KIO-002",
    location: "Chicago",
    location_id: 2,
    hardware_type: "Kiosk",
    firmware_version: "v1.4.3",
    status: "active",
    last_heartbeat: "2025-08-05T14:15:00Z",
    created_at: "2025-08-05T14:15:00Z",
  },
  {
    id: 3,
    device_id: "DSP-003",
    location: "San Francisco",
    location_id: 3,
    hardware_type: "Digital Sign",
    firmware_version: "v3.0.1",
    status: "inactive",
    last_heartbeat: "2025-08-10T09:00:00Z",
    created_at: "2025-08-10T09:00:00Z",
  },
];

export default function DevicesListView() {
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
          heading="Devices"
          links={[
            { name: "Dashboard", href: paths.dashboard.root },
            { name: "Devices", href: paths.dashboard.devices.root },
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
                  <DevicesTableRow
                    key={row.id || row._id || index}
                    row={row}
                    selected={table.selected.includes(row.id)}
                    index={index + 1}
                    counter={index + 1 + table.page * table.rowsPerPage}
                  />
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
