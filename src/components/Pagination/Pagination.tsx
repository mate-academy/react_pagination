import React from 'react';
import cn from 'classnames';
import { getNumbers } from '../../utils';

type TypeProps = {
  total: number
  perPage: number
  currentPage: number
  onPageChange: (page: number) => void
};

export const Pagination: React.FC<TypeProps> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const numberOfPages = Math.ceil(total / perPage);
  const pages = getNumbers(1, numberOfPages);
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === numberOfPages;

  function showPrevPage() {
    if (!isFirstPage) {
      onPageChange(currentPage - 1);
    }
  }

  function showNextPage() {
    if (currentPage < numberOfPages) {
      onPageChange(currentPage + 1);
    }
  }

  function onPageNum(page: number) {
    onPageChange(page);
  }

  return (
    <ul className="pagination">
      <li className={cn('page-item', { disabled: isFirstPage })}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={isFirstPage}
          onClick={showPrevPage}
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
            onClick={() => onPageNum(page)}
          >
            {page}
          </a>
        </li>
      ))}

      <li className={cn('page-item', { disabled: isLastPage })}>
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={isLastPage}
          onClick={showNextPage}
        >
          »
        </a>
      </li>
    </ul>
  );
};
