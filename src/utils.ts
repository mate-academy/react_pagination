export function getNumbers(from: number, to: number): number[] {
  const numbers: number[] = [];

  for (let n = from; n <= to; n += 1) {
    numbers.push(n);
  }

  return numbers;
}

export function getTotalPagesNumber(
  total: number,
  perPage: number,
): number {
  return Math.ceil(total / perPage);
}

export function getNumbersForCurrentPage(
  total: number,
  currentPage: number,
  perPage: number,
): number[] {
  if (currentPage === 1) {
    return getNumbers(1, perPage);
  }

  const lastPage = getTotalPagesNumber(total, perPage);

  if (currentPage === lastPage && total % perPage !== 0) {
    const from = total - (total % perPage) + 1;

    return getNumbers(from, total);
  }

  return getNumbers(1, perPage)
    .map(number => (number + (perPage * (currentPage - 1))));
}
