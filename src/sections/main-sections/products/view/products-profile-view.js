// @mui
import Container from '@mui/material/Container';
import { Stack } from '@mui/material';
// routes
import { paths } from 'src/routes/paths';
// hooks
import { useSettingsContext } from 'src/components/settings';
import { useParams } from 'react-router-dom';
import { useGetProductByIdQuery } from 'src/store/Reducer/products';
// components
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
//
import ProductsHome from '../profile-home';

// ----------------------------------------------------------------------

export default function ProductsProfileView() {
  const settings = useSettingsContext();
  const { id } = useParams();

  const { data: product, isLoading: productLoading, error: productError } = useGetProductByIdQuery(id, {
    skip: !id,
  });

  const mappedProduct = product
    ? {
        id: product.id,
        title: product.title,
        subscription_length: product.subscription_length,
        status: product.status,
        current_price: product.current_price ?? 'N/A',
        current_price_ends: product.current_price_ends || 'N/A',
        next_price: product.next_price ?? 'N/A',
        next_price_starts: product.next_price_starts || 'N/A',
        locations: product.locations ?? 0,
        created_at: product.created_at || 'N/A',
        action: 'View',
      }
    : null;

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <Stack direction="row" spacing={2}>
        <CustomBreadcrumbs
          heading="Products"
          links={[
            { name: 'Dashboard', href: paths.dashboard.root },
            { name: 'Products', href: paths.dashboard.products.root },
            { name: mappedProduct?.title || id || 'Loading...' },
          ]}
          sx={{ mb: { xs: 3, md: 5 } }}
        />
      </Stack>

      {productLoading ? (
        <div>Loading...</div>
      ) : productError ? (
        <div>Error loading product</div>
      ) : mappedProduct ? (
        <ProductsHome product={mappedProduct} />
      ) : (
        <div>Product not found</div>
      )}
    </Container>
  );
}
