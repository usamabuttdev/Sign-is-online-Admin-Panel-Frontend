// @mui
import Container from '@mui/material/Container';
import { Stack } from '@mui/material';
// routes
import { paths } from 'src/routes/paths';
// hooks
import { useSettingsContext } from 'src/components/settings';
import { useParams } from 'react-router-dom';
import { useGetProduct } from 'src/api/product';
// components
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
//
import ProductsHome from '../profile-home';

// ----------------------------------------------------------------------

export default function ProductsProfileView() {
  const settings = useSettingsContext();
  const { id } = useParams();

  const { product, productLoading, productError } = useGetProduct(id);

  const mappedProduct = product
    ? {
        id: product.id,
        title: product.name,
        current_price: product.price ? `$${product.price}` : '$0.00',
        current_price_ends: 'N/A',
        next_price: product.price ? `$${(product.price * 1.25).toFixed(2)}` : '$0.00',
        next_price_starts: 'N/A',
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
