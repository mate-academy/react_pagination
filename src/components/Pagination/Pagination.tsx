import React from 'react';
import { getNumbers } from '../../utils';
import cn from 'classnames';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange(page: number): void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const onPageChangeHandler = (page: number) => {
    onPageChange(page);
  };

  const pages = Math.ceil(total / perPage);

  return (
    <>
      <ul className="pagination">
        <li className={cn('page-item active', { disabled: currentPage === 1 })}>
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={currentPage === 1}
            onClick={e => {
              e.preventDefault();
              if (currentPage > 1) {
                onPageChangeHandler(currentPage - 1);
              }
            }}
          >
            «
          </a>
        </li>
        {getNumbers(1, pages).map(num => (
          <li
            key={num}
            className={cn('page-item', { active: currentPage === num })}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`${num}`}
              onClick={e => {
                e.preventDefault();
                onPageChangeHandler(num);
              }}
            >
              {num}
            </a>
          </li>
        ))}

        <li
          className={cn('page-item active', {
            disabled: currentPage === pages,
          })}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={pages === currentPage ? 'true' : 'false'}
            onClick={e => {
              e.preventDefault();
              if (currentPage < pages) {
                onPageChangeHandler(currentPage + 1);
              }
            }}
          >
            »
          </a>
        </li>
      </ul>
    </>
  );
};
