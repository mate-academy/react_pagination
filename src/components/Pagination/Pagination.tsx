import React from 'react';

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageClick = (page: number) => {
    if (page >= 1 && page <= totalPages) {
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
          onClick={() => handlePageClick(currentPage - 1)}
          aria-disabled={currentPage === 1}
        >
          «
        </a>
      </li>
      {[...Array(totalPages)].map((_, index) => (
        <li
          key={index}
          className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${index + 1}`}
            onClick={() => handlePageClick(index + 1)}
          >
            {index + 1}
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
          onClick={() => handlePageClick(currentPage + 1)}
          aria-disabled={currentPage === totalPages}
        >
          »
        </a>
      </li>
    </ul>
  );
};
