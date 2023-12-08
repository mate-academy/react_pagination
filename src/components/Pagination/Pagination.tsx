import React from 'react';

import classNames from 'classnames';

import { getNumbers } from '../../utils';

interface PaginationProps {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const numberOfPages = Math.ceil(total / perPage);
  const pagesArray = getNumbers(1, numberOfPages);

  return (
    <>
      <ul className="pagination">
        <li
          className={classNames('page-item', {
            disabled: currentPage === 1,
          })}
        >
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            onClick={() => currentPage !== 1 && onPageChange(currentPage - 1)}
            aria-disabled={currentPage === 1}
          >
            «
          </a>
        </li>
        {pagesArray.map((page) => (
          <li
            className={classNames('page-item', {
              'page-item': true,
              active: page === currentPage,
            })}
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
          className={classNames('page-item', {
            disabled: currentPage === pagesArray.length,
          })}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            onClick={() => currentPage !== pagesArray.length
              && onPageChange(currentPage + 1)}
            aria-disabled={currentPage === pagesArray.length}
          >
            »
          </a>
        </li>
      </ul>
    </>
  );
};
