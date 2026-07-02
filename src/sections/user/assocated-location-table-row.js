import { TableRow, TableCell } from '@mui/material';
import { useRouter } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';
import { fDate } from 'src/utils/format-time';

const AssociatedLocationTableRow = ({ location }) => {
  const { id, title, added } = location;
  const router = useRouter();

  const handleRowClick = () => {
    router.push(`${paths.dashboard.locations.profile}/${id}`);
  };

  return (
    <TableRow hover sx={{ cursor: 'pointer' }} onClick={handleRowClick}>
      <TableCell sx={{ color: 'primary.main', fontWeight: 600 }}>{title}</TableCell>
      <TableCell>{added ? fDate(added) : '-'}</TableCell>
    </TableRow>
  );
};

export default AssociatedLocationTableRow;
