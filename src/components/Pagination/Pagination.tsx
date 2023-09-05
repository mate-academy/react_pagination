import cn from 'classnames';
import React from 'react';
import { getNumbers } from '../../utils';

type Props = {
  total: number
  perPage: number
  currentPage: number
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const pagesCount = Math.ceil(total / perPage);
  const pages = getNumbers(1, pagesCount);
  const currentPageIsFirst = currentPage === 1;
  const currentPageIsLast = currentPage === pagesCount;

  const handlePrevPage = () => {
    if (!currentPageIsFirst) {
      onPageChange(currentPage - 1);
    }
  };

  const handlePageChange = (page: number) => {
    if (page !== currentPage) {
      onPageChange(page);
    }
  };

  const handleNextPage = () => {
    if (!currentPageIsLast) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <ul className="pagination">
      <li className={cn('page-item', { disabled: currentPageIsFirst })}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPageIsFirst}
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
            onClick={() => handlePageChange(page)}
          >
            {page}
          </a>
        </li>
      ))}
      <li className={cn('page-item', { disabled: currentPageIsLast })}>
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPageIsLast}
          onClick={handleNextPage}
        >
          »
        </a>
      </li>
    </ul>
  );
};
