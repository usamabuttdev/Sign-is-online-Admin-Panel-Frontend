import { Helmet } from 'react-helmet-async';
import CustomersListView from 'src/sections/main-sections/customers/view/customers-list-view';
// sections

// ----------------------------------------------------------------------

export default function CustomersPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Customers</title>
      </Helmet>

      <CustomersListView />
    </>
  );
}
