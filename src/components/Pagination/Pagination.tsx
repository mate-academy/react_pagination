import React from 'react';
import cn from 'classnames';

type Props = {
  total: number
  perPage: number
  currentPage: number
  onPageChange: (value: number) => void
  prevPage: () => void
  nextPage: () => void
};

export const Pagination: React.FC<Props> = ({
  total, perPage, currentPage, onPageChange, prevPage, nextPage,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(total / perPage); i += 1) {
    pageNumbers.push(i);
  }

  return (
    <ul className="pagination">
      <li
        className={cn('page-item', { disabled: currentPage === 1 })}
      >
        <a
          onClick={prevPage}
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1}
        >
          «
        </a>
      </li>
      {pageNumbers.map(page => (
        <li
          key={page}
          className={cn('page-item', { active: page === currentPage })}
        >
          <a
            onClick={() => onPageChange(page)}
            data-cy="pageLink"
            className="page-link"
            href={`#${page}`}
          >
            {page}
          </a>
        </li>
      ))}
      <li
        className={cn('page-item', {
          disabled: currentPage === Math.ceil(total / perPage),
        })}
      >
        <a
          onClick={nextPage}
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === Math.ceil(total / perPage)}
        >
          »
        </a>
      </li>
    </ul>
  );
};
