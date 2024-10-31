export const getItemsOnPage = <T>(
  items: Array<T>,
  currentPage: number,
  perPage: number,
): Array<T> => {
  const itemsOnPage = items.slice(
    currentPage * perPage - perPage,
    currentPage * perPage,
  );

  return itemsOnPage;
};
