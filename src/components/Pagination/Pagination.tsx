import React from 'react';
import cn from 'classnames';
import { getNumbers } from '../../utils';

type Props = {
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange: (page: number) => void,
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(total / perPage);
  const pageNumbers = getNumbers(1, totalPages);

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  const handlePageClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const clickedPage = Number(event.currentTarget.textContent);

    if (clickedPage !== currentPage) {
      onPageChange(clickedPage);
    }
  };

  const handlePrevClick = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
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
          onClick={handlePrevClick}
        >
          «
        </a>
      </li>

      {pageNumbers.map(pageNumber => (
        <li
          key={pageNumber}
          className={cn('page-item', { active: pageNumber === currentPage })}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href="#1"
            onClick={handlePageClick}
          >
            {pageNumber}
          </a>
        </li>
      ))}

      <li
        className={cn('page-item', { disabled: isLastPage })}
      >
        <a
          data-cy="nextLink"
          href="#next"
          className="page-link"
          aria-disabled={isLastPage}
          onClick={handleNextClick}
        >
          »
        </a>
      </li>

    </ul>
  );
};
