import React from 'react';
import cn from 'classnames';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const pagesNeeded: number = Math.ceil(total / perPage);

  const pageItems = [];

  for (let i = 1; i <= pagesNeeded; i++) {
    pageItems.push(
      <li
        key={i}
        className={cn('page-item', {
          active: currentPage === i,
        })}
        onClick={() => {
          onPageChange(i);
        }}
      >
        <a data-cy="pageLink" className="page-link" href={`#${i}`}>
          {i}
        </a>
      </li>,
    );
  }

  return (
    <ul className="pagination">
      <li
        className={cn('page-item', {
          disabled: currentPage === 1,
        })}
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1 ? 'true' : 'false'}
        >
          «
        </a>
      </li>
      {pageItems}
      <li
        className={cn('page-item', {
          disabled: currentPage === pagesNeeded,
        })}
        onClick={() =>
          currentPage < pagesNeeded && onPageChange(currentPage + 1)
        }
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === pagesNeeded ? 'true' : 'false'}
        >
          »
        </a>
      </li>
    </ul>
  );
};
