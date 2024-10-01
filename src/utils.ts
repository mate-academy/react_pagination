export function getNumbers(from: number, to: number): number[] {
  const numbers = [];

  for (let n = from; n <= to; n += 1) {
    numbers.push(n);
  }

  return numbers;
}

export function getPageItems<T>(arr: T[], page: number, perPage: number) {
  const result = [];
  const offset = (page - 1) * perPage;

  for (let i = 0; i < perPage && i + offset < arr.length; i++) {
    result.push(arr[i + offset]);
  }

  return result;
}
