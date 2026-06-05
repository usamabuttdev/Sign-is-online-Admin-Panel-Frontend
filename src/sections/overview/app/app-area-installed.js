import PropTypes from 'prop-types';
import { useCallback } from 'react';
// @mui
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import CardHeader from '@mui/material/CardHeader';
import ButtonBase from '@mui/material/ButtonBase';
import Card from '@mui/material/Card';
// components
import Iconify from 'src/components/iconify';
import Chart, { useChart } from 'src/components/chart';
import CustomPopover, { usePopover } from 'src/components/custom-popover';

// ----------------------------------------------------------------------

export default function AppAreaInstalled({
  title,
  years,
  subheader,
  chart,
  seriesData,
  setSeriesData,
  ...other
}) {
  const {
    colors = [
      ['#c8e6c9', '#2e7d32'],
      ['#b39ddb', '#4527a0'],
    ],
    categories,
    series,
    options,
  } = chart;

  const popover = usePopover();
  const chartOptions = useChart({
    colors: colors.map((colr) => colr[1]),
    fill: {
      type: 'gradient',
      gradient: {
        colorStops: colors.map((colr) => [
          { offset: 0, color: colr[0] },
          { offset: 100, color: colr[1] },
        ]),
      },
    },
    xaxis: {
      categories,
    },
    ...options,
  });

  const handleChangeSeries = useCallback(
    (newValue) => {
      popover.onClose();
      setSeriesData(newValue);
    },
    [popover]
  );

  return (
    <>
      <Card {...other}>
        <CardHeader
          title={title}
          subheader={subheader}
          action={
            <ButtonBase
              onClick={(e)=>{
                e.stopPropagation();
                popover.onOpen(e);
              }}
              sx={{
                pl: 1,
                py: 0.5,
                pr: 0.5,
                borderRadius: 1,
                typography: 'subtitle2',
                bgcolor: 'background.neutral',
              }}
            >
              {seriesData}

              <Iconify
                width={16}
                icon={popover.open ? 'eva:arrow-ios-upward-fill' : 'eva:arrow-ios-downward-fill'}
                sx={{ ml: 0.5 }}
              />
            </ButtonBase>
          }
        />

        {series?.map((item, index) => (
          <Box key={index} sx={{ mt: 3, mx: 3 }}>
            <Chart dir="ltr" type="line" series={item.data} options={chartOptions} height={364} />
          </Box>
        ))}
      </Card>

      <CustomPopover open={popover.open} onClose={popover.onClose} sx={{ width: 140 }}>
        {years?.map((option, index) => (
          <MenuItem
            key={index}
            selected={option === seriesData}
            onClick={(e) => {
              e.stopPropagation();
              handleChangeSeries(option);
            }}
          >
            {option}
          </MenuItem>
        ))}
      </CustomPopover>
    </>
  );
}

AppAreaInstalled.propTypes = {
  chart: PropTypes.object,
  subheader: PropTypes.string,
  title: PropTypes.string,
};
