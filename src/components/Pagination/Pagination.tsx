import React from 'react';
import cn from 'classnames';

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
  const pageNumbers = [];

  const getCountOfPage: number = Math.ceil(total / perPage);

  for (let i = 1; i <= getCountOfPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <ul className="pagination">
      <li className={cn('page-item', { disabled: currentPage === 1 })}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1 ? 'true' : 'false'}
          onClick={e => {
            e.preventDefault();
            if (currentPage > 1) {
              onPageChange(currentPage - 1);
            }
          }}
        >
          «
        </a>
      </li>
      {pageNumbers.map(number => (
        <li
          className={cn('page-item', { active: number === currentPage })}
          onClick={e => {
            e.preventDefault();
            onPageChange(number);
          }}
          key={number}
        >
          <a data-cy="pageLink" className="page-link" href={`#${number}`}>
            {number}
          </a>
        </li>
      ))}
      <li
        className={cn('page-item', {
          disabled: currentPage === getCountOfPage,
        })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === getCountOfPage ? 'true' : 'false'}
          onClick={e => {
            e.preventDefault();
            if (currentPage < getCountOfPage) {
              onPageChange(currentPage + 1);
            }
          }}
        >
          »
        </a>
      </li>
    </ul>
  );
};
