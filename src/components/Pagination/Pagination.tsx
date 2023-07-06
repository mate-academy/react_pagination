import React from 'react';
import cn from 'classnames';
import { getNumbers } from '../../utils';

type Props = {
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange: (page: number) => void
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const pagesCount: number = Math.ceil(total / perPage);
  const pages = getNumbers(1, pagesCount);

  return (
    <ul className="pagination">
      <li className={cn('page-item', {
        disabled: currentPage === 1,
      })}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          «
        </a>
      </li>
      {pages.map(page => (
        <li className={cn('page-item', {
          active: page === currentPage,
        })}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href="#1"
            onClick={() => onPageChange(page)}
          >
            {page}
          </a>
        </li>
      ))}
      <li className={cn('page-item', {
        disabled: currentPage === pagesCount,
      })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === pagesCount}
          onClick={() => onPageChange(currentPage + 1)}
        >
          »
        </a>
      </li>
    </ul>
  );
};
