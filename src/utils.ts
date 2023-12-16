import { DEFAULT_PAGE } from './constants';

export function getNumbers(from: number, to: number): number[] {
  const numbers = [];

  for (let n = from; n <= to; n += 1) {
    numbers.push(n);
  }

  return numbers;
}

export const getCurrentItems = (
  items: string[],
  page: number,
  perPage: number,
  startIndex: number,
) => {
  if (page === DEFAULT_PAGE) {
    return items.slice(0, perPage);
  }

  return items.slice(startIndex, startIndex + perPage);
};
