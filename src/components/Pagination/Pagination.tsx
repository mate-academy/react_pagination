import React from 'react';
import cn from 'classnames';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(total / perPage);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const isPreviousPageDisabled = currentPage <= 1;
  const isNextPageDisabled = currentPage >= totalPages;

  const handlePageChange = (page: number) => {
    if (page !== currentPage) {
      onPageChange(page);
    }
  };

  const handleSetPreviousPage = () => {
    if (!isPreviousPageDisabled) {
      onPageChange(currentPage - 1);
    }
  };

  const handleSetNextPage = () => {
    if (!isNextPageDisabled) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <ul className="pagination">
      <li
        className={cn('page-item', { disabled: isPreviousPageDisabled })}
        onClick={handleSetPreviousPage}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={isPreviousPageDisabled}
        >
          «
        </a>
      </li>
      {pages.map(page => (
        <li
          key={page}
          className={cn('page-item', { active: page === currentPage })}
          onClick={() => handlePageChange(page)}
        >
          <a data-cy="pageLink" className="page-link" href={`#${page}`}>
            {page}
          </a>
        </li>
      ))}
      <li
        className={cn('page-item', { disabled: isNextPageDisabled })}
        onClick={handleSetNextPage}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={isNextPageDisabled}
        >
          »
        </a>
      </li>
    </ul>
  );
};
