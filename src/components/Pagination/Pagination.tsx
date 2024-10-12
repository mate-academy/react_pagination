import React, { FC, MouseEvent } from 'react';
import { getNumbers } from '../../utils';
import cn from 'classnames';
import { TOTAL_ITEMS } from '../../utils/constants';

type Props = {
  perPage: number;
  currentPage: number;
  onPageChange: (currentPage: number) => void;
};

export const Pagination: FC<Props> = ({
  perPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(TOTAL_ITEMS / perPage);
  const pages = getNumbers(1, totalPages);

  const isSelectedFirstPage = currentPage === 1;
  const isSelectedLastPage = currentPage === totalPages;

  const handleSelectPrevPage = (event: MouseEvent<HTMLElement>) => {
    event.preventDefault();

    if (!isSelectedFirstPage) {
      onPageChange(currentPage - 1);
    }
  };

  const handleSelectNextPage = (event: MouseEvent<HTMLElement>) => {
    event.preventDefault();

    if (!isSelectedLastPage) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <ul className="pagination">
      <li
        className={cn('page-item', {
          disabled: isSelectedFirstPage,
        })}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={isSelectedFirstPage}
          onClick={handleSelectPrevPage}
        >
          «
        </a>
      </li>

      {pages.map(pageNumber => (
        <li
          key={pageNumber}
          className={cn('page-item', {
            active: currentPage === pageNumber,
          })}
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

      <li
        className={cn('page-item', {
          disabled: isSelectedLastPage,
        })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={isSelectedLastPage}
          onClick={handleSelectNextPage}
        >
          »
        </a>
      </li>
    </ul>
  );
};
