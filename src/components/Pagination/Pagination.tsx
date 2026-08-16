import React from 'react';
import cn from 'classnames';
import { getNumbers } from '../../utils';

interface PaginationProps {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = (
  props: PaginationProps,
) => {
  const { total, perPage, currentPage = 1, onPageChange } = props;

  const totalPages = Math.ceil(total / perPage);
  const pages = getNumbers(1, totalPages);

  return (
    <ul className="pagination">
      <li className={cn('page-item', { disabled: currentPage === 1 })}>
        <a
          className="page-link"
          data-cy="prevLink"
          aria-disabled={currentPage === 1 ? 'true' : 'false'}
          onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        >
          «
        </a>
      </li>
      {pages.map(page => (
        <li
          key={page}
          className={cn(`page-item`, { active: page === currentPage })}
        >
          <a
            className="page-link"
            data-cy="pageLink"
            onClick={() => onPageChange(page)}
          >
            {page}
          </a>
        </li>
      ))}
      <li className={cn('page-item', { disabled: currentPage === totalPages })}>
        <a
          className="page-link"
          data-cy="nextLink"
          aria-disabled={currentPage === totalPages ? 'true' : 'false'}
          onClick={() =>
            currentPage < totalPages && onPageChange(currentPage + 1)
          }
        >
          »
        </a>
      </li>
    </ul>
  );
};
