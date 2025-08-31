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

  const handlePageChange = (page: number) => {
    if (page !== currentPage && page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <ul className="pagination">
      <li
        className={`page-item ${currentPage === 1 || totalPages === 0 ? 'disabled' : ''}`}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1 || totalPages === 0}
          onClick={e => {
            e.preventDefault();
            handlePageChange(currentPage - 1);
          }}
        >
          «
        </a>
      </li>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
        <li
          key={page}
          className={`page-item ${currentPage === page ? 'active' : ''}`}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${page}`}
            onClick={e => {
              e.preventDefault();
              handlePageChange(page);
            }}
          >
            {page}
          </a>
        </li>
      ))}

      <li
        className={`page-item ${
          currentPage === totalPages || totalPages === 0 ? 'disabled' : ''
        }`}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === totalPages || totalPages === 0}
          onClick={e => {
            e.preventDefault();
            handlePageChange(currentPage + 1);
          }}
        >
          »
        </a>
      </li>
    </ul>
  );
};
