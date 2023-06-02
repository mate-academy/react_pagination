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

  return (
    <ul className="pagination">
      <li
        className={cn(
          'page-item',
          {
            disabled: currentPage === 1,
          },
        )}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1}
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
            disabled: currentPage === pageCount,
          },
        )}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === pageCount}
          onClick={handleNextOnClick}
        >
          »
        </a>
      </li>
    </ul>
  );
};
