import React from 'react';
import cn from 'classnames';
interface Props {
  total: number;
  perPage: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<Props> = ({
  currentPage = 1,
  perPage,
  total,
  onPageChange,
}) => {
  const pagesQty = Math.ceil(total / perPage);

  const hasNextPage = currentPage <= pagesQty - 1;
  const hasPrevPage = currentPage > 1;

  return (
    <>
      <ul className="pagination">
        <li
          className={cn('page-item', {
            disabled: !hasPrevPage,
          })}
        >
          <a
            data-cy="prevLink"
            className="page-link"
            aria-disabled={!hasPrevPage}
            onClick={event => {
              event.preventDefault();

              if (hasPrevPage) {
                onPageChange(currentPage - 1);
              }
            }}
          >
            «
          </a>
        </li>

        {Array.from({ length: pagesQty }, (_v, idx) => {
          const pageNumber = idx + 1;
          const isActive = pageNumber === currentPage;

          return (
            <li
              key={idx}
              className={cn('page-item', {
                active: isActive,
              })}
            >
              <a
                data-cy="pageLink"
                className="page-link"
                onClick={event => {
                  event.preventDefault();
                  onPageChange(pageNumber);
                }}
              >
                {pageNumber}
              </a>
            </li>
          );
        })}

        <li
          className={cn('page-item', {
            disabled: !hasNextPage,
          })}
        >
          <a
            data-cy="nextLink"
            className="page-link"
            aria-disabled={!hasNextPage}
            onClick={event => {
              event.preventDefault();

              if (hasNextPage) {
                onPageChange(currentPage + 1);
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
