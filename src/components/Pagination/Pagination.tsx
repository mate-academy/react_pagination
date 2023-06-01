import React from 'react';

interface PaginationProps {
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange: (page: number) => void,
}

export const Pagination: React.FC<PaginationProps> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const pagesAmount = Math.ceil(total / perPage);
  const pages: number[] = [];

  for (let i = 1; i <= pagesAmount; i += 1) {
    pages.push(i);
  }

  return (
    <ul className="pagination">
      <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1}
          onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        >
          «
        </a>
      </li>

      {pages.map((page) => {
        const pageCheck = currentPage === page;

        return (
          <li
            className={`page-item ${pageCheck ? 'active' : ''}`}
            key={page}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${page}`}
              aria-disabled={pageCheck}
              onClick={() => page !== currentPage && onPageChange(page)}
            >
              {page}
            </a>
          </li>
        );
      })}

      <li className={`page-item ${currentPage === pagesAmount ? 'disabled' : ''}`}>
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === pagesAmount}
          onClick={() => (
            currentPage < pagesAmount && onPageChange(currentPage + 1)
          )}
        >
          »
        </a>
      </li>
    </ul>
  );
};
