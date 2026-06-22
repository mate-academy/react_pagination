import React from 'react';
import cn from 'classnames';
import { getNumbers } from '../../utils';

interface PaginationType {
  total: number;
  perPage: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({
  total,
  perPage,
  currentPage = 1,
  onPageChange,
}: PaginationType) => {
  const pages = getNumbers(1, Math.ceil(total / perPage));

  return (
    <>
      <ul className="pagination">
        <li className={cn(`page-item ${currentPage === 1 ? `disabled` : ``}`)}>
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
        {pages.map(page => (
          <li
            key={page}
            className={cn(`page-item ${currentPage === page ? 'active' : ''}`)}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${page}`}
              onClick={e => {
                e.preventDefault();

                if (page !== currentPage) {
                  onPageChange(page);
                }
              }}
            >
              {page}
            </a>
          </li>
        ))}

        <li
          className={cn(
            `page-item ${currentPage === pages.length ? `disabled` : ``}`,
          )}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPage === pages.length}
            onClick={e => {
              e.preventDefault();

              if (currentPage < pages.length) {
                onPageChange(currentPage + 1);
              }
            }}
          >
            »
          </a>
        </li>
      </ul>
    </>
  );
};
