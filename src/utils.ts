export function getNumbers(from: number, to: number): number[] {
  const numbers = [];

  for (let n = from; n <= to; n += 1) {
    numbers.push(n);
  }

  return numbers;
}

// type PreparedPages<T> = {
//   [key: number]: T[];
// };

export function setPages(pagesAmount: number) {
  const res = [];

  for (let i = 0; i < pagesAmount; i++) {
    res.push(i + 1);
  }

  return res;
}

export function pagesItems(
  items: string[],
  page: number,
  perPage: number,
): string[] {
  const start = (page - 1) * perPage;
  const end = start + perPage;

  return items.slice(start, end);
}
