import React from 'react';
import cn from 'classnames';

function getTotalPages(total: number, perPage: number) {
  return Math.ceil(total / perPage);
}

export function getItemsPerPage(
  total: string[],
  page: number,
  perPage: number,
) {
  const start = (page - 1) * perPage;
  const end = start + perPage;

  return total.slice(start, end);
}

interface PaginationProps {
  total: string[];
  perPage: number;
  currentPage: number;
  onPageChange: (pageChange: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = getTotalPages(total.length, perPage);

  return (
    <>
      <ul className="pagination">
        <li className={cn('page-item', { disabled: currentPage === 1 })}>
          <a
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={currentPage === 1 ? 'true' : 'false'}
            onClick={() => currentPage !== 1 && onPageChange(currentPage - 1)}
          >
            «
          </a>
        </li>
        {Array.from({ length: totalPages }).map((_, index) => (
          <li
            className={cn('page-item', {
              active: index + 1 === currentPage,
            })}
            key={index + 1}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href="#2"
              onClick={() => onPageChange(index + 1)}
            >
              {index + 1}
            </a>
          </li>
        ))}

        <li
          className={cn('page-item', {
            disabled: currentPage === totalPages,
          })}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPage === totalPages ? 'true' : 'false'}
            onClick={() =>
              currentPage !== totalPages && onPageChange(currentPage + 1)
            }
          >
            »
          </a>
        </li>
      </ul>
      <ul>
        {getItemsPerPage(total, currentPage, perPage).map(
          (item, index: number) => {
            return (
              <li data-cy="item" key={index + 1}>
                {item}
              </li>
            );
          },
        )}
      </ul>
    </>
  );
};
