import React from 'react';
import cn from 'classnames';

type Props = {
  total: number // total number of items to paginate
  perPage: number // number of items per page
  currentPage: number /* optional with 1 by default */
  paginate: (number: number) => void
  previousPage: () => void
  nextPage: () => void
};

export const Pagination: React.FC<Props> = (
  {
    total, perPage, currentPage, paginate, previousPage, nextPage,
  },
) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(total / perPage); i += 1) {
    pageNumbers.push(i);
  }

  return (
    <ul className="pagination">
      <li className={cn('page-item', {
        disabled: currentPage === pageNumbers[0],
      })}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === pageNumbers[0]}
          onClick={previousPage}
        >
          «
        </a>
      </li>

      {pageNumbers.map(number => {
        return (
          <li
            key={number}
            className={cn('page-item', {
              active: currentPage === number,
            })}
          >
            <a
              onClick={paginate}
              data-cy="pageLink"
              className="page-link"
              href={`#${number}`}
            >
              {number}
            </a>
          </li>
        );
      })}

      <li className={cn('page-item', {
        disabled: currentPage === pageNumbers.length,
      })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === pageNumbers.length}
          onClick={nextPage}
        >
          »
        </a>
      </li>
    </ul>
  );
};
