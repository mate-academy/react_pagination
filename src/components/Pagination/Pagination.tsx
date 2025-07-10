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
  const pages = Math.ceil(total / perPage);
  const pageNumbers = Array.from({ length: pages }, (_, i) => i + 1);

  return (
    <ul className="pagination">
      <li className="page-item">
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          onClick={() => {
            if (currentPage > 1) {
              onPageChange(currentPage - 1);
            }
          }}
        >
          «
        </a>
      </li>

      {pageNumbers.map(page => (
        <li
          className={`page-item ${currentPage === page ? 'active' : ''}`}
          key={page}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${page}`}
            onClick={() => {
              onPageChange(page);
            }}
          >
            {page}
          </a>
        </li>
      ))}

      <li className="page-item">
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          onClick={() => {
            if (currentPage < pages) {
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
