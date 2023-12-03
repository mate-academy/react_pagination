import React from 'react';
import cn from 'classnames';
import { getNumbers } from '../../utils';

interface Props {
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange: (value: number) => void
}

export const Pagination: React.FC<Props> = (
  {
    total,
    perPage,
    currentPage,
    onPageChange,
  },
) => {
  const totalPages = Math.ceil(total / perPage);
  const pages = getNumbers(1, totalPages);

  const getNextPage = () => {
    if (!(currentPage === totalPages)) {
      onPageChange(currentPage + 1);
    }
  };

  const getPrevPage = () => {
    if (!(currentPage === 1)) {
      onPageChange(currentPage - 1);
    }
  };

  const checkLast = () => {
    if (currentPage === totalPages) {
      return true;
    }

    return false;
  };

  const checkFirst = () => {
    if (currentPage === 1) {
      return true;
    }

    return false;
  };

  return (
    <ul className="pagination">
      <li className={cn({
        'page-item': true,
        disabled: checkFirst(),
      })}
      >
        <a
          data-cy="prevLink"
          className={cn({
            'page-link': true,
            active: !checkFirst(),
          })}
          href="#prev"
          aria-disabled={checkFirst()}
          onClick={() => getPrevPage()}
        >
          «
        </a>
      </li>
      {
        pages.map(page => (
          <li className={cn({
            'page-item': true,
            active: page === currentPage,
          })}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              key={page}
              href={`#${page}`}
              aria-disabled={page === currentPage}
              onClick={() => onPageChange(page)}
            >
              {page}
            </a>
          </li>
        ))
      }
      <li className={cn({
        'page-item': true,
        disabled: checkLast(),
      })}
      >
        <a
          data-cy="nextLink"
          className={cn({
            'page-link': true,
            active: checkLast(),
          })}
          href="#next"
          aria-disabled={checkLast()}
          onClick={() => getNextPage()}
        >
          »
        </a>
      </li>
    </ul>
  );
};
