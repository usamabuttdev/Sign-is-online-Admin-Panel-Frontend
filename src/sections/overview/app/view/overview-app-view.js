// @mui
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
// hooks
// _mock
// components
import { useSettingsContext } from 'src/components/settings';
// assets
import { useMemo, useState } from 'react';
import { useRouter } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';
import BookingWidgetSummary from '../../booking/booking-widget-summary';
import AppAreaInstalled from '../app-area-installed';
import { Card, CardContent, CardHeader, Tooltip, useTheme } from '@mui/material';
import ChartLine from 'src/sections/_examples/extra/chart-view/chart-line';
import { fNumber } from 'src/utils/format-number';

// ----------------------------------------------------------------------


export default function OverviewAppView() {

  const router = useRouter();
  const currentYear = new Date().getFullYear();
  const theme = useTheme()

  const [seriesData, setSeriesData] = useState(currentYear);
  const userStats = {
    stats: [
      {
        region: "Active locations",
        data: [30, 34, 38, 36, 42, 50, 55, 53, 60, 70, 68, 78],
      },
      {
        region: "Active Accounts",
        data: [20, 22, 25, 27, 30, 35, 40, 38, 45, 52, 50, 58],
      },
      {
        region: "Active signs per month",
        data: [10, 12, 14, 13, 17, 22, 25, 24, 30, 36, 34, 42],
      },
    ],
    availableYears: [2021, 2022, currentYear],
  };

  const chartData = useMemo(() => {
    return userStats?.stats?.map((item) => {
      return {
        name: item.region,
        data: item.data,
      };
    }) || [];
  }, [userStats?.stats]);



  const settings = useSettingsContext();

  const handleClick = (path, state) => {
    router.push(path, state);
  };


  const lastSixMonths = useMemo(() => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const result = [];
    const today = new Date();

    for (let i = 5; i >= 0; i--) {
      const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
      result.push(months[d.getMonth()]);
    }

    return result;
  }, []);

  const METRICS_DATA = {
    "This Month": [
      { id: 101, title: "Sales Growth", goal: 2000, value: 1850, icon: 'mdi:trending-up' },
      { id: 102, title: "New Customers", goal: 100, value: 120, icon: 'mdi:account-plus' },
      { id: 103, title: "Website Traffic", goal: 50000, value: 48000, icon: 'mdi:web' },
    ],
    "Last Month": [
      { id: 201, title: "Revenue", goal: 50000, value: 47000, icon: 'mdi:currency-usd' },
      { id: 202, title: "Expenses", goal: 30000, value: 29500, icon: 'mdi:cash-minus' },
      { id: 203, title: "Customer Retention", goal: 85, value: 82, icon: 'mdi:account-check' },
    ],
    "Other": [
    ],
  };
  
  // ✅ Utility: Get background color based on percentage
 
const getCircleColor = (pct) => {
  if (pct >= 100) return theme.palette.success.main;
  if (pct >= 80) return theme.palette.grey[400];
  if (pct >= 60) return theme.palette.warning.main;
  return theme.palette.error.main;
};


  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Grid container spacing={3}>

        {Object.entries(METRICS_DATA).map(([group, items]) =>
            items.length > 0 && (
              <Grid xs={12} key={group}>
                <Card>
                  <CardHeader title={group} />
                  <CardContent>
                    <Grid container spacing={3}>
                      {items.map((m) => {
                        const pct = Math.round((m.value / m.goal) * 100);
                        return (
                        <Grid xs={12} md={4} key={m.id}>
                          <BookingWidgetSummary
                            // title={`${m.title} (Goal: ${fNumber(m.goal)})`}
                            total={fNumber(m.value)}
                            icon={m.icon}
                            pct={pct}
                            color={getCircleColor(pct)}
                            goal={fNumber(m.goal)}
                          />
                        </Grid>
                        )
                        })}
                    </Grid>
                    
                  </CardContent>
                </Card>
              </Grid>
            )
          )}

        <Grid xs={12} md={6} lg={6} sx={{height:"500px"}}>
         <Card>
            <CardHeader title="Total Amount Charged Per Month" />
            <CardContent>
              <ChartLine
                series={[
                  {
                    name: 'Amount',
                    data: [100, 5000, 3000, 4000, 6000, 7000],
                  },
                ]}
                categories={lastSixMonths}
               sx={{ height: '100%' }}

              />
            </CardContent>
          </Card>
        </Grid>

        <Grid xs={12} md={6} lg={6} sx={{ height: "500px", }}>
          <AppAreaInstalled
            title="Locations Metrics Across the Year"
            seriesData={seriesData}
            setSeriesData={setSeriesData}
            years={userStats?.availableYears}
            onClick={() => handleClick(paths.dashboard.locations.root)}
            chart={{
              categories: [
                'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
              ],
              series: [{ data: chartData || [] }],
            }}
            sx={{ height: '100%' }}
          />
        </Grid>


        {/* <Grid xs={12} md={6} lg={8} sx={{ height: "510px", }}>
        <Card>
            <CardHeader title="Total Amount Charged Per Month" />
            <CardContent>
              <ChartLine
                series={[
                  {
                    name: 'Amount',
                    data: [100, 5000, 3000, 4000, 6000, 7000],
                  },
                ]}
                categories={lastSixMonths}
              />
            </CardContent>
          </Card>
        </Grid> */}



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
