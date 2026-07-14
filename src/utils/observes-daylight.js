export function parseObservesDaylight(value) {
  if (typeof value === 'string') {
    const normalized = value.trim().toUpperCase();
    return normalized === 'Y' || normalized === '1' || normalized === 'TRUE';
  }

  return value === true || value === 1;
}

export function formatObservesDaylight(value) {
  return value ? 'Y' : 'N';
}
