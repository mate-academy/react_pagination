import React from 'react';
import cn from 'classnames';
import { getNumbers } from '../../utils';

interface Props {
  perPage: number;
  total: number;
  onPageChange: (e: number) => void;
  currentPage: number;
}

export const Pagination: React.FC<Props> = ({
  perPage,
  total,
  onPageChange,
  currentPage,
}) => {
  const BUTTONS_COUNT = Math.ceil(total / perPage);
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === BUTTONS_COUNT;
  const POST_NUMBERS = getNumbers(1, BUTTONS_COUNT);
  const handleClick = (page: number) => {
    if (page !== currentPage) {
      onPageChange(page);
    }
  };

  const preventClickLastPage = () => {
    if (!isLastPage) {
      onPageChange(currentPage + 1);
    }
  };

  const preventClickFirstPage = () => {
    if (!isFirstPage) {
      onPageChange(currentPage - 1);
    }
  };

  return (
    <ul className="pagination">
      <li className={cn('page-item', { disabled: isFirstPage })}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          onClick={preventClickFirstPage}
          aria-disabled={isFirstPage}
        >
          «
        </a>
      </li>
      {POST_NUMBERS.map(number => (
        <li
          className={cn('page-item', { active: number === currentPage })}
          key={number}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${number}`}
            onClick={() => handleClick(number)}
          >
            {number}
          </a>
        </li>
      ))}
      <li className={cn('page-item', { disabled: isLastPage })}>
        <a
          data-cy="nextLink"
          onClick={preventClickLastPage}
          className="page-link"
          href="#next"
          aria-disabled={isLastPage}
        >
          »
        </a>
      </li>
    </ul>
  );
};
