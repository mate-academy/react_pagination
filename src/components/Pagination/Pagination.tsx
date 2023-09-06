import React from 'react';
import cn from 'classnames';
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
  const pageNumbersArr = getNumbers(1, Math.ceil(total / perPage));

  return (
    <ul className="pagination">
      <li className={cn('page-item', { disabled: currentPage === 1 })}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          «
        </a>
      </li>
      {
        pageNumbersArr.map(number => (
          <li
            className={cn('page-item', { active: currentPage === number })}
            key={number}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${number}`}
              onClick={() => onPageChange(number)}
            >
              {number}
            </a>
          </li>
        ))
      }
      <li
        className={cn(
          'page-item',
          { disabled: currentPage === pageNumbersArr.length },
        )}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === pageNumbersArr.length}
          onClick={() => onPageChange(currentPage + 1)}
        >
          »
        </a>
      </li>
    </ul>
  );
};
