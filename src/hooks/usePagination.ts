import { ChangeEvent, useState } from 'react';

interface UsePaginationProps<T> {
  defaultCurrentPage: number;
  defaultItemsPerPage: number;
  elements: T[];
}

export const usePagination = <T>({
  defaultCurrentPage,
  defaultItemsPerPage,
  elements,
}: UsePaginationProps<T>) => {
  const [itemsPerPage, setItemsPerPage] = useState(defaultItemsPerPage);
  const [currentPage, setCurrentPage] = useState(defaultCurrentPage);

  const firstItemIndex = (currentPage - 1) * itemsPerPage;
  const lastItemOnPageIndex = currentPage * itemsPerPage;
  const lastItemIndex = lastItemOnPageIndex < elements.length
    ? lastItemOnPageIndex
    : elements.length;
  const selectedItems = elements.slice(firstItemIndex, lastItemIndex);

  const onSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(+event.currentTarget.value);
    setCurrentPage(defaultCurrentPage);
  };

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  return {
    currentPage,
    itemsPerPage,
    selectedItems,
    onPageChange,
    onSelectChange,
    firstItemIndex,
    lastItemIndex,
    elements,
  };
};
