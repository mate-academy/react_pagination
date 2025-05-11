export function getNumbers(from: number, to: number): number[] {
  const numbers = [];

  for (let n = from; n <= to; n += 1) {
    numbers.push(n);
  }

  return numbers;
}

export function getInitialPages(maxQuantOfItems: number, initPerPage: number) {
  return Math.ceil(maxQuantOfItems / initPerPage);
}
