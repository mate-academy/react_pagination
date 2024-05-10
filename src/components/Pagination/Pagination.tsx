import React from 'react';
import cn from 'classnames';
import { PaginationProps } from '../../types';

export const Pagination: React.FC<PaginationProps> = ({
  total,
  perPage,
  currentPage = 1,
  onPageChange,
}) => {
  const pagesToRender = Math.ceil(total / perPage);
  const arrayOfPages: number[] = Array.from(
    { length: pagesToRender },
    (_, i) => i + 1,
  );

  return (
    <ul className="pagination">
      <li
        className={cn('page-item', { disabled: currentPage === 1 })}
        onClick={() =>
          currentPage !== 1 ? onPageChange(currentPage - 1) : null
        }
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1 ? true : false}
        >
          «
        </a>
      </li>
      {arrayOfPages.map((page: number) => (
        <li
          className={cn('page-item', { active: page === currentPage })}
          key={page}
          onClick={() => onPageChange(page)}
        >
          <a data-cy="pageLink" className="page-link" href={`#${page}`}>
            {page}
          </a>
        </li>
      ))}
      <li
        className={cn('page-item', { disabled: currentPage === pagesToRender })}
        onClick={() =>
          currentPage !== arrayOfPages[arrayOfPages.length - 1]
            ? onPageChange(currentPage + 1)
            : null
        }
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={
            currentPage === arrayOfPages[arrayOfPages.length - 1] ? true : false
          }
        >
          »
        </a>
      </li>
    </ul>
  );
};
