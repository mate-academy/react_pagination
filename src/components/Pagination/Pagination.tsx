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

  const handlePageChange = (page: number) => {
    let newPage = page;

    if (newPage < 1) {
      newPage = 1;
    } else if (newPage > totalPages) {
      newPage = totalPages;
    }

    onPageChange(newPage);
  };

  return (
    <ul className="pagination">
      <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
        <button
          data-cy="prevLink"
          className="page-link"
          onClick={() => handlePageChange(currentPage - 1)}
          aria-disabled={currentPage === 1}
          disabled={currentPage === 1}
        >
          «
        </button>
      </li>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
        <li
          key={page}
          className={`page-item ${currentPage === page ? 'active' : ''}`}
        >
          <button
            data-cy="pageLink"
            className="page-link"
            onClick={() => handlePageChange(page)}
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
          onClick={() => handlePageChange(currentPage + 1)}
          aria-disabled={currentPage === totalPages}
          disabled={currentPage === totalPages}
        >
          »
        </button>
      </li>
    </ul>
  );
};
