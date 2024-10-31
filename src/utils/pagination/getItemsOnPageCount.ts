export const getItemsOnPageCount = (
  currentPage: number,
  perPage: number,
  items: Array<unknown>,
): number[] => {
  const first =
    currentPage === 1 ? currentPage : currentPage * perPage - perPage + 1;
  const last = Math.min(items.length, currentPage * perPage);

  return [first, last];
};
