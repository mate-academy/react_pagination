import classNames from 'classnames';
import React from 'react';
import { Params } from '../../App';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (params: Params) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const pagesNumber = Math.ceil(total / perPage);
  const pages = Array.from({ length: pagesNumber }, (_, i) => i + 1);
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === pagesNumber;

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

            if (!isFirstPage) {
              const prevPage = currentPage - 1;

              onPageChange({ page: prevPage });
            }
          }}
        >
          «
        </a>
      </li>
      {pages.map(page => (
        <li
          className={classNames('page-item', { active: currentPage === page })}
          key={page}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${page}`}
            onClick={event => {
              event.preventDefault();
              onPageChange({ page });
            }}
          >
            {page}
          </a>
        </li>
      ))}
      <li
        className={classNames('page-item', {
          disabled: isLastPage,
        })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={isLastPage}
          onClick={event => {
            event.preventDefault();

            if (!isLastPage) {
              const nextPage = currentPage + 1;

              onPageChange({ page: nextPage });
            }
          }}
        >
          »
        </a>
      </li>
    </ul>
  );
};
