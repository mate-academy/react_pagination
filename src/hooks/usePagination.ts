import { ChangeEvent, useState } from 'react';

interface UsePaginationProps<T extends unknown> {
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
  const lastItemIndex = currentPage * itemsPerPage < elements.length
    ? currentPage * itemsPerPage
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
