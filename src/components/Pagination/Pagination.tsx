import React from 'react';
import cn from 'classnames';
import { getNumbers } from '../../utils';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange?: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange = () => {},
}) => {
  const totalPages = Math.ceil(total / perPage);

  return (
    <ul className="pagination">
      <li className={cn('page-item', { disabled: currentPage === 1 })}>
        <button
          type="button"
          data-cy="prevLink"
          className="page-link"
          aria-disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage > 1 ? currentPage - 1 : 1)}
        >
          «
        </button>
      </li>
      {getNumbers(1, totalPages).map(p => (
        <li
          className={cn('page-item', { active: currentPage === p })}
          key={p}
        >
          <button
            type="button"
            data-cy="pageLink"
            className="page-link"
            onClick={() => onPageChange(p)}
          >
            {p}
          </button>
        </li>
      ))}
      <li className={cn('page-item', { disabled: currentPage === totalPages })}>
        <button
          type="button"
          data-cy="nextLink"
          className="page-link"
          aria-disabled={currentPage === totalPages}
          onClick={() => onPageChange(
            currentPage < totalPages
              ? currentPage + 1
              : totalPages,
          )}
        >
          »
        </button>
      </li>
    </ul>
  );
};

Pagination.defaultProps = {
  onPageChange: () => {},
};
