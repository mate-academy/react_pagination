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
  currentPage = 1,
  onPageChange,
}) => {
  const totalPages = Math.ceil(total / perPage);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const handlePageChange = (page: number) => {
    if (page !== currentPage) {
      onPageChange(page);
    }
  };

  return (
    <ul className="pagination">
      <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1 ? 'true' : undefined} // Use 'undefined' for false instead of "false"
          onClick={e => {
            e.preventDefault();
            if (currentPage > 1) handlePageChange(currentPage - 1);
          }}
        >
          «
        </a>
      </li>
      {pages.map(page => (
        <li
          key={page}
          className={`page-item ${currentPage === page ? 'active' : ''}`}
        >
          <a
            data-cy={`pageLink${page}`}
            className="page-link"
            href={`#${page}`}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </a>
        </li>
      ))}
      <li
        className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1 ? 'true' : undefined} // Use 'undefined' for false instead of "false"
          onClick={e => {
            e.preventDefault();
            if (currentPage > 1) handlePageChange(currentPage + 1);
          }}
        >
          »
        </a>
      </li>
    </ul>
  );
};
