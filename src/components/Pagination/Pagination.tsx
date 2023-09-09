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
  const isSelected = (page:number) => currentPage === page;

  return (
    <ul className="pagination">
      <li className={cn('page-item', {
        disabled: isSelected(1),
      })}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={isSelected(1)
            ? 'true'
            : 'false'}
          onClick={() => !isSelected(1)
            && onPageChange(currentPage - 1)}
        >
          «
        </a>
      </li>

      {pages.map(page => (
        <li
          key={page}
          className={cn('page-item', {
            active: isSelected(page),
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
        disabled: isSelected(pagesAmount),
      })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={isSelected(pagesAmount)
            ? 'true'
            : 'false'}
          onClick={() => !isSelected(pagesAmount)
            && onPageChange(currentPage + 1)}
        >
          »
        </a>
      </li>
    </ul>
  );
};
