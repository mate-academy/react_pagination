export function getNumbers(from: number, to: number): number[] {
  const numbers = [];

  for (let n = from; n <= to; n += 1) {
    numbers.push(n);
  }

  return numbers;
}

export function getPageNumbers(
  itemsTotal: number,
  itemsPerPage: number,
): number[] {
  return getNumbers(1, Math.ceil(itemsTotal / itemsPerPage));
}
