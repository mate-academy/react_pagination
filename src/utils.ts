export function getNumbers(from: number, to: number): string[] {
  const numbers = [];

  for (let n = from; n <= to; n += 1) {
    numbers.push(`Item ${n}`);
  }

  return numbers;
}
