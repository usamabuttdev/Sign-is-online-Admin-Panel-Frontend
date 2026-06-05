import isEqual from 'lodash/isEqual';
import { useCallback, useEffect, useState } from 'react';
// @mui
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import { alpha } from '@mui/material/styles';
import Tab from '@mui/material/Tab';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import Tabs from '@mui/material/Tabs';
// routes
import { paths } from 'src/routes/paths';
// _mock
import { _userList, USER_STATUS_OPTIONS } from 'src/_mock';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
// components
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import Iconify from 'src/components/iconify';
import Label from 'src/components/label';
import Scrollbar from 'src/components/scrollbar';
import { useSettingsContext } from 'src/components/settings';
import {
  emptyRows,
  getComparator,
  TableEmptyRows,
  TableHeadCustom,
  TableNoData,
  TablePaginationCustom,
  useTable
} from 'src/components/table';
//
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, Dialog, DialogActions, DialogContent, DialogTitle, Divider, MenuItem } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { RHFMultiSelect, RHFSelect, RHFTextField } from 'src/components/hook-form';
import FormProvider from 'src/components/hook-form/form-provider';
import * as Yup from 'yup';
import BusinessTableRow from '../business-table-row.page';
import UserTableFiltersResult from 'src/sections/user/user-table-filters-result';
import UserTableToolbar from '../../accounts/user-table-toolbar';
// ----------------------------------------------------------------------

const STATUS_OPTIONS = [{ value: 'all', label: 'All' }, ...USER_STATUS_OPTIONS];

const TABLE_HEAD = [
  { id: 'id', label: 'Id', width: 200, minWidth: 180 },
  { id: 'name', label: 'Name', width: 220 },
  { id: 'location', label: 'Location', width: 200, minWidth: 200 },
  { id: 'owner', label: 'Owner', width: 100 },
  { id: "createdAt", label: 'Created At', width: 150 },
  { id: 'userAssociated', label: 'Associated Users', width: 200 },
  { id: "status", label: 'Status', width: 100 },
  { id: 'sign', label: 'Sign', width: 100 },
  { id: '', label: "Actions", align: 'center', width: 88 },
];

const defaultFilters = {
  name: '',
  role: [],
  status: 'all',
};

const defaultValues = {
  name: '',
  location: '',
  owner: '',
  associatedusers: [],
};

// ----------------------------------------------------------------------

