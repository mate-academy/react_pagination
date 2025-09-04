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
  const pageCount = Math.ceil(total / perPage);
  const pages = getNumbers(1, pageCount);

  const handlePageClick = (page: number, e: React.MouseEvent) => {
    e.preventDefault();

    if (page >= 1 && page <= pageCount && page !== currentPage) {
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
          onClick={e => {
            if (currentPage > 1) {
              handlePageClick(currentPage - 1, e);
            } else {
              e.preventDefault();
            }
          }}
        >
          «
        </a>
      </li>
      {pages.map(page => (
        <li
          key={page}
          className={`page-item ${currentPage === page ? 'active' : ''}`}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${page}`}
            onClick={e => {
              handlePageClick(page, e);
            }}
          >
            {page}
          </a>
        </li>
      ))}
      <li
        className={`page-item ${currentPage === pageCount ? 'disabled' : ''}`}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === pageCount}
          onClick={e => {
            if (currentPage < pageCount) {
              handlePageClick(currentPage + 1, e);
            } else {
              e.preventDefault();
            }
          }}
        >
          »
        </a>
      </li>
    </ul>
  );
};
