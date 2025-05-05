import React from 'react';
import { PaginationProps } from './index';

export const Pagination: React.FC<PaginationProps> = ({
  total,
  perPage,
  onPageChange,
  currentPage = 1,
}) => {
  const totalPages = Math.ceil(total / perPage);
  const pages: number[] = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLUListElement>) => {
    if (e.key === 'ArrowRight' && currentPage < totalPages) {
      onPageChange(currentPage + 1);
    } else if (e.key === 'ArrowLeft' && currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handlePrevClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick =
    (page: number) => (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      onPageChange(page);
    };

  return (
    <div>
      <ul className="pagination" onKeyDown={handleKeyDown} tabIndex={0}>
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <a
            data-cy="prevLink"
            aria-disabled={currentPage === 1 ? 'true' : 'false'}
            className="page-link"
            href="#prev"
            onClick={handlePrevClick}
          >
            «
          </a>
        </li>

        {pages.map(page => (
          <li
            key={page}
            className={`page-item ${currentPage === page ? 'active' : ''}`}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${page}`}
              onClick={handlePageClick(page)}
            >
              {page}
            </a>
          </li>
        ))}

        <li
          className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}
        >
          <a
            data-cy="nextLink"
            aria-disabled={currentPage === totalPages ? 'true' : 'false'}
            className="page-link"
            href="#next"
            onClick={handleNextClick}
          >
            »
          </a>
        </li>
      </ul>
    </div>
  );
};