export default function BusinessListView() {


  const settings = useSettingsContext();

  const table = useTable();

  const open = useBoolean();

  const edit = useBoolean();

  const confirm = useBoolean();

  const { state } = useLocation();

  const navigate = useNavigate();

  const [selectId, setSelectId] = useState(null);

  const [tableData, setTableData] = useState(_userList);

  const [filters, setFilters] = useState(defaultFilters);


  useEffect(() => {
    if (state && state.type) {
      handleFilters('status', state.type);
      navigate(window.location.pathname);
    }
  }, [state, navigate]);


  const NewUserSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    location: Yup.string().required('Location is required'),
    owner: Yup.string().required('Owner is required'),
    associatedusers: Yup.array().min(1, 'At least one user must be selected').required('Users Associated is required'),
  });

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      onClose();
    } catch (error) {
      console.error(error);
    }
  });

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(table.order, table.orderBy),
    filters,
  });

  const denseHeight = table.dense ? 52 : 72;

  const canReset = !isEqual(defaultFilters, filters);

  const notFound = (!dataFiltered.length && canReset) || !dataFiltered.length;

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
      handleFilters('status', newValue);
    },
    [handleFilters]
  );

  const handleResetFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);

  const onClose = useCallback(() => {
    reset(defaultValues);
    open.onFalse();
    edit.onFalse();
  }, [open, edit, reset]);

  const handleEditRow = (id) => {
    const user = tableData.find((user) => user.id === id);
    if (user) {
      methods.reset({
        name: user.name,
        location: user.location,
        owner: 'owner1',
        associatedusers: [],
      });
      edit.onTrue();
      open.onTrue();
    }
  }
  const handleStatusChange = (id) => {

  }
  const handleDeleteRow = (id) => {
    const user = tableData.find((user) => user.id === id);
    if (user) {
      setSelectId(id);
      confirm.onTrue();
    }
  }
  const onDelete = () => {
    confirm.onFalse();
  };


  return (
    <>
      <Container maxWidth={false}>
        <CustomBreadcrumbs
          heading="Business"
          links={[
            { name: 'Dashboard', href: paths.dashboard.root },
            { name: 'Business', href: paths.dashboard.business.root },
          ]}
          action={
            <Button
              onClick={open.onTrue}
              variant="contained"
              color='primary'
              startIcon={<Iconify icon="mingcute:add-line" />}
            >
              New Business
            </Button>
          }
          sx={{
            mb: 3,
          }}
        />

        <Card>
          <Tabs
            value={filters.status}
            onChange={handleFilterStatus}
            sx={{
              px: 2.5,
              boxShadow: (theme) => `inset 0 -2px 0 0 ${alpha(theme.palette.grey[500], 0.08)}`,
            }}
          >
            {STATUS_OPTIONS.map((tab) => (
              <Tab
                key={tab.value}
                iconPosition="end"
                value={tab.value}
                label={tab.label}
                icon={
                  <Label
                    variant={
                      ((tab.value === 'all' || tab.value === filters.status) && 'filled') || 'soft'
                    }
                    color={
                      (tab.value === 'active' && 'success') ||
                      (tab.value === 'inactive' && 'warning') ||
                      // (tab.value === 'banner' && 'error') ||
                      'default'
                    }
                  >
                    {tab.value === 'all' && _userList.length}
                    {tab.value === 'active' &&
                      _userList.filter((user) => user.status === 'active').length}
                    {tab.value === 'inactive' &&
                      _userList.filter((user) => user.status === 'inactive').length}
                  </Label>
                }
              />
            ))}
          </Tabs>

          <UserTableToolbar

            filters={filters}
            onFilters={handleFilters}
          />

          {canReset && (
            <UserTableFiltersResult
              filters={filters}
              onFilters={handleFilters}
              onResetFilters={handleResetFilters}
              results={dataFiltered.length}
              sx={{ p: 2.5, pt: 0 }}
            />
          )}

          <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>

            <Scrollbar>
              <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 960 }}>
                <TableHeadCustom
                  headLabel={TABLE_HEAD}
                />
                <TableBody>
                  {dataFiltered
                    .slice(
                      table.page * table.rowsPerPage,
                      table.page * table.rowsPerPage + table.rowsPerPage
                    )
                    .map((row) => (
                      <BusinessTableRow
                        key={row.id}
                        row={row}
                        selected={table.selected.includes(row.id)}
                        onSelectRow={() => table.onSelectRow(row.id)}
                        onDeleteRow={() => handleDeleteRow(row.id)}
                        onEditRow={() => handleEditRow(row.id)}
                        handleStatusChange={(e) => { e.stopPropagation(); handleStatusChange(row.id); }}
                      />
                    ))}

                  <TableEmptyRows
                    height={denseHeight}
                    emptyRows={emptyRows(table.page, table.rowsPerPage, tableData.length)}
                  />

                  <TableNoData notFound={notFound} />
                </TableBody>
              </Table>
            </Scrollbar>
          </TableContainer>

          <TablePaginationCustom
            count={dataFiltered.length}
            page={table.page}
            rowsPerPageOptions={[5, 10, 25]}
            rowsPerPage={table.rowsPerPage}
            onPageChange={table.onChangePage}
            onRowsPerPageChange={table.onChangeRowsPerPage}
            dense={table.dense}
            onChangeDense={table.onChangeDense}
          />
        </Card>
        {/* dialog for add and edit business */}
        <Dialog
          fullWidth
          maxWidth={"sm"}
          open={open.value}
          onClose={onClose}

        >
          <FormProvider methods={methods} onSubmit={onSubmit}>
            <DialogTitle>{edit.value ? 'Edit Business' : 'Create Business'}</DialogTitle>

            <DialogContent>
              <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(1,1fr)', rowGap: 2, mt: 1 }}>
                <RHFTextField name="name" label="Business Name" />
                <RHFTextField name="location" label="Location" />
                <RHFSelect name="owner" label="Owner" >
                  <MenuItem value="">Select Owner</MenuItem>
                  <Divider sx={{ borderStyle: 'dashed' }} />
                  {[{ value: 'owner1', label: 'Owner 1' },
                  { value: 'owner2', label: 'Owner 2' },
                  { value: 'owner3', label: 'Owner 3' },
                  { value: 'owner4', label: 'Owner 4' }
                  ].map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </RHFSelect>

                <RHFMultiSelect name={"associatedusers"} label="Users Associated"
                  chip={true}
                  checkbox={true}
                  options={[
                    { value: 'user1', label: 'User 1' },
                    { value: 'user2', label: 'User 2' },
                    { value: 'user3', label: 'User 3' },
                    { value: 'user4', label: 'User 4' }
                  ]} />
              </Box>
            </DialogContent>

            <DialogActions>
              <Button variant="outlined" onClick={onClose}>
                Cancel
              </Button>

              <LoadingButton type="submit" color="primary" variant="contained" loading={isSubmitting}>
                {edit.value ? 'Update' : 'Create'}
              </LoadingButton>
            </DialogActions>
          </FormProvider>
        </Dialog>
        {/* dialog for delete business */}
        <ConfirmDialog
          open={confirm.value}
          onClose={confirm.onFalse}
          title="Delete Business"
          content="Are you sure want to delete?"
          action={
            <Button variant="contained" color="error" onClick={onDelete}>
              Delete
            </Button>
          }
        />
      </Container>

    </>
  );
}

// ----------------------------------------------------------------------

function applyFilter({ inputData, comparator, filters }) {
  const { name, status, role } = filters;

  const stabilizedThis = inputData.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  if (name) {
    inputData = inputData.filter(
      (user) => user.name.toLowerCase().indexOf(name.toLowerCase()) !== -1
    );
  }

  if (status !== 'all') {
    inputData = inputData.filter((user) => user.status === status);
  }

  if (role.length) {
    inputData = inputData.filter((user) => role.includes(user.role));
  }

  return inputData;
}
