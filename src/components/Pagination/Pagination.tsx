import React from 'react';
import cn from 'classnames';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (value: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const pageCount = [];

  for (let i = 1; i <= Math.ceil(total / perPage); i++) {
    pageCount.push(i);
  }

  return (
    <ul className="pagination">
      <li className={cn('page-item', { disabled: currentPage === 1 })}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage <= 1}
          onClick={
            currentPage > 1 ? () => onPageChange(currentPage - 1) : undefined
          }
        >
          «
        </a>
      </li>
      {pageCount.map(page => (
        <li
          className={cn('page-item', { active: page === currentPage })}
          key={page}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${page}`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </a>
        </li>
      ))}
      <li
        className={cn('page-item', {
          disabled: currentPage === pageCount[pageCount.length - 1],
        })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          onClick={
            currentPage < pageCount[pageCount.length - 1]
              ? () => onPageChange(currentPage + 1)
              : undefined
          }
          aria-disabled={currentPage >= pageCount[pageCount.length - 1]}
        >
          »
        </a>
      </li>
    </ul>
  );
};
