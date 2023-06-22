import React from 'react';
import cn from 'classnames';
import { getNumbers } from '../../utils';

interface Props {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const pagesAmount = Math.ceil(total / perPage);

  const visiblePages = getNumbers(1, pagesAmount);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < pagesAmount) {
      onPageChange(currentPage + 1);
    }
  };

  const isSelectedPageFirst = currentPage === 1;
  const isSelectedPageLast = currentPage === pagesAmount;

  return (
    <ul className="pagination">
      <li
        className={cn('page-item', {
          disabled: isSelectedPageFirst,
        })}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={isSelectedPageFirst}
          onClick={handlePrevPage}
        >
          «
        </a>
      </li>
      {visiblePages.map((page) => (
        <li
          className={cn('page-item', {
            active: currentPage === page,
          })}
          key={page}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${page}`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </a>
        </li>
      ))}
      <li
        className={cn('page-item', {
          disabled: isSelectedPageLast,
        })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={isSelectedPageLast}
          onClick={handleNextPage}
        >
          »
        </a>
      </li>
    </ul>
  );
};
