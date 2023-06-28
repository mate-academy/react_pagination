import React from 'react';
import { getNumbers } from '../../utils';

interface Props {
  currentPage: number;
  nextPage: number;
  total: number;
  onPageChange: (page: number) => void;
  perPage: number;
}

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  nextPage,
  onPageChange,
}) => {
  const lastPage = Math.ceil(total / perPage);
  const numberPages = getNumbers(1, lastPage);
  const isPrevLinkDisabled = currentPage === 1;
  const isNextLinkDisabled = currentPage === lastPage;

  return (
    <ul className="pagination">
      <li className={`page-item ${isPrevLinkDisabled ? 'disabled' : ''}`}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={isPrevLinkDisabled}
          onClick={() => onPageChange(perPage)}
        >
          «
        </a>
      </li>
      {numberPages.map((page) => (
        <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
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
      <li className={`page-item ${isNextLinkDisabled ? 'disabled' : ''}`}>
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={nextPage === 0}
          onClick={() => onPageChange(nextPage)}
        >
          »
        </a>
      </li>
    </ul>
  );
};
