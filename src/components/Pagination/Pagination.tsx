import React from 'react';

type PaginationProps = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<PaginationProps> = ({
  total,
  perPage,
  currentPage = 1,
  onPageChange,
}) => {
  const totalPages = Math.ceil(total / perPage);

  const pageNumbers: number[] = [];

  for (let i = 1; i <= totalPages; i += 1) {
    pageNumbers.push(i);
  }

  const handlePrevClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
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
          onClick={handlePrevClick}
        >
          «
        </a>
      </li>

      {pageNumbers.map((page) => (
        <li
          key={page}
          className={`page-item 
            ${currentPage === page ? 'active' : ''}`}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${page}`}
            onClick={(e) => {
              e.preventDefault();
              onPageChange(page);
            }}
          >
            {page}
          </a>
        </li>
      ))}

      <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          onClick={handleNextClick}
        >
          »
        </a>
      </li>
    </ul>
  );
};

export default Pagination;
