export function getNumbers(from: number, to: number): number[] {
  const numbers = [];

  for (let n = from; n <= to; n += 1) {
    numbers.push(n);
  }

  return numbers;
}

export function getCurrentAmountPages(max: number) {
  const array = [];

  for (let i = 1; i <= max; i += 1) {
    array.push(i);
  }

  return array;
}

export function getVisibleAmountItems(
  itemsPerPage: number,
  currentPage: number,
  itemsLength = Infinity,
) {
  return {
    start: itemsPerPage * currentPage - itemsPerPage + 1,
    end: itemsPerPage * currentPage > itemsLength
      ? itemsLength
      : itemsPerPage * currentPage,
  };
}
