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
  const pageCount = Math.ceil(total / perPage);

  const pages = [];

  for (let i = 1; i <= pageCount; i++) {
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
          onClick={event => {
            event.preventDefault();
            if (currentPage > 1) {
              onPageChange(currentPage - 1);
            }
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
            onClick={event => {
              event.preventDefault();
              onPageChange(page);
            }}
          >
            {page}
          </a>
        </li>
      ))}

      <li
        className={`page-item 
        ${currentPage === pageCount ? 'disabled' : ''}`}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === pageCount}
          onClick={event => {
            event.preventDefault();
            if (currentPage < pageCount) {
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
