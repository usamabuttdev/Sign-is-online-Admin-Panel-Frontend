// @mui
import Container from '@mui/material/Container';
import { Stack } from '@mui/material';
// routes
import { paths } from 'src/routes/paths';
// hooks
import { useSettingsContext } from 'src/components/settings';
// components
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
//
import ProductsHome from '../profile-home';

// ----------------------------------------------------------------------

export default function ProductsProfileView() {
  const settings = useSettingsContext();

  const data = {
    id: 1,
    title: "Product A",
    current_price: "$120",
    current_price_ends: "2025-09-01",
    next_price: "$150",
    next_price_starts: "2025-09-02",
    created_at: "2025-08-01",
    action: "View",
  };

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <Stack direction="row" spacing={2}>
        <CustomBreadcrumbs
          heading="Products"
          links={[
            { name: 'Dashboard', href: paths.dashboard.root },
            { name: 'Products', href: paths.dashboard.products.root },
            { name: data.title },
          ]}
          sx={{ mb: { xs: 3, md: 5 } }}
        />
      </Stack>

      <ProductsHome product={data} />
    </Container>
  );
}
