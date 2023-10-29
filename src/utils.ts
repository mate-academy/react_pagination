export function getNumbers(from: number, to: number): number[] {
  const numbers = [];

  for (let n = from; n <= to; n += 1) {
    numbers.push(n);
  }

  return numbers;
}

export const TOTAL_ITEMS = 42;
export const SELECTOR_OPTIONS: number[] = [3, 5, 10, 20];
