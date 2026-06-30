import PropTypes from 'prop-types';
import { TableRow, TableCell } from '@mui/material';
import { formatDate } from 'src/utils/format-time';
import { fNumber } from 'src/utils/format-number';
import Label from 'src/components/label';

export default function MetricValuesTableRow({ row, selected }) {
  const { id, value, percent_of_goal, date } = row;
  const { display, full } = formatDate(date);

  const getPercentColor = (pct) => {
    if (pct >= 100) return 'success';
    if (pct >= 80) return 'default';
    if (pct >= 60) return 'warning';
    return 'error';
  };

  return (
    <TableRow hover selected={selected}>
      <TableCell align="right">{fNumber(value)}</TableCell>
      <TableCell align="center">
        {percent_of_goal != null && (
          <Label variant="soft" color={getPercentColor(percent_of_goal)}>
            {percent_of_goal}%
          </Label>
        )}
      </TableCell>
      <TableCell align="center" title={full}>
        {display}
      </TableCell>
    </TableRow>
  );
}

MetricValuesTableRow.propTypes = {
  row: PropTypes.object.isRequired,
  selected: PropTypes.bool,
};
