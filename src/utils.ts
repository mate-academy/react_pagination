export function getNumbers(from: number, to: number): number[] {
  const numbers = [];

  for (let n = from; n <= to; n += 1) {
    numbers.push(n);
  }

  return numbers;
}

export const calcPages = (totalItems: number, itemsPerPage: number): number => {
  if (totalItems % itemsPerPage) {
    return (totalItems - (totalItems % itemsPerPage)) / itemsPerPage + 1;
  }

  return totalItems / itemsPerPage;
};

export const calcStartItem = (page: number, itemsPerPage: number) => {
  return page !== 1
    ? (page - 1) * itemsPerPage + 1
    : 1;
};

export const calcEndItem = (
  page: number,
  itemsPerPage: number,
  totalItems: number,
) => {
  if (page !== calcPages(totalItems, itemsPerPage)) {
    return ((page - 1) * itemsPerPage) + itemsPerPage;
  }

  return totalItems;
};
