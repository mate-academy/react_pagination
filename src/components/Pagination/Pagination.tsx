import React from 'react';
import cn from 'classnames';
import { getNumbers } from '../../utils';

interface Props {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (changedPage: number) => void;
}

export const Pagination: React.FC<Props> = ({
  total = 9,
  perPage = 5,
  currentPage = 1,
  onPageChange,
}) => {
  const qtyBookmarks = Math.ceil(total / perPage);
  const pages: number[] = getNumbers(1, qtyBookmarks)
    .map(n => n);

  return (
    <ul className="pagination">
      <li
        className={cn('page-item', {
          disabled: currentPage === 1,
        })}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1}
          onClick={() => ((currentPage > 1)
            && onPageChange(currentPage - 1))}
        >
          «
        </a>
      </li>
      {pages.map((page) => {
        return (
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
        );
      })}
      <li className={cn('page-item', {
        disabled: currentPage === pages.length,
      })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === pages.length}
          onClick={() => (currentPage < pages.length)
            && onPageChange(currentPage + 1)}
        >
          »
        </a>
      </li>
    </ul>
  );
};
