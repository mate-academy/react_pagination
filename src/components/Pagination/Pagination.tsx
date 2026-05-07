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
  const pageCount = Math.ceil(total / perPage);
  const pages = getNumbers(1, pageCount);
  const isFirst = currentPage === 1;
  const isLast = currentPage === pageCount;

  return (
    <ul className="pagination">
      <li className={`page-item${isFirst ? ' disabled' : ''}`}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={isFirst ? 'true' : 'false'}
          onClick={e => {
            e.preventDefault();
            if (!isFirst) {
              onPageChange(currentPage - 1);
            }
          }}
        >
          «
        </a>
      </li>

      {pages.map(page => (
        <li
          key={page}
          className={`page-item${page === currentPage ? ' active' : ''}`}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${page}`}
            onClick={e => {
              e.preventDefault();
              if (page !== currentPage) {
                onPageChange(page);
              }
            }}
          >
            {page}
          </a>
        </li>
      ))}

      <li className={`page-item${isLast ? ' disabled' : ''}`}>
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={isLast ? 'true' : 'false'}
          onClick={e => {
            e.preventDefault();
            if (!isLast) {
              onPageChange(currentPage + 1);
            }
          }}
        >
          »
        </a>
      </li>
    </ul>
  );
};
