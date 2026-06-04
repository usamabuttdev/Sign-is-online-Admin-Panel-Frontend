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
  TableNoData,
  TableHeadCustom,
  TablePaginationCustom,
  TableEmptyRows,
} from "src/components/table";
import UserTableRow from "../user-table-row";
import UserTableToolbar from "../user-table-toolbar";
import { Box } from "@mui/system";
import { paths } from "src/routes/paths";
import { LoadingScreen } from 'src/components/loading-screen';
import UserTableFiltersResult from '../user-table-filters-result';
import { useGetAllBookingsQuery } from "src/store/Reducer/bookings";

const TABLE_HEAD = [
  { id: "id", label: "ID",width:40 },
  { id: "trainer_name", label: "Trainer Name"},
  { id: "session_title", label: "Title" },
  // { id: "specialization", label: "Specialization"},
  // { id: "trainingMode", label: "Training Mode"},
  { id: "date", label: "Dates" },
  { id: "slot_time", label: "Slot Time" },
  { id: "price", label: "Price" },
  { id: "status", label: "Status" },
  { id: "action", label: "Action", width: 88 },
];

const defaultFilters = {
  search: "",
  email: "",
  status: "all",
};


export default function BookingsListView() {
  const table = useTable();

  const settings = useSettingsContext();

  const [filters, setFilters] = useState(defaultFilters);





  const {
   data , isLoading
  } = useGetAllBookingsQuery({
    page: table.page +1,
    limit: table.rowsPerPage,
    keyword:filters.search,
    status: filters.status,
  });

  console.log(data ,'data');

 

  






  const TABS = [
    {
      value: "all",
      label: "All",
      color: "default",
      count:  0
    },
    {
      value: "active",
      label: "Active",
      color: "success",
      count:  0
    },
    {
      value: "inactive",
      label: "Inactive",
      color: "warning",
      count:  0
    },
  ];

  const total_length = data?.meta?.totalRecords || 0;

  const denseHeight = table.dense ? 52 : 72;
  const canReset = !isEqual(defaultFilters, filters);
  const notFound = (!total_length && canReset) || !total_length;

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

  const handleFilterStatus = useCallback(
    (event, newValue) => {
      handleFilters("status", newValue);
    },
    [handleFilters]
  );

  const handleResetFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);

  let count = (table.page - 1) * table.rowsPerPage;


  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <Container maxWidth={settings.themeStretch ? false : "lg"}>
          {/* HEADER */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <CustomBreadcrumbs
              heading="Bookings"
              links={[
                { name: "Dashboard", href: paths.dashboard.root },
                { name: "Bookings", href: paths.dashboard.bookings },
              ]}
              sx={{
                mb: { xs: 3, md: 5 },
              }}
            />
          </Box>

          <Card>
            {/* TABS */}
            {/* <Tabs
              value={filters.status}
              onChange={handleFilterStatus}
              sx={{
                px: 2.5,
                pt: 0.5,
                pb: 1,
                boxShadow: `inset 0 -2px 0 0 ${alpha(
                  theme.palette.grey[500],
                  0.08
                )}`,
              }}
            >
              {TABS?.map((tab) => (
                <Tab
                  key={tab.value}
                  value={tab.value}
                  label={tab.label}
                  iconPosition="end"
                  icon={
                    <Label
                      variant={
                        ((tab.value === "all" || tab.value === filters.status) &&
                          "filled") ||
                        "soft"
                      }
                      color={tab.color}
                    >
                      {tab.count}
                    </Label>
                  }
                />
              ))}
            </Tabs> */}

            <UserTableToolbar
              filters={filters}
              onFilters={handleFilters}
              roleOptions={_roles}
            />

            {canReset && (
              <UserTableFiltersResult
                filters={filters}
                onFilters={(name, value) => setFilters((prev) => ({ ...prev, [name]: value }))}
                onResetFilters={handleResetFilters}
                results={total_length}
                sx={{ p: 2.5, pt: 0 }}
              />
            )}

            <TableContainer sx={{ position: 'relative', overflow: 'unset', zIndex: 100 }}>
              <Scrollbar>
                  <Table
                    size={table.dense ? "small" : "medium"}
                    sx={{ minWidth: 960 }}
                  >
                    <TableHeadCustom
                      order={table.order}
                      orderBy={table.orderBy}
                      headLabel={TABLE_HEAD}
                      rowCount={total_length}
                      numSelected={table.selected?.length}
                    />

                    <TableBody>
                      {(
                        data?.data?.map((row, index) => (
                          (count = count + 1),
                          (
                            <UserTableRow
                              key={row.id || row._id || index}
                              row={row}
                              selected={table.selected.includes(row.id)}
                              index={index + 1}
                              counter={index + 1 + table.page * table.rowsPerPage}
                            />
                          )
                        ))
                      )}
              

                      <TableEmptyRows
                        height={denseHeight}
                        emptyRows={emptyRows(table.page, table.rowsPerPage, total_length)}
                      />
                      {notFound && (<TableNoData notFound={notFound} />)}
                    </TableBody>
                  </Table>
              </Scrollbar>
            </TableContainer>

            <TablePaginationCustom
              count={total_length || 1}
              page={table.page}
              rowsPerPage={table.rowsPerPage}
              onPageChange={table.onChangePage}
              onRowsPerPageChange={table.onChangeRowsPerPage}
            />

          </Card>
        </Container>
      )}
    </>
  );
}
