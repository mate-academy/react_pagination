import React from 'react';
import cn from 'classnames';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (value: number) => void;

};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const numberOfPages = Math.ceil(total / perPage);
  const pages: number[] = [];

  for (let i = 1; i <= numberOfPages; i += 1) {
    pages.push(i);
  }

  return (
    <ul className="pagination">
      <li className={cn('page-item',
        { disabled: currentPage === 1 })}
      >
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === 1 ? 'true' : 'false'}
          onClick={() => {
            if (currentPage !== 1) {
              onPageChange(currentPage - 1);
            }
          }}
        >
          «
        </a>
      </li>

      {
        pages.map((v) => (
          <li
            className={cn('page-item', { active: v === currentPage })}
            key={v}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${v}`}
              onClick={() => onPageChange(v)}

            >
              {v}
            </a>
          </li>
        ))
      }

      <li className={cn('page-item',
        { disabled: currentPage === numberOfPages })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === numberOfPages ? 'true' : 'false'}
          onClick={() => {
            if (currentPage !== numberOfPages) {
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
