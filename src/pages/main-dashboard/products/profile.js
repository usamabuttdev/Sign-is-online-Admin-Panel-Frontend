import { Helmet } from 'react-helmet-async';
import ProductsProfileView from 'src/sections/main-sections/products/view/products-profile-view';
// sections
// ----------------------------------------------------------------------

export default function ProductsProfilePage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Products Profile</title>
      </Helmet>

      <ProductsProfileView />
    </>
  );
}
