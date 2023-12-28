import React from 'react';
import cn from 'classnames';
import { getNumbers } from '../../utils';

type Props = {
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange: (page: number) => void,
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const pageCount = Math.ceil(total / perPage);
  const pageArray = getNumbers(1, pageCount);
  const theFirstPage = currentPage === 1;
  const theLastPage = currentPage === pageCount;

  function handlePageChange(page: number) {
    if (page !== currentPage) {
      onPageChange(page);
    }
  }

  function handlePrevPage() {
    if (theFirstPage) {
      return;
    }

    onPageChange(currentPage - 1);
  }

  function handleNextPage() {
    if (theLastPage) {
      return;
    }

    onPageChange(currentPage + 1);
  }

  return (
    <ul className="pagination">
      <li className={cn('page-item',
        { disabled: theFirstPage })}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={theFirstPage}
          onClick={handlePrevPage}
        >
          «
        </a>
      </li>

      {pageArray.map(pageNum => (
        <li
          key={pageNum}
          className={cn('page-item',
            { active: pageNum === currentPage })}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${pageNum}`}
            onClick={() => handlePageChange(pageNum)}
          >
            {pageNum}
          </a>
        </li>
      ))}
      <li className={cn('page-item',
        { disabled: theLastPage })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={theLastPage}
          onClick={handleNextPage}
        >
          »
        </a>
      </li>
    </ul>
  );
};
