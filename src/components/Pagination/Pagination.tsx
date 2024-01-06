import cn from 'classnames';
import React from 'react';
import { getNumbers } from '../../utils';

interface Props {
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange: (page: number) => void,
}

export const Pagination: React.FC<Props> = ({
  currentPage,
  onPageChange,
  total,
  perPage,
}) => {
  const totalPages = Math.ceil(total / perPage);
  const numberingPages = getNumbers(1, totalPages);

  const firsPage = currentPage === 1;
  const lastPage = currentPage === totalPages;

  const moveNextPage = () => {
    if (!lastPage) {
      onPageChange(currentPage + 1);
    }
  };

  const movePrevPage = () => {
    if (!firsPage) {
      onPageChange(currentPage - 1);
    }
  };

  const moveTocurrentPage = (page: number) => {
    if (currentPage !== page) {
      onPageChange(page);
    }
  };

  return (
    <ul className="pagination">

      <li className={cn('page-item',
        { disabled: firsPage })}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={firsPage}
          onClick={movePrevPage}
        >
          «
        </a>
      </li>

      {numberingPages.map(page => (
        <li
          key={page}
          className={cn('page-item',
            { active: currentPage === page })}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`${page}`}
            aria-disabled={firsPage}
            onClick={(event) => {
              event.preventDefault();
              moveTocurrentPage(page);
            }}
          >
            {page}
          </a>
        </li>
      ))}
      <li className="page-item">
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={lastPage}
          onClick={moveNextPage}
        >
          »
        </a>
      </li>
    </ul>
  );
};
