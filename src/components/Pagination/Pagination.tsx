import React from 'react';
import { getNumbers } from './../../utils';
import cn from 'classnames';

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
  const amountOfPages = Math.ceil(total / perPage);
  const paginationItems = getNumbers(1, amountOfPages);

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
          aria-disabled={currentPage === 1}
          onClick={() => {
            if (currentPage > 1) {
              onPageChange(currentPage - 1);
            }
          }}
        >
          «
        </a>
      </li>

      {paginationItems.map(i => (
        <li
          key={i}
          className={cn('page-item', {
            active: i === currentPage,
          })}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${i}`}
            onClick={() => onPageChange(i)}
          >
            {i}
          </a>
        </li>
      ))}

      <li
        className={cn('page-item', {
          disabled: currentPage === paginationItems.length,
        })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === paginationItems.length}
          onClick={() => {
            if (currentPage < paginationItems.length) {
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
