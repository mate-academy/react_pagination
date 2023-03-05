export function getNumbers(from: number, to: number): number[] {
  const numbers = [];

  for (let n = from; n <= to; n += 1) {
    numbers.push(n);
  }

  return numbers;
}

export function numberOfPages(total: number, perPage: string): number {
  return Math.ceil(total / Number(perPage));
}

export function getCurrentItems(
  total: number,
  currentPage: number,
  perPage: string,
): number[] {
  const itemNumbers = getNumbers(1, total);
  const start = (currentPage - 1) * +perPage;

  return itemNumbers.slice(start, start + +perPage);
}
