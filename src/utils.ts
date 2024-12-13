export function getNumbers(from: number, to: number): number[] {
  const numbers = [];

  for (let n = from; n <= to; n += 1) {
    numbers.push(n);
  }

  return numbers;
}

export function getPagesCount(to: number, itemsPerPage: number): number[] {
  const countPages = Math.ceil(to / itemsPerPage);
  const pages: number[] = [];

  for (let i = 1; i <= countPages; i++) {
    pages.push(i);
  }

  return pages;
}
