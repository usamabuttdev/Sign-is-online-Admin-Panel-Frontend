import { useState, useCallback } from 'react';
// @mui
import Container from '@mui/material/Container';
// routes
import { paths } from 'src/routes/paths';
// hooks
import { useMockedUser } from 'src/hooks/use-mocked-user';
// _mock
import { _bookings, _userAbout, _userFeeds} from 'src/_mock';
// components
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
//
import ProfileHome from '../profile-home';
import { Avatar, Card, Stack, Tab, Tabs, tabsClasses } from '@mui/material';
import Iconify from 'src/components/iconify';
import BookingDetails from '../booking-details';


// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function CustomerProfileView() {
  const settings = useSettingsContext();
  

  const { user } = useMockedUser();

  const [searchFriends, setSearchFriends] = useState('');

  const [currentTab, setCurrentTab] = useState('profile');

  const handleChangeTab = useCallback((event, newValue) => {
    setCurrentTab(newValue);
  }, []);

  const handleSearchFriends = useCallback((event) => {
    setSearchFriends(event.target.value);
  }, []);

  const TABS = [
    {
      value: 'profile',
      label: 'Profile',
      icon: <Iconify icon="solar:user-id-bold" width={24} />,
  },
  {
      value: 'bookings',
      label: 'Bookings',
      icon: <Iconify icon="whh:appointment" width={24} />,
  }
  ];

  const bookingList = [ 
    {
      id:1,
      trainer_name: 'William James',
      customer_name: 'John Doe',
      booking_type: "Immediate",
      date: '2022-10-10',
      slot_time: '30 minutes',
      price: '$40',
      location: 'New York',
      status:'active'
    },
    {
      id:2,
      trainer_name: 'Sophia Smith',
      customer_name: 'John Doe',
      booking_type: "Scheduled",
      date: '2022-10-15',
      slot_time: '1 hour',
      price: '$60',
      location: 'Los Angeles',
      status:'active'
    },
    {
      id:3,
      trainer_name: 'David Brown',
      customer_name: 'John Doe',
      booking_type: "Immediate",
      date: '2022-10-12',
      slot_time: '45 minutes',
      price: '$50',
      location: 'Chicago',
      status:'inactive'
    },
    {
      id:4,
      trainer_name: 'Emma Johnson',
      customer_name: 'John Doe',
      booking_type: "Scheduled",
      date: '2022-10-20',
      slot_time: '1 hour',
      price: '$55',
      location: 'Miami',
      status:'inactive'
    },
    {
      id:5,
      trainer_name: 'Oliver Lee',
      customer_name: 'John Doe',
      booking_type: "Immediate",
      date: '2022-10-18',
      slot_time: '30 minutes',
      price: '$45',
      location: 'San Francisco',
      status:'active'
    }
  ];

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <Stack direction="row" spacing={2}>
      <Avatar
          alt={'John Doe'}
          src={"https://borrowappbucket.s3.us-east-1.amazonaws.com/noimage.png"}
          sx={{ marginTop: '.5rem', width: 56, height: 56 }}
        />
      <CustomBreadcrumbs
        heading="John Doe"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Customers', href: paths.dashboard.customers.root },
          { name: 'John Doe' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      </Stack>
      <Card
        sx={{
          mb: 3,
          height: 60,
        }}
      >
        {/* <ProfileCover
          role={'Trainer'}
          name={'John Doe'}
          avatarUrl={user?.photoURL}
          coverUrl={_userAbout.coverUrl}
        /> */}

        <Tabs
          value={currentTab}
          onChange={handleChangeTab}
          sx={{
            width: 1,
            bottom: 0,
            zIndex: 9,
            position: 'absolute',
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
      </Card>

      {currentTab === 'profile' && <ProfileHome info={_userAbout} posts={_userFeeds} />}
      {currentTab === 'bookings'
            && 
          <BookingDetails
            title="Booking Details"
            tableData={bookingList}
            tableLabels={[
              { id: "id", label: "ID",width:40 },
              { id: "trainer_name", label: "Trainer Name"},
              { id: "booking_type", label: "Booking Type"},
              { id: "date", label: "Date" },
              { id: "slot_time", label: "Slot Time" },
              { id: "price", label: "Price" },
              { id: "location", label: "Training Location" },
              { id: "status", label: "Status", width: 88 },
            ]}
          />}

      {/* {currentTab === 'followers' && <ProfileFollowers followers={_userFollowers} />}

      {currentTab === 'friends' && (
        <ProfileFriends
          friends={_userFriends}
          searchFriends={searchFriends}
          onSearchFriends={handleSearchFriends}
        />
      )}

      {currentTab === 'gallery' && <ProfileGallery gallery={_userGallery} />} */}
    </Container>
  );
}
