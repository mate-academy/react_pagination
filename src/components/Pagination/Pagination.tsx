import React from 'react';

type Props = {
  total: number;
  perPage: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage = 1,
  onPageChange,
}) => {
  const totalPages = Math.ceil(total / perPage);

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const isFirst = currentPage === 1;
  const isLast = currentPage === totalPages;

  return (
    <ul className="pagination">
      {/* PREV */}
      <li className={`page-item ${isFirst ? 'disabled' : ''}`}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={isFirst}
          onClick={e => {
            e.preventDefault();
            if (!isFirst) {
              onPageChange(currentPage - 1);
            }
          }}
        >
          «
        </a>
      </li>

      {/* PAGES */}
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
              if (page !== currentPage) {
                onPageChange(page);
              }
            }}
          >
            {page}
          </a>
        </li>
      ))}

      {/* NEXT */}
      <li className={`page-item ${isLast ? 'disabled' : ''}`}>
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={isLast}
          onClick={e => {
            e.preventDefault();
            if (!isLast) {
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
