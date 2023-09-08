import React from 'react';
import cn from 'classnames';
import { getNumbers } from '../../utils';

interface Params {
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange: (page: number) => void,
}

function checkCurrentPage(page: number, toCheckValue: number): boolean {
  return page === toCheckValue;
}

export const Pagination: React.FC<Params> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const pages = Math.ceil(total / perPage);

  const pagesArr = getNumbers(1, pages);

  return (
    <>
      <ul className="pagination">
        <li className={cn('page-item', {
          disabled: checkCurrentPage(currentPage, 1),
        })}
        >
          <a
            onClick={() => onPageChange(currentPage - 1)}
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={
              checkCurrentPage(currentPage, 1) ? 'true' : 'false'
            }
          >
            «
          </a>
        </li>
        {
          pagesArr.map(page => (
            <li
              className={cn('page-item', {
                active: page === currentPage,
              })}
            >
              <a
                onClick={() => onPageChange(page)}
                data-cy="pageLink"
                className="page-link"
                href={`#${page}`}
              >
                {page}
              </a>
            </li>
          ))
        }
        <li className={cn('page-item', {
          disabled: checkCurrentPage(currentPage, pages),
        })}
        >
          <a
            onClick={() => onPageChange(currentPage + 1)}
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={
              checkCurrentPage(currentPage, pages) ? 'true' : 'false'
            }
          >
            »
          </a>
        </li>
      </ul>
    </>
  );
};
