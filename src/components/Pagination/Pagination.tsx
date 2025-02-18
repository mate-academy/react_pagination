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
  const totalPages: number = Math.ceil(total / perPage);
  const pageNumbers: number[] = Array.from(
    { length: totalPages },
    (_, i) => i + 1,
  );
  let page = currentPage;

  if (page > pageNumbers.length || page <= 0) {
    page = 1;
  }

  return (
    <ul className="pagination">
      <li className={`page-item${page === 1 ? ' disabled' : ''}`}>
        <a
          data-cy="prevLink"
          className="page-link"
          aria-disabled={page === 1}
          href="#prev"
          onClick={() => {
            if (page > 1) {
              onPageChange(page - 1);
            }
          }}
        >
          «
        </a>
      </li>

      {pageNumbers.map(p => (
        <li className={`page-item${p === page ? ' active' : ''}`} key={p}>
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${p}`}
            onClick={() => onPageChange(p)}
          >
            {p}
          </a>
        </li>
      ))}

      <li
        className={`page-item${page === pageNumbers.length ? ' disabled' : ''}`}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          aria-disabled={page === pageNumbers.length}
          href="#next"
          onClick={() => {
            if (page !== pageNumbers.length) {
              onPageChange(page + 1);
            }
          }}
        >
          »
        </a>
      </li>
    </ul>
  );
};
