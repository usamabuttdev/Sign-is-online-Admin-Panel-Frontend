import { Helmet } from 'react-helmet-async';
import ScriptCreateView from 'src/sections/main-sections/scripts/view/script-create-view';

export default function ScriptCreatePage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Create Script</title>
      </Helmet>

      <ScriptCreateView />
    </>
  );
}
