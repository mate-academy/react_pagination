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
  const pageCount = Math.ceil(total / perPage);
  const pageNumbers = getNumbers(1, pageCount);
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === pageCount;

  const goToPreviousPage = () => {
    if (!isFirstPage) {
      onPageChange(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (!isLastPage) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <ul className="pagination">
      <li
        className={cn('page-item', { disabled: isFirstPage })}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={isFirstPage}
          onClick={goToPreviousPage}
        >
          «
        </a>
      </li>

      {pageNumbers.map(num => (
        <li
          className={cn('page-item', { active: num === currentPage })}
          key={num}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${num}`}
            onClick={() => onPageChange(num)}
          >
            {num}
          </a>
        </li>
      ))}

      <li
        className={cn('page-item', { disabled: isLastPage })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={isLastPage}
          onClick={goToNextPage}
        >
          »
        </a>
      </li>
    </ul>
  );
};
