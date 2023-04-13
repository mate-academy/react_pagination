import { useCallback } from 'react';

import cn from 'classnames';

type Props = {
  total: string[],
  currentPage: number,
  perPage: number,
  onPageChange: (value: number) => void | number,
};

export const Pagination: React.FC<Props> = ({
  total, currentPage, perPage, onPageChange,
}) => {
  const end = Math.ceil(total.length / perPage);

  const displayPagination = useCallback((units: string[], currPage: number) => {
    const pages = [];

    // eslint-disable-next-line no-plusplus
    for (let i = 1; i <= end; i++) {
      pages.push(
        <li
          key={units[i]}
          className={cn('page-item', { active: currPage === i })}
        >
          <a
            href={`#${i}`}
            data-cy="pageLink"
            className="page-link"
            onClick={() => onPageChange(i)}
          >
            {i}
          </a>
        </li>,
      );
    }

    return pages;
  }, [end, onPageChange, total]);

  const displayItems = useCallback((
    units: string[], forPage: number, currPage: number,
  ) => {
    const startIndex = (currPage - 1) * forPage;
    const endIndex = startIndex + forPage;

    return units.slice(startIndex, endIndex).map(unit => (
      <li key={unit} data-cy="item">
        {unit}
      </li>
    ));
  }, []);

  const handleMoveBack = useCallback((currPage) => {
    onPageChange(currPage > 1 ? currPage - 1 : 1);
  }, []);

  const handleMoveForward = useCallback((currPage) => {
    onPageChange(currPage < end ? currPage + 1 : end);
  }, []);

  return (
    <>
      <ul className="pagination">
        <li className={cn('page-item', { disabled: currentPage === 1 })}>
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={currentPage === 1}
            onClick={() => handleMoveBack(currentPage)}
          >
            «
          </a>
        </li>

        {displayPagination(total, currentPage)}

        <li className={cn('page-item', { disabled: currentPage === end })}>
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPage === end}
            onClick={() => handleMoveForward(currentPage)}
          >
            »
          </a>
        </li>
      </ul>

      <ul>
        {displayItems(total, perPage, currentPage)}
      </ul>
    </>
  );
};
