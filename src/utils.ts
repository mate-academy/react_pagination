export function getNumbers(from: number, to: number): number[] {
  const numbers = [];

  for (let n = from; n <= to; n += 1) {
    numbers.push(n);
  }

  return numbers;
}

export function getNumbersInRange(
  from: number, to: number,
  startRange:number,
  endRange:number,
): number[] {
  const numbers:number[] = getNumbers(from, to);

  return numbers.filter((n) => n >= startRange && n <= endRange);
}
