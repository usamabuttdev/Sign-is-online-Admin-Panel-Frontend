import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import CardHeader from '@mui/material/CardHeader';
import TextField from '@mui/material/TextField';
import Iconify from 'src/components/iconify';
import { formatDate } from 'src/utils/format-time';
import { Tooltip } from '@mui/material';
import { fNumber } from 'src/utils/format-number';
import Label from 'src/components/label';

// ----------------------------------------------------------------------

export default function ProfileHome({ metric }) {
  // Format numbers with commas
  
console.log(metric.percent_of_goal)
  // Background color logic for percent_of_goal
  const getPercentColor = (value) => {
    if (value >= 100) return 'success';
    if (value >= 80) return 'default';
    if (value >= 60) return 'warning';
    return 'error';
  };
  
  const formatWithUnits = (value, met_units) => {
    if (met_units === "$") return `$${fNumber(value)}`;
    if (met_units) return `${fNumber(value)}${met_units}`;
    return fNumber(value);
  };
  const {display , full}= formatDate(metric?.created_at)

  const renderMetric = (
    <Card>
      {/* Title instead of "Metric Details" */}
      <CardHeader title={metric.title} />

      <Stack spacing={2} sx={{ p: 3 }}>
        <Grid container spacing={2}>
          <Grid xs={12} md={6}> 

        <Stack direction="row" spacing={2}>
          <Iconify icon="mdi:chart-bar" width={24} />
          <Box sx={{ typography: 'body2' }}>
          Current: {formatWithUnits(metric.current_value, metric.met_units)}
          </Box>
        </Stack>

        <Stack direction="row" spacing={2}>
          <Iconify icon="mdi:target" width={24} />
          <Box sx={{ typography: 'body2' }}>
          Goal: {formatWithUnits(metric.goal, metric.met_units)}
          </Box>
        </Stack>

        {/* Percent of Goal with background color */}
        <Stack direction="row" spacing={2}>
          <Iconify icon="mdi:percent" width={24} />
          <Box>
            <Label variant="soft" color={getPercentColor(metric.percent_of_goal)} sx={{p:1}} >  
               {metric.percent_of_goal} of Goal
            </Label>
          </Box>
        </Stack>

        <Stack direction="row" spacing={2}>
          <Iconify icon="mdi:calendar" width={24} />
          <Box sx={{ typography: 'body2' }}>
            <Tooltip title={full} arrow>
              {display}
            </Tooltip>
          </Box>
        </Stack>
          </Grid>
          <Grid xs={12} md={6}>
        <Stack direction="row" spacing={2} justifyContent="flex-end" >
          <TextField
            multiline
            fullWidth
            minRows={4}
            value={metric.query}
            InputProps={{ readOnly: true }}
          />
        </Stack>

          </Grid>

        </Grid>
        {/* Query in a TextField for easy copy */}

      </Stack>
    </Card>
  );

  return (
    <Grid container spacing={3}>
      <Grid xs={12}>
        <Stack spacing={3}>{renderMetric}</Stack>
      </Grid>
    </Grid>
  );
}
