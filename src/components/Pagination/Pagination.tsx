import React from 'react';
import cn from 'classnames';

type Params = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const Pagination = ({
  total,
  perPage,
  onPageChange,
  currentPage,
}: Params) => {
  const pageCount = Math.ceil(total / perPage);
  const arr: number[] = [];

  for (let i = 1; i <= pageCount; i++) {
    arr.push(i);
  }

  const handleClickButton = (button: 'prev' | 'next') => {
    if (button === 'prev' && currentPage !== 1) {
      return onPageChange(currentPage - 1);
    }

    if (button === 'next' && currentPage !== pageCount) {
      return onPageChange(currentPage + 1);
    }
  };

  return (
    <ul className="pagination">
      <li className={cn('page-item', { disabled: currentPage === 1 })}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1}
          onClick={() => handleClickButton('prev')}
        >
          «
        </a>
      </li>
      {arr.map(page => (
        <li
          className={cn('page-item', { active: page === currentPage })}
          key={page}
        >
          <a
            href={`#${page}`}
            className="page-link"
            data-cy="pageLink"
            onClick={() => onPageChange(page)}
          >
            {page}
          </a>
        </li>
      ))}
      <li className={cn('page-item', { disabled: currentPage === pageCount })}>
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === pageCount}
          onClick={() => handleClickButton('next')}
        >
          »
        </a>
      </li>
    </ul>
  );
};
