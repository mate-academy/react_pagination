export const getDiapason = (
  total: number,
  currentPage: number,
  itemsPerPage: number,
) => {
  const start = ((currentPage - 1) * itemsPerPage);
  const maxItems = currentPage * itemsPerPage;
  const end = maxItems > total
    ? total
    : maxItems;

  return [start, end];
};
