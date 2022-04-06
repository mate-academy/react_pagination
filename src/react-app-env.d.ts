/// <reference types="react-scripts" />

interface Pagination {
  total: number,
  perPage: number,
  page: number,
  onPageChange: (selected: number) => void,
  onPrevBtn: () => void,
}
