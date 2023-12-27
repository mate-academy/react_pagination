import React from 'react';

interface Props {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(total / perPage);
  const firstPage = currentPage === 1;
  const lastPage = currentPage === totalPages;
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1,
  );

  const prevPage = () => {
    if (!firstPage) {
      onPageChange(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (!lastPage) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <ul className="pagination">
      <li
        className={
          `page-item ${firstPage ? 'disabled' : ''}`
        }
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={firstPage}
          onClick={prevPage}
        >
          «
        </a>
      </li>
      {pageNumbers.map(pageNumber => (
        <li
          key={pageNumber}
          className={
            `page-item ${currentPage === pageNumber ? 'active' : ''}`
          }
        >
          <a
            href={`#${pageNumber}`}
            data-cy="pageLink"
            className="page-link"
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </a>
        </li>
      ))}
      <li
        className={
          `page-item ${lastPage ? 'disabled' : ''}`
        }
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={lastPage}
          onClick={nextPage}
        >
          »
        </a>
      </li>
    </ul>
  );
};
