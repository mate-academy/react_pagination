export function getNumbers(from: number, to: number): number[] {
  const numbers = [];

  for (let n = from; n <= to; n += 1) {
    numbers.push(n);
  }

  return numbers;
}

export function getPaginatedItems(items: string[], perPage: number) {
  const paginated = [];

  for (let i = 1; i < Math.ceil(items.length / perPage) + 1; i++) {
    paginated.push(items.slice(i * perPage - perPage, i * perPage));
  }

  return paginated;
}
