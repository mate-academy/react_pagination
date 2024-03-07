export function getNumbers(from: number, to: number): number[] {
  const numbers = [];

  for (let n = from; n <= to; n += 1) {
    numbers.push(n);
  }

  return numbers;
}

export function calculateItems(
  currentPage: number,
  perPage: number,
  totalItems: number,
): [number, number] {
  const startItem = (currentPage - 1) * perPage + 1;
  const endItem = Math.min(currentPage * perPage, totalItems);

  return [startItem, endItem];
}

export function handlePageChange(
  page: number,
  setCurrentPage: (page: number) => void,
) {
  setCurrentPage(page);
}

export function handlePerPageChange(
  e: React.ChangeEvent<HTMLSelectElement>,
  setPerPage: (perPage: number) => void,
  setCurrentPage: (page: number) => void,
) {
  const newPerPage = parseInt(e.target.value, 10);

  setPerPage(newPerPage);
  setCurrentPage(1);
}
