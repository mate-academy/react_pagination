import React from 'react';
import { getNumbers } from '../../utils';
import cn from 'classnames';

type Props = {
  total: number;
  perPage: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage = 1,
  onPageChange,
}) => {
  const pagesCount = Math.ceil(total / perPage);
  const pages = getNumbers(1, pagesCount);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= pagesCount && page !== currentPage) {
      onPageChange(page);
    }
  };

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
            onClick={() => handlePageChange(currentPage - 1)}
          >
            «
          </a>
        </li>

        {pages.map(page => (
          <li
            key={page}
            className={cn('page-item', {
              active: page === currentPage,
            })}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${page}`}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </a>
          </li>
        ))}

        <li
          className={cn('page-item', {
            disabled: currentPage === pagesCount,
          })}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPage === pagesCount}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            »
          </a>
        </li>
      </ul>
    </>
  );
};
