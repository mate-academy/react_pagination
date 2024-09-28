import React from 'react';
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
  const pagesList: number[] = getNumbers(1, Math.ceil(total / perPage));

  return (
    <ul className="pagination">
      <li className={cn('page-item', { disabled: currentPage === 1 })}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1}
          onClick={
            currentPage === 1 ? undefined : () => onPageChange(currentPage - 1)
          }
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
          onClick={
            currentPage === pagesList.length
              ? undefined
              : () => onPageChange(currentPage + 1)
          }
        >
          »
        </a>
      </li>
    </ul>
  );
};
