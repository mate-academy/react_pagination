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

  const isPrevDisabled = currentPage === 1;
  const isNextDisabled = currentPage === totalPages;

  return (
    <ul className="pagination">
      <li className={`page-item ${isPrevDisabled ? 'disabled' : ''}`}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={isPrevDisabled}
          onClick={e => {
            e.preventDefault();
            if (isPrevDisabled) return;
            onPageChange(currentPage - 1);
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
              if (page === currentPage) return;
              onPageChange(page);
            }}
          >
            {page}
          </a>
        </li>
      ))}

      <li className={`page-item ${isNextDisabled ? 'disabled' : ''}`}>
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={isNextDisabled}
          onClick={e => {
            e.preventDefault();
            if (isNextDisabled) return;
            onPageChange(currentPage + 1);
          }}
        >
          »
        </a>
      </li>
    </ul>
  );
};
