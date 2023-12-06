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
  const countPages = Math.ceil(total / perPage);
  const pages = getNumbers(1, countPages);

  const changeCurrentPage = (page: number) => {
    if (page !== currentPage) {
      onPageChange(page);
    }
  };

  const moveToPreviousPage = () => {
    if (currentPage !== 1) {
      onPageChange(currentPage - 1);
    }
  };

  const moveToNextPage = () => {
    if (currentPage !== pages[pages.length - 1]) {
      onPageChange(currentPage + 1);
    }
  };

  return (
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
          onClick={moveToPreviousPage}
        >
          «
        </a>
      </li>

      {pages.map(page => (
        <li
          className={cn('page-item', {
            active: page === currentPage,
          })}
          key={page}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${page}`}
            onClick={() => changeCurrentPage(page)}
          >
            {page}
          </a>
        </li>
      ))}

      <li
        className={cn('page-item', {
          disabled: currentPage === pages[pages.length - 1],
        })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === pages[pages.length - 1]}
          onClick={moveToNextPage}
        >
          »
        </a>
      </li>
    </ul>
  );
};
