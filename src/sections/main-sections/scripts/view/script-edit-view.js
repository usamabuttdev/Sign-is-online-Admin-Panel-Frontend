import PropTypes from 'prop-types';
import Container from '@mui/material/Container';
import { paths } from 'src/routes/paths';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { useGetScriptByIdQuery } from 'src/store/Reducer/scripts';
import ScriptNewEditForm from '../script-new-edit-form';

export default function ScriptEditView({ id }) {
  const settings = useSettingsContext();
  const { data: currentUser } = useGetScriptByIdQuery(id);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Edit"
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'Scripts',
            href: paths.dashboard.scripts.root,
          },
          { name: currentUser?.title },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <ScriptNewEditForm currentUser={currentUser} />
    </Container>
  );
}

ScriptEditView.propTypes = {
  id: PropTypes.string,
};
