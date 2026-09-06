export interface PaginationInterface {
  total: number;
  perPage: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
}
