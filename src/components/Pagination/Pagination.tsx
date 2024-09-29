import React, { useCallback } from 'react';

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

  const handlePageClick = useCallback((page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  }, [onPageChange, totalPages]);

  const handlePrevClick = useCallback(() => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  }, [currentPage, onPageChange]);

  // Функція для кліку на наступну сторінку
  const handleNextClick = useCallback(() => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  }, [currentPage, onPageChange, totalPages]);

  return (
    <ul className="pagination">
      <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
        <button
          className="page-link"
          data-cy="prevLink"
          aria-disabled={currentPage === 1} // Додаємо aria-disabled
          onClick={handlePrevClick}
          disabled={currentPage === 1}
        >
          «
        </button>
      </li>

      {Array.from({ length: totalPages }, (_, index) => (
        <li
          key={index}
          className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
        >
          <button
            className="page-link"
            data-cy="pageLink"
            onClick={() => handlePageClick(index + 1)}
          >
            {index + 1}
          </button>
        </li>
      ))}

      <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
        <button
          className="page-link"
          data-cy="nextLink"
          aria-disabled={currentPage === totalPages} // Додаємо aria-disabled
          onClick={handleNextClick}
          disabled={currentPage === totalPages}
        >
          »
        </button>
      </li>
    </ul>
  );
};
