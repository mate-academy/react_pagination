export function getNumbers(from: number, to: number): number[] {
  const numbers = [];

  for (let n = from; n <= to; n += 1) {
    numbers.push(n);
  }

  return numbers;
}

export const arrangeItems = (
  items: string[],
  perPage: number,
  currentPage: number,
): string[] => {
  const startIndex = perPage * (currentPage - 1);

  return [...items.slice(startIndex, startIndex + perPage)];
};
