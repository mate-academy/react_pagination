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
  const numberOfPages = Math.ceil(total / perPage);

  const pages = getNumbers(1, numberOfPages);

  const toNextPage = () => {
    if (currentPage < numberOfPages) {
      onPageChange(currentPage + 1);
    }
  };

  const toPrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  return (
    <ul className="pagination">
      <li className={cn('page-item', {
        disabled: currentPage === 1,
      })}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          onClick={toPrevPage}
          aria-disabled={currentPage === 1}
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
            key={page}
            data-cy="pageLink"
            className="page-link"
            href={`#${page}`}
            onClick={() => {
              onPageChange(page);
            }}
          >
            {page}
          </a>
        </li>
      ))}
      <li className={cn('page-item', {
        disabled: currentPage === pages.length,
      })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          onClick={toNextPage}
          aria-disabled={currentPage === numberOfPages}
        >
          »
        </a>
      </li>
    </ul>
  );
};
