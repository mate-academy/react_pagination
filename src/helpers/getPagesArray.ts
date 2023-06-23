export const getPagesArray = (numberOfPages: number) => {
  return Array.from({ length: numberOfPages }, (_, i) => i + 1);
};
