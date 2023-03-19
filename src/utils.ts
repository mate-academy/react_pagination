export function getNumbers(from: number, to: number): number[] {
  const numbers = [];

  for (let n = from; n <= to; n += 1) {
    numbers.push(n);
  }

  return numbers;
}

export const items = getNumbers(1, 42)
  .map(n => `Item ${n}`);

export const itemsCountPerPage = [3, 5, 10, 20];
