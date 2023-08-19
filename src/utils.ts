export function getNumbers(from: number, to: number): number[] {
  const numbers = [];

  for (let n = from; n <= to; n += 1) {
    numbers.push(n);
  }

  return numbers;
}

export function getCountPages(totalItems: number, countItemsInGroup: number) {
  return Math.ceil(totalItems / countItemsInGroup);
}

export function getFirstItemGroup(
  currentPage: number,
  countItems: number,
  total = 42,
) {
  const number = (currentPage - 1) * countItems;

  return number <= total
    ? number
    : 1;
}

export function getLastItemGroup(
  currentPage: number,
  countItems: number,
  total = 42,
) {
  const number = (currentPage - 1) * countItems + countItems;

  return number <= total
    ? number
    : total;
}
