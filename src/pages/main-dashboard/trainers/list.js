import { Helmet } from 'react-helmet-async';
import TrainersListView from 'src/sections/main-sections/trainers/view/trainers-list-view';
// sections

// ----------------------------------------------------------------------

export default function TrainersListPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Trainers List</title>
      </Helmet>

      <TrainersListView/>
    </>
  );
}
