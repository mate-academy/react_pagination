export interface PaginationProps {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (event: number) => void;
}
