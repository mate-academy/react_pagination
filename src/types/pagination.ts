export type PropsPagination = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};
