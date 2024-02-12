import React from 'react';
import cn from 'classnames';

type Props = {
  total: number
  perPage: number
  currentPage: number
  onPageChange: (value: number) => void
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
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
          onClick={() => {
            if (currentPage !== 1) {
              onPageChange(currentPage - 1);
            }
          }}
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
          onClick={() => {
            if (currentPage !== Math.ceil(total / perPage)) {
              onPageChange(currentPage + 1);
            }
          }}
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
