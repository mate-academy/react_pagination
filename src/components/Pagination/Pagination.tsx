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
  const pageQuantity = Math.ceil(total / perPage);
  const pageList: number[] = getNumbers(1, pageQuantity).map(n => Number(n));
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === pageQuantity;

  return (
    <ul className="pagination">
      <li className={cn('page-item', { disabled: isFirstPage })}>
        <a
          data-cy="prevLink"
          className="page-link"
          href={`#${currentPage}`}
          aria-disabled={isFirstPage}
          onClick={() => {
            if (currentPage > 1) {
              onPageChange(currentPage - 1);
            }
          }}
        >
          «
        </a>
      </li>

      {pageList.map(page => (
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

      <li className={cn('page-item', { disabled: isLastPage })}>
        <a
          data-cy="nextLink"
          className="page-link"
          href={`#${currentPage}`}
          aria-disabled={isLastPage}
          onClick={() => {
            if (currentPage < pageQuantity) {
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
