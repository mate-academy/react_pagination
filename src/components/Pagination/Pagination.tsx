import React from 'react';

interface PaginationProps {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(total / perPage);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <ul className="pagination">
      <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1}
          onClick={() => {
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

      <li
        className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === totalPages}
          onClick={e => {
            e.preventDefault();
            if (currentPage < totalPages) {
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

{
  /* <li
        className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}
      >
        <a data-cy="nextLink" className="page-link" href="#next">
          2
        </a>
      </li>

      <li className="page-item">
        <a data-cy="pageLink" className="page-link" href="#3">
          3
        </a>
      </li>

      <li className="page-item">
        <a data-cy="pageLink" className="page-link" href="#4">
          4
        </a>
      </li>

      <li className="page-item">
        <a data-cy="pageLink" className="page-link" href="#5">
          5
        </a>
      </li>

      <li className="page-item">
        <a data-cy="pageLink" className="page-link" href="#6">
          6
        </a>
      </li>

      <li className="page-item">
        <a data-cy="pageLink" className="page-link" href="#7">
          7
        </a>
      </li>

      <li className="page-item">
        <a data-cy="pageLink" className="page-link" href="#8">
          8
        </a>
      </li>

      <li className="page-item">
        <a data-cy="pageLink" className="page-link" href="#9">
          9
        </a>
      </li> */
}
