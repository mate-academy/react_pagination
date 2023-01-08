export function getNumbers(from: number, to: number): number[] {
  const numbers = [];

  for (let n = from; n <= to; n += 1) {
    numbers.push(n);
  }

  return numbers;
}

export function getPages(perPage: number, total: number): number {
  let result = 0;

  if (total % perPage === 0) {
    result = total / perPage;
  }

  if (total % perPage !== 0) {
    result = Math.floor(total / perPage + 1);
  }

  return result;
}
