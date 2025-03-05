import React from 'react';
import { getPages } from '../../utils';
import cn from 'classnames';

interface PaginationProps {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const pages = getPages(perPage, total);
  const disableFirstArrow = currentPage === 1;
  const disableLastArrow = currentPage === pages.length;

  return (
    <ul className="pagination">
      <li className={cn('page-item', { disabled: disableFirstArrow })}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={disableFirstArrow}
          onClick={() => {
            if (!disableFirstArrow) {
              onPageChange(currentPage - 1);
            }
          }}
        >
          «
        </a>
      </li>

      {pages.map(page => (
        <li
          key={page}
          className={cn('page-item', {
            active: currentPage === page,
          })}
        >
          <a
            data-cy="pageLink"
            href={`#${page}`}
            className="page-link"
            onClick={() => onPageChange(page)}
          >
            {page}
          </a>
        </li>
      ))}

      <li className={cn('page-item', { disabled: disableLastArrow })}>
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={disableLastArrow}
          onClick={() => {
            if (!disableLastArrow) {
              onPageChange(currentPage + 1);
            }
          }}
        >
          »
        </a>
      </li>
    </ul>
  );
};
