export function getNumbers(from: number, to: number): number[] {
  const numbers = [];

  for (let n = from; n <= to; n += 1) {
    numbers.push(n);
  }

  return numbers;
}

export function calculateStartAndEnd(
  items: string[],
  page: number,
  itemsPerPage: number,
) {
  const start = Math.max((page - 1) * itemsPerPage, 0);
  const end = Math.min(start + itemsPerPage, items.length);

  return { start, end };
}
