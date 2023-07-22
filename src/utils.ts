export function getNumbers(from: number, to: number): number[] {
  const numbers = [];

  for (let n = from; n <= to; n += 1) {
    numbers.push(n);
  }

  return numbers;
}

export function getTotalPages(total: number, itemsPerPage: number) {
  return Math.ceil(total / itemsPerPage);
}

export function firstPageNumber(perPage: number, currentPage: number) {
  return (perPage * currentPage) - (perPage - 1);
}

export function lastPageNumber(
  perPage: number,
  currentPage: number,
  total: number,
) {
  return perPage * currentPage <= total
    ? perPage * currentPage
    : total;
}
