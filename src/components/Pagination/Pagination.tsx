import React from 'react';
import cn from 'classnames';

type Props = {
  total: number
  perPage:number
  currentPage:number
  onPageChange: (page: number) => void
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const pages = Math.ceil(total / perPage);
  const arrOfPages = Array.from({ length: pages }, (_, i) => i + 1);

  return (
    <ul className="pagination">
      <li className={cn('page-item', {
        disabled: currentPage === 1,
      })}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1}
          onClick={() => {
            if (currentPage > 1) {
              onPageChange(currentPage - 1);
            }
          }}
        >
          «
        </a>
      </li>
      {arrOfPages.map(page => {
        return (
          <li
            key={page}
            className={cn('page-item', { active: currentPage === page })}
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
        );
      })}
      <li className={cn('page-item', {
        disabled: currentPage === arrOfPages[arrOfPages.length - 1],
      })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === arrOfPages[arrOfPages.length - 1]}
          onClick={() => {
            if (currentPage < arrOfPages[arrOfPages.length - 1]) {
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
