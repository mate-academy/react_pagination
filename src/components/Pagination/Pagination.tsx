import React from 'react';
import cn from 'classnames';

interface Props {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (value: number) => void;
}

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const pagesAmount = Math.ceil(total / perPage);
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === pagesAmount;

  return (
    <ul className="pagination">
      <li className={cn('page-item', { disabled: isFirstPage })}>
        <a
          data-cy="prevLink"
          className="page-link"
          aria-disabled={isFirstPage}
          href="#prev"
          onClick={() => !isFirstPage && onPageChange(currentPage - 1)}
        >
          «
        </a>
      </li>
      {Array.from({ length: pagesAmount }, (_, i) => i + 1).map(page => (
        <li
          key={page}
          className={cn('page-item', { active: page === currentPage })}
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
      <li className={cn('page-item', { disabled: isLastPage })}>
        <a
          data-cy="nextLink"
          className="page-link"
          aria-disabled={isLastPage}
          href="#next"
          onClick={() => !isLastPage && onPageChange(currentPage + 1)}
        >
          »
        </a>
      </li>
    </ul>
  );
};
