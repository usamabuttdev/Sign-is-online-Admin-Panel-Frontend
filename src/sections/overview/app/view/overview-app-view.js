// @mui
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
// hooks
// _mock
// components
import { useSettingsContext } from 'src/components/settings';
// assets
import { useMemo, useState } from 'react';
import { useLocales } from 'src/locales';
import { useRouter } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';
import { useGetDashboardDataQuery, useGetUserStatsQuery } from 'src/store/Reducer/dashboard';
import BookingWidgetSummary from '../../booking/booking-widget-summary';
import AppAreaInstalled from '../app-area-installed';
import AppCurrentDownload from '../app-current-download';

// ----------------------------------------------------------------------


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


export default function OverviewAppView() {
  const { t } = useLocales();
  const router = useRouter();
  const currentYear = new Date().getFullYear();

  const {data , isLoading} = useGetDashboardDataQuery();
  const [seriesData, setSeriesData] = useState(currentYear);
  const { data : userStats , isLoading: statsLoading} = useGetUserStatsQuery(seriesData);

  const chartData = useMemo(() => {
    return userStats?.stats?.map((item) => {
      return {
        name: item.region,
        data: item.data,
      };
    }) || [];
  },[userStats?.stats]);



  const settings = useSettingsContext();

  const handleClick = (path) => {
    router.push(path);
  };

  // if(isLoading || statsLoading) return <LoadingScreen/>

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Grid container spacing={3}>

        {/* Top Boxes 1 */}
        <Grid xs={12} md={4} onClick={() => handleClick(paths.dashboard.users)} style={{ cursor: 'pointer' }}>
          <BookingWidgetSummary
            title={t('Active User')}
            total={166}
            icon={'solar:users-group-rounded-bold-duotone'}
          />
        </Grid>

        {/* Top Boxes 2 */}
        <Grid xs={12} md={4} onClick={() => handleClick(paths.dashboard.users)} style={{ cursor: 'pointer' }}>
          <BookingWidgetSummary
            title={t('Inactive User')}
            total={194}
            icon={'solar:users-group-two-rounded-bold-duotone'}
          />
        </Grid>

        {/* Top Boxes 3 */}
        <Grid xs={12} md={4} onClick={() => handleClick(paths.dashboard.business.root)} style={{ cursor: 'pointer' }}>
          <BookingWidgetSummary
            title={t('Active Business')}
            total={180}
            icon={'ic:round-business-center'}
          />
        </Grid>

        {/* Top Boxes 4 */}
        <Grid xs={12} md={4} onClick={() => handleClick(paths.dashboard.business.root)} style={{ cursor: 'pointer' }}>
          <BookingWidgetSummary
            title={t('Inactive Business')}
            total={11}
            icon={'ic:round-business-center'}
          />
        </Grid>

        <Grid xs={12} md={4} onClick={() => handleClick(paths.dashboard.specializations)} style={{ cursor: 'pointer' }}>
         
        </Grid>

        <Grid xs={12} md={4} onClick={() => handleClick(paths.dashboard.support)} style={{ cursor: 'pointer' }}>
          
        </Grid>


        <Grid xs={12} md={6} lg={4}>
          <AppCurrentDownload
            title="Active & Inactive Users"
            chart={{
              series: [
                { label: 'Active', value: 194 },
                { label: 'Inactive', value: 166 },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AppAreaInstalled
            title="Usage Across Different Areas"
            seriesData={seriesData}
            setSeriesData={setSeriesData}
            years={userStats?.availableYears}
            chart={{
              categories: userStats?.months || [],
               series:[{data:chartData || []}],
            }}
          />
        </Grid>

        {/* <Grid xs={12} lg={8}>
        <BookingDetails
            title="Booking Details"
            tableData={bookingList}
            tableLabels={[
              { id: "id", label: "ID" ,width:30},
              { id: "trainer_name", label: "Trainer Name"},
              { id: "date", label: "Date" },
              { id: "slot_time", label: "Slot Time" },
              { id: "price", label: "Price" },
              { id: "status", label: "Status", width: 88 },
            ]}
            router={router}
          />
        </Grid>

        <Grid xs={12} md={4} lg={4}>
          <BookingBooked title="Booking" data={_bookingsOverview} />
        </Grid> */}

      </Grid>
    </Container>
  );
}
