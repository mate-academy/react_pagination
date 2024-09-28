import React, { useMemo } from 'react';
import { getNumbers } from '../../utils';
import cn from 'classnames';

interface Props {
  perPage: number;
  total: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<Props> = ({
  perPage,
  total,
  currentPage,
  onPageChange,
}) => {
  const pagesList = useMemo(() => {
    return getNumbers(1, Math.ceil(total / perPage));
  }, [total, perPage]);

  const prevOrNextPageClick = useMemo(() => {
    return (direction: 'prev' | 'next') => {
      if (direction === 'prev' && currentPage > 1) {
        onPageChange(currentPage - 1);
      } else if (direction === 'next' && currentPage < pagesList.length) {
        onPageChange(currentPage + 1);
      }
    };
  }, [currentPage, pagesList.length, onPageChange]);

  return (
    <ul className="pagination">
      <li className={cn('page-item', { disabled: currentPage === 1 })}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1}
          onClick={() => prevOrNextPageClick('prev')}
        >
          «
        </a>
      </li>
      {pagesList.map(page => (
        <li
          key={page}
          className={cn('page-item', {
            active: page === currentPage,
          })}
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
          disabled: currentPage === pagesList.length,
        })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === pagesList.length}
          onClick={() => prevOrNextPageClick('next')}
        >
          »
        </a>
      </li>
    </ul>
  );
};
