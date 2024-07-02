import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

interface Props {
  items: string[];
}

export const usePagination = ({ items }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialPage = 1;
  const initialPerPage = 5;

  const totalItems = items.length;
  const pageParam = searchParams.get('page');
  const perPageParam = searchParams.get('perPage');

  const currentPage = pageParam ? +pageParam : initialPage;
  const selectedPerPage = perPageParam ? +perPageParam : initialPerPage;

  const itemsToShow = useMemo(() => {
    const idxFrom = currentPage * selectedPerPage - selectedPerPage;
    const idxTo = idxFrom + selectedPerPage - 1;

    return items.filter((_v, idx) => idx >= idxFrom && idx <= idxTo);
  }, [currentPage, selectedPerPage]);

  const onPageChange = (page: number) => {
    searchParams.set('page', String(page));
    setSearchParams(searchParams);
  };

  const onPerPageChange = (selected: string) => {
    searchParams.set('perPage', selected);
    setSearchParams(searchParams);
  };

  return {
    currentPage,
    selectedPerPage,
    itemsToShow,
    totalItems,
    onPageChange,
    onPerPageChange,
  };
};
