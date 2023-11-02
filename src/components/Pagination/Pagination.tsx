import React from 'react';
import cn from 'classnames';

interface PaginationProps {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  total, perPage, currentPage, onPageChange,
}) => {
  const totalPagesAmount = Math.ceil(total / perPage);
  const getNumbers = new Array(totalPagesAmount).fill(0)
    .map((__element, index) => index + 1);

  return (
    <ul className="pagination">
      <li className={cn('page-item', { disabled: currentPage === 1 })}>
        <a
          onClick={() => {
            onPageChange(currentPage === 1 ? 1 : currentPage - 1);
          }}
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1}
        >
          «
        </a>
      </li>
      {getNumbers.map(page => (
        <li
          key={page}
          className={cn('page-item',
            { active: currentPage === page })}
        >
          <a
            onClick={() => {
              onPageChange(page);
            }}
            data-cy="pageLink"
            className="page-link"
            href={`#${page}`}
          >
            {page}
          </a>
        </li>
      ))}

      <li className={cn('page-item',
        { disabled: currentPage === totalPagesAmount })}
      >
        <a
          onClick={() => {
            onPageChange(currentPage === totalPagesAmount
              ? totalPagesAmount : currentPage + 1);
          }}
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === totalPagesAmount}
        >
          »
        </a>
      </li>
    </ul>
  );
};
