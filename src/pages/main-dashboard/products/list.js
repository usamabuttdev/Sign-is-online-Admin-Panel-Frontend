import { Helmet } from 'react-helmet-async';
import ProductsListView from 'src/sections/main-sections/products/view/products-list-view';
// sections

// ----------------------------------------------------------------------

export default function ProductsListPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard:Products List Page</title>
      </Helmet>

      <ProductsListView />
    </>
  );
}
