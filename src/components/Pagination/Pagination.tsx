import { FC } from 'react';
import cn from 'classnames';

import { getNumbers } from '../../utils';

interface Props {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination: FC<Props> = ({
  total,
  perPage,
  currentPage = 1,
  onPageChange,
}) => {
  const totalPages = Math.ceil(total / perPage);

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  const handlePageChange = (page: number) => {
    if (page !== currentPage && page > 0 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const paginationCount = getNumbers(1, totalPages);

  const paginationLinks = paginationCount.map(page => (
    <li
      key={page}
      className={cn('page-item ', { active: currentPage === page })}
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
  ));

  return (
    <ul className="pagination">
      <li className={cn('page-item', { disabled: isFirstPage })}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={isFirstPage}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          «
        </a>
      </li>

      {paginationLinks}

      <li className={cn('page-item', { disabled: isLastPage })}>
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={isLastPage}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          »
        </a>
      </li>
    </ul>
  );
};
