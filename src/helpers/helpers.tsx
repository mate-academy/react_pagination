export function getPageNumber(
  totalNumbers: number,
  itemsPerPage: number,
): { id: number; value: number }[] {
  const pageAmount = Math.ceil(totalNumbers / itemsPerPage);

  return Array.from({ length: pageAmount }, (_, index) => ({
    id: index + 1,
    value: index + 1,
  }));
}

export const getLinesForPage = (pageNumber: number, linesPerPage: number) => {
  const totalLines = 42;
  const start = (pageNumber - 1) * linesPerPage;
  const end = start + linesPerPage;

  return Array.from({ length: totalLines }, (_, i) => `Item ${i + 1}`).slice(
    start,
    end,
  );
};
