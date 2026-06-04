import { Helmet } from 'react-helmet-async';
// sections
import TrainingModesListView from 'src/sections/main-sections/training-modes/view/training-modes-list-view';

// ----------------------------------------------------------------------

export default function TrainingModesPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Training Modes</title>
      </Helmet>

      <TrainingModesListView />
    </>
  );
}
