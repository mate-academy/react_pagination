export function getNumbers(from: number, to: number): number[] {
  const numbers = [];

  for (let n = from; n <= to; n += 1) {
    numbers.push(n);
  }

  return numbers;
}

export function getPages(total: number, perPage: number): number[] {
  const numbers = [];
  const pages = Math.ceil(total / perPage);

  for (let i = 1; i <= pages; i++) {
    numbers.push(i);
  }

  return numbers;
}
