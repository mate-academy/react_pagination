export function getNumbers(from: number, to: number): number[] {
  const numbers = [];

  for (let n = from; n <= to; n += 1) {
    numbers.push(n);
  }

  return numbers;
}

export function paginationUtils(item: string[], perPage: number, page: number) {
  const firstEl = perPage * (page - 1);
  const lastEl = firstEl + perPage;

  return item.slice(firstEl, lastEl);
}
