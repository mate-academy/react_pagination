import { ItemsPerPage } from './types/ItemsPerPage';

export function getNumbers(from: number, to: number): number[] {
  const numbers = [];

  for (let n = from; n <= to; n += 1) {
    numbers.push(n);
  }

  return numbers;
}

export function getItemsOnCurrentPage(
  itemsToPrepare: string[],
  currentPage: number,
  itemsPerPage: ItemsPerPage,
): string[] {
  const itemsLength = itemsToPrepare.length;
  const startIndex = (currentPage - 1) * itemsPerPage;
  let endIndex = startIndex + itemsPerPage;

  if (endIndex > itemsLength) {
    endIndex = itemsLength;
  }

  return itemsToPrepare.slice(startIndex, endIndex);
}
