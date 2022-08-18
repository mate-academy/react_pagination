import React from 'react';
import cn from 'classnames';
import { getNumbers } from '../../utils';

type Props = {
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange: (newPage: number) => void
};

export const Pagination:React.FC<Props> = (props) => {
  const {
    total,
    perPage,
    currentPage,
    onPageChange,
  } = props;

  const lastPaginationItem = Math.ceil(total / perPage);
  const paginationItems = getNumbers(1, lastPaginationItem);
  const firstPaginationItemStatus = currentPage === 1;
  const lastPaginationItemStatus = currentPage === lastPaginationItem;

  return (
    <ul className="pagination">
      <li className={cn('page-item', { disabled: firstPaginationItemStatus })}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={firstPaginationItemStatus}
          onClick={() => onPageChange(currentPage - 1)}
        >
          «
        </a>
      </li>
      {paginationItems.map(item => (
        <li
          key={item}
          className={cn('page-item', { active: item === currentPage })}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${item}`}
            onClick={() => onPageChange(item)}
          >
            {item}
          </a>
        </li>
      ))}
      <li className={cn('page-item', { disabled: lastPaginationItemStatus })}>
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={lastPaginationItemStatus}
          onClick={() => onPageChange(currentPage + 1)}
        >
          »
        </a>
      </li>
    </ul>
  );
};
