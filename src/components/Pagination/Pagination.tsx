import cn from 'classnames';
import React from 'react';

type Props = {
  total: number;
  perPage: number;
  currentPage?: number; // Зробили опціональним
  onPageChange: (newPage: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage = 1, // Дефолтне значення 1 за потреби
  onPageChange,
}) => {
  const totalPages = Math.ceil(total / perPage);
  const pageNumbers = [...Array(totalPages)].map((_, index) => index + 1);

  return (
    <ul className="pagination">
      <li className={cn('page-item', { disabled: currentPage === 1 })}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1}
          onClick={e => {
            e.preventDefault();
            if (currentPage > 1) {
              onPageChange(currentPage - 1);
            }
          }}
        >
          «
        </a>
      </li>

      {pageNumbers.map(pageNumber => (
        <li
          className={cn('page-item', { active: currentPage === pageNumber })}
          key={pageNumber}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${pageNumber}`}
            onClick={e => {
              e.preventDefault();
              // Викликаємо колбек лише якщо клікнули на іншу сторінку
              if (pageNumber !== currentPage) {
                onPageChange(pageNumber);
              }
            }}
          >
            {pageNumber}
          </a>
        </li>
      ))}

      <li className={cn('page-item', { disabled: currentPage === totalPages })}>
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === totalPages}
          onClick={e => {
            e.preventDefault();
            if (currentPage < totalPages) {
              onPageChange(currentPage + 1);
            }
          }}
        >
          »
        </a>
      </li>
    </ul>
  );
};
