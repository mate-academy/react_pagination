import React from 'react';
import cn from 'classnames';
import { getNumbers } from '../../utils';

type Props = {
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange: (pageNumber: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const pages: number[] = getNumbers(1, Math.ceil(total / perPage));

  const isFirstPageActive = currentPage === 1;
  const isLastPageActive = currentPage === pages.length;

  const previousPageHandler = () => {
    if (!isFirstPageActive) {
      onPageChange(currentPage - 1);
    }
  };

  const nextPageHandler = () => {
    if (!isLastPageActive) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <ul className="pagination">
      <li className={cn('page-item', { disabled: isFirstPageActive })}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={isFirstPageActive}
          onClick={previousPageHandler}
        >
          «
        </a>
      </li>
      {pages.map((pageNumber: number) => (
        <li
          className={cn('page-item',
            { active: currentPage === pageNumber })}
          key={pageNumber}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${pageNumber}`}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </a>
        </li>
      ))}
      <li className={cn('page-item',
        { disabled: isLastPageActive })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={isLastPageActive}
          onClick={nextPageHandler}
        >
          »
        </a>
      </li>
    </ul>
  );
};
