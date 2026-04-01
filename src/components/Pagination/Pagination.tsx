import React from 'react';
import cn from 'classnames';

interface Props {
  total: number;
  perPage: number;
  currentPage?: number;
  onPageChange: (value: number) => void;
}

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage = 1,
  onPageChange: setPage,
}) => {
  const totalPages = Math.ceil(total / perPage);

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

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
              setPage(currentPage - 1);
            }
          }}
        >
          «
        </a>
      </li>
      {pages.map(page => (
        <li
          key={page}
          className={cn('page-item', {
            active: currentPage === page,
          })}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${page}`}
            onClick={e => {
              e.preventDefault();
              if (page !== currentPage) {
                setPage(page);
              }
            }}
          >
            {page}
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
              setPage(currentPage + 1);
            }
          }}
        >
          »
        </a>
      </li>
    </ul>
  );
};
