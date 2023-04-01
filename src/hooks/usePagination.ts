import { ChangeEvent, useState } from 'react';
import {
  defaultCurrentPage,
  defaultItemsPerPage,
  items,
} from '../utils/constants';

export const usePagination = () => {
  const [itemsPerPage, setItemsPerPage] = useState(defaultItemsPerPage);
  const [currentPage, setCurrentPage] = useState(defaultCurrentPage);

  const total = items.length;
  const firstItemIndex = (currentPage - 1) * itemsPerPage;
  const lastItemIndex = currentPage * itemsPerPage < total
    ? currentPage * itemsPerPage
    : total;
  const selectedItems = items.slice(firstItemIndex, lastItemIndex);

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
    total,
    selectedItems,
    onPageChange,
    onSelectChange,
    firstItemIndex,
    lastItemIndex,
  };
};
