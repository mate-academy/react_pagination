import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  perPage: number;
  onPageChange: (page: number) => void;
  onPerPageChange: (perPage: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalItems,
  perPage,
  onPageChange,
  onPerPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / perPage);
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  const handlePerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onPerPageChange(Number(e.target.value));
    onPageChange(1); // Reset to first page when changing per-page
  };

  const renderPageButtons = () => {
    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    if (startPage > 1) {
      pages.push(
        <button
          key={1}
          type="button"
          className="button pagination-button"
          onClick={() => handlePageChange(1)}
          disabled={isFirstPage}
          data-cy="page-1"
        >
          1
        </button>,
      );
      if (startPage > 2) {
        pages.push(
          <span key="ellipsis-start" className="pagination-ellipsis">
            ...
          </span>,
        );
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          type="button"
          className={`button pagination-button ${i === currentPage ? 'is-primary' : ''}`}
          onClick={() => handlePageChange(i)}
          disabled={i === currentPage}
          data-cy={`page-${i}`}
        >
          {i}
        </button>,
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(
          <span key="ellipsis-end" className="pagination-ellipsis">
            ...
          </span>,
        );
      }

      pages.push(
        <button
          key={totalPages}
          type="button"
          className="button pagination-button"
          onClick={() => handlePageChange(totalPages)}
          disabled={isLastPage}
          data-cy={`page-${totalPages}`}
        >
          {totalPages}
        </button>,
      );
    }

    return pages;
  };

  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav
      className="pagination is-centered"
      role="navigation"
      aria-label="pagination"
    >
      <button
        type="button"
        className="button pagination-previous"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={isFirstPage}
        data-cy="previous-page"
      >
        Previous
      </button>
      <button
        type="button"
        className="button pagination-next"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={isLastPage}
        data-cy="next-page"
      >
        Next
      </button>
      <ul className="pagination-list">{renderPageButtons()}</ul>
      <div className="pagination-per-page">
        <label htmlFor="perPageSelector" className="label">
          Items per page:
        </label>
        <div className="select">
          <select
            id="perPageSelector"
            value={perPage}
            onChange={handlePerPageChange}
            data-cy="perPageSelector"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
        </div>
      </div>
    </nav>
  );
};

export default Pagination;
