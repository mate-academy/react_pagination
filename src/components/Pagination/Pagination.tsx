import React from 'react';
import { getNumbers } from '../../utils';

type Props = {
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange: (page: number) => void,
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = getNumbers(1, Math.ceil(total / perPage)).map(n => n);

  return (
    <ul className="pagination">
      <li
        className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1}
          onClick={() => currentPage > 1
            && onPageChange(currentPage - 1)}
        >
          «
        </a>
      </li>
      {totalPages.map(page => (
        <li
          className={`page-item ${page === currentPage ? 'active' : ''}`}
          key={page}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${page}`}
            onClick={() => {
              if (currentPage !== page) {
                onPageChange(page);
              }
            }}
          >
            {page}
          </a>
        </li>
      ))}

      <li
        className={`page-item ${currentPage === totalPages.length ? 'disabled' : ''}`}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === totalPages.length}
          onClick={() => currentPage < totalPages.length
            && onPageChange(currentPage + 1)}
        >
          »
        </a>
      </li>
    </ul>
  );
};
