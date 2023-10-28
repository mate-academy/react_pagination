/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import cn from 'classnames';
import { getNumbers } from '../../utils';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const lastPage = Math.ceil(total / perPage);
  const numberOfPages = getNumbers(1, lastPage);

  const handlePage = (page: number) => page !== currentPage
    && onPageChange(page);

  const nextPage = () => currentPage !== lastPage
    && onPageChange(currentPage + 1);

  const prevPage = () => currentPage !== 1
    && onPageChange(currentPage - 1);

  return (
    <>
      <ul className="pagination">
        <li
          className={cn('page-item', {
            disabled: currentPage === 1,
          })}
        >
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={currentPage === 1}
            onClick={prevPage}
          >
            «
          </a>
        </li>
        {numberOfPages.map(page => (
          <li
            className={cn('page-item', {
              active: currentPage === page,
            })}
            key={page}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${page}`}
              onClick={() => handlePage(page)}
            >
              {page}
            </a>
          </li>
        ))}
        <li
          className={cn('page-item', {
            disabled: currentPage === lastPage,
          })}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPage === lastPage}
            onClick={nextPage}
          >
            »
          </a>
        </li>
      </ul>
    </>
  );
};
