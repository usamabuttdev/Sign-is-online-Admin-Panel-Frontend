import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import Button from "@mui/material/Button";
import { Box } from "@mui/system";
import Iconify from "src/components/iconify";
import isEqual from "lodash/isEqual";
import { useCallback, useState } from "react";
import CustomBreadcrumbs from "src/components/custom-breadcrumbs";
import Scrollbar from "src/components/scrollbar";
import { useSettingsContext } from "src/components/settings";
import { useBoolean } from "src/hooks/use-boolean";
import {
  emptyRows,
  TableEmptyRows,
  TableHeadCustom,
  TableNoData,
  TablePaginationCustom,
  useTable,
} from "src/components/table";
import { paths } from "src/routes/paths";
import ChargesTableRow from "../charges-table-row";
import UserTableFiltersResult from "../user-table-filters-result";
import UserTableToolbar from "../user-table-toolbar";
import { useGetAllChargesQuery } from "src/store/Reducer/charges";
import AddChargeForm from "../add-charge-modal";
import EditChargeForm from "../edit-charge-modal";

const TABLE_HEAD = [
  { id: "id", label: "ID", width: 60 , align:"center" },
  { id: "account", label: "Account", width: 200 },
  { id: "amount", label: "Amount" , align:"right" },
  { id: "method", label: "Method" },
  { id: "created_at", label: "Date Charged" , align:"center" },
  { id: "status" , label:"Status" ,align:"center"},
  { id: "action", label: "Action", width: 88 , align:"center"},
];

const defaultFilters = { search: "" };

export default function ChargesListView() {
  const table = useTable({ defaultRowsPerPage: 10 });
  const settings = useSettingsContext();
  const [filters, setFilters] = useState(defaultFilters);

  const quickAdd = useBoolean();
  const quickEdit = useBoolean();
  const [selectedCharge, setSelectedCharge] = useState(null);

  const { data, isLoading } = useGetAllChargesQuery({
    pageno: table.page + 1,
    search: filters.search,
  });

  const charges = data?.data || [];
  const totalCount = data?.total || 0;

  const denseHeight = table.dense ? 52 : 72;
  const canReset = !isEqual(defaultFilters, filters);
  const notFound = !isLoading && charges.length === 0 && canReset;

  const handleFilters = useCallback((name, value) => {
    table.onResetPage();
    setFilters((prevState) => ({ ...prevState, [name]: value }));
  }, [table]);

  const handleResetFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);

  const handleEditCharge = useCallback((row) => {
    setSelectedCharge(row);
    quickEdit.onTrue();
  }, [quickEdit]);

  const handleCloseEdit = useCallback(() => {
    setSelectedCharge(null);
    quickEdit.onFalse();
  }, [quickEdit]);

  return (
    <Container maxWidth={settings.themeStretch ? false : "xl"}>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <CustomBreadcrumbs heading="Charges"
          links={[{ name: "Dashboard", href: paths.dashboard.root }, { name: "Charges", href: paths.dashboard.charges.root }]}
          sx={{ mb: { xs: 3, md: 5 } }} />
        <Button variant="contained" color="primary" onClick={quickAdd.onTrue}
          startIcon={<Iconify icon="mingcute:add-line" />} sx={{ mb: { xs: 3, md: 5 } }}>
          Add Charge
        </Button>
      </Box>

      <Card>
        <UserTableToolbar filters={filters} onFilters={handleFilters} />

        {canReset && (
          <UserTableFiltersResult filters={filters} onFilters={handleFilters}
            onResetFilters={handleResetFilters} results={totalCount}
            sx={{ p: 2.5, pt: 0 }} />
        )}

        <TableContainer sx={{ position: "relative", overflow: "unset" }}>
          <Scrollbar>
            <Table size={table.dense ? "small" : "medium"} sx={{ minWidth: 960 }}>
              <TableHeadCustom order={table.order} orderBy={table.orderBy}
                headLabel={TABLE_HEAD} rowCount={charges.length}
                numSelected={table.selected?.length} />

              <TableBody>
                {charges.map((row, index) => (
                  <ChargesTableRow
                    key={row.id || row._id || index}
                    row={row}
                    selected={table.selected.includes(row.id)}
                    index={index + 1}
                    counter={index + 1 + table.page * table.rowsPerPage}
                    onEdit={() => handleEditCharge(row)}
                  />
                ))}

                <TableEmptyRows height={denseHeight}
                  emptyRows={emptyRows(table.page, table.rowsPerPage, charges.length)} />
                {notFound && <TableNoData notFound={notFound} />}
              </TableBody>
            </Table>
          </Scrollbar>
        </TableContainer>

        <TablePaginationCustom count={totalCount} page={table.page}
          rowsPerPage={table.rowsPerPage} onPageChange={table.onChangePage}
          onRowsPerPageChange={table.onChangeRowsPerPage} />
      </Card>

      <AddChargeForm open={quickAdd.value} onClose={quickAdd.onFalse} />

      <EditChargeForm row={selectedCharge} open={quickEdit.value} onClose={handleCloseEdit} />
    </Container>
  );
}
