export const total = 42;

export function getNumbers(from: number, to: number): number[] {
  const numbers = [];

  for (let n = from; n <= to; n += 1) {
    numbers.push(n);
  }

  return numbers;
}

export function getPages(perPage: number): number[] {
  const pageSet = Math.ceil(total / perPage);
  const pages = [];

  for (let p = 0; p < pageSet; p += 1) {
    pages.push(p + 1);
  }

  return pages;
}

export function getPagination(
  perPage: number,
  currentPage: number,
): number[] {
  const currPageCapacity = currentPage * perPage;

  const from = currPageCapacity - perPage + 1;
  const to = currPageCapacity > total ? total : currPageCapacity;

  return [from, to];
}
