import cn from 'classnames';
import React from 'react';
import { getNumbers } from '../../utils';

type Props = {
  total: number;
  onPageChange: (value: number) => void;
  perPage: number;
  currentPage: number;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  onPageChange,
  currentPage,
}) => {
  const lastPage = Math.ceil(total / perPage);
  const pages = getNumbers(1, lastPage);
  const currentPageIsFirst = currentPage === 1;
  const currentPageIsLast = currentPage === lastPage;

  const handlePrevPage = () => {
    if (!currentPageIsFirst) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (!currentPageIsLast) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageChange = (page: number) => {
    if (page !== currentPage) {
      onPageChange(page);
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
          key={page}
          className={cn('page-item', { active: page === currentPage })}
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
