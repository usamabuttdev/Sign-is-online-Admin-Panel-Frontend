import { Helmet } from 'react-helmet-async';
import { useParams } from 'src/routes/hooks';
import ScriptEditView from 'src/sections/main-sections/scripts/view/script-edit-view';

export default function ScriptEditPage() {
  const params = useParams();
  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Dashboard: Edit Script</title>
      </Helmet>

      <ScriptEditView id={`${id}`} />
    </>
  );
}
