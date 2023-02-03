export function getNumbers(from: number, to: number): number[] {
  const numbers = [];

  for (let n = from; n <= to; n += 1) {
    numbers.push(n);
  }

  return numbers;
}

export const getVisibleItems = (
  items: string[],
  page: number,
  perPage: number,
) => {
  const firstIndex = (page - 1) * perPage;
  const lastIndex = firstIndex + perPage < items.length
    ? firstIndex + perPage
    : items.length;

  return items.slice(firstIndex, lastIndex);
};

export const getExtremes = (
  total: number,
  page: number,
  perPage: number,
) => {
  const firstVisible = (page - 1) * perPage + 1;
  const lastVisible = firstVisible + perPage - 1 < total
    ? firstVisible + perPage - 1
    : total;

  return [firstVisible, lastVisible];
};
