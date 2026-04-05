import React from 'react';
import { getNumbers } from '../../utils';
import cn from 'classnames';

interface PaginationInterface {
  total: number;
  currentPerPage: number;
  activePage: number;
  onPageChange(page: number): void;
}

export const Pagination: React.FC<PaginationInterface> = ({
  total,
  currentPerPage,
  activePage,
  onPageChange,
}) => {
  const pages = Math.ceil(total / currentPerPage);

  return (
    <ul className="pagination">
      <li className={cn('page-item', activePage === 1 && 'disabled')}>
        <a
          data-cy="prevLink"
          className="page-link"
          href={`?page=${activePage > 1 ? activePage - 1 : activePage}&perPage=${currentPerPage}`}
          aria-disabled={activePage === 1}
          onClick={e => {
            e.preventDefault();
            onPageChange(Math.max(1, activePage - 1));
          }}
        >
          «
        </a>
      </li>
      {getNumbers(1, pages).map(n => {
        return (
          <li className={cn('page-item', activePage === n && 'active')} key={n}>
            <a
              data-cy="pageLink"
              className="page-link"
              href={`?page=${n}&perPage=${currentPerPage}`}
              onClick={e => {
                e.preventDefault();
                onPageChange(n);
              }}
            >
              {n}
            </a>
          </li>
        );
      })}
      <li className={cn('page-item', activePage === pages && 'disabled')}>
        <a
          data-cy="nextLink"
          className="page-link"
          href={`?page=${activePage < pages ? activePage + 1 : activePage}&perPage=${currentPerPage}`}
          aria-disabled={activePage === pages ? 'true' : 'false'}
          onClick={e => {
            e.preventDefault();
            onPageChange(Math.min(pages, activePage + 1));
          }}
        >
          »
        </a>
      </li>
    </ul>
  );
};
