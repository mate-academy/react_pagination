import cn from 'classnames';
import React from 'react';
import { Page } from '../../interfaces/Page';
import { getNumbers } from '../../utils';

export const Pagination: React.FC<Page> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const lastPage = Math.ceil(total / perPage);

  return (
    <ul className="pagination">
      <li className={cn('page-item', { disabled: currentPage === 1 })}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1 ? 'true' : 'false'}
          onClick={() => {
            if (currentPage !== 1) {
              onPageChange(total, perPage, currentPage - 1);
            }
          }}
        >
          «
        </a>
      </li>
      {getNumbers(1, lastPage).map(pageNumber => (
        <li
          key={pageNumber}
          className={cn('page-item', { active: pageNumber === currentPage })}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${pageNumber}`}
            onClick={() => onPageChange(total, perPage, pageNumber)}
          >
            {pageNumber}
          </a>
        </li>
      ))}
      <li className={cn('page-item', { disabled: currentPage === lastPage })}>
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === lastPage ? 'true' : 'false'}
          onClick={() => {
            if (currentPage !== lastPage) {
              onPageChange(total, perPage, currentPage + 1);
            }
          }}
        >
          »
        </a>
      </li>
    </ul>
  );
};
