export function getNumbers(from: number, to: number): number[] {
  const numbers = [];

  for (let n = from; n <= to; n += 1) {
    numbers.push(n);
  }

  return numbers;
}

export function pagesArray(number: number): number[] {
  const pages = [];

  for (let i = 1; i <= number; i++) {
    pages.push(i);
  }

  return pages;
}
