export function getNumbers(from: number, to: number): number[] {
  const numbers = [];

  for (let n = from; n <= to; n += 1) {
    numbers.push(n);
  }

  return numbers;
}

export function getPages(from: number, to: number) {
  const arrayOfPages = [];

  for (let i = from; i <= to; i += 1) {
    arrayOfPages.push(i);
  }

  return arrayOfPages;
}
