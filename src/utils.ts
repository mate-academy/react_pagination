export function getNumbers(from: number, to: number): number[] {
  const numbers = [];

  for (let n = from; n <= to; n += 1) {
    numbers.push(n);
  }

  return numbers;
}

export function getCurrentItems(
  items: string[],
  itemPerPage: number,
  currentPage: number,
): string[] {
  const startIndex = itemPerPage * (currentPage - 1);
  const endIndex = itemPerPage * currentPage;

  return items.slice(startIndex, endIndex);
}

export function getPageNumbers(total: number, perPage: number): number[] {
  const pages = [];
  const totalPageNumber = total % perPage === 0
    ? total / perPage
    : Math.floor(total / perPage) + 1;

  for (let i = 1; i <= totalPageNumber; i += 1) {
    pages.push(i);
  }

  return pages;
}
