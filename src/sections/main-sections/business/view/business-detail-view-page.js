import { yupResolver } from '@hookform/resolvers/yup';
import { alpha, Box, Button, Card, CardHeader, Container, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, MenuItem, Stack, Tab, Table, TableBody, TableContainer, Tabs, tabsClasses, Tooltip, Typography } from '@mui/material';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { ConfirmDialog } from 'src/components/custom-dialog';
import FormProvider, { RHFSelect, RHFTextField, RHFUploadAvatar } from 'src/components/hook-form';
import Iconify from 'src/components/iconify';
import Label from 'src/components/label';
import Scrollbar from 'src/components/scrollbar';
import { useSettingsContext } from 'src/components/settings';
import { TableHeadCustom, TablePaginationCustom, useTable } from 'src/components/table';
import { useBoolean } from 'src/hooks/use-boolean';
import HolidayHour from 'src/sections/user/holiday-hour';
import RegularHour from 'src/sections/user/regular-hour';
import TodayHour from 'src/sections/user/today-hour';
import * as Yup from 'yup';
import AssociatedUserTableRow from './associated-user-table-row';
import { paths } from 'src/routes/paths';

const TABLE_HEAD = [
  { id: 'picture', label: 'Pic', width: 100  , align:'center'},
  { id: "name", label: 'Name', width: 150 },
  { id: "email", label: 'Email', width: 200 },
  { id: "phone", label: 'Phone', width: 150 },
  { id: "role", label: 'Role', width: 100 },
  { id: "status", label: 'Status', width: 100 ,align:'center' },
  { id: "", label: 'Action', align: 'center', width: 150 },
]
const defaultValues = {
  picture: null,
  name: '',
  phoneNo: '',
  email: '',
  role: 'default'
}
const TABS = [
  {
    value: 'todayHour',
    label: "Today's Hours",
    icon: <Iconify icon="solar:calendar-line-duotone" width={24} />,
  },
  {
    value: 'regularHours',
    label: 'Regular Hours',
    icon: <Iconify icon="mdi:clock-time-eight-outline" width={24} />,
  },
  {
    value: 'holidayHours',
    label: 'Holiday Hours',
    icon: <Iconify icon="ph:calendar-x" width={24} />,
  },

];

