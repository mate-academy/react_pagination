export function getNumbers(from: number, to: number): number[] {
  const numbers = [];

  for (let n = from; n <= to; n += 1) {
    numbers.push(n);
  }

  return numbers;
}

export function getEdgeIndexes(
  total: number,
  currentPage: number,
  perPage: number,
) {
  const numberOfPages = Math.ceil(total / perPage);
  const firstItemIndex = perPage * (currentPage - 1);
  const lastItemIndex = currentPage === numberOfPages ? total - 1
    : firstItemIndex + (perPage - 1);

  return [firstItemIndex, lastItemIndex];
}

export function getVisibleItems(
  items: string[],
  firstItemIndex: number,
  lastItemIndex: number,
) {
  return items.slice(firstItemIndex, lastItemIndex + 1);
}
