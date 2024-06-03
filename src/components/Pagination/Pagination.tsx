import React from 'react';
import { getNumbers } from '../../utils';

interface Props {
  itemsPerPage: number;
  currentPage: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  onPrevPage: () => void;
  onNextPage: () => void;
}

export const Pagination: React.FC<Props> = ({
  itemsPerPage,
  currentPage,
  totalItems,
  onPageChange,
  onPrevPage,
  onNextPage,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const pageNumbers = getNumbers(1, totalPages);

  return (
    <ul className="pagination">
      <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
        <button
          data-cy="prevLink"
          className="page-link"
          aria-disabled={currentPage === 1}
          onClick={currentPage === 1 ? undefined : onPrevPage}
          disabled={currentPage === 1}
        >
          «
        </button>
      </li>

      {pageNumbers.map(page => (
        <li
          key={page}
          className={`page-item ${currentPage === page ? 'active' : ''}`}
        >
          <button
            data-cy="pageLink"
            className="page-link"
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        </li>
      ))}
      <li
        className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}
      >
        <button
          data-cy="nextLink"
          className="page-link"
          aria-disabled={currentPage === totalPages}
          onClick={currentPage === totalPages ? undefined : onNextPage}
          disabled={currentPage === totalPages}
        >
          »
        </button>
      </li>
    </ul>
  );
};