const BusinessDetailViewPage = ({ id }) => {

  const businessDetail = {
    name: "Tech Innovators Pvt. Ltd.",
    location: "Lahore, Pakistan",
    owner: "John Doe",
    status: "active",
    createdAt: "2025-07-30T12:00:00Z",
    text: 'Welcome to Tech Innovators',
    fontStyle: 'italic',
    backgroundImage: "",
    textColor: '#000',
    brightness: 80,
    backgroundColor: '#f0f0f0',
    associatedUsers: [
      {
        id: 1,
        picture: "https://example.com/images/user1.jpg",
        name: "Ali Raza",
        phoneNo: "+92-300-1234567",
        email: "ali.raza@example.com",
        role: "owner", // can be 'Owner', 'Default', 'Editor'
        status: "active", // can be 'active' or 'inactive'
      },
      {
        id: 2,
        picture: "https://example.com/images/user2.jpg",
        name: "Sara Khan",
        phoneNo: "+92-301-7654321",
        email: "sara.khan@example.com",
        role: "editor",
        status: "active",
      },
      {
        id: 3,
        picture: "https://example.com/images/user3.jpg",
        name: "Bilal Ahmed",
        phoneNo: "+92-321-9876543",
        email: "bilal.ahmed@example.com",
        role: "owner",
        status: "inactive",
      },
      {
        id: 4,
        picture: "https://example.com/images/user4.jpg",
        name: "Fatima Ali",
        phoneNo: "+92-322-4567890",
        email: "fatima.ali@example.com",
        role: "editor",
        status: "active",
      },
      {
        id: 5,
        picture: "https://example.com/images/user5.jpg",
        name: "Usman Tariq",
        phoneNo: "+92-323-6543210",
        email: "usman.tariq@example.com",
        role: "owner",
        status: "inactive",
      }
    ],
  };

  const open = useBoolean();
  const table = useTable();
  const confirmDialog = useBoolean();
  const [selectId, setSelectId] = useState(null);
  const [currentTab, setCurrentTab] = useState('todayHour');
  const [users, setUsers] = useState(businessDetail.associatedUsers);
  const [editId, setEditId] = useState(null);


  const handleChangeTab = useCallback((event, newValue) => {
    setCurrentTab(newValue);
  }, []);

  const settings = useSettingsContext();

  const schema = Yup.object().shape({
    picture: Yup.mixed().nullable(),
    name: Yup.string().required('Name is required'),
    phone: Yup.string().required('Phone number is required'),
    email: Yup.string().email('Email must be a valid email').required('Email is required'),
    role: Yup.string().oneOf(['owner', 'default', 'editor'], 'Role must be one of owner, default, or editor').required('Role is required'),
  });
  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues
  });
  const onSubmit = (data) => {
    if (editId) {
      setUsers((prev) =>
        prev.map((u) =>
          u.id === editId
            ? {
                ...u,
                ...data,
                phoneNo: data.phone, // map back correctly
                picture:
                  typeof data.picture === "string"
                    ? data.picture
                    : data.picture?.preview || u.picture, 
              }
            : u
        )
      );
    }
    setEditId(null);
    open.onFalse();
  };
  const onEditRow = (id) => {
    const user = users.find((u) => u.id === id);
    if (!user) return;
  
    setEditId(id);
    methods.reset({
      picture: user.picture || null,
      name: user.name,
      phone: user.phoneNo,
      email: user.email,
      role: user.role,
    });
    open.onTrue();
  };
  const handleStatusChange = (id) => {
  };
  const handleDeactivateRow = (id) => {
    setSelectId(id);
    confirmDialog.onTrue();
  };
  const onDeactivate = () => {
     confirmDialog.onFalse();
  };
  const handleDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file)
      });
      methods.setValue('picture', newFile, { shouldValidate: true });
    }
  }, [methods])

  let isOpen = true; 

  return (
    <Container maxWidth={settings.themeStretch ? false : "xl"}>
      <CustomBreadcrumbs
        heading={businessDetail.name}
        links={[
          { name: 'Dashboard', href: '/dashboard' },
          { name: 'Locations', href: `${paths.dashboard.locations.root}` },
          { name: businessDetail.name }
        ]}
        sx={{ mb: 3 }}
      />

      <Card sx={{ p: { xs: 2, md: 3 } }}>
        {/* <Box
          sx={{
            position: 'relative',
            backgroundImage: businessDetail.backgroundImage
              ? `url(${businessDetail.backgroundImage})`
              : 'none',
            backgroundColor: businessDetail.backgroundColor,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: 2,
            p: 3,
            height: 240,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: businessDetail.brightness / 100,
            mb: 3,
          }}
        >
          <Typography
            variant="h4"
            sx={{
              color: businessDetail.textColor || 'text.primary',
              fontStyle: businessDetail.fontStyle || 'normal',
              textAlign: 'center',
            }}
          >
            {businessDetail.text || businessDetail.name}
          </Typography>
        </Box> */}

        {/* Business Info */}
      <Grid container spacing={2}>
        <Grid xs={12} md={6}>
          <Box sx={{px:4 , py:4}}>
          <Typography variant="h5" sx={{ mb: 2 }}>
            {businessDetail.name}
          </Typography>

          <Stack direction={{ xs: 'column', md: 'row' }} spacing={1} sx={{ mb: 1 }}>
            <Label color="warning" sx={{ width: "fit-content" , whitespace:"nowrap" }}>Location: {businessDetail.location}</Label>
            <Label color="default" sx={{ width: "fit-content" ,whitespace:"nowrap" }}>Created By: {businessDetail.owner}</Label>
          </Stack>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={1} sx={{ mb: 1 }}>
            <Label color={businessDetail.status === 'active' ? 'success' : 'error'} sx={{ width: "fit-content"  }}>
              Status: {businessDetail.status.charAt(0).toUpperCase() + businessDetail.status.slice(1)}
            </Label>
            <Tooltip title={new Date(businessDetail.createdAt).toLocaleString()}>
              <Label color="default" sx={{ width: "fit-content", cursor: "pointer" }}>
                Created : {new Date(businessDetail.createdAt).toLocaleDateString()}
              </Label>
          </Tooltip>
          </Stack>

          {/* Style Settings Info */}
          {/* <Stack direction="column" spacing={1} sx={{ mb: 3 }}>
            <Typography variant="body2"><strong>Font Style:</strong> {businessDetail.fontStyle || 'Default'}</Typography>
            <Typography variant="body2"><strong>Text Color:</strong> {businessDetail.textColor || 'Default'}</Typography>
            <Typography variant="body2"><strong>Brightness:</strong> {businessDetail.brightness}%</Typography>
            <Typography variant="body2">
              <strong>Background Image:</strong> {businessDetail.backgroundImage ? 'Yes' : 'No'}
            </Typography>
          </Stack> */}

          <Stack
            direction="column"
            spacing={1}
          >
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Location Subscription
            </Typography>

            <Typography variant="body2">
            <strong>Product:</strong> Premium Location Package
            </Typography>

          <Typography variant="body2">
               <strong>Active:</strong> 
                <Label color="success" sx={{ width: "fit-content" ,ml:1}}> Yes</Label>
            </Typography>

            <Typography variant="body2">
              <strong>Price:</strong> $49.99 / month
            </Typography>

         
            <Typography variant="body2">
              <strong>Expiration:</strong>{" "}
              <Tooltip title="December 31, 2025, 11:59:59 PM">
                <span>12/31/2025</span>
              </Tooltip>
            </Typography>
            <Typography variant="body2">
              <strong>Auto-Renews:</strong> Yes
            </Typography>
          </Stack>

          </Box>
        </Grid>
        <Grid xs={12} md={6}>
          <Card
            sx={{
              minHeight: 260,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 2,
              boxShadow: 2,
              p: 3,
              mt: { xs: 2, md: 10}
            }}
          >
            {/* Inner Status Box */}
            <Box
              sx={{
                px: 4,
                py: 2,
                borderRadius: 2,
                bgcolor: isOpen ? "success.light" : "error.light",
                border: `2px solid ${isOpen ? "#2e7d32" : "#c62828"}`,
                boxShadow: 2,
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  letterSpacing: 1,
                  color: isOpen ? "success.dark" : "error.dark",
                  textAlign: "center",
                }}
              >
                {isOpen ? "Open" : "Closed"}
              </Typography>
            </Box>
          </Card>
        </Grid>
      </Grid>

        <Box sx={{ width: 1, my: 2, }}>

          <Tabs
            value={currentTab}
            onChange={handleChangeTab}
            sx={{
              width: 1,
              bottom: 0,
              zIndex: 9,
              px: 2.5,
              boxShadow: (theme) => `inset 0 -2px 0 0 ${alpha(theme.palette.grey[500], 0.08)}`,
              bgcolor: 'background.paper',
              [`& .${tabsClasses.flexContainer}`]: {
                pr: { md: 3 },
                justifyContent: {
                  sm: 'center',
                  md: 'flex-end',
                },
              },
            }}
          >
            {TABS.map((tab) => (
              <Tab key={tab.value} value={tab.value} icon={tab.icon} label={tab.label} />
            ))}
          </Tabs>
          {/* </Box> */}
        </Box>


        {currentTab === 'todayHour' && <TodayHour />}

        {currentTab === 'regularHours' && <RegularHour />}

        {currentTab === 'holidayHours' && <HolidayHour />}
        <Divider sx={{ my: 3 }} />

      <Card>
        <CardHeader
          title={
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 2,
              }}
            >
              <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
                Associated Users
              </Typography>
            </Box>
          }
        />

        {/* Table */}
        <TableContainer sx={{ overflow: 'unset' }}>
          <Scrollbar>
            <Table
              sx={{ minWidth: 1100 }}
              size={table.dense ? 'small' : 'medium'}
            >
              <TableHeadCustom headLabel={TABLE_HEAD} />
              <TableBody>
                {businessDetail?.associatedUsers?.map((user, index) => (
                  <AssociatedUserTableRow
                    key={index}
                    row={user}
                    onEditRow={(e) => {
                      e.stopPropagation();
                      onEditRow(user.id);
                    }}
                    handleStatusChange={(e) => {
                      e.stopPropagation();
                      handleStatusChange(user.id);
                    }}
                    handleDeactivate={(e) => {
                      e.stopPropagation();
                      handleDeactivateRow(user.id);
                    }}
                  />
                ))}
              </TableBody>
            </Table>
          </Scrollbar>
        </TableContainer>

        {/* Divider */}
        <Divider sx={{ borderStyle: 'dashed' }} />

        {/* Pagination */}
          <TablePaginationCustom
            count={businessDetail.associatedUsers.length}
            page={table.page}
            // rowsPerPageOptions={[5, 10, 25]}
            rowsPerPage={table.rowsPerPage}
            onPageChange={table.onChangePage}
            // onRowsPerPageChange={table.onChangeRowsPerPage}
            dense={table.dense}
            // onChangeDense={table.onChangeDense}
          />
        </Card>

      </Card>

      <Dialog open={open.value} onClose={open.onFalse} maxWidth="sm" fullWidth>

        <DialogTitle>Edit User</DialogTitle>
        <FormProvider methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
          <DialogContent>
            <Box sx={{ display: 'flex', flexDirection: "column", gap: 2 }}>
              <RHFUploadAvatar
                name="picture"
                accept="image/*"
                maxSize={3145728}
                onDrop={handleDrop}
              />
              <RHFTextField
                name="name"
                label="Name"
                fullWidth
              />
              <RHFTextField
                name="email"
                label="Email"
                fullWidth
              />
              <RHFTextField
                name="phone"
                label="Phone"
                fullWidth
              />
              <RHFSelect
                name="role"
                label="Role"
                fullWidth
              >
                <MenuItem value="" disabled>Select Role</MenuItem>
                <Divider sx={{ borderStyle: 'dashed' }} />
                {['owner', 'editor'].map((role) => (
                  <MenuItem key={role} value={role}>{role.slice(0, 1).toUpperCase() + role.slice(1)}</MenuItem>
                ))}
              </RHFSelect>

            </Box>
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" color="inherit" onClick={open.onFalse}>
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Save
            </Button>
          </DialogActions>
        </FormProvider>
      </Dialog>
      <ConfirmDialog
        open={confirmDialog.value}
        onClose={confirmDialog.onFalse}
        action={<Button color="error" variant="contained" onClick={onDeactivate}>Deactivate</Button>}
        title="Confirm Deactivation"
        content="Are you sure you want to deactivate this user?"
      />
    </Container>
  )
}

export default BusinessDetailViewPage