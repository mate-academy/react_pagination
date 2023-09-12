import cn from 'classnames';
import React from 'react';

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
  const pagesAmount = Math.ceil(total / perPage);
  const isFirstPageSelected = currentPage === 1;
  const isLastPageSelected = currentPage === pagesAmount;

  const getPageItemClass = (condition: boolean) => cn('page-item',
    { disabled: condition });

  return (
    <ul className="pagination">
      <li className={getPageItemClass(isFirstPageSelected)}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={isFirstPageSelected}
          onClick={() => !isFirstPageSelected && onPageChange(currentPage - 1)}
        >
          «
        </a>
      </li>

      {getNumbers(1, pagesAmount).map((page) => (
        <li
          key={page}
          className={cn('page-item', { active: currentPage === page })}
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

      <li className={getPageItemClass(isLastPageSelected)}>
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={isLastPageSelected}
          onClick={() => !isLastPageSelected && onPageChange(currentPage + 1)}
        >
          »
        </a>
      </li>
    </ul>
  );
};
