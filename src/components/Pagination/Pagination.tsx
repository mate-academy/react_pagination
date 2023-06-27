import React from 'react';
import cn from 'classnames';
import { getNumbers } from '../../utils';

type Props = {
  total: number,
  perPage: number
  curentPage: number,
  onPageChange: (number: number) => void
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  curentPage,
  onPageChange,
}) => {
  const pageTotal = Math.ceil(total / perPage);
  const visiblePages = getNumbers(1, pageTotal);

  return (
    <ul className="pagination">
      <li className={cn('page-item', { disabled: curentPage === 1 })}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={curentPage === 1}
          onClick={() => {
            if (curentPage !== 1) {
              onPageChange(curentPage - 1);
            }
          }}
        >
          «
        </a>
      </li>
      {visiblePages.map(page => (
        <li className={cn('page-item', { active: page === curentPage })}>
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${page}`}
            onClick={() => (onPageChange(page))}
          >
            {page}
          </a>
        </li>
      ))}
      <li className={cn('page-item', { disabled: curentPage === pageTotal })}>
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={curentPage === pageTotal}
          onClick={() => {
            if (curentPage !== pageTotal) {
              onPageChange(curentPage + 1);
            }
          }}
        >
          »
        </a>
      </li>
    </ul>
  );
};
