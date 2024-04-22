import React from 'react';
import cn from 'classnames';

interface Props {
  perPage: number;
  currentPage?: number;
  total: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<Props> = ({
  perPage,
  currentPage = 1,
  total,
  onPageChange,
}) => {
  const pages = new Array(Math.ceil(total / perPage))
    .fill(1)
    .map((num, i) => num + i);

  const isFirstPage = currentPage === 1;
  const isLastPage = pages.length === currentPage;

  return (
    <ul className="pagination">
      <li className={cn('page-item', { disabled: isFirstPage })}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={isFirstPage}
          onClick={() => !isFirstPage && onPageChange(currentPage - 1)}
        >
          «
        </a>
      </li>
      {pages.map(page => {
        return (
          <li
            key={page}
            className={cn('page-item', { active: page === currentPage })}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${page}`}
              onClick={() => {
                onPageChange(page);
              }}
            >
              {page}
            </a>
          </li>
        );
      })}
      <li className={cn('page-item', { disabled: isLastPage })}>
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={isLastPage}
          onClick={() => !isLastPage && onPageChange(currentPage + 1)}
        >
          »
        </a>
      </li>
    </ul>
  );
};
