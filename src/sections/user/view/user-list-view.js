import isEqual from 'lodash/isEqual';
import { useCallback, useState } from 'react';
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
import { RHFSelect, RHFTextField, RHFUploadAvatar } from 'src/components/hook-form';
import FormProvider from 'src/components/hook-form/form-provider';
import * as Yup from 'yup';
import UserTableFiltersResult from '../user-table-filters-result';
import UserTableRow from '../user-table-row';
import UserTableToolbar from '../user-table-toolbar';
// ----------------------------------------------------------------------

const STATUS_OPTIONS = [{ value: 'all', label: 'All' }, ...USER_STATUS_OPTIONS];

const TABLE_HEAD = [
  { id: 'picture', label: 'Picture', width: 100 },
  { id: 'id', label: 'Id', width: 120 },
  { id: 'fullName', label: 'Full Name', width: 220 },
  { id: 'phone', label: 'Phone', width: 120 },
  { id: 'email', label: 'Email', width: 100 },
  { id: 'businessAssociated', label: 'Business Associated', width: 200 },
  { id: '', label: "Actions", width: 88 },
];

const defaultFilters = {
  name: '',
  role: [],
  status: 'all',
};

const defaultValues = {
  picture: '',
  fullname: '',
  email: '',
  phone: '',
  businessAssociation: '',
};

// ----------------------------------------------------------------------

export default function UserListView() {


  const table = useTable();

  const settings = useSettingsContext();

  const open = useBoolean();
  const edit = useBoolean();

  const [tableData, setTableData] = useState(_userList);

  const [filters, setFilters] = useState(defaultFilters);

  const NewUserSchema = Yup.object().shape({
    picture: Yup.string().required('Picture is required'),
    fullname: Yup.string().required('Full Name is required'),
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    phone: Yup.string().required('Phone number is required'),
    businessAssociated: Yup.string().required('Business Associated is required'),
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
      methods.reset(user);
      edit.onTrue();
      open.onTrue();
    }
  }
  const handleDeleteRow = (id) => {
    const user = tableData.find((user) => user.id === id);
    if (user) {
      handleDeleteRow(id);
    }
  }

  return (
    <>
      <Container maxWidth={settings.themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Users"
          links={[
            { name: 'Dashboard', href: paths.dashboard.root },
            { name: 'Users', href: paths.dashboard.user.root },
          ]}
          // action={
          //   <Button
          //     onClick={open.onTrue}
          //     variant="contained"
          //     startIcon={<Iconify icon="mingcute:add-line" />}
          //   >
          //     New User
          //   </Button>
          // }
          sx={{
            mb: { xs: 3, md: 5 },
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
                      <UserTableRow
                        key={row.id}
                        row={row}
                        selected={table.selected.includes(row.id)}
                        onSelectRow={() => table.onSelectRow(row.id)}
                        onDeleteRow={() => handleDeleteRow(row.id)}
                        onEditRow={() => handleEditRow(row.id)}
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
            rowsPerPage={table.rowsPerPage}
            onPageChange={table.onChangePage}
            onRowsPerPageChange={table.onChangeRowsPerPage}
            //
            dense={table.dense}
            onChangeDense={table.onChangeDense}
          />
        </Card>

        <Dialog
          fullWidth
          maxWidth={"sm"}
          open={open.value}
          onClose={onClose}

        >
          <FormProvider methods={methods} onSubmit={onSubmit}>
            <DialogTitle>{edit.value ? 'Edit User' : 'Create User'}</DialogTitle>

            <DialogContent>
              <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(1,1fr)', rowGap: 2, }}>
                <RHFUploadAvatar name="picture" />
                <RHFTextField name="fullname" label="Full Name" />
                <RHFTextField name="email" label="Email" />
                <RHFTextField name="phone" label="Phone" />
                <RHFSelect name="businessAssociated" label="Business Associated"  >
                  <MenuItem value="">Select Business Assocaited </MenuItem>
                  <Divider sx={{ borderStyle: 'dashed' }} />
                  {[{ value: 'association-a', label: 'Association A' },
                  { value: 'association-b', label: 'Association B' },
                  { value: 'association-c', label: 'Association C' },
                  ].map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </RHFSelect>
              </Box>
            </DialogContent>

            <DialogActions>
              <Button variant="outlined" onClick={onClose}>
                Cancel
              </Button>

              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {edit.value ? 'Update' : 'Create'}
              </LoadingButton>
            </DialogActions>
          </FormProvider>
        </Dialog>
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
