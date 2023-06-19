import React from 'react';
import classNames from 'classnames';
import { getNumbers } from '../../utils';
import { Props } from '../types';

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const countOfPages = ((total % perPage) === 0)
    ? total / perPage
    : Math.ceil(total / perPage);

  const pages = getNumbers(1, countOfPages);

  const isLastPage = currentPage === countOfPages;
  const isFirstPage = currentPage === 1;
  const prevPage = currentPage - 1;

  const nextPage = currentPage + 1;

  const handlePageChange = (page: number) => {
    if (page === currentPage || page > countOfPages || page < 1) {
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
          href={`#${prevPage}`}
          aria-disabled={isFirstPage}
          onClick={() => handlePageChange(prevPage)}
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
            onClick={() => onPageChange(page)}
          >
            {page}
          </a>
        </li>
      ))}

      <li className={classNames('page-item', { disabled: isLastPage })}>
        <a
          data-cy="nextLink"
          className="page-link"
          href={`#${nextPage}`}
          aria-disabled={isLastPage}
          onClick={() => handlePageChange(nextPage)}
        >
          »
        </a>
      </li>
    </ul>
  );
};
