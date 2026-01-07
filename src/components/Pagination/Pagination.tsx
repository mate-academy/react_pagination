import React from 'react';
import classNames from 'classnames';

type PaginationProps = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<PaginationProps> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const pagesCount: number = Math.ceil(total / perPage);

  return (
    <ul className="pagination">
      <li
        className={classNames('page-item', {
          disabled: currentPage === 1,
        })}
      >
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
      {Array.from({ length: pagesCount }, (_, i) => i + 1).map(item => (
        <li
          className={classNames('page-item', {
            active: item === currentPage,
          })}
          key={item}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href="#1"
            onClick={e => {
              e.preventDefault();
              if (item !== currentPage) {
                onPageChange(item);
              }
            }}
          >
            {item}
          </a>
        </li>
      ))}
      <li
        className={classNames('page-item', {
          disabled: currentPage === pagesCount,
        })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === pagesCount}
          onClick={e => {
            e.preventDefault();
            if (currentPage < pagesCount) {
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
