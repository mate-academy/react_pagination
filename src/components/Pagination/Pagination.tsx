import React from 'react';
import cn from 'classnames';

interface Props {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  return (
    <ul className="pagination">
      <li className={cn({ disabled: currentPage === 1 }, 'page-item')}>
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
      {Array.from({ length: Math.ceil(total / perPage) }, (_, i) => (
        <li
          key={i + 1}
          className={cn('page-item', { active: currentPage === i + 1 })}
        >
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${i + 1}`}
            onClick={e => {
              e.preventDefault();
              if (i + 1 !== currentPage) {
                onPageChange(i + 1);
              }
            }}
          >
            {i + 1}
          </a>
        </li>
      ))}
      <li
        className={cn(
          {
            disabled: currentPage === Math.ceil(total / perPage),
          },
          'page-item',
        )}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === Math.ceil(total / perPage)}
          onClick={() => {
            if (currentPage !== Math.ceil(total / perPage)) {
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
