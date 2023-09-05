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

  const moveLeft = (value: number) => {
    if (currentPage !== 1) {
      onPageChange(value - 1);
    }
  };

  const moveRight = (value: number) => {
    if (currentPage !== pages[pages.length - 1]) {
      onPageChange(value + 1);
    }
  };

  return (
    <ul className="pagination">
      <li className={cn('page-item', {
        disabled: currentPage === 1,
      })}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          onClick={() => moveLeft(currentPage)}
          aria-disabled={
            currentPage === 1
          }
        >
          «
        </a>
      </li>

      {pages.map(page => (
        <li className={cn('page-item', {
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
        disabled: currentPage === pages[pages.length - 1],
      })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          onClick={() => moveRight(currentPage)}
          aria-disabled={
            currentPage === pages[pages.length - 1]
          }
        >
          »
        </a>
      </li>
    </ul>
  );
};
