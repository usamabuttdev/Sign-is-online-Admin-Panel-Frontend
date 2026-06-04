import { Helmet } from 'react-helmet-async';
// sections
import TransactionsListView from 'src/sections/main-sections/transactions/view/transactions-list-view';

// ----------------------------------------------------------------------

export default function TransactionListPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Transactions</title>
      </Helmet>

      <TransactionsListView />
    </>
  );
}
