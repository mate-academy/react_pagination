import React from 'react';
import cn from 'classnames';
import { getNumbers } from '../../utils';

interface Props {
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange: (value: number) => void,
}

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const pages = getNumbers(1, Math.ceil(total / perPage));
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === pages[pages.length - 1];

  const moveLeft = (value: number) => {
    if (!isFirstPage) {
      onPageChange(value - 1);
    }
  };

  const moveRight = (value: number) => {
    if (!isLastPage) {
      onPageChange(value + 1);
    }
  };

  return (
    <ul className="pagination">
      <li className={cn('page-item', {
        disabled: isFirstPage,
      })}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          onClick={() => moveLeft(currentPage)}
          aria-disabled={isFirstPage}
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
        disabled: isLastPage,
      })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          onClick={() => moveRight(currentPage)}
          aria-disabled={isLastPage}
        >
          »
        </a>
      </li>
    </ul>
  );
};
