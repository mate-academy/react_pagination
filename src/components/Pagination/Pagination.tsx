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
  const pagesAmount = Math.ceil(total / perPage);
  const pagesAmountArray = getNumbers(1, pagesAmount);

  return (
    <ul className="pagination">
      <li
        className={cn('page-item', {
          ['disabled']: currentPage === pagesAmountArray[0],
        })}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === pagesAmountArray[0]}
          onClick={() => {
            if (currentPage !== 1) {
              onPageChange(currentPage - 1);
            }
          }}
        >
          «
        </a>
      </li>
      {pagesAmountArray.map((page, index) => {
        return (
          <li
            className={cn('page-item', { active: page === currentPage })}
            key={index}
          >
            <a
              className="page-link"
              data-cy="pageLink"
              href="#2"
              onClick={() => onPageChange(page)}
            >
              {page}
            </a>
          </li>
        );
      })}
      <li
        className={cn('page-item', {
          disabled:
            currentPage === pagesAmountArray[pagesAmountArray.length - 1],
        })}
      >
        <a
          data-cy="nextLink"
          href="#next"
          className="page-link"
          aria-disabled={
            currentPage === pagesAmountArray[pagesAmountArray.length - 1]
          }
          onClick={() => {
            if (currentPage !== pagesAmountArray[pagesAmountArray.length - 1]) {
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
