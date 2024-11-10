import React from 'react';
import cn from 'classnames';
import { PaginationProps } from '../../types/PaginationProps';

export const Pagination: React.FC<PaginationProps> = ({
  total,
  perPage,
  currentPage,
  onChangePage,
}: PaginationProps) => {
  const totalPage = Math.ceil(total / perPage);

  const getPages = (totals: number) => {
    const pages: number[] = [];

    for (let i = 1; i <= totals; i++) {
      pages.push(i);
    }

    return pages;
  };

  const pages = getPages(totalPage);

  return (
    <ul className="pagination">
      <li className={cn('page-item', { disabled: currentPage === 1 })}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          onClick={() => currentPage > 1 && onChangePage(currentPage - 1)}
          aria-disabled={currentPage === 1}
        >
          «
        </a>
      </li>
      {pages.map(page => (
        <li
          className={cn('page-item', { active: currentPage === page })}
          key={page}
          onClick={() => onChangePage(page)}
        >
          <a data-cy="pageLink" className="page-link" href={`#${page}`}>
            {page}
          </a>
        </li>
      ))}
      <li
        className={cn('page-item', {
          disabled: currentPage === pages.length,
        })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          onClick={() =>
            currentPage < pages.length && onChangePage(currentPage + 1)
          }
          aria-disabled={currentPage === pages.length}
        >
          »
        </a>
      </li>
    </ul>
  );
};
