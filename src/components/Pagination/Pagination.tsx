import React from 'react';
import { getNumbers } from '../../utils';
import cn from 'classnames';

type Props = {
  total: number;
  perPage: number;
  currectPage: number;
  onPageChange: (value: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currectPage,
  onPageChange,
}) => {
  const pagesCount = Math.ceil(total / perPage);
  const pages = getNumbers(1, pagesCount);

  function isFirst(page: number) {
    return page === 1;
  }

  function isLast(page: number) {
    return page === pagesCount;
  }

  return (
    <ul className="pagination">
      <li className={cn('page-item', { disabled: isFirst(currectPage) })}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={isFirst(currectPage)}
          onClick={() => !isFirst(currectPage) && onPageChange(currectPage - 1)}
        >
          «
        </a>
      </li>
      {pages.map((page: number) => (
        <li
          key={page}
          className={cn('page-item', {
            active: page === currectPage,
          })}
        >
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
      <li className={cn('page-item', { disabled: isLast(currectPage) })}>
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={isLast(currectPage)}
          onClick={() => !isLast(currectPage) && onPageChange(currectPage + 1)}
        >
          »
        </a>
      </li>
    </ul>
  );
};
