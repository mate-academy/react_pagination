import React from 'react';

import { PaginationProps } from '../../types/Pagination';
import { getNumbers, defaultValuePage } from '../../utils';

import cn from 'classnames';

export const Pagination: React.FC<PaginationProps> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const resultPageCount = Math.ceil(total / perPage);
  const pageCount = getNumbers(1, resultPageCount);

  return (
    <ul className="pagination">
      <li
        className={cn('page-item', {
          disabled: currentPage === defaultValuePage,
        })}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          onClick={() => onPageChange(currentPage - 1)}
          href="#prev"
          aria-disabled={`${currentPage === 1 && 'true'}`}
        >
          «
        </a>
      </li>
      {pageCount.map(value => (
        <li
          onClick={() => onPageChange(value)}
          key={value}
          className={cn('page-item', {
            active: value === currentPage,
          })}
        >
          <a data-cy="pageLink" className="page-link" href={`#${value}`}>
            {value}
          </a>
        </li>
      ))}
      <li
        className={cn('page-item', {
          disabled: currentPage === pageCount.length,
        })}
      >
        <a
          onClick={() => onPageChange(currentPage + 1)}
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={`${currentPage === pageCount.length && 'true'}`}
        >
          »
        </a>
      </li>
    </ul>
  );
};
