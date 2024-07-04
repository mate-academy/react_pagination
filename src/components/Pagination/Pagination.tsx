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
  const pagesCount: number = Math.ceil(total / perPage);
  const pages: number[] = getNumbers(1, pagesCount);

  const changePage = (page: number) => {
    if (page === currentPage || page <= 0 || page > pagesCount) {
      return;
    }

    onPageChange(page);
  };

  return (
    <ul className="pagination">
      <li className={cn('page-item', { disabled: currentPage === 1 })}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1}
          onClick={() => changePage(currentPage - 1)}
        >
          «
        </a>
      </li>
      {pages.map(item => (
        <li
          className={cn('page-item', { active: item === currentPage })}
          key={item}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${item}`}
            onClick={() => changePage(item)}
          >
            {item}
          </a>
        </li>
      ))}

      <li className={cn('page-item', { disabled: currentPage === pagesCount })}>
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === pagesCount}
          onClick={() => changePage(currentPage + 1)}
        >
          »
        </a>
      </li>
    </ul>
  );
};
