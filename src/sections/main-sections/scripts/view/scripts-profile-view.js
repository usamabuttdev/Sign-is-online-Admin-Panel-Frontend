import Container from '@mui/material/Container';
import { paths } from 'src/routes/paths';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { useSettingsContext } from 'src/components/settings';
import { Stack } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useGetScriptByIdQuery, useGetScriptLogsQuery } from 'src/store/Reducer/scripts';
import ProfileHome from '../profile-home';

export default function ScriptsProfileView() {
  const settings = useSettingsContext();
  const { id } = useParams();

  const { data: apiData, isFetching } = useGetScriptByIdQuery(id);
  const { data: logsResponse } = useGetScriptLogsQuery({ id, pageno: 1 });

  const script = apiData?.data || null;
  const logs = logsResponse?.data || [];

  const counts = logs.map((log) => ({
    time: log.date_started,
    value: log.process_count,
  }));

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <Stack direction="row" spacing={2}>
        <CustomBreadcrumbs
          heading="Profile"
          links={[
            { name: 'Dashboard', href: paths.dashboard.root },
            { name: 'Scripts', href: paths.dashboard.scripts.root },
            { name: script?.title || id || '' },
          ]}
          sx={{ mb: { xs: 3, md: 5 } }}
        />
      </Stack>
      {isFetching ? (
        <div>Loading...</div>
      ) : (
        <ProfileHome script={script} logs={logs} counts={counts} />
      )}
    </Container>
  );
}
