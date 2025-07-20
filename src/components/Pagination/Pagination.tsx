import React from 'react';

type PaginationProps = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<PaginationProps> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(total / perPage);

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <ul className="pagination">
      <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
        <button
          data-cy="prevLink"
          className="page-link"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          aria-disabled={currentPage === 1}
        >
          «
        </button>
      </li>

      {pages.map(page => (
        <li
          key={page}
          className={`page-item ${page === currentPage ? 'active' : ''}`}
        >
          <button
            data-cy="pageLink"
            className="page-link"
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        </li>
      ))}

      <li
        className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}
      >
        <button
          data-cy="nextLink"
          className="page-link"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-disabled={currentPage === totalPages}
        >
          »
        </button>
      </li>
    </ul>
  );
};
