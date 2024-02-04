import React from 'react';
import cn from 'classnames';
import { getNumbers } from '../../utils';

type Props = {
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange: (page: number) => void,
};

export const Pagination: React.FC<Props> = (
  {
    total,
    perPage,
    currentPage,
    onPageChange,
  },
) => {
  const pageQnty = total % perPage === 0
    ? total / perPage
    : Math.round(total / perPage + 1);

  return (
    <ul className="pagination">
      <li
        className={cn('page-item', {
          disabled: currentPage === 1,
        })}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1 ? 'true' : 'false'}
          onClick={() => {
            if (currentPage - 1 > 0) {
              onPageChange(currentPage - 1);
            }
          }}
        >
          «
        </a>
      </li>
      {getNumbers(1, pageQnty).map(n => (
        <li
          className={cn('page-item', {
            active: n === currentPage,
          })}
          key={n}
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
      <li
        className={cn('page-item', {
          disabled: currentPage === pageQnty,
        })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === pageQnty ? 'true' : 'false'}
          onClick={() => {
            if (currentPage + 1 <= pageQnty) {
              onPageChange(currentPage + 1);
            }
          }}
        >
          »
        </a>
      </li>
    </ul>
  );
};
