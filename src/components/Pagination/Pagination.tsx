import React from 'react';

interface PaginationProps {
  total: number;
  currentPage: number;
  perPage: number;
  onPageChange: (pageNumber: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  total = 42,
  currentPage,
  perPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(total / perPage);
  const pageNumbers = Array.from({ length: totalPages },
    (_, index) => index + 1);

  const handlePrevPage = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <ul className="pagination">
      <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          onClick={handlePrevPage}
          aria-disabled={currentPage === 1}
        >
          «
        </a>
      </li>

      {pageNumbers.map((pageNumber) => (
        <li
          key={pageNumber}
          className={`page-item ${pageNumber === currentPage ? 'active' : ''}`}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${pageNumber}`}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </a>
        </li>
      ))}

      <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          onClick={handleNextPage}
          aria-disabled={currentPage === totalPages}
        >
          »
        </a>
      </li>
    </ul>
  );
};
