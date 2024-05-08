export const getNumbers = (start: number, end: number) => {
  return Array(end - start + 1)
    .fill(undefined)
    .map((_, index) => start + index);
};
