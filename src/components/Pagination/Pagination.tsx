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
  const numberOfPages = Math.ceil(total / perPage);
  const pages = getNumbers(1, numberOfPages);
  const isCurrentPageFirst = currentPage === 1;
  const isCurrentPageLast = currentPage === numberOfPages;

  const handlePrevButton = () => {
    if (!isCurrentPageFirst) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextButton = () => {
    if (!isCurrentPageLast) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageChange = (page: number) => {
    if (currentPage !== page) {
      onPageChange(page);
    }
  };

  return (
    <ul className="pagination">
      <li className={cn('page-item', { disabled: isCurrentPageFirst })}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={isCurrentPageFirst}
          onClick={handlePrevButton}
        >
          «
        </a>
      </li>

      {pages.map(page => (
        <li
          className={cn('page-item', { active: page === currentPage })}
          key={page}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${page}`}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </a>
        </li>
      ))}
      <li className={cn('page-item', { disabled: isCurrentPageLast })}>
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={isCurrentPageLast}
          onClick={handleNextButton}
        >
          »
        </a>
      </li>
    </ul>
  );
};
