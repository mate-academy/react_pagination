export function getFirstAndLastItem(
  page: number,
  itemsPerPage: number,
  total: number,
): [number, number] {
  let lastItem = page * itemsPerPage;
  const firstItem = lastItem - (itemsPerPage - 1);

  if (lastItem > total) {
    lastItem = total;
  }

  return [firstItem, lastItem];
}
