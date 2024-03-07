import React from 'react';

interface PaginationProps {
  total: number;
  perPage: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  total,
  perPage,
  currentPage = 1,
  onPageChange,
}) => {
  const totalPages = Math.ceil(total / perPage);

  const handlePageChange = (page: number) => {
    if (page !== currentPage) {
      onPageChange(page);
    }
  };

  const renderPageLink = (page: number) => (
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
          handlePageChange(page);
        }}
      >
        {page}
      </a>
    </li>
  );

  const renderPageLinks = () =>
    Array.from({ length: totalPages }, (_, index) => index + 1).map(
      renderPageLink,
    );

  const handlePrevClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (currentPage !== 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const handleNextClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (currentPage !== totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  return (
    <ul className="pagination">
      {/* Previous Page Link */}
      <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1 ? 'true' : 'false'}
          onClick={handlePrevClick}
        >
          «
        </a>
      </li>

      {/* Page Links */}
      {renderPageLinks()}

      {/* Next Page Link */}
      <li
        className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === totalPages ? 'true' : 'false'}
          onClick={handleNextClick}
        >
          »
        </a>
      </li>
    </ul>
  );
};

export default Pagination;
