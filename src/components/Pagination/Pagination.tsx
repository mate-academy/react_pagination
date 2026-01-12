import React from 'react';
import { PerPage } from '../../types/PerPage';

type Props = {
  total: number;
  perPage: PerPage;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const countPages = Math.ceil(total / perPage);
  const pages = Array.from({ length: countPages }, (_, ind) => ind + 1);

  const isPrevDisabled = currentPage === 1;
  const isNextDisabled = currentPage === countPages;

  return (
    <ul className="pagination">
      <li className={isPrevDisabled ? 'page-item disabled' : 'page-item'}>
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

      {pages.map(pageNumber => (
        <li
          key={pageNumber}
          className={
            currentPage === pageNumber ? 'page-item active' : 'page-item'
          }
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${pageNumber}`}
            onClick={() => {
              if (currentPage !== pageNumber) {
                onPageChange(pageNumber);
              }
            }}
          >
            {pageNumber}
          </a>
        </li>
      ))}

      <li
        className={
          currentPage === countPages ? 'page-item disabled' : 'page-item'
        }
      >
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
