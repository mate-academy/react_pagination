import cn from 'classnames';
import React from 'react';
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
  const pageCount = Math.ceil(total / perPage);
  const listItems = getNumbers(1, pageCount).map(n => n);

    const handlePageChange = (page: number) => {
    if (page !== currentPage && page >= 1 && page <= pageCount) {
      onPageChange(page);
    }
  };

  return (
    <ul className="pagination">
      <li
        className={cn('page-item', { disabled: currentPage === 1 })}
        
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          «
        </a>
      </li>
      {listItems.map(count => (
        <li
          key={count}
          className={cn('page-item ', { active: currentPage === count })}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            onClick={() => handlePageChange(count)}
            href={`#${count}`}
          >
            {count}
          </a>
        </li>
      ))}
      <li
        className={cn('page-item', { disabled: currentPage === pageCount })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === pageCount}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          »
        </a>
      </li>
    </ul>
  );
};
