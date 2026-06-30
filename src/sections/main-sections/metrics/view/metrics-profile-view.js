import { useParams } from 'react-router-dom';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import Stack from '@mui/material/Stack';
import { paths } from 'src/routes/paths';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import Scrollbar from 'src/components/scrollbar';
import {
  useTable,
  emptyRows,
  TableHeadCustom,
  TablePaginationCustom,
  TableEmptyRows,
  TableNoData,
} from 'src/components/table';
import { useGetMetricByIdQuery, useGetMetricValuesQuery } from 'src/store/Reducer/metrics';
import ProfileHome from '../profile-home';
import MetricValuesTableRow from '../metric-values-table-row';

const VALUES_TABLE_HEAD = [
  { id: 'value', label: 'Value', align: 'right' },
  { id: 'percent_of_goal', label: '% of Goal', align: 'center' },
  { id: 'date', label: 'Date', align: 'center' },
];

export default function MetricsProfileView() {
  const settings = useSettingsContext();
  const { id } = useParams();
  const valuesTable = useTable();

  const { data: apiData, isFetching } = useGetMetricByIdQuery(id);
  const { data: valuesResponse, isLoading: valuesLoading } = useGetMetricValuesQuery({
    id,
    pageno: valuesTable.page + 1,
  });

  const metric = apiData?.data || null;
  const valuesData = valuesResponse?.data || [];
  const valuesTotal = valuesResponse?.total || 0;

  const denseHeight = valuesTable.dense ? 52 : 72;
  const notFoundValues = !valuesLoading && valuesData.length === 0;

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <Stack direction="row" spacing={2}>
        <CustomBreadcrumbs
          heading="Metrics"
          links={[
            { name: 'Dashboard', href: paths.dashboard.root },
            { name: 'Metrics', href: paths.dashboard.metrics.root },
            { name: metric?.title || id || '' },
          ]}
          sx={{ mb: { xs: 3, md: 5 } }}
        />
      </Stack>

      {isFetching ? (
        <div>Loading...</div>
      ) : (
        <>
          <ProfileHome metric={metric} />

          <Card sx={{ mt: 3 }}>
            <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
              <Scrollbar>
                <Table size={valuesTable.dense ? 'small' : 'medium'} sx={{ minWidth: 640 }}>
                  <TableHeadCustom
                    order={valuesTable.order}
                    orderBy={valuesTable.orderBy}
                    headLabel={VALUES_TABLE_HEAD}
                    rowCount={valuesData.length}
                    numSelected={valuesTable.selected?.length}
                  />
                  <TableBody>
                    {valuesData.map((row, index) => (
                      <MetricValuesTableRow
                        key={row.id || index}
                        row={row}
                        selected={valuesTable.selected.includes(row.id)}
                      />
                    ))}
                    <TableEmptyRows
                      height={denseHeight}
                      emptyRows={emptyRows(valuesTable.page, valuesTable.rowsPerPage, valuesData.length)}
                    />
                    {notFoundValues && <TableNoData notFound={notFoundValues} />}
                  </TableBody>
                </Table>
              </Scrollbar>
            </TableContainer>

            <TablePaginationCustom
              count={valuesTotal || 1}
              page={valuesTable.page}
              rowsPerPage={valuesTable.rowsPerPage}
              onPageChange={valuesTable.onChangePage}
              onRowsPerPageChange={valuesTable.onChangeRowsPerPage}
              loading={valuesLoading}
            />
          </Card>
        </>
      )}
    </Container>
  );
}
