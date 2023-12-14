export type PaginationProps = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (pageNo: string) => void;
};

export type ItemListProps = {
  items: string[],
  firstIndex: number,
  lastIndex: number,
};
