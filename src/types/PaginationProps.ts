export interface PaginationProps {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  onPerPageChange: (perPage: number) => void;
}
