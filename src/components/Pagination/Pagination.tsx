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
  const totalPages = Math.max(1, Math.ceil(total / perPage));

  const goTo = (page: number) => {
    if (page !== currentPage && page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const isFirst = currentPage === 1;
  const isLast = currentPage === totalPages;

  const pages: number[] = [];
  for (let p = 1; p <= totalPages; p += 1) {
    pages.push(p);
  }

  return (
    <ul className="pagination">
      <li className={`page-item ${isFirst ? 'disabled' : ''}`}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={isFirst ? 'true' : 'false'}
          onClick={(e) => {
            e.preventDefault();
            if (!isFirst) {
              goTo(currentPage - 1);
            }
          }}
        >
          «
        </a>
      </li>

      {pages.map((page) => (
        <li
          key={page}
          className={`page-item ${page === currentPage ? 'active' : ''}`}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${page}`}
            onClick={(e) => {
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
          aria-disabled={isLast ? 'true' : 'false'}
          onClick={(e) => {
            e.preventDefault();
            if (!isLast) {
              goTo(currentPage + 1);
            }
          }}
        >
          »
        </a>
      </li>
    </ul>
  );
};
