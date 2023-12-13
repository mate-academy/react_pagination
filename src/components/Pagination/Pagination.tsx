import React from 'react';
import cn from 'classnames';

import { DEFAULT_PAGE } from '../../constants';

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
  const isFirstPage = currentPage === DEFAULT_PAGE;
  const isLastPage = currentPage === numberOfPages;

  const handlePageClick = (page: number) => {
    onPageChange(page);
  };

  const handlePrevClick = () => {
    if (!isFirstPage) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (!isLastPage) {
      onPageChange(currentPage + 1);
    }
  };

  const paginationPages = Array.from({ length: numberOfPages }, (_, index) => {
    const currentNumber = index + 1;

    return (
      <li
        key={`${numberOfPages}/${currentNumber}`}
        className={cn('page-item', { active: currentPage === currentNumber })}
      >
        <a
          data-cy="pageLink"
          className="page-link"
          href={`#${currentNumber}`}
          onClick={() => handlePageClick(currentNumber)}
        >
          {currentNumber}
        </a>
      </li>
    );
  });

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
          aria-disabled={isFirstPage}
          onClick={handlePrevClick}
        >
          «
        </a>
      </li>

      {paginationPages}

      <li
        className={
          cn('page-item', { disabled: isLastPage })
        }
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={isLastPage}
          onClick={handleNextClick}
        >
          »
        </a>
      </li>
    </ul>
  );
};
