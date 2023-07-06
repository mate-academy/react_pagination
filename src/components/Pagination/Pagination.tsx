import React from 'react';
import cn from 'classnames';
import { getNumbers } from '../../utils';

type Props = {
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange: (page: number) => void
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const pagesCount: number = Math.ceil(total / perPage);
  const pages = getNumbers(1, pagesCount);

  const prevButtonHandler = (page: number) => {
    if (page <= 0) {
      return;
    }

    onPageChange(page);
  }

  const nextButtonHandler = (page: number) => {
    if (page > total) {
      return;
    }

    onPageChange(page);
  }

  return (
    <ul className="pagination">
      <li className={cn('page-item', {
        disabled: currentPage === 1,
      })}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href={`#${currentPage}`}
          aria-disabled={currentPage === 1}
          onClick={() => prevButtonHandler(currentPage - 1)}
        >
          «
        </a>
      </li>
      {pages.map(page => (
        <li className={cn('page-item', {
          active: page === currentPage,
        })}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${currentPage}`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </a>
        </li>
      ))}
      <li className={cn('page-item', {
        disabled: currentPage === pagesCount,
      })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href={`#${currentPage}`}
          aria-disabled={currentPage === pagesCount}
          onClick={() => nextButtonHandler(currentPage + 1)}
        >
          »
        </a>
      </li>
    </ul>
  );
};
