export interface Page {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  getArrayItems: (
    numberOfItems: number,
    currentPageNumber: number,
    totalNumber: number,
  ) => number[],
}
