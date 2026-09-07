import React from 'react';
import { getNumbers } from '../../utils';

type Props = {
  total: number;
  perPage: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage = 1,
  onPageChange,
}) => {
  const lastPage = Math.ceil(total / perPage);
  const pages = getNumbers(1, lastPage);

  const handleClick = (page: number) => {
    if (page >= 1 && page <= lastPage && page !== currentPage) {
      onPageChange(page);
    }
  };

  return (
    <ul className="pagination">
      <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1}
          onClick={(e) => {
            e.preventDefault();
            handleClick(currentPage - 1);
          }}
        >
          «
        </a>
      </li>

      {pages.map(page => (
        <li
          key={page}
          className={`page-item ${page === currentPage ? 'active' : ''}`}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${page}`}
            onClick={(e) => {
              e.preventDefault();
              handleClick(page);
            }}
          >
            {page}
          </a>
        </li>
      ))}

      <li className={`page-item ${currentPage === lastPage ? 'disabled' : ''}`}>
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === lastPage}
          onClick={(e) => {
            e.preventDefault();
            handleClick(currentPage + 1);
          }}
        >
          »
        </a>
      </li>
    </ul>
  );
};
