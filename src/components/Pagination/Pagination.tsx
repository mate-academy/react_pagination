import React from 'react';

interface Props {
  total: number;
  currentPage: number;
  onPageChange: (pageNumber: number) => void;
}

export const Pagination: React.FC<Props> = ({
  total,
  currentPage,
  onPageChange,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= total; i += 1) {
    pageNumbers.push(i);
  }

  const handlePrevClick = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < total) {
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
          aria-disabled={currentPage === 1 ? 'true' : 'false'}
          onClick={handlePrevClick}
        >
          «
        </a>
      </li>
      {pageNumbers.map((pageNumber) => (
        <li key={pageNumber} className={`page-item ${pageNumber === currentPage ? 'active' : ''}`}>
          <a
            data-cy={`pageLink-${pageNumber}`}
            className="page-link"
            href={`#page-${pageNumber}`}
            aria-disabled="false"
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </a>
        </li>
      ))}
      <li className={`page-item ${currentPage === total ? 'disabled' : ''}`}>
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === total ? 'true' : 'false'}
          onClick={handleNextClick}
        >
          »
        </a>
      </li>
    </ul>
  );
};
