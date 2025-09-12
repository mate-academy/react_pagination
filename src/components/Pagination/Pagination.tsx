import React from 'react';
import { getNumbers } from '../../utils';
import cn from 'classnames';

type Props = {
  total: number;
  perPage: number;
  currentPage?: number;
  onPageChange(page: number): void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage = 1,
  onPageChange,
}) => {
  const pages = perPage > 0 ? Math.ceil(total / perPage) : 0;

  return (
    <ul className="pagination">
      {/* Prev */}
      <li className={cn('page-item', { disabled: currentPage === 1 })}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1}
          onClick={e => {
            e.preventDefault();
            if (currentPage > 1) {
              onPageChange(currentPage - 1);
            }
          }}
        >
          «
        </a>
      </li>

      {/* Numbers */}
      {getNumbers(1, pages).map(num => (
        <li
          key={num}
          className={cn('page-item', { active: currentPage === num })}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${num}`}
            aria-disabled={currentPage === num}
            onClick={e => {
              e.preventDefault();
              if (num !== currentPage) {
                onPageChange(num);
              }
            }}
          >
            {num}
          </a>
        </li>
      ))}

      {/* Next */}
      <li className={cn('page-item', { disabled: currentPage === pages })}>
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === pages}
          onClick={e => {
            e.preventDefault();
            if (currentPage < pages) {
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
