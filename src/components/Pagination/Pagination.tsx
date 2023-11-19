import React from 'react';
import cn from 'classnames';
import { getNumbers } from '../../utils';

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
  const countPages = Math.ceil(total / perPage);
  const pages = getNumbers(1, countPages);
  const firstPage = currentPage === 1;
  const lastPage = currentPage === countPages;

  const getPrevPage = () => {
    if (!firstPage) {
      onPageChange(currentPage - 1);
    }
  };

  const getNextPage = () => {
    if (!lastPage) {
      onPageChange(currentPage + 1);
    }
  };

  const getAnotherPage = (page: number) => {
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
          onClick={getPrevPage}
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
            onClick={() => getAnotherPage(page)}
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
          onClick={getNextPage}
        >
          »
        </a>
      </li>
    </ul>
  );
};
