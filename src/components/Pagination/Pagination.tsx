import React from 'react';
import { getNumbers } from '../../utils';
import cn from 'classnames';

interface PaginationProps {
  total: string[];
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const paginationAmount = Math.ceil(total.length / perPage);
  const pagination = getNumbers(1, paginationAmount);

  return (
    <ul className="pagination">
      {pagination.map(page => (
        <li
          key={page}
          className={cn('page-item', { active: currentPage === page })}
          onClick={() => onPageChange(page)}
        >
          <a data-cy="pageLink" className="page-link" href="#1">
            {page}
          </a>
        </li>
      ))}
    </ul>
  );
};
