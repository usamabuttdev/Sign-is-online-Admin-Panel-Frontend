import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import CardHeader from '@mui/material/CardHeader';
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function ProductsHome({ product }) {
  const renderProduct = (
    <Card>
      <CardHeader title="Product Details" />

      <Stack spacing={2} sx={{ p: 3 }}>
        <Stack direction="row" spacing={2}>
          <Iconify icon="mdi:format-title" width={24} />
          <Box sx={{ typography: 'body2' }}>{product.title}</Box>
        </Stack>

        <Stack direction="row" spacing={2}>
          <Iconify icon="mdi:cash" width={24} />
          <Box sx={{ typography: 'body2' }}>Current Price: {product.current_price}</Box>
        </Stack>

        <Stack direction="row" spacing={2}>
          <Iconify icon="mdi:calendar-clock" width={24} />
          <Box sx={{ typography: 'body2' }}>
            Current Price Ends: {product.current_price_ends}
          </Box>
        </Stack>

        <Stack direction="row" spacing={2}>
          <Iconify icon="mdi:cash-multiple" width={24} />
          <Box sx={{ typography: 'body2' }}>Next Price: {product.next_price}</Box>
        </Stack>

        <Stack direction="row" spacing={2}>
          <Iconify icon="mdi:calendar-plus" width={24} />
          <Box sx={{ typography: 'body2' }}>
            Next Price Starts: {product.next_price_starts}
          </Box>
        </Stack>

        <Stack direction="row" spacing={2}>
          <Iconify icon="mdi:calendar" width={24} />
          <Box sx={{ typography: 'body2' }}>Created At: {product.created_at}</Box>
        </Stack>
      </Stack>
    </Card>
  );

  return (
    <Grid container spacing={3}>
      <Grid xs={12}>
        <Stack spacing={3}>{renderProduct}</Stack>
      </Grid>
    </Grid>
  );
}
