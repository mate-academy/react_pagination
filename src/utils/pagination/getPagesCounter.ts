export const getPagesCounter = (totalPage: number): number[] => {
  const pages = [];

  for (let i = 1; i < totalPage + 1; i++) {
    pages.push(i);
  }

  return pages;
};
