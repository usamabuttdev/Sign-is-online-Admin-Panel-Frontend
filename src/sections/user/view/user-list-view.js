import isEqual from "lodash/isEqual";
import { useState, useCallback, useEffect, useMemo } from "react";
import Card from "@mui/material/Card";
import Table from "@mui/material/Table";
import Container from "@mui/material/Container";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import LinearProgress from "@mui/material/LinearProgress";
import Alert from "@mui/material/Alert";
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
import UsersTableRow from "../users-table-row";
import UserTableToolbar from "../user-table-toolbar";
import { Box } from "@mui/system";
import { paths } from "src/routes/paths";
import UserTableFiltersResult from "../user-table-filters-result";
import { useGetAllusersListQuery } from "src/store/Reducer/users";

const TABLE_HEAD = [
  { id: "id", label: "ID", width: 60 , align:"center" },
  { id: "name", label: "Name" },
  { id: "email", label: "Account" },
  { id: "phone", label: "Phone" },
  { id: "role", label: "Role" , align:"center" },
  { id: "createdat", label: "Date" , align:"center" },
  { id: "action", label: "Action", width: 88 , align:"center"},
];

const defaultFilters = { keyword: "", };

export default function UsersListView() {
  const table = useTable({ defaultRowsPerPage: 10 });
  const settings = useSettingsContext();
  const [filters, setFilters] = useState(defaultFilters);
  const [debouncedKeyword, setDebouncedKeyword] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedKeyword(filters.keyword);
    }, 400);
    return () => clearTimeout(timer);
  }, [filters.keyword]);

  const queryParams = useMemo(() => ({
    page: table.page + 1,
    limit: table.rowsPerPage,
    keyword: debouncedKeyword,
  }), [table.page, table.rowsPerPage, debouncedKeyword]);

  const { data, isLoading, isFetching, isError, error } = useGetAllusersListQuery(queryParams);

  const users = data?.data || [];
  const totalCount = data?.total_length || 0;
  const isParseError = error?.status === 'PARSING_ERROR';
  const errorMessage = isParseError
    ? 'The server returned an unexpected response. Please try again.'
    : (error?.data?.message || error?.data?.error || error?.error || '');

  const denseHeight = table.dense ? 52 : 72;
  const canReset = !isEqual(defaultFilters, filters);
  const notFound = !isLoading && !users.length && canReset;

  const handleFilters = useCallback(
    (name, value) => {
      table.onResetPage();
      setFilters((prevState) => ({ ...prevState, [name]: value }));
    },
    [table]
  );

  const handleResetFilters = useCallback(() => {
    setFilters(defaultFilters);
    setDebouncedKeyword("");
  }, []);

  return (
    <Container maxWidth={settings.themeStretch ? false : "xl"} >
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <CustomBreadcrumbs
          heading="Users"
          links={[
            { name: "Dashboard", href: paths.dashboard.root },
            { name: "Users", href: paths.dashboard.users.root },
          ]}
          sx={{ mb: { xs: 3, md: 5 } }}
        />
      </Box>

      <Card>
        {isFetching && <LinearProgress />}

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

        <TableContainer sx={{ position: "relative", overflow: "unset"}}>
          <Scrollbar>
            <Table size={table.dense ? "small" : "medium"} sx={{ minWidth: 960 }}>
              <TableHeadCustom
                order={table.order}
                orderBy={table.orderBy}
                headLabel={TABLE_HEAD}
                rowCount={users.length}
                numSelected={table.selected?.length}
              />

              <TableBody>
                {isError && (
                  <TableRow>
                    <TableCell colSpan={TABLE_HEAD.length}>
                      <Alert severity="error" sx={{ m: 2 }}>
                        {errorMessage ? `Failed to load users: ${errorMessage}` : 'Failed to load users. Please try again.'}
                      </Alert>
                    </TableCell>
                  </TableRow>
                )}

                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={TABLE_HEAD.length} sx={{ textAlign: "center", py: 6 }}>
                      Loading users...
                    </TableCell>
                  </TableRow>
                ) : (
                  users.map((row, index) => (
                    <UsersTableRow
                      key={row.id || row._id || index}
                      row={row}
                      selected={table.selected.includes(row.id)}
                      index={index + 1}
                      counter={index + 1 + table.page * table.rowsPerPage}
                    />
                  ))
                )}

                <TableEmptyRows
                  height={denseHeight}
                  emptyRows={emptyRows(table.page, table.rowsPerPage, users.length)}
                />
                {notFound && <TableNoData notFound={notFound} />}
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
        />
      </Card>
    </Container>
  );
}