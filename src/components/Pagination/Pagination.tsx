import React from 'react';
import cn from 'classnames';
import { getNumbers } from '../../utils';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange:(value: number) => void;
};

export const Pagination: React.FC <Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const pagesCount = Math.ceil(total / perPage);
  const pages = getNumbers(1, pagesCount);
  const firstPage = currentPage === 1;
  const lastPage = currentPage === pagesCount;

  const setPrevPage = () => {
    if (!firstPage) {
      onPageChange(currentPage - 1);
    }
  };

  const setNextPage = () => {
    if (!lastPage) {
      onPageChange(currentPage + 1);
    }
  };

  const setOtherPage = (page: number) => {
    if (page !== currentPage) {
      onPageChange(page);
    }
  };

  return (
    <ul className="pagination">
      <li
        className={cn('page-item', { disabled: firstPage })}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={firstPage}
          onClick={setPrevPage}
        >
          «
        </a>
      </li>

      {pages.map(page => (
        <li
          className={cn('page-item', { active: page === currentPage })}
          key={page}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${page}`}
            onClick={() => setOtherPage(page)}
          >
            {page}
          </a>
        </li>
      ))}

      <li
        className={cn('page-item', { disabled: lastPage })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={lastPage}
          onClick={() => setNextPage()}
        >
          »
        </a>
      </li>
    </ul>
  );
};
