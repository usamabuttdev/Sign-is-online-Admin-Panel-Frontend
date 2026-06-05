import { format, getTime, formatDistanceToNow } from 'date-fns';

// ----------------------------------------------------------------------

export function fDate(date, newFormat) {
  const fm = newFormat || 'dd MMM yyyy';

  return date ? format(new Date(date), fm) : '';
}

export function fDateTime(date, newFormat) {
  const fm = newFormat || 'dd MMM yyyy p';

  return date ? format(new Date(date), fm) : '';
}

export function fTimestamp(date) {
  return date ? getTime(new Date(date)) : '';
}

export function fToNow(date) {
  return date
    ? formatDistanceToNow(new Date(date), {
        addSuffix: true,
      })
    : '';
}

export const formatDate = (dateString) => {
  if(!dateString) {
    return { display: '', full: '' };
  }
  const date = new Date(dateString);
  return {
    display: format(date, "MM/dd/yyyy"),           // what you see in table
    full: format(date, "MMMM d, yyyy, hh:mm a"),   // what you see on hover
  };
};
