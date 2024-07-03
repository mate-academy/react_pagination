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

  const selectedPerPage = perPageParam ? +perPageParam : initialPerPage;

  const currentPage = useMemo(() => {
    const totalPages = Math.ceil(totalItems / selectedPerPage);
    const currentPageCandidate = pageParam ? +pageParam : initialPage;

    return currentPageCandidate > totalPages
      ? totalPages
      : currentPageCandidate;
  }, [selectedPerPage, totalItems, pageParam]);

  const itemsToShow = useMemo(() => {
    const idxFrom = currentPage * selectedPerPage - selectedPerPage;
    const idxToCandidate = idxFrom + selectedPerPage - 1;
    const isLastItems = idxToCandidate > totalItems;
    const idxTo = isLastItems ? totalItems : idxToCandidate;

    return {
      showFrom: idxFrom + 1,
      showTo: isLastItems ? idxTo : idxTo + 1,
      itemsToShow: items.filter((_v, idx) => idx >= idxFrom && idx <= idxTo),
    };
  }, [currentPage, selectedPerPage]);

  const onPageChange = (page: number) => {
    searchParams.set('page', String(page));
    setSearchParams(searchParams);
  };

  const onPerPageChange = (selected: string) => {
    searchParams.set('perPage', selected);
    searchParams.set('page', '1');
    setSearchParams(searchParams);
  };

  return {
    ...itemsToShow,
    currentPage,
    selectedPerPage,
    totalItems,
    onPageChange,
    onPerPageChange,
  };
};
