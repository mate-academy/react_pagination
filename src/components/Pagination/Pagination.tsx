import React from 'react';
import { PaginationItem } from './PaginationItem';
import { PaginationMove } from './PaginationMove';
import classNames from 'classnames';

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
  const start = (currentPage - 1) * perPage;
  const end = start + perPage;
  const maxPage = Math.ceil(total / perPage);

  return (
    <>
      <ul className="pagination">
        <li
          className={classNames('page-item', { disabled: currentPage === 1 })}
        >
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={currentPage === 1}
            onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
          >
            «
          </a>
        </li>
        {[...Array(maxPage)].map((_, i) => (
          <PaginationMove
            key={i}
            item={i + 1}
            currentPage={currentPage}
            onPageChange={onPageChange}
          />
        ))}
        <li
          className={classNames('page-item', {
            disabled: currentPage === maxPage,
          })}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPage === maxPage}
            onClick={() =>
              currentPage < maxPage && onPageChange(currentPage + 1)
            }
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        {[...Array(total)].slice(start, end).map((_, i) => {
          return <PaginationItem key={start + i} item={start + i + 1} />;
        })}
      </ul>
    </>
  );
};
