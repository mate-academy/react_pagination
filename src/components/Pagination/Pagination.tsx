import React from 'react';
import classNames from 'classnames';

interface Props {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const pagesCount = Math.ceil(total / perPage);
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === pagesCount;

  return (
    <ul className="pagination">
      <li
        className={classNames('page-item', {
          disabled: isFirstPage,
        })}
      >
        <a
          onClick={() => currentPage !== 1 && onPageChange(currentPage - 1)}
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={isFirstPage}
        >
          «
        </a>
      </li>
      {Array.from({ length: pagesCount }, (_, index) => {
        const page = index + 1;

        return (
          <li
            key={page}
            className={classNames('page-item', {
              active: page === currentPage,
            })}
          >
            <a
              onClick={() => page !== currentPage && onPageChange(page)}
              data-cy="pageLink"
              className="page-link"
              href="#1"
            >
              {page}
            </a>
          </li>
        );
      })}
      <li
        className={classNames('page-item', {
          disabled: isLastPage,
        })}
      >
        <a
          onClick={() =>
            currentPage !== pagesCount && onPageChange(currentPage + 1)
          }
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={isLastPage}
        >
          »
        </a>
      </li>
    </ul>
  );
};
