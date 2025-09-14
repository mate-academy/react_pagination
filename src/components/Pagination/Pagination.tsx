import React from 'react';

interface PaginationProps {
  total: number;
  perPage: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  total,
  perPage,
  currentPage = 1,
  onPageChange,
}) => {
  const pagesCount = Math.ceil(total / perPage);
  const hasPages = pagesCount > 0;
  const isFirst = !hasPages || currentPage === 1;
  const isLast = !hasPages || currentPage === pagesCount;

  const pages: number[] = Array.from({ length: pagesCount }, (_, i) => i + 1);

  const goTo = (page: number) => {
    if (!hasPages) {
      return;
    }

    if (page < 1 || page > pagesCount) {
      return;
    }

    if (page === currentPage) {
      return;
    }

    onPageChange(page);
  };

  return (
    <ul className="pagination">
      <li className={`page-item ${isFirst ? 'disabled' : ''}`}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={isFirst}
          onClick={e => {
            e.preventDefault();
            goTo(currentPage - 1);
          }}
        >
          «
        </a>
      </li>

      {pages.map(page => (
        <li
          key={page}
          className={`page-item ${page === currentPage ? 'active' : ''}`}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${page}`}
            onClick={e => {
              e.preventDefault();
              goTo(page);
            }}
          >
            {page}
          </a>
        </li>
      ))}

      <li className={`page-item ${isLast ? 'disabled' : ''}`}>
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={isLast}
          onClick={e => {
            e.preventDefault();
            goTo(currentPage + 1);
          }}
        >
          »
        </a>
      </li>
    </ul>
  );
};
