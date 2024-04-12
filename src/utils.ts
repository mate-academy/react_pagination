export const defaultValuePerPage = 5;
export const defaultValuePage = 1;

export function getNumbers(from: number, to: number): Array<number> {
  const numbers = [];

  for (let n = from; n <= to; n += 1) {
    numbers.push(n);
  }

  return numbers;
}
