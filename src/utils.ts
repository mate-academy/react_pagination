export function getNumbers(from: number, to: number): number[] {
  const numbers = [];

  for (let n = from; n <= to; n += 1) {
    numbers.push(n);
  }

  return numbers;
}

export function getAmountOfItems(
  items: string[],
  currentPage: string,
  pageSize: string,
) {
  const startIndex = (Number(currentPage) - 1) * Number(pageSize);
  const part = items.slice(startIndex, startIndex + Number(pageSize));

  return part;
}
