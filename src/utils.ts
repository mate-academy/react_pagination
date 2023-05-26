export function getNumbers(from: number, to: number): number[] {
  const numbers = [];

  for (let n = from; n <= to; n += 1) {
    numbers.push(n);
  }

  return numbers;
}

export function pagesAmount(total: number, perPage: number): number {
  return Math.ceil(total / perPage);
}

export function fromPageNumber(perPage: number, currentPage: number): number {
  return perPage * (currentPage - 1) + 1;
}

export function toPageNumber(
  total: number,
  perPage: number,
  currentPage: number,
) : number {
  return (currentPage * perPage) < total ? (currentPage * perPage) : total;
}
