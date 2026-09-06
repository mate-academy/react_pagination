import React from 'react';
import { PaginationInterface } from '../../types/pagination';

export const Pagination = ({
  total,
  perPage,
  currentPage = 1,
  onPageChange,
}: PaginationInterface) => {
  const totalPages = Math.ceil(total / perPage);

  const pages = Array.from({ length: totalPages }, (_, idx) => idx + 1);

  const isPrevDisabled = currentPage === 1;
  const isNextDisabled = currentPage === totalPages;

  return (
    <ul className="pagination">
      <li className={isPrevDisabled ? 'disabled' : ''}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={isPrevDisabled}
          onClick={() => {
            if (!isPrevDisabled) {
              onPageChange(currentPage - 1);
            }
          }}
        >
          «
        </a>
      </li>

      {pages.map(page => (
        <li className={page === currentPage ? 'active' : ''} key={page}>
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${page}`}
            onClick={() => {
              if (page !== currentPage) {
                onPageChange(page);
              }
            }}
          >
            {page}
          </a>
        </li>
      ))}

      <li className={isNextDisabled ? 'disabled' : ''}>
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={isNextDisabled}
          onClick={() => {
            if (!isNextDisabled) {
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
