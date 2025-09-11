import React from 'react';
import cn from 'classnames';

type Props = {
  total: number;
  perPage: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const safeCurrent = currentPage ?? 1;
  const totalPages = Math.max(0, Math.ceil(total / perPage));
  const isFirstPage = safeCurrent <= 1;
  const isLastPage = totalPages === 0 || safeCurrent >= totalPages;

  return (
    <ul className="pagination">
      <li className={cn('page-item', { disabled: isFirstPage })}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={isFirstPage}
          onClick={e => {
            e.preventDefault();
            const target = Math.max(1, safeCurrent - 1);

            if (
              totalPages > 0 &&
              target >= 1 &&
              target <= totalPages &&
              target !== safeCurrent
            ) {
              onPageChange(target);
            }
          }}
        >
          «
        </a>
      </li>
      {Array.from({ length: totalPages }, (_, i) => {
        const pageNumber = i + 1;

        return (
          <li
            className={cn('page-item', { active: safeCurrent === pageNumber })}
            key={pageNumber}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${pageNumber}`}
              onClick={e => {
                e.preventDefault();

                if (
                  totalPages > 0 &&
                  pageNumber >= 1 &&
                  pageNumber <= totalPages &&
                  pageNumber !== safeCurrent
                ) {
                  onPageChange(pageNumber);
                }
              }}
            >
              {pageNumber}
            </a>
          </li>
        );
      })}
      <li className={cn('page-item', { disabled: isLastPage })}>
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={isLastPage}
          onClick={e => {
            e.preventDefault();
            const target = Math.min(totalPages, safeCurrent + 1);

            if (
              totalPages > 0 &&
              target >= 1 &&
              target <= totalPages &&
              target !== safeCurrent
            ) {
              onPageChange(target);
            }
          }}
        >
          »
        </a>
      </li>
    </ul>
  );
};
