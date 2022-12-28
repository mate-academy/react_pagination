import classNames from 'classnames';
import React from 'react';
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
  const totalPages = Math.ceil(total / perPage);
  const pages = getNumbers(1, totalPages);
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  const handlerChangePage = (event: any) => {
    if (event.target.id === 'prev' && !isFirstPage) {
      onPageChange(currentPage - 1);
    }

    if (event.target.id === 'next' && !isLastPage) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <ul className="pagination">
      <li className={classNames(
        'page-item',
        {
          disabled: isFirstPage,
        },
      )}
      >
        <a
          id="prev"
          data-cy="prevLink"
          className="page-link"
          href={`#${currentPage}`}
          aria-disabled={isFirstPage}
          onClick={handlerChangePage}
        >
          «
        </a>
      </li>
      {pages.map((page) => (
        <li
          key={page}
          className={classNames(
            'page-item',
            {
              active: page === currentPage,
            },
          )}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${page}`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </a>
        </li>
      ))}
      <li className={classNames(
        'page-item',
        {
          disabled: isLastPage,
        },
      )}
      >
        <a
          id="next"
          data-cy="nextLink"
          className="page-link"
          href={`#${currentPage}`}
          aria-disabled={isLastPage}
          onClick={handlerChangePage}
        >
          »
        </a>
      </li>
    </ul>
  );
};
