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
  const totalPages = Math.ceil(total / perPage);
  const visiblePages = getNumbers(1, totalPages);
  const firstPage = currentPage === 1;
  const lastPage = currentPage === totalPages;

  const prevPage = () => {
    if (!firstPage) {
      onPageChange(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (!lastPage) {
      onPageChange(currentPage + 1);
    }
  };

  const anotherPage = (page: number) => {
    if (page !== currentPage) {
      onPageChange(page);
    }
  };

  return (
    <ul className="pagination">
      <li
        className={cn(
          'page-item',
          { disabled: firstPage },
        )}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={firstPage}
          onClick={prevPage}
        >
          «
        </a>
      </li>
      {visiblePages.map(page => (
        <li
          className={cn(
            'page-item',
            { active: page === currentPage },
          )}
          key={page}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${page}`}
            onClick={() => anotherPage(page)}
          >
            {page}
          </a>
        </li>
      ))}

      <li
        className={cn(
          'page-item',
          { disabled: lastPage },
        )}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={lastPage}
          onClick={nextPage}
        >
          »
        </a>
      </li>
    </ul>
  );
};
