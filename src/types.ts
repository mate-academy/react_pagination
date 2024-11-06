export type PaginationParams = {
  total: number;
  perPage: number;
  currentPage?: number;
  onPageChange: (value: number) => void;
};
