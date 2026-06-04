import { debounce } from 'lodash';
import isEqual from "lodash/isEqual";
import { useState, useCallback, useEffect, useMemo } from "react";
import { useTheme, alpha } from "@mui/material/styles";
import Card from "@mui/material/Card";
import Table from "@mui/material/Table";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Container from "@mui/material/Container";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import { _roles } from "src/_mock";
import Label from "src/components/label";
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
import { Button, LinearProgress } from "@mui/material";
import { paths } from "src/routes/paths";
import { LoadingScreen } from 'src/components/loading-screen';
import UserTableFiltersResult from '../user-table-filters-result';
import { status } from 'nprogress';
import Iconify from 'src/components/iconify';
import UserNewEditForm from '../user-new-edit-form';
import { useBoolean } from 'src/hooks/use-boolean';
import { useGetAllLanguagesQuery } from 'src/store/Reducer/languages';

const TABLE_HEAD = [
  { id: "id", label: "ID", width: 100 },
  { id: "icon", label: "Icon",  },
  { id: "title", label: "Title", },
  { id: "date", label: "Date" },
  { id: "status", label: "Status"},
  { id: "action", label: "Action", width: 100 },
];

const defaultFilters = {
  title: "",	
  status: "all",
};


export default function LanguagesListView() {
  const table = useTable();
  const theme = useTheme();

  const settings = useSettingsContext();

  const [filters, setFilters] = useState(defaultFilters);
  const quickCreate = useBoolean();

  const { data ,isLoading }=useGetAllLanguagesQuery({
    page: table.page + 1 ,
    limit: table.rowsPerPage,
    keyword: filters.title,
    isActive : filters.status === "active" ? true : filters.status === "inactive" ? false : null,
  })

  const tagsCount =  data?.meta?.tagsCount || 0;

  const TABS = [
    {
      value: "all",
      label: "All",
      color: "default",
      count: tagsCount?.total || 0
    },
    {
      value: "active",
      label: "Active",
      color: "success",
      count:  tagsCount?.active || 0
    },
    {
      value: "inactive",
      label: "Inactive",
      color: "warning",
      count:  tagsCount?.inactive || 0
    },
  ];

  const denseHeight = table.dense ? 52 : 72;
  const canReset = !isEqual(defaultFilters, filters);
  let total_length = data?.meta?.totalRecords;
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

  if(isLoading) return <LoadingScreen />;

  return (
    <>
  
        <Container maxWidth={settings.themeStretch ? false : "lg"}>
         
            <CustomBreadcrumbs
              heading="Languages"
              links={[
                { name: "Dashboard", href: paths.dashboard.root },
                { name: "Languages", href: paths.dashboard.languages.root },
              ]}
              sx={{
                mb: { xs: 3, md: 5 },
              }}
              action={
                <Button
                  onClick={quickCreate.onTrue}
                  variant="contained"
                  startIcon={<Iconify icon="mingcute:add-line" />}
                >
                  Add New Language
                </Button>
              }
            />
        

          <Card>
            {/* TABS */}
            <Tabs
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
            </Tabs>

            <UserTableToolbar
              filters={filters}
              onFilters={handleFilters}
              roleOptions={_roles}
            />

            {canReset && (
              <UserTableFiltersResult
                filters={filters}
                onFilters={handleFilters}
                onResetFilters={handleResetFilters}
                results={total_length}
                sx={{ p: 2.5, pt: 0 }}
              />
            )}

            <TableContainer sx={{ position: 'relative', overflow: 'unset', zIndex: 100 }}>
              <Scrollbar>
                {status === 'pending' ? (
                  <Box sx={{ width: '100%' }}>
                    <LinearProgress />
                  </Box>
                ) : (
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
                      {notFound &&  <TableNoData notFound={notFound} />}
                    </TableBody>
                  </Table>
                )}
              </Scrollbar>
            </TableContainer>

            <TablePaginationCustom
              count={total_length || 1}
              page={table.page}
              rowsPerPage={table.rowsPerPage}
              onPageChange={table.onChangePage}
              onRowsPerPageChange={table.onChangeRowsPerPage}
            />
           <UserNewEditForm
              currentUser={''}
              open={quickCreate.value}
              onClose={quickCreate.onFalse}
            />

          </Card>
        </Container>
    </>
  );
}
