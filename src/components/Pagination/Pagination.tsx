import cn from 'classnames';
import React from 'react';
import { getNumbers } from '../../utils';

type Props = {
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange: (page: number | string) => void
};

export const Pagination: React.FC<Props> = React.memo(({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const lastPage = Math.ceil(total / perPage);
  const numberOfPages = getNumbers(1, lastPage);

  return (
    <ul className="pagination">
      <li
        className={cn(
          'page-item',
          { disabled: currentPage - 1 === 0 },
        )}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1}
          onClick={() => {
            if (currentPage !== 1) {
              onPageChange('prev');
            }
          }}
        >
          «
        </a>
      </li>
      {numberOfPages.map(page => (
        <li
          className={cn(
            'page-item',
            { active: currentPage === page },
          )}
          key={page}
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
        className={cn(
          'page-item',
          { disabled: currentPage === lastPage },
        )}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === lastPage}
          onClick={() => {
            if (currentPage !== lastPage) {
              onPageChange('next');
            }
          }}
        >
          »
        </a>
      </li>
    </ul>
  );
});
