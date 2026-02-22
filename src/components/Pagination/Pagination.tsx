// import { useState } from 'react';
import { getNumbers } from '../../utils';

interface PaginationType {
  total: number;
  perPage: number;
  currentPage?: number;
  onPageChange: (value: number) => void;
}

export const Pagination = ({
  total,
  perPage,
  currentPage = 1,
  onPageChange,
}: PaginationType) => {
  const lastPageNumber = Math.ceil(total / perPage);
  const countOfPages = getNumbers(1, Math.ceil(total / perPage));

  return (
    <>
      <ul className="pagination">
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={currentPage === 1 ? 'true' : 'false'}
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

        {countOfPages.map(item => (
          <li
            className={`page-item ${item === currentPage ? 'active' : ''}`}
            key={item}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href="#1"
              onClick={e => {
                e.preventDefault();

                if (item !== currentPage) {
                  onPageChange(item);
                }
              }}
            >
              {item}
            </a>
          </li>
        ))}

        <li
          className={`page-item ${currentPage === lastPageNumber ? 'disabled' : ''}`}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPage === lastPageNumber ? 'true' : 'false'}
            onClick={e => {
              e.preventDefault();

              if (currentPage < lastPageNumber) {
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
