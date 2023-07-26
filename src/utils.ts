export function getNumbers(from: number, to: number): number[] {
  const numbers = [];

  for (let n = from; n <= to; n += 1) {
    numbers.push(n);
  }

  return numbers;
}

export const getPageNumbers = (totalItems: number, itemsPerPage: number) => {
  const numberOfPages = Math.ceil(totalItems / itemsPerPage);

  return Array.from({ length: numberOfPages }, (_, i) => i + 1);
};
