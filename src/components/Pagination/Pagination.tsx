import React from 'react';
import cn from 'classnames';
import { getNumbers } from '../../utils';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  return (
    <ul className="pagination">
      <li className={cn(
        'page-item',
        { disabled: currentPage === 1 },
      )}
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

      {getNumbers(1, Math.ceil(total / perPage))
        .map((n: number) => (
          <li
            key={n}
            className={cn(
              'page-item',
              { active: n === currentPage },
            )}
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

      <li className={cn(
        'page-item',
        { disabled: currentPage === Math.ceil(total / perPage) },
      )}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === Math.ceil(total / perPage)}
          onClick={() => onPageChange(currentPage + 1)}
        >
          »
        </a>
      </li>
    </ul>
  );
};
