import React from 'react';
import { getNumbers } from '../../utils';

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
  const pagesArray = getNumbers(1, totalPages);

  return (
    <ul className="pagination">
      <li className={`page-item${currentPage === 1 ? ' disabled' : ''}`}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1 ? 'true' : 'false'}
          onClick={() =>
            currentPage !== 1 ? onPageChange(currentPage - 1) : null
          }
        >
          «
        </a>
      </li>
      {pagesArray.map((page: number) => (
        <li
          className={`page-item ${page === currentPage ? 'active' : ''}`}
          key={page}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${page}`}
            onClick={() => (currentPage !== page ? onPageChange(page) : null)}
          >
            {page}
          </a>
        </li>
      ))}
      <li
        className={`page-item ${currentPage === totalPages ? ' disabled' : ''}`}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === totalPages ? 'true' : 'false'}
          onClick={() =>
            currentPage !== totalPages ? onPageChange(currentPage + 1) : null
          }
        >
          »
        </a>
      </li>
    </ul>
  );
};
