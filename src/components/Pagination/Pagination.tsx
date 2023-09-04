import React from 'react';
import cn from 'classnames';
import { getNumbers } from '../../utils';

interface Props {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const pageCount = Math.ceil(total / perPage);
  const pages = getNumbers(1, pageCount);
  const firstPage = currentPage === 1;
  const lastPage = currentPage === pageCount;

  const handlePageChange = (newPage: number) => {
    if (newPage === currentPage) {
      return;
    }

    onPageChange(newPage);
  };

  return (
    <ul className="pagination">
      <li className={cn('page-item', { disabled: firstPage })}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={firstPage}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          «
        </a>
      </li>
      {pages.map((page) => (
        <li
          key={page}
          className={cn('page-item', { active: currentPage === page })}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${page}`}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </a>
        </li>
      ))}

      <li className={cn('page-item', { disabled: lastPage })}>
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={lastPage}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          »
        </a>
      </li>
    </ul>
  );
};
