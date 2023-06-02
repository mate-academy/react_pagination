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
  currentPage = 1,
  onPageChange,
}) => {
  const pageCount: number = Math.ceil(total / perPage);
  const pages = getNumbers(1, pageCount);

  const handlePrevOnClick = () => {
    if (currentPage !== 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextOnClick = () => {
    if (currentPage !== pageCount) {
      onPageChange(currentPage + 1);
    }
  };

  const isSelectedPageFirst = currentPage === 1;
  const isSelectedPageLast = currentPage === pageCount;

  return (
    <ul className="pagination">
      <li
        className={cn(
          'page-item',
          {
            disabled: isSelectedPageFirst,
          },
        )}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={isSelectedPageFirst}
          onClick={handlePrevOnClick}
        >
          «
        </a>
      </li>
      {pages.map((page) => (
        <li
          key={page}
          className={cn(
            'page-item',
            {
              active: currentPage === page,
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
      <li
        className={cn(
          'page-item',
          {
            disabled: isSelectedPageLast,
          },
        )}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={isSelectedPageLast}
          onClick={handleNextOnClick}
        >
          »
        </a>
      </li>
    </ul>
  );
};
