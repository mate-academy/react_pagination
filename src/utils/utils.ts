export function getNumbers(from: number, to: number): number[] {
  const numbers = [];

  for (let n = from; n <= to; n += 1) {
    numbers.push(n);
  }

  return numbers;
}

export function getItems(): string[] {
  return getNumbers(1, 42).map(n => `Item ${n}`);
}
