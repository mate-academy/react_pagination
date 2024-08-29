export function getNumbers(from: number, to: number): number[] {
  const numbers = [];

  for (let n = from; n <= to; n += 1) {
    numbers.push(n);
  }

  return numbers;
}

export function getPartItems(
  items: string[],
  currentPage: number,
  pageSize: number,
) {
  const startIndex = (currentPage - 1) * pageSize;
  const part = items.slice(startIndex, startIndex + pageSize);

  return part;
}
