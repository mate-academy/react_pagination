import React from 'react';
import { getNumbers } from '../../utils';

interface Props {
  total: number;
  perPage: number;
  currentPage?: number;
  onPageChange(currentPage: number): void;
}

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage = 1,
  onPageChange,
}) => {
  const pagesCount = Math.ceil(total / perPage);
  const pages = getNumbers(1, pagesCount);

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === pagesCount;

  return (
    <ul className="pagination">
      <li className={`page-item ${isFirstPage ? 'disabled' : ''}`}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={isFirstPage}
          onClick={e => {
            e.preventDefault();
            if (!isFirstPage) {
              onPageChange(currentPage - 1);
            }
          }}
        >
          «
        </a>
      </li>
      {pages.map(num => {
        return (
          <li
            className={`page-item ${num === currentPage ? 'active' : ''}`}
            key={num}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${num}`}
              onClick={e => {
                e.preventDefault();
                if (num !== currentPage) {
                  onPageChange(num);
                }
              }}
            >
              {num}
            </a>
          </li>
        );
      })}

      <li className={`page-item ${isLastPage ? 'disabled' : ''}`}>
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={isLastPage}
          onClick={e => {
            e.preventDefault();
            if (!isLastPage) {
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
