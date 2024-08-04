import React from 'react';
import cn from 'classnames';
import { getNumbers } from '../../utils';
import { SearchParams } from '../../types/SearchParams';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: ({ page, perPage }: SearchParams) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const pages = getNumbers(1, total);

  return (
    <ul className="pagination">
      <li className={cn('page-item', { disabled: currentPage === 1 })}>
        <a
          data-cy="prevLink"
          className="page-link"
          aria-disabled={currentPage === 1}
          onClick={() => {
            if (currentPage > 1) {
              onPageChange({
                page: `${currentPage - 1}`,
                perPage: `${perPage}`,
              });
            }
          }}
        >
          «
        </a>
      </li>
      {pages.map(pageNumber => (
        <li
          className={cn('page-item', { active: currentPage === pageNumber })}
          key={pageNumber}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            onClick={e => {
              e.preventDefault();
              if (currentPage !== pageNumber) {
                onPageChange({
                  page: `${pageNumber}`,
                  perPage: `${perPage}`,
                });
              }
            }}
          >
            {pageNumber}
          </a>
        </li>
      ))}
      <li className={cn('page-item', { disabled: currentPage === total })}>
        <a
          data-cy="nextLink"
          className="page-link"
          aria-disabled={currentPage === total}
          onClick={() => {
            if (currentPage < total) {
              onPageChange({
                page: `${currentPage + 1}`,
                perPage: `${perPage}`,
              });
            }
          }}
        >
          »
        </a>
      </li>
    </ul>
  );
};
