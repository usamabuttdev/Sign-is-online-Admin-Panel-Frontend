import PropTypes from 'prop-types';
// @mui
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { useTheme } from '@mui/material/styles';
import { Tooltip } from '@mui/material';
// utils
// ----------------------------------------------------------------------

export default function BookingWidgetSummary({ title, total, image, icon, pct , color ,goal, sx, ...other }) {
  const theme = useTheme();

  const PRIMARY_LIGHT = theme.palette.primary.light;

  const PRIMARY_MAIN = theme.palette.primary.main;

  const PRIMARY_DARK = theme.palette.primary.dark;

  return (
    <Tooltip title={`Goal : ${goal}`}>
    <Card
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative',
        transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: theme.shadows[10],
        },
        p: 2,
        pl: 3,
        ...sx,
      }}
      {...other}
    >
  
      <Box>
        <Box sx={{ mb: 1, typography: 'h3' }}>{total}</Box>
        <Box sx={{ color: 'text.secondary', typography: 'subtitle2' }}>{title}</Box>
      </Box>
      <Box
        sx={{
          width: 90,
          height: 90,
          lineHeight: 0,
          borderRadius: '50%',
          bgcolor: 'background.neutral',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor:color,          
        }}
      >
        {pct} %
      </Box>
     </Card>
    </Tooltip>
  );
}

BookingWidgetSummary.propTypes = {
  icon: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  sx: PropTypes.object,
  title: PropTypes.string,
  total: PropTypes.number,
};
