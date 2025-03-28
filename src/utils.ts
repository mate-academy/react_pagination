import { PreparedItems } from './types';

export function getNumbers(from: number, to: number): number[] {
  const numbers = [];

  for (let n = from; n <= to; n += 1) {
    numbers.push(n);
  }

  return numbers;
}

export const preperedItems = (
  items: string[],
  perPage: number,
  currentPage: number,
): PreparedItems => {
  const startIndex = (currentPage - 1) * perPage;
  const endIndex = Math.min(startIndex + perPage, items.length);

  return {
    visibleItems: items.slice(startIndex, endIndex),
    startItem: startIndex + 1,
    endItem: endIndex,
  };
};
