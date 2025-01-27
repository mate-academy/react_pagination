/* eslint-disable prettier/prettier */
import React from 'react';

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
  onPageChange
}) => {
  const pageCount = Math.ceil(total / perPage);
  const pages = Array.from({ length: pageCount }, (_, i) => i + 1);

  const handlePageClick = (page: number) => {
    if (page !== currentPage) {
      onPageChange(page);
    }
  };

  return (
    <ul className="pagination">
      <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1}
          onClick={() => handlePageClick(currentPage - 1)}
        >
          «
        </a>
      </li>
      {pages.map(page => (
        <li key={page} className={`page-item ${page === currentPage ? 'active' : ''}`}>
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${page}`}
            onClick={() => handlePageClick(page)}
          >
            {page}
          </a>
        </li>
      ))}
      <li className={`page-item ${currentPage === pageCount ? 'disabled' : ''}`}>
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === pageCount}
          onClick={() => handlePageClick(currentPage + 1)}
        >
          »
        </a>
      </li>
    </ul>
  );
};

