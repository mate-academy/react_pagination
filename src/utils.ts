export function getNumbers(from: number, to: number): number[] {
  const numbers = [];

  for (let n = from; n <= to; n += 1) {
    numbers.push(n);
  }

  return numbers;
}

export function getLastPage(total: number, perPage: number): number {
  return Math.ceil(total / perPage);
}
