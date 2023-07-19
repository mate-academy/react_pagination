import React from 'react';
import cn from 'classnames';

import { getNumbers } from './../../utils';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (value: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(total / perPage);
  const pages = getNumbers(1, totalPages);

  const pageChange = (page: number) => () => {
    if (page !== currentPage) {
      onPageChange(page);
    }
  };

  const nextPage = () => {
    if (currentPage !== totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage !== 1) {
      onPageChange(currentPage - 1);
    }
  };

  return (
    <ul className="pagination">
      <li className={cn(
        'page-item',
        { disabled: currentPage === 1 },
      )}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1}
          onClick={prevPage}
        >
          «
        </a>
      </li>
      {pages.map(page => (
        <li
          key={page}
          className={cn(
            'page-item',
            { active: currentPage === page },
          )}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${page}`}
            onClick={pageChange(page)}
          >
            {page}
          </a>
        </li>
      ))}
      <li className={cn(
        'page-item',
        { disabled: currentPage === totalPages },
      )}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === totalPages}
          onClick={nextPage}
        >
          »
        </a>
      </li>
    </ul>
  );
};
