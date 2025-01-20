export function getNumbers(from: number, to: number): number[] {
  const numbers = [];

  for (let n = from; n <= to; n += 1) {
    numbers.push(n);
  }

  return numbers;
}

export function getStartPage(start: number, stepSize: number): number {
  return (start - 1) * stepSize + 1;
}

export function getEndtPage(
  start: number,
  stepSize: number,
  total: number,
): number {
  return Math.min(getStartPage(start, stepSize) + stepSize - 1, total);
}
