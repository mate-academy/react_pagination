import React from 'react';
import cn from 'classnames';

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
  const pages = getNumbers(1, Math.ceil(total / perPage));

  return (
    <ul className="pagination">
      <li className={cn('page-item', {
        disabled: pages.indexOf(currentPage) === 0,
      })}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={pages.indexOf(currentPage) === 0}
          onClick={() => {
            if (pages.indexOf(currentPage) !== 0) {
              onPageChange(currentPage - 1);
            }
          }}
        >
          «
        </a>
      </li>

      {pages.map(page => (
        <li key={page} className={`page-item ${currentPage === page && 'active'}`}>
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

      <li className={cn('page-item', {
        disabled: pages.indexOf(currentPage) === pages.length - 1,
      })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={pages.indexOf(currentPage) === pages.length - 1}
          onClick={() => {
            if (pages.indexOf(currentPage) !== pages.length - 1) {
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
