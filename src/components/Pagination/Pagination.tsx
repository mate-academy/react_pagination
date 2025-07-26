import React from 'react';
import { getNumbers } from '../../utils';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const pagination: number[] = getNumbers(1, Math.ceil(total / perPage));
  const firstPage: number = 1;
  const lastPage: number = pagination[pagination.length - 1];

  return (
    <ul className="pagination">
      <li
        className={
          currentPage === firstPage ? 'page-item disabled' : 'page-item'
        }
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === firstPage}
          onClick={event => {
            if (currentPage !== firstPage) {
              event.preventDefault();
              onPageChange(currentPage - 1);
            }
          }}
        >
          «
        </a>
      </li>
      {pagination.map(pageNumber => (
        <li
          key={pageNumber}
          className={
            pageNumber === currentPage ? 'page-item active' : 'page-item'
          }
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${pageNumber}`}
            onClick={event => {
              event.preventDefault();
              onPageChange(pageNumber);
            }}
          >
            {pageNumber}
          </a>
        </li>
      ))}
      <li
        className={
          currentPage === lastPage ? 'page-item disabled' : 'page-item'
        }
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === lastPage}
          onClick={event => {
            if (currentPage !== lastPage) {
              event.preventDefault();
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
