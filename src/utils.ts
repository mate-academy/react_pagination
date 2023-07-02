export function getNumbers(from: number, to: number): number[] {
  const numbers = [];

  for (let n = from; n <= to; n += 1) {
    numbers.push(n);
  }

  return numbers;
}

export const getVisisibleItems = (
  itemsPerPage: number,
  currentPage: number,
  total: number,
) => {
  const lastVisibleItem = currentPage * itemsPerPage;

  return getNumbers(
    lastVisibleItem - itemsPerPage + 1,
    (lastVisibleItem > total ? total : lastVisibleItem),
  ).map(n => `Item ${n}`);
};
