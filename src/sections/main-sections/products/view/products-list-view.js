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
import ProductsTableRow from "../products-table-row";
import UserTableToolbar from "../user-table-toolbar";
import { Box } from "@mui/system";
import { paths } from "src/routes/paths";
import UserTableFiltersResult from "../user-table-filters-result";

const TABLE_HEAD = [
  { id: "id", label: "ID", width: 60 , align:"center" },
  { id: "title", label: "Title" },
  { id: "current_price", label: "Current Price" , align:"right" },
  { id: "current_price_ends", label: "Current Price Ends"  , align:"center" },
  { id: "next_price", label: "Next Price" , align:"right" },
  { id: "next_price_starts", label: "Next Price Starts" ,align:"center" },
  { id:"locations", label:"Locations" ,align:"right"},
  { id: "action", label: "Action", width: 88 , align:"center" },
];

const defaultFilters = { search: "", documentStatus: "" };

const TABLE_DATA = [
  {
    id: 1,
    title: "Product A",
    current_price: "$120",
    current_price_ends: "2025-09-01T00:00:00Z",
    next_price: "$150",
    next_price_starts: "2025-09-02T00:00:00Z",
    created_at: "2025-08-01T10:30:00Z",
    action: "View",
    locations: "1200",
  },
  {
    id: 2,
    title: "Product B",
    current_price: "$75",
    current_price_ends: "2025-08-25T00:00:00Z",
    next_price: "$90",
    next_price_starts: "2025-08-26T00:00:00Z",
    created_at: "2025-08-05T14:00:00Z",
    action: "Edit",
    locations: "2400",
  },
  {
    id: 3,
    title: "Product C",
    current_price: "$300",
    current_price_ends: "2025-09-10T00:00:00Z",
    next_price: "$350",
    next_price_starts: "2025-09-11T00:00:00Z",
    created_at: "2025-08-10T09:15:00Z",
    action: "Delete",
    locations: "123",
  },
];



export default function ProductsListView() {
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


  return (
    <Container maxWidth={settings.themeStretch ? false : "xl"}>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <CustomBreadcrumbs
          heading="Products"
          links={[
            { name: "Dashboard", href: paths.dashboard.root },
            { name: "Products", href: paths.dashboard.products.root },
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

        <TableContainer sx={{ position: "relative", overflow: "unset" }}>
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
                  (
                    <ProductsTableRow
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
