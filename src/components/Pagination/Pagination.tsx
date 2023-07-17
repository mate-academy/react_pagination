import React from 'react';
import cn from 'classnames';

import { getNumbers } from '../../utils';

interface Props {
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange: (n: number) => void
}

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(total / perPage);

  const prevPageHandler = () => (
    currentPage !== 1 && onPageChange(currentPage - 1)
  );

  const nextPageHandler = () => (
    currentPage !== totalPages && onPageChange(currentPage + 1)
  );

  return (
    <ul className="pagination">
      <li className={cn('page-item', { disabled: currentPage === 1 })}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1}
          onClick={prevPageHandler}
        >
          «
        </a>
      </li>
      {getNumbers(1, totalPages).map(n => (
        <li
          key={n}
          className={cn('page-item', { active: n === currentPage })}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${n}`}
            onClick={() => onPageChange(n)}
          >
            {n}
          </a>
        </li>
      ))}
      <li className={cn('page-item', { disabled: currentPage === totalPages })}>
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === totalPages}
          onClick={nextPageHandler}
        >
          »
        </a>
      </li>
    </ul>
  );
};
