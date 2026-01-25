import React from 'react';
import { getNumbers } from '../../utils';
import classNames from 'classnames';

type PaginationProps = {
  total: number;
  perPage: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<PaginationProps> = ({
  total,
  perPage,
  currentPage = 1,
  onPageChange,
}) => {
  const pagesCount: number = Math.ceil(total / perPage);
  const pagesArr: number[] = getNumbers(1, pagesCount);

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
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={isFirstPage}
          onClick={event => {
            event.preventDefault();
            if (!isFirstPage) {
              onPageChange(currentPage - 1);
            }
          }}
        >
          «
        </a>
      </li>
      {pagesArr.map((page: number) => {
        return (
          <li
            key={page}
            className={classNames('page-item', {
              active: currentPage === page,
            })}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${page}`}
              onClick={event => {
                event.preventDefault();

                if (page !== currentPage) {
                  onPageChange(page);
                }
              }}
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
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={isLastPage}
          onClick={event => {
            event.preventDefault();
            if (!isLastPage) {
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
