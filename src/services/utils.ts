function getNumbers(from: number, to: number): number[] {
  const numbers = [];

  for (let n = from; n <= to; n += 1) {
    numbers.push(n);
  }

  return numbers;
}

export function getItems(from: number, to: number): string[] {
  return getNumbers(from, to).map(n => `Item ${n}`);
}

export function getPages(from: number, to: number): number[] {
  return getNumbers(from, to).map(n => n);
}
