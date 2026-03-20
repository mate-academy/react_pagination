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

  const change = (page: number) => {
    if (page !== currentPage) {
      onPageChange(page);
    }
  };

  const prevDisabled = currentPage === 1;
  const nextDisabled = currentPage === totalPages;

  return (
    <ul className="pagination">
      <li className={`page-item ${prevDisabled ? 'disabled' : ''}`}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={prevDisabled}
          onClick={e => {
            e.preventDefault();
            if (!prevDisabled) {
              change(currentPage - 1);
            }
          }}
        >
          «
        </a>
      </li>

      {pages.map(p => (
        <li
          key={p}
          className={`page-item ${p === currentPage ? 'active' : ''}`}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${p}`}
            onClick={e => {
              e.preventDefault();
              change(p);
            }}
          >
            {p}
          </a>
        </li>
      ))}

      <li className={`page-item ${nextDisabled ? 'disabled' : ''}`}>
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={nextDisabled}
          onClick={e => {
            e.preventDefault();
            if (!nextDisabled) {
              change(currentPage + 1);
            }
          }}
        >
          »
        </a>
      </li>
    </ul>
  );
};
