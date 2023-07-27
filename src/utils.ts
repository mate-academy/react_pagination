export function getNumbers(from: number, to: number): number[] {
  const numbers = [];

  for (let n = from; n <= to; n += 1) {
    numbers.push(n);
  }

  return numbers;
}

export function getLastIndex(
  itemsPerPage: number, currentPage: number, total: number,
) {
  let lastIndex = itemsPerPage * currentPage;

  if (lastIndex > total) {
    lastIndex = total;
  }

  return lastIndex;
}
