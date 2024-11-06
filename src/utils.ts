export function getNumbers(from: number, to: number): number[] {
  const numbers = [];

  for (let n = from; n <= to; n += 1) {
    numbers.push(n);
  }

  return numbers;
}

export function preparePageItems(
  pageItems: string[],
  itemsPerPage: number,
  curPage: number,
) {
  return pageItems.slice(itemsPerPage * (curPage - 1), itemsPerPage * curPage);
}
