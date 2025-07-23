import React from 'react';
import cn from 'classnames';

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
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === pageCount;

  return (
    <ul className="pagination">
      <li className={cn('page-item', { disabled: isFirstPage })}>
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
      {pages.map(page => (
        <li
          key={page}
          className={cn('page-item', { active: currentPage === page })}
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
      <li className={cn('page-item', { disabled: isLastPage })}>
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
