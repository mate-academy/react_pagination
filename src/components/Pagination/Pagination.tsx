interface PaginationProps {
  total: number;
  perPage: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
}

import * as React from 'react';

export const Pagination: React.FC<PaginationProps> = ({
  total,
  perPage,
  currentPage = 1,
  onPageChange,
}) => {
  const totalPages = Math.max(1, Math.ceil(total / perPage));

  // Generate array of page numbers
  const getPageNumbers = () => {
    const pages: number[] = [];

    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }

    return pages;
  };

  // Handle page navigation
  const handlePageClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    page: number,
  ) => {
    event.preventDefault();
    // Guard: do nothing if page is out of range or same as current
    if (page < 1 || page > totalPages || page === currentPage) {
      return;
    }

    onPageChange(page);
  };

  // Calculate current display range
  const startItem = (currentPage - 1) * perPage + 1;
  const endItem = Math.min(currentPage * perPage, total);

  return (
    <>
      <p className="lead" data-cy="info">
        Page {currentPage} (items {startItem} - {endItem} of {total})
      </p>

      <ul className="pagination">
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={currentPage === 1}
            onClick={e => handlePageClick(e, currentPage - 1)}
          >
            «
          </a>
        </li>

        {getPageNumbers().map(pageNum => (
          <li
            key={pageNum}
            className={`page-item ${pageNum === currentPage ? 'active' : ''}`}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${pageNum}`}
              onClick={e => handlePageClick(e, pageNum)}
            >
              {pageNum}
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
            onClick={e => handlePageClick(e, currentPage + 1)}
          >
            »
          </a>
        </li>
      </ul>
    </>
  );
};
