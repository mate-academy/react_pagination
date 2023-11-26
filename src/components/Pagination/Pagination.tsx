import React from 'react';
import cn from 'classnames';
import { getNumbers } from '../../utils';

type Props = {
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange: (page: number) => void,
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const pagesCount = Math.ceil(total / perPage);
  const pages = getNumbers(1, pagesCount);
  const isCurrentPageFirst = currentPage === 1;
  const isCurrentPageLast = currentPage === pagesCount;

  const handlePrevPage = () => {
    if (!isCurrentPageFirst) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (!isCurrentPageLast) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePage = (page: number) => {
    if (page !== currentPage) {
      onPageChange(page);
    }
  };

  return (
    <ul className="pagination">
      <li className={cn('page-item', { disabled: isCurrentPageFirst })}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={isCurrentPageFirst}
          onClick={handlePrevPage}
        >
          «
        </a>
      </li>

      {pages.map(page => (
        <li
          className={cn('page-item', { active: page === currentPage })}
          key={page}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${page}`}
            onClick={() => handlePage(page)}
          >
            {page}
          </a>
        </li>
      ))}
      <li className={cn('page-item', { disabled: isCurrentPageLast })}>
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={isCurrentPageLast}
          onClick={handleNextPage}
        >
          »
        </a>
      </li>
    </ul>
  );
};
