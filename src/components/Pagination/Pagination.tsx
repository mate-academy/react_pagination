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
  const pageCount = Math.ceil(total / perPage);

  return (
    <ul className="pagination">
      <li className={cn('page-item', { disabled: currentPage <= 1 })}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage <= 1}
          onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        >
          «
        </a>
      </li>

      {getNumbers(1, pageCount).map(page => (
        <li
          className={cn('page-item', { active: page === currentPage })}
          key={page}
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

      <li className={cn('page-item', { disabled: currentPage >= pageCount })}>
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage >= pageCount}
          onClick={() =>
            currentPage < pageCount && onPageChange(currentPage + 1)
          }
        >
          »
        </a>
      </li>
    </ul>
  );
};
