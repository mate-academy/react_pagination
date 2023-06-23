export const getVisibleItems = (
  items: string[],
  start: number,
  end: number,
) => {
  return items.slice(start, end);
};
