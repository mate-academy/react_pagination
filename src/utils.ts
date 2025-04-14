// export function getNumbers(from: number, to: number): number[] {
//   const numbers = [];

//   for (let n = from; n <= to; n += 1) {
//     numbers.push(n);
//   }

//   return numbers;
// }

export function calculateItems(
  currentPage: number,
  perPage: number,
  totalItems: number,
): [number, number] {
  const startItem = (currentPage - 1) * perPage + 1;
  const endItem = Math.min(currentPage * perPage, totalItems);

  return [startItem, endItem];
}

export const getNumbers = (totalPages: number, offset = 0) =>
  Array.from({ length: totalPages }, (_, index) => index + 1 + offset);
