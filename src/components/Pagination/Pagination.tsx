import React from 'react';
import { getNumbers } from '../../utils';

type Props = {
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange: (page: number) => void,
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = getNumbers(1, Math.ceil(total / perPage));

  const handlePrevClick = () => currentPage > 1
  && onPageChange(currentPage - 1);

  const handleNextClick = () => currentPage < totalPages.length
  && onPageChange(currentPage + 1);

  const handlePageClick = (page: number) => {
    if (currentPage !== page) {
      onPageChange(page);
    }
  };

  return (
    <ul className="pagination">
      <li
        className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1}
          onClick={handlePrevClick}
        >
          «
        </a>
      </li>
      {totalPages.map(page => (
        <li
          className={`page-item ${page === currentPage ? 'active' : ''}`}
          key={page}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${page}`}
            onClick={() => handlePageClick(page)}
          >
            {page}
          </a>
        </li>
      ))}

      <li
        className={`page-item ${currentPage === totalPages.length ? 'disabled' : ''}`}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === totalPages.length}
          onClick={handleNextClick}
        >
          »
        </a>
      </li>
    </ul>
  );
};
