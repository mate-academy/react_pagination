export function getNumbers(from: number, to: number): number[] {
  const numbers = [];

  for (let n = from; n <= to; n += 1) {
    numbers.push(n);
  }

  return numbers;
}

export const getPages = (totalPages: number): number[] => {
  const pages: number[] = [];

  for (let p = 1; p <= totalPages; p += 1) {
    pages.push(p);
  }

  return pages;
};
