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
  currentPage = 1,
  onPageChange,
}) => {
  const totalPages = getNumbers(1, Math.ceil(total / perPage));

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages.length;

  const showPrevPage = () => {
    if (currentPage && currentPage !== 1) {
      onPageChange(currentPage - 1);
    }
  };

  const showNextPage = () => {
    if (currentPage && currentPage !== totalPages.length) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <ul className="pagination">
      <li className={cn('page-item', {
        disabled: isFirstPage,
      })}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={isFirstPage && true}
          onClick={showPrevPage}
        >
          «
        </a>
      </li>

      {totalPages.map(pageNumber => (
        <li
          className={cn('page-item', {
            active: currentPage === pageNumber,
          })}
          key={pageNumber}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${pageNumber}`}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </a>
        </li>
      ))}

      <li className={cn('page-item', {
        disabled: isLastPage,
      })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={isLastPage && true}
          onClick={showNextPage}
        >
          »
        </a>
      </li>
    </ul>
  );
};
