export const getNumbers = (start: number, end: number) => {
  const items: number[] = [];

  for (let i = start; i <= end; i++) {
    items.push(i);
  }

  return items;
};
