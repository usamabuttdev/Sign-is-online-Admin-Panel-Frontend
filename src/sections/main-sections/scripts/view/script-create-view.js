import Container from '@mui/material/Container';
import { paths } from 'src/routes/paths';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import ScriptNewEditForm from '../script-new-edit-form';

export default function ScriptCreateView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Create a new script"
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'Scripts',
            href: paths.dashboard.scripts.root,
          },
          { name: 'New script' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <ScriptNewEditForm />
    </Container>
  );
}
