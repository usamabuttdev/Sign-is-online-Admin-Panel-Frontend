import PropTypes from 'prop-types';
// @mui
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { useTheme } from '@mui/material/styles';
// utils
import { fShortenNumber } from 'src/utils/format-number';
import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import { Button } from '@mui/material';

// ----------------------------------------------------------------------

export default function BookingWidgetSummary({ title, total, image, icon, sx, ...other }) {
  const theme = useTheme();

  const PRIMARY_LIGHT = theme.palette.primary.light;

  const PRIMARY_MAIN = theme.palette.primary.main;

  const PRIMARY_DARK = theme.palette.primary.dark;

  return (
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
        }}
      >
        {image ? (
          <Image
            alt="image"
            src={image}
            sx={{
              width: '70%',
              height: '70%',
              objectFit: 'cover',
            }}
          />
        ) : (
          <Button
            variant='contained'
            sx={{
              borderRadius: "100%",
              p: "12px",
              bgcolor: PRIMARY_MAIN,
              "&:hover": {
                bgcolor: PRIMARY_MAIN,
                boxShadow: "none",
              },
            }}
          >
            <Iconify icon={icon} width={40} height={40} sx={{ color: 'background.neutral' }} />
          </Button>
        )
        }
      </Box>
    </Card>
  );
}

BookingWidgetSummary.propTypes = {
  icon: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  sx: PropTypes.object,
  title: PropTypes.string,
  total: PropTypes.number,
  total: PropTypes.number,
};
