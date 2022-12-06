import classNames from 'classnames';
import React from 'react';
import { getNumbers } from '../../utils';

interface Props {
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange: (page: number) => void,
}

export const Pagination: React.FC<Props> = React.memo(({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const amountOfPages = Math.ceil(total / perPage);
  const isFirstPage = currentPage - 1 === 0;
  const isLastPage = currentPage === amountOfPages;
  const visiblePages = getNumbers(1, amountOfPages);

  return (
    <ul className="pagination">
      <li className={classNames('page-item', {
        disabled: isFirstPage,
      })}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={isFirstPage}
          onClick={() => (
            !isFirstPage && onPageChange(currentPage - 1)
          )}
        >
          «
        </a>
      </li>

      {visiblePages.map(page => {
        const isCurrentPage = currentPage === page;

        return (
          <li
            className={classNames('page-item', {
              active: isCurrentPage,
            })}
            key={page}
          >
            <a
              data-cy="pageLink"
              className={classNames('page-link')}
              href={`#${page}`}
              onClick={() => (
                !isCurrentPage && onPageChange(page)
              )}
            >
              {page}
            </a>
          </li>
        );
      })}

      <li className={classNames('page-item', {
        disabled: isLastPage,
      })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={isLastPage}
          onClick={() => (
            !isLastPage && onPageChange(currentPage + 1)
          )}
        >
          »
        </a>
      </li>
    </ul>
  );
});
