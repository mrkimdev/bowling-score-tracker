export const formatFrameValue = (
  value: number,
  previousValues: number[] = [],
) => {
  if (value === 10) {
    return 'X';
  }

  const [first = 0, second = 0] = previousValues;
  if (second + value === 10 || first + value === 10) {
    return '/';
  }

  return value;
};

export const parseFrameValue = (
  value: string,
  previousValues: string[] = [],
) => {
  if (value.toUpperCase() === 'X') {
    return 10;
  }

  const [first, second] = previousValues || [];
  if (value === '/' && !second && first) {
    return 10 - parseInt(first);
  }

  if (value === '/' && second) {
    return 10 - parseInt(second);
  }

  return parseInt(value);
};
