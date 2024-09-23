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
  const totalPages = Math.ceil(total / perPage);

  return (
    <ul className="pagination">
      <li className={`page-item ${currentPage <= 1 ? 'disabled' : ''}`}>
        <a
          onClick={() => {
            if (currentPage > 1) {
              onPageChange(currentPage - 1);
            }
          }}
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage <= 1}
        >
          «
        </a>
      </li>

      {getNumbers(1, totalPages).map(page => (
        <li
          className={`page-item ${page === currentPage ? 'active' : ''} `}
          key={page}
        >
          <a
            onClick={() => {
              if (currentPage !== page) {
                onPageChange(page);
              }
            }}
            data-cy="pageLink"
            className="page-link"
            href="#1"
          >
            {page}
          </a>
        </li>
      ))}

      <li
        className={`page-item ${currentPage >= totalPages ? 'disabled' : ''}`}
      >
        <a
          onClick={() => {
            if (currentPage !== totalPages) {
              onPageChange(currentPage + 1);
            }
          }}
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage >= totalPages}
        >
          »
        </a>
      </li>
    </ul>
  );
};
