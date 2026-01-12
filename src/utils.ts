import { PerPage } from './types/PerPage';

export function getNumbers(from: number, to: number): number[] {
  const numbers = [];

  for (let n = from; n <= to; n += 1) {
    numbers.push(n);
  }

  return numbers;
}

export function toPerPage(value: string): PerPage {
  const num = Number(value);

  if (num === 3 || num === 5 || num === 10 || num === 20) {
    return num;
  }

  throw new Error('Invalid perPage value');
}
