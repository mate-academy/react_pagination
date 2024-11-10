export interface PaginationProps {
  total: number;
  perPage: number;
  currentPage: number;
  onChangePage: (page: number) => void;
}
