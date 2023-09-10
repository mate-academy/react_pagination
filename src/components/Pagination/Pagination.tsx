import cn from 'classnames';
import React from 'react';

import { getNumbers } from '../../utils';

interface Props {
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange: (page: number) => void,
}

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const pagesAmount = Math.ceil(total / perPage);
  const pages = getNumbers(1, pagesAmount);
  const isFirstPageSelected = currentPage === 1;
  const isLastPageSelected = currentPage === pagesAmount;


  return (
    <ul className="pagination">
      <li className={cn('page-item', {
        disabled: isFirstPageSelected,
      })}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={isFirstPageSelected
            ? 'true'
            : 'false'}
          onClick={() => !isFirstPageSelected
            && onPageChange(currentPage - 1)}
        >
          «
        </a>
      </li>

      {pages.map(page => (
        <li
          key={page}
          className={cn('page-item', {
            active: currentPage === page,
          })}
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

      <li className={cn('page-item', {
        disabled: isLastPageSelected,
      })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={isLastPageSelected
            ? 'true'
            : 'false'}
          onClick={() => !isLastPageSelected
            && onPageChange(currentPage + 1)}
        >
          »
        </a>
      </li>
    </ul>
  );
};
