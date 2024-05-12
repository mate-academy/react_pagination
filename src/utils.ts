export function getPages(from: number, to: number): number [] {
  const pages = [];

  for (let i = from; i < to; i++) {
    pages.push(i);
  }

  return pages;
}

export function getNumbers(from: number, to: number): number[] {
  const numbers = [];

  for (let n = from; n <= to; n += 1) {
    numbers.push(n);
  }

  return numbers;
}
