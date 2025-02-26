import React from 'react';
import { getNumbers } from '../../utils';
import cn from 'classnames';

interface PaginationInterface {
  total: number;
  perPage: number;
  activePage: number;
  setActivePage: React.Dispatch<React.SetStateAction<number>>;
  onPageChange(event: React.MouseEvent<HTMLAnchorElement>): void;
}

export const Pagination: React.FC<PaginationInterface> = ({
  total,
  perPage,
  activePage,
  setActivePage,
  onPageChange,
}) => {
  const pages = Math.ceil(total / perPage);

  return (
    <ul className="pagination">
      <li className={cn('page-item', activePage === 1 && 'disabled')}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={activePage === 1 ? 'true' : 'false'}
          onClick={() => {
            if (activePage > 1) {
              setActivePage(activePage - 1);
            }
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
              href={`#${n}`}
              onClick={onPageChange}
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
          href="#next"
          aria-disabled={activePage === pages ? 'true' : 'false'}
          onClick={() => {
            if (activePage < pages) {
              setActivePage(activePage + 1);
            }
          }}
        >
          »
        </a>
      </li>
    </ul>
  );
};
