export interface OptionsProps {
  active: number;
  activePage: number;
  onChangePage: (activePage: number) => void;
  onChangeOption: (active: number) => void;
}

export interface PaginationProps {
  total: number;
  perPage: number;
  currentPage?: number;
  onPageChange: (currentPage: number) => void;
}

export interface ItemsProps {
  activePage: number;
  itemsPerPage: number;
  total: string[];
}
