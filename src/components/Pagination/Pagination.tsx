import React from 'react';
import { getNumbers } from '../../utils';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const pagesNumber = Math.ceil(total / perPage);

  const paginated = getNumbers(1, pagesNumber);

  const handleNextPage = () => {
    if (currentPage !== pagesNumber) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage !== 1) {
      onPageChange(currentPage - 1);
    }
  };

  return (
    <ul className="pagination">
      <li className={currentPage === 1 ? 'page-item disabled' : ''}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1}
          onClick={handlePrevPage}
        >
          «
        </a>
      </li>
      {paginated.map(page => (
        <li
          key={page}
          className={currentPage === page ? 'page-item active' : ''}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${page}`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </a>
        </li>
      ))}
      <li className={
        currentPage === pagesNumber
          ? 'page-item disabled'
          : ''
      }
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === pagesNumber}
          onClick={handleNextPage}
        >
          »
        </a>
      </li>
    </ul>
  );
};
