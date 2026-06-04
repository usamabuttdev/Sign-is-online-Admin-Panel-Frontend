import { isSameDay, isSameMonth, getYear, parseISO, format } from 'date-fns';
import { datePicker } from 'src/theme/overrides/components/date-picker';
// utils
import { fDate } from 'src/utils/format-time';

// ----------------------------------------------------------------------

export function shortDateLabel(startDate, endDate) {
  const getCurrentYear = new Date().getFullYear();

  const startDateYear = startDate ? getYear(startDate) : null;

  const endDateYear = endDate ? getYear(endDate) : null;

  const currentYear = getCurrentYear === startDateYear && getCurrentYear === endDateYear;

  const sameDay = startDate && endDate ? isSameDay(new Date(startDate), new Date(endDate)) : false;

  const sameMonth =
    startDate && endDate ? isSameMonth(new Date(startDate), new Date(endDate)) : false;

  if (currentYear) {
    if (sameMonth) {
      if (sameDay) {
        return fDate(endDate, 'dd MMM yy');
      }
      return `${fDate(startDate, 'dd')} - ${fDate(endDate, 'dd MMM yy')}`;
    }
    return `${fDate(startDate, 'dd MMM')} - ${fDate(endDate, 'dd MMM yy')}`;
  }

  return `${fDate(startDate, 'dd MMM yy')} - ${fDate(endDate, 'dd MMM yy')}`;
}


export function formatDateCreatedAt(date) {
  if(!date) return null;
  const parsedDate = parseISO(date);
  const formattedDate = format(parsedDate, 'dd-MM-yyyy');
  return formattedDate;
}