import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export function getNumbers(from: number, to: number): number[] {
  const numbers = [];

  for (let n = from; n <= to; n += 1) {
    numbers.push(n);
  }

  return numbers;
}

export const usePagination = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const query = new URLSearchParams(location.search);
  const pageFromUrl = query.get('page') || '1';
  const perPageFromUrl = query.get('perPage') || '5';

  const [itemsPerPage, setItemsPerPage] = useState(Number(perPageFromUrl));
  const [currentPage, setCurrentPage] = useState(Number(pageFromUrl));

  const startItem = (currentPage - 1) * itemsPerPage;
  const endItem = startItem + itemsPerPage;

  const changeOnSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newPerPage = Number(event.target.value);

    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1);
    navigate(`?page=1&perPage=${newPerPage}`);
  };

  const onPageChange = (page: number) => {
    setCurrentPage(page);
    navigate(`?page=${page}&perPage=${itemsPerPage}`);
  };

  return {
    itemsPerPage,
    currentPage,
    startItem,
    endItem,
    changeOnSelect,
    onPageChange,
  };
};
