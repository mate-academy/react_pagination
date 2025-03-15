import React from 'react';
import { getNumbers } from '../../utils';
import cn from 'classnames';

interface Props {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (value: number) => void;
}

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages: number[] = getNumbers(1, Math.ceil(total / perPage));
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages.length;

  return (
    <ul className="pagination">
      <li
        className={cn('page-item active', {
          disabled: isFirstPage,
        })}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={isFirstPage}
          onClick={() => !isFirstPage && onPageChange(currentPage - 1)}
        >
          «
        </a>
      </li>

      {totalPages.map(elem => {
        return (
          <li
            className={cn('page-item', {
              active: currentPage === elem,
            })}
            key={elem}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${elem}`}
              onClick={() => {
                onPageChange(elem);
              }}
            >
              {elem}
            </a>
          </li>
        );
      })}

      <li
        className={cn('page-item active', {
          disabled: isLastPage,
        })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={isLastPage}
          onClick={() => !isLastPage && onPageChange(currentPage + 1)}
        >
          »
        </a>
      </li>
    </ul>
  );
};
