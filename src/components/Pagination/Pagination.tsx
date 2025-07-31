import React from 'react';
import cn from 'classnames';

import { getNumbers } from '../../utils';
import { PaginationProps } from '../../types/PaginationProps';

export const Pagination: React.FC<PaginationProps> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const items = getNumbers(1, 42).map(n => `Item ${n}`);

  const totalPages = Math.ceil(total / perPage);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const startItem = (currentPage - 1) * perPage;
  const endItem = startItem + perPage;
  const visibleItems = items.slice(startItem, endItem);

  const from = startItem + 1;
  const to = Math.min(endItem, total);

  return (
    <>
      <p className="lead" data-cy="info">
        Page {currentPage} (items {from} - {to} of {total})
      </p>

      <ul className="pagination">
        <li className={cn('page-item', { disabled: currentPage === 1 })}>
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={currentPage === 1 ? 'true' : 'false'}
            onClick={(e => {
              e.preventDefault();
              if (currentPage > 1) {
                onPageChange(currentPage - 1);
              }
            })}
          >
            «
          </a>
        </li>

        {pages.map(page => (
          <li
            key={page}
            className={cn('page-item', {
              active: page === currentPage,
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

        <li className={cn('page-item', { disabled: currentPage === totalPages })}>
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPage === totalPages ? 'true' : 'false'}
            onClick={(e => {
              e.preventDefault();
              if (currentPage < totalPages) {
                onPageChange(currentPage + 1);
              }
            })}
          >
            »
          </a>
        </li>
      </ul>

      <ul>
        {visibleItems.map(item => (
          <li key={item} data-cy="item">
            {item}
          </li>
        ))}
      </ul>
    </>
  );
};
