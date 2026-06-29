import cn from 'classnames';
import React from 'react';
interface Props {
  total: number;
  perPage: number;
  currentPage?: number;
  onPageChange: (selectedPage: number) => void;
}

export const Pagination: React.FC<Props> = ({
  total,
  perPage = 5,
  currentPage = 1,
  onPageChange,
}) => {
  const totalPages: number = Math.ceil(total / perPage);
  const pages: number[] = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <ul className="pagination">
      <li
        className={cn('page-item', {
          disabled: currentPage <= 1,
        })}
      >
        <a
          data-cy="prevLink"
          className={cn('page-link')}
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
      {pages.map(num => {
        return (
          <li
            key={num}
            className={cn('page-item', {
              active: currentPage === num,
            })}
          >
            <a
              data-cy="pageLink"
              className={cn('page-link', {
                active: currentPage === num,
              })}
              href={`#${num}`}
              onClick={e => {
                e.preventDefault();
                if (num !== currentPage) {
                  onPageChange(num);
                }
              }}
            >
              {num}
            </a>
          </li>
        );
      })}
      <li
        className={cn('page-item', {
          disabled: currentPage === totalPages,
        })}
      >
        <a
          data-cy="nextLink"
          className={cn('page-link')}
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
