export function getNumbers(from: number, to: number): number[] {
  const numbers = [];

  for (let n = from; n <= to; n += 1) {
    numbers.push(n);
  }

  return numbers;
}

export function getPages(itemsPerPage: number, totalItems: number): number[] {
  const pages = getNumbers(1, Math.ceil(totalItems / itemsPerPage));

  return pages;
}
