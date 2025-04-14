export interface Page {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (total: number, perPage: number, currentPage: number) => void;
}
