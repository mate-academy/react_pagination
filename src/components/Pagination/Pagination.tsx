import React from 'react';
import classNames from 'classnames';
import { getNumbers } from '../../utils';

interface Props {
  total: number;
  perPage: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage = 1,
  onPageChange,
}) => {
  const pagesCount = Math.ceil(total / perPage);
  const pages = getNumbers(1, pagesCount);
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === pagesCount;

  const changePage = (page: number) => {
    if (page === currentPage || page < 1 || page > pagesCount) {
      return;
    }

    onPageChange(page);
  };

  return (
    <ul className="pagination">
      <li className={classNames('page-item', { disabled: isFirstPage })}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={isFirstPage}
          onClick={event => {
            event.preventDefault();
            changePage(currentPage - 1);
          }}
        >
          «
        </a>
      </li>

      {pages.map(page => (
        <li
          className={classNames('page-item', {
            active: page === currentPage,
          })}
          key={page}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${page}`}
            onClick={event => {
              event.preventDefault();
              changePage(page);
            }}
          >
            {page}
          </a>
        </li>
      ))}

      <li className={classNames('page-item', { disabled: isLastPage })}>
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={isLastPage}
          onClick={event => {
            event.preventDefault();
            changePage(currentPage + 1);
          }}
        >
          »
        </a>
      </li>
    </ul>
  );
};
