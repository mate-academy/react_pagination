import React from 'react';
import cn from 'classnames';

type Props = {
  total: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  currentPage,
  onPageChange,
}) => {
  const pages = [];

  for (let i = 1; i <= total; i++) {
    pages.push(i);
  }

  return (
    <ul className="pagination">
      <li
        className={cn('page-item', {
          disabled: currentPage === 1,
        })}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
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
            onClick={() => onPageChange(page)}
          >
            {page}
          </a>
        </li>
      ))}

      <li
        className={cn('page-item', {
          disabled: currentPage === total,
        })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === total}
          onClick={() => onPageChange(currentPage + 1)}
        >
          »
        </a>
      </li>
    </ul>
  );
};
