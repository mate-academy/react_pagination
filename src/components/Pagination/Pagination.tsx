import React from 'react';
import cn from 'classnames';
import { getNumbers } from '../../utils';

interface Props {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (value: number) => void
}

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const amountOfPages = Math.ceil(total / perPage);
  const pages = getNumbers(1, amountOfPages);

  return (
    <ul className="pagination">
      <li className={
        cn('page-item', {
          disabled: currentPage === 1,
        })
      }
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1}
          onClick={() => {
            if (currentPage !== 1) {
              onPageChange(currentPage - 1);
            }
          }}
        >
          «
        </a>
      </li>

      {pages.map(page => (
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
            onClick={(): void => onPageChange(page)}
          >
            {page}
          </a>
        </li>
      ))}

      <li className={
        cn('page-item', {
          disabled: currentPage === amountOfPages,
        })
      }
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === amountOfPages}
          onClick={() => {
            if (currentPage < amountOfPages) {
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
