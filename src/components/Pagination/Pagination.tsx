import React from 'react';
import { getNumbers } from '../../utils';

interface PaginationProps {
  total: number;
  perPage: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  total,
  perPage,
  currentPage = 1,
  onPageChange,
}) => {
  const numbOfPages = Math.max(1, Math.ceil(total / perPage));
  const current = Math.min(Math.max(1, currentPage), numbOfPages);

  const pages = getNumbers(1, numbOfPages);

  const isFirstPage = current === 1;
  const isLastPage = current === numbOfPages;

  return (
    <>
      <ul className="pagination">
        <li className={`page-item ${isFirstPage ? 'disabled' : ''}`}>
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={isFirstPage}
            onClick={event => {
              event.preventDefault();

              if (!isFirstPage) {
                onPageChange(current - 1);
              }
            }}
          >
            «
          </a>
        </li>

        {pages.map(page => (
          <li
            key={page}
            className={`page-item ${current === page ? 'active' : ''}`}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${page}`}
              onClick={event => {
                event.preventDefault();

                if (page !== current) {
                  onPageChange(page);
                }
              }}
            >
              {page}
            </a>
          </li>
        ))}
        <li className={`page-item ${isLastPage ? 'disabled' : ''}`}>
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={isLastPage}
            onClick={event => {
              event.preventDefault();

              if (!isLastPage) {
                onPageChange(current + 1);
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
