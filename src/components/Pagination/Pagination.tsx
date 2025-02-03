import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Link } from 'react-router-dom';

interface PaginationProps {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(total / perPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <ul className="pagination">
      <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
        <Link
          data-cy="prevLink"
          className="page-link"
          to={`?page=${currentPage - 1}&perPage=${perPage}`}
          aria-disabled={currentPage === 1}
          onClick={e => {
            // eslint-disable-next-line brace-style
            if (currentPage === 1) {
              e.preventDefault();
              // eslint-disable-next-line prettier/prettier, brace-style
            } else {
              onPageChange(currentPage - 1);
            }
          }}
        >
          «
        </Link>
      </li>

      {pageNumbers.map(page => (
        <li
          key={page}
          className={`page-item ${page === currentPage ? 'active' : ''}`}
        >
          <Link
            data-cy="pageLink"
            className="page-link"
            to={`?page=${page}&perPage=${perPage}`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </Link>
        </li>
      ))}

      <li
        className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}
      >
        <Link
          data-cy="nextLink"
          className="page-link"
          to={`?page=${currentPage + 1}&perPage=${perPage}`}
          aria-disabled={currentPage === totalPages}
          onClick={e => {
            // eslint-disable-next-line curly
            if (currentPage === totalPages) e.preventDefault();
            // eslint-disable-next-line curly
            else onPageChange(currentPage + 1);
          }}
        >
          »
        </Link>
      </li>
    </ul>
  );
};
