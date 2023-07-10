export function getNumbers(from: number, to: number): number[] {
  const numbers = [];

  for (let n = from; n <= to; n += 1) {
    numbers.push(n);
  }

  return numbers;
}

export const getVisibleItems = (
  itemsPerPage: number,
  currentPage: number,
  total: number,
) => {
  const lastVisibleItem = currentPage * itemsPerPage;
  const indexFrom = lastVisibleItem - itemsPerPage + 1;
  const indexTo = lastVisibleItem > total ? total : lastVisibleItem;

  return getNumbers(indexFrom, indexTo).map(number => `Item ${number}`);
};
